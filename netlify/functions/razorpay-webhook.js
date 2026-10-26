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
//   On payment.captured, sends (a) a confirmation to the customer and (b) an internal heads-up to
//   INTERNAL_NOTIFY_EMAIL (defaults to hello@clearhead.in).
//   The customer's link goes to the pre-call screening page (call.html), NOT straight to the calendar, so a
//   paid client is screened exactly like a free-call visitor and the screening answers reach Vaibhav.
//   Which package was bought is worked out from the AMOUNT (create-order.js sets the amount from the package,
//   so it can only match the package that was chosen). A payment whose amount matches no package is never
//   guessed at: the customer gets a plain confirmation with no booking link, and the internal email says to
//   check it by hand. (The old behaviour defaulted to Starter.)
//   If RESEND_API_KEY is missing, or the clearhead.in domain is not verified in Resend, sending fails. That is
//   logged with the marker "EMAIL FAILED" and the webhook still answers 200 so Razorpay does not retry for a
//   day. Look for that marker in the Netlify function log if confirmation emails are not arriving.
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

// Keep in step with create-order.js (prices, in paise) and pricing.html.
const PLAN_INFO = {
  starter: { label: 'Starter', sessions: '4 × 60-min sessions', amount: 2600000, calSlug: 'starter' },
  'going-deeper': { label: 'Going Deeper', sessions: '6 × 60-min sessions', amount: 3600000, calSlug: 'going-deeper' },
  'long-game': { label: 'The Long Game', sessions: '12 × 60-min sessions', amount: 6600000, calSlug: 'the-long-game' },
};

// Everything that reaches an email body is escaped: payer details come from the payment form.
const esc = (v) =>
  String(v == null ? '' : v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Which package was this payment for? The amount is the reliable signal; the `plan` note is a cross-check.
// Returns { key, flag }: key is '' when nothing matches (never guess), flag explains anything odd.
function resolvePlan(payment) {
  const notes = payment.notes && !Array.isArray(payment.notes) ? payment.notes : {};
  const notePlan = typeof notes.plan === 'string' ? notes.plan : '';
  const byAmount =
    Object.keys(PLAN_INFO).filter((k) => PLAN_INFO[k].amount === payment.amount && payment.currency === 'INR')[0] || '';
  if (byAmount && (!notePlan || notePlan === byAmount)) return { key: byAmount, flag: '' };
  if (byAmount) {
    return {
      key: byAmount,
      flag: `The plan note says "${notePlan}" but the amount matches ${PLAN_INFO[byAmount].label}. Treated as ${PLAN_INFO[byAmount].label}.`,
    };
  }
  return {
    key: '',
    flag: `The amount ${formatRupees(payment.amount)} (${payment.currency || 'no currency'}) does not match any package. Check this payment by hand.`,
  };
}

const formatRupees = (paise) => {
  const rupees = Math.round((Number(paise) || 0) / 100);
  return '₹' + rupees.toLocaleString('en-IN');
};

// Sends one email via the Resend REST API. Never throws — logs and returns false on any failure,
// so a broken email integration can never take down the webhook response to Razorpay.
async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[razorpay-webhook] EMAIL FAILED: RESEND_API_KEY is not set, so no email was sent to', to, '(' + subject + ').');
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
      console.error('[razorpay-webhook] EMAIL FAILED: Resend API error', res.status, errText, '(to ' + to + ', ' + subject + ')');
      return false;
    }
    return true;
  } catch (err) {
    console.error('[razorpay-webhook] EMAIL FAILED: could not reach Resend', err && err.message, '(to ' + to + ', ' + subject + ')');
    return false;
  }
}

const WRAP_STYLE = 'font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;color:#101d26;';
const FINE_STYLE = 'color:#3d4f5c;font-size:13px;';
const row = (k, v) =>
  `<tr><td style="padding:4px 0;color:#3d4f5c;">${k}</td><td style="padding:4px 0;text-align:right;">${v}</td></tr>`;

// Package recognised: confirmation plus the next step (screening page, then the calendar).
function customerEmailHtml({ planInfo, amountLabel, paymentId, nextUrl, agreementUrl }) {
  return `
  <div style="${WRAP_STYLE}">
    <p>Hi,</p>
    <p>Your payment for the <strong>${esc(planInfo.label)}</strong> package (${esc(planInfo.sessions)}) has been received. Thank you.</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
      ${row('Package', esc(planInfo.label))}
      ${row('Amount', esc(amountLabel))}
      ${row('Payment ID', esc(paymentId))}
    </table>
    <p>Next step: a short check before we begin (about a minute), then you pick your first session.</p>
    <p><a href="${esc(nextUrl)}" style="display:inline-block;background:#142850;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:500;">Continue to book your first session →</a></p>
    <p>Before your first session, please also sign the short client agreement (about ten minutes). Any time before then is fine.</p>
    <p><a href="${esc(agreementUrl)}" style="color:#142850;">Open the client agreement</a></p>
    <p style="margin-top:24px;${FINE_STYLE}">Cancellations before your second session are refunded in full. <a href="https://clearhead.in/terms" style="color:#3d4f5c;">Terms</a></p>
    <p style="${FINE_STYLE}">Questions? Just reply to this email, or write to hello@clearhead.in.</p>
    <p style="${FINE_STYLE}">Vaibhav, Clearhead</p>
  </div>`;
}

