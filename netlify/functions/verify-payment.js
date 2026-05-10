// Netlify Function: verify-payment
// Verifies Razorpay payment signature server-side using HMAC-SHA256.
// Exposed at /api/verify-payment via netlify.toml redirects.
//
// Request:  POST { razorpay_order_id, razorpay_payment_id, razorpay_signature }
// Response: 200 { verified: true, order_id, payment_id }
//           400 missing fields | 400 signature mismatch | 405 method not allowed | 500 server error

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

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return json(500, { error: 'Razorpay key secret is not configured on the server.' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return json(400, { error: 'Invalid JSON body' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = payload;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return json(400, {
      verified: false,
      error: 'Missing required fields: razorpay_order_id, razorpay_payment_id, razorpay_signature.',
    });
  }

  if (
    typeof razorpay_order_id !== 'string' ||
    typeof razorpay_payment_id !== 'string' ||
    typeof razorpay_signature !== 'string'
  ) {
    return json(400, { verified: false, error: 'All fields must be strings.' });
  }

  // Razorpay signature = HMAC-SHA256(order_id + "|" + payment_id, key_secret)
  const expected = crypto
    .createHmac('sha256', keySecret)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  // Timing-safe comparison to defeat timing attacks.
  let match = false;
  try {
    const a = Buffer.from(razorpay_signature, 'utf8');
    const b = Buffer.from(expected, 'utf8');
    match = a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch (e) {
    match = false;
  }

  if (!match) {
    // Do NOT mark as paid — possible tampering.
    return json(400, { verified: false, error: 'Signature mismatch. Payment is NOT verified.' });
  }

  return json(200, {
    verified: true,
    order_id: razorpay_order_id,
    payment_id: razorpay_payment_id,
  });
};
