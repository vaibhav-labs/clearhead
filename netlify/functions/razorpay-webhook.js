// Netlify Function: razorpay-webhook
// Receives Razorpay webhook events (payment.captured, payment.failed, etc.).
// Verifies the webhook signature using HMAC-SHA256, then logs the event.
// Exposed at /api/razorpay-webhook via netlify.toml redirects.
//
// SETUP:
//   1. In Razorpay dashboard → Settings → Webhooks, add a webhook with URL:
//        https://clearhead.in/api/razorpay-webhook
//   2. Generate a webhook secret in Razorpay and set it as RAZORPAY_WEBHOOK_SECRET in Netlify env vars.
//   3. Subscribe to events: payment.captured, payment.failed (and optionally order.paid).
//
// EXTENDING:
//   Replace the console.log calls below with your preferred notification mechanism:
//   - Send a transactional email (e.g. via Resend, Postmark, or a Cal.com workflow trigger)
//   - Append a row to a Google Sheet via the Sheets API
//   - Create a Notion page via the Notion API
//   - Post to Slack via an incoming webhook

const crypto = require('crypto');

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify(body),
});

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
    case 'payment.captured':
      console.log('[razorpay] payment captured', {
        payment_id: paymentEntity.id,
        order_id: paymentEntity.order_id,
        amount: paymentEntity.amount,
        currency: paymentEntity.currency,
        email: paymentEntity.email,
        contact: paymentEntity.contact,
        notes: paymentEntity.notes,
      });
      // TODO: send confirmation email / append to spreadsheet / post to Slack
      break;

    case 'payment.failed':
      console.log('[razorpay] payment failed', {
        payment_id: paymentEntity.id,
        order_id: paymentEntity.order_id,
        error_code: paymentEntity.error_code,
        error_description: paymentEntity.error_description,
      });
      // TODO: notify yourself if failure rate is unusually high
      break;

    default:
      console.log('[razorpay] webhook event', eventType);
  }

  // Razorpay expects a 200 within ~5 seconds; otherwise it retries.
  return json(200, { received: true });
};