// Amount matched no package: say the payment arrived, promise a personal follow-up, and give no booking link.
function customerEmailUnmatchedHtml({ amountLabel, paymentId }) {
  return `
  <div style="${WRAP_STYLE}">
    <p>Hi,</p>
    <p>Your payment of <strong>${esc(amountLabel)}</strong> has been received. Thank you.</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
      ${row('Amount', esc(amountLabel))}
      ${row('Payment ID', esc(paymentId))}
    </table>
    <p>I will write to you personally to arrange your first session.</p>
    <p style="margin-top:24px;${FINE_STYLE}">Questions? Just reply to this email, or write to hello@clearhead.in.</p>
    <p style="${FINE_STYLE}">Vaibhav, Clearhead</p>
  </div>`;
}

function internalEmailHtml({ planInfo, amountLabel, paymentId, orderId, email, contact, flag }) {
  return `
  <div style="${WRAP_STYLE}">
    <p><strong>New payment captured</strong></p>
    ${flag ? `<p style="color:#b42318;"><strong>Check this one:</strong> ${esc(flag)}</p>` : ''}
    <table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:14px;">
      ${row('Package', esc(planInfo ? planInfo.label : '(not recognised)'))}
      ${row('Amount', esc(amountLabel))}
      ${row('Customer email', esc(email || '(not provided)'))}
      ${row('Customer phone', esc(contact || '(not provided)'))}
      ${row('Payment ID', esc(paymentId))}
      ${row('Order ID', esc(orderId))}
    </table>
    <p style="${FINE_STYLE}">The customer has been sent a link to the pre-call check, then the calendar. Their answers arrive in Netlify Forms (call-screening) once they complete it, tagged with this payment ID.</p>
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

  // Netlify can hand the body over base64-encoded; the signature is over the original bytes.
  const rawBody = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf8') : event.body || '';

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

      const { key: planKey, flag } = resolvePlan(paymentEntity);
      const planInfo = planKey ? PLAN_INFO[planKey] : null;
      const amountLabel = formatRupees(paymentEntity.amount);
      const internalTo = process.env.INTERNAL_NOTIFY_EMAIL || 'hello@clearhead.in';
      if (flag) console.warn('[razorpay-webhook] CHECK BY HAND:', flag, { payment_id: paymentEntity.id });

      // Fire both emails in parallel. Neither failure affects the webhook's 200 response to Razorpay —
      // sendEmail() already catches and logs its own errors.
      const emailTasks = [];

      if (paymentEntity.email) {
        if (planInfo) {
          // The screening page comes first; it then sends the client on to this package's calendar.
          const nextUrl =
            `https://clearhead.in/call.html?via=paid-${planKey}&cal=${planInfo.calSlug}` +
            `&pid=${encodeURIComponent(paymentEntity.id || '')}`;
          const agreementUrl = `https://clearhead.in/onboard.html?via=paid-${planKey}&pid=${encodeURIComponent(paymentEntity.id || '')}`;
          emailTasks.push(
            sendEmail({
              to: paymentEntity.email,
              subject: `Payment received: ${planInfo.label} package`,
              html: customerEmailHtml({ planInfo, amountLabel, paymentId: paymentEntity.id, nextUrl, agreementUrl }),
            })
          );
        } else {
          emailTasks.push(
            sendEmail({
              to: paymentEntity.email,
              subject: 'Payment received',
              html: customerEmailUnmatchedHtml({ amountLabel, paymentId: paymentEntity.id }),
            })
          );
        }
      } else {
        console.log('[razorpay-webhook] No customer email on payment entity — skipping customer confirmation email.');
      }

      emailTasks.push(
        sendEmail({
          to: internalTo,
          subject: planInfo ? `New payment: ${planInfo.label} (${amountLabel})` : `New payment: CHECK BY HAND (${amountLabel})`,
          html: internalEmailHtml({
            planInfo,
            amountLabel,
            paymentId: paymentEntity.id,
            orderId: paymentEntity.order_id,
            email: paymentEntity.email,
            contact: paymentEntity.contact,
            flag,
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
