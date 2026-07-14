// Netlify Function: razorpay-webhook
// Receives Razorpay webhook events (payment.captured, payment.failed, etc.).
// Verifies the webhook signature using HMAC-SHA256, then sends confirmation emails via Resend.
// Exposed at /api/razorpay-webhook via netlify.toml redirects.
//
// SETUP:
//   1. In Razorpay dashboard → Settings → Webhooks, add a webhook with URL:
//        https://clearhead.in/api/razorpay-webhook
//   2. Generate a webhook secret in Razorpay and set it as RAZORPAY_WEBHOOK_SECRET in Netlify env vars.
//   3. Subscribe to events: payment.captured, payment.failed (and optionally order.paid).
//   4. Sign up at resend.com, verify the clearhead.in domain, create an API key, and set
//      RESEND_API_KEY (and optionally RESEND_FROM_EMAIL) in Netlify env vars.
//   Full walkthrough: see SETUP-DASHBOARD-STEPS.md in the repo root.
//
// EMAIL BEHAVIOUR:
//   On payment.captured, sends (a) a booking-reminder confirmation to the customer and
//   (b) an internal heads-up to INTERNAL_NOTIFY_EMAIL (defaults to hello@clearhead.in).
//   If RESEND_API_KEY is not set, email sending is skipped and the event is still logged —
//   this function never fails or blocks the Razorpay webhook response because of email issues.
//   Uses Node 18's built-in fetch to call the Resend REST API directly, so no new npm
//   dependency or bundler step is needed.

const crypto = require('crypto');

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify(body),
});

const PLAN_INFO = {
  starter: { label: 'Starter', sessions: '4 × 60-min sessions', calSlug: 'starter' },
  'going-deeper': { label: 'Going Deeper', sessions: '6 × 60-min sessions', calSlug: 'going-deeper' },
  'long-game': { label: 'The Long Game', sessions: '12 × 60-min sessions', calSlug: 'the-long-game' },
};

const formatRupees = (paise) => {
  const rupees = Math.round((Number(paise) || 0) / 100);
  return '₹' + rupees.toLocaleString('en-IN');
};

// Sends one email via the Resend REST API. Never throws — logs and returns false on any failure,
// so a broken email integration can never take down the webhook response to Razorpay.
async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('[razorpay-webhook] RESEND_API_KEY not set — skipping email send. See SETUP-DASHBOARD-STEPS.md.');
    return false;
  }
  const from = process.env.RESEND_FROM_EMAIL || 'Clearhead <hello@clearhead.in>';

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, subject, html }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      console.error('[razorpay-webhook] Resend API error', res.status, errText);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[razorpay-webhook] Failed to send email via Resend', err && err.message);
    return false;
  }
}

function customerEmailHtml({ planInfo, amountLabel, paymentId, calUrl }) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;color:#101d26;">
    <p>Hi,</p>
    <p>Your payment for the <strong>${planInfo.label}</strong> package (${planInfo.sessions}) has been received. Thank you.</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
      <tr><td style="padding:4px 0;color:#3d4f5c;">Package</td><td style="padding:4px 0;text-align:right;">${planInfo.label}</td></tr>
      <tr><td style="padding:4px 0;color:#3d4f5c;">Amount</td><td style="padding:4px 0;text-align:right;">${amountLabel}</td></tr>
      <tr><td style="padding:4px 0;color:#3d4f5c;">Payment ID</td><td style="padding:4px 0;text-align:right;">${paymentId}</td></tr>
    </table>
    <p>Next step — book your first session whenever suits you:</p>
    <p><a href="${calUrl}" style="display:inline-block;background:#3053c4;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:500;">Book your first session →</a></p>
    <p style="margin-top:24px;color:#3d4f5c;font-size:13px;">Questions? Just reply to this email, or reach hello@clearhead.in / +91 90289 02948.</p>
    <p style="color:#3d4f5c;font-size:13px;">— Vaibhav Jain, Clearhead</p>
  </div>`;
}

function internalEmailHtml({ planInfo, amountLabel, paymentId, orderId, email, contact }) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;color:#101d26;">
    <p><strong>New payment captured</strong></p>
    <table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:14px;">
      <tr><td style="padding:4px 0;color:#3d4f5c;">Package</td><td style="padding:4px 0;text-align:right;">${planInfo.label}</td></tr>
      <tr><td style="padding:4px 0;color:#3d4f5c;">Amount</td><td style="padding:4px 0;text-align:right;">${amountLabel}</td></tr>
      <tr><td style="padding:4px 0;color:#3d4f5c;">Customer email</td><td style="padding:4px 0;text-align:right;">${email || '(not provided)'}</td></tr>
      <tr><td style="padding:4px 0;color:#3d4f5c;">Customer phone</td><td style="padding:4px 0;text-align:right;">${contact || '(not provided)'}</td></tr>
      <tr><td style="padding:4px 0;color:#3d4f5c;">Payment ID</td><td style="padding:4px 0;text-align:right;">${paymentId}</td></tr>
      <tr><td style="padding:4px 0;color:#3d4f5c;">Order ID</td><td style="padding:4px 0;text-align:right;">${orderId}</td></tr>
    </table>
  </div>`;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    // Webhook not yet configured — fail closed so unauthenticated calls don't reach the rest of the function.
    return json(500, { error: 'Webhook secret not configured. Set RAZORPAY_WEBHOOK_SECRET in Netlify env vars.' });
  }

  const signature = event.headers['x-razorpay-signature'] || event.headers['X-Razorpay-Signature'];
  if (!signature) {
    return json(400, { error: 'Missing X-Razorpay-Signature header' });
  }

  const rawBody = event.body || '';

  // Verify signature: HMAC-SHA256(rawBody, webhookSecret)
  const expected = crypto.createHmac('sha256', webhookSecret).update(rawBody).digest('hex');

  let match = false;
  try {
    const a = Buffer.from(signature, 'utf8');
    const b = Buffer.from(expected, 'utf8');
    match = a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch (e) {
    match = false;
  }

  if (!match) {
    return json(400, { error: 'Invalid webhook signature' });
  }

  // Parse the payload only after signature has been verified.
  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (e) {
    return json(400, { error: 'Invalid JSON payload' });
  }

  const eventType = payload.event;
  const entity = (payload.payload && (payload.payload.payment || payload.payload.order || {})) || {};
  const paymentEntity = entity.entity || {};

  // Minimal logging — replace with notification logic.
  // Netlify captures console.log output in the Functions log viewer.
  switch (eventType) {
    case 'payment.captured': {
      console.log('[razorpay] payment captured', {
        payment_id: paymentEntity.id,
        order_id: paymentEntity.order_id,
        amount: paymentEntity.amount,
        currency: paymentEntity.currency,
        email: paymentEntity.email,
        contact: paymentEntity.contact,
        notes: paymentEntity.notes,
      });

      const planKey = (paymentEntity.notes && paymentEntity.notes.plan) || 'starter';
      const planInfo = PLAN_INFO[planKey] || PLAN_INFO.starter;
      const amountLabel = formatRupees(paymentEntity.amount);
      const calUrl = `https://cal.com/vaibhavjain/${planInfo.calSlug}`;
      const internalTo = process.env.INTERNAL_NOTIFY_EMAIL || 'hello@clearhead.in';

      // Fire both emails in parallel. Neither failure affects the webhook's 200 response to Razorpay —
      // sendEmail() already catches and logs its own errors.
      const emailTasks = [];

      if (paymentEntity.email) {
        emailTasks.push(
          sendEmail({
            to: paymentEntity.email,
            subject: `Payment received — ${planInfo.label} package`,
            html: customerEmailHtml({
              planInfo,
              amountLabel,
              paymentId: paymentEntity.id,
              calUrl,
            }),
          })
        );
      } else {
        console.log('[razorpay-webhook] No customer email on payment entity — skipping customer confirmation email.');
      }

      emailTasks.push(
        sendEmail({
          to: internalTo,
          subject: `New payment — ${planInfo.label} (${amountLabel})`,
          html: internalEmailHtml({
            planInfo,
            amountLabel,
            paymentId: paymentEntity.id,
            orderId: paymentEntity.order_id,
            email: paymentEntity.email,
            contact: paymentEntity.contact,
          }),
        })
      );

      await Promise.all(emailTasks);
      break;
    }

    case 'payment.failed':
      console.log('[razorpay] payment failed', {
        payment_id: paymentEntity.id,
        order_id: paymentEntity.order_id,
        error_code: paymentEntity.error_code,
        error_description: paymentEntity.error_description,
      });
      // Deliberately no email here — Razorpay's own checkout UI already surfaces the failure to the
      // customer inline (see pricing.html rzp.on('payment.failed', ...)), and most failures are routine
      // declines/cancellations, so emailing on every one would just create alert noise for Vaibhav.
      break;

    default:
      console.log('[razorpay] webhook event', eventType);
  }

  // Razorpay expects a 200 within ~5 seconds; otherwise it retries.
  return json(200, { received: true });
};
