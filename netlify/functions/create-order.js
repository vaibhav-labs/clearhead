// Netlify Function: create-order
// Creates a Razorpay order on the server using credentials from environment variables.
// Exposed at /api/create-order via netlify.toml redirects.
//
// Request:  POST { amount: number (paise), currency?: string, receipt?: string, notes?: object }
// Response: 200 { order_id, amount, currency, key_id }
//           400 invalid input | 401 auth failed | 405 method not allowed | 500 server error

const Razorpay = require('razorpay');

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

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return json(500, { error: 'Razorpay credentials are not configured on the server.' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return json(400, { error: 'Invalid JSON body' });
  }

  const { amount, currency = 'INR', receipt, notes } = payload;

  // Razorpay minimum: 100 paise (₹1).
  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount < 100) {
    return json(400, { error: 'amount must be a number and at least 100 paise (₹1).' });
  }

  if (typeof currency !== 'string' || currency.length !== 3) {
    return json(400, { error: 'currency must be a 3-letter ISO code (e.g. INR).' });
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount),
      currency,
      receipt: typeof receipt === 'string' && receipt.length > 0 ? receipt.slice(0, 40) : `rcpt_${Date.now()}`,
      notes: notes && typeof notes === 'object' ? notes : { source: 'clearhead.in' },
    });

    // We return key_id (publishable) so the frontend can open the checkout modal.
    // The key_secret never leaves the server.
    return json(200, {
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
    });
  } catch (err) {
    const status = err && err.statusCode;
    const description = (err && err.error && err.error.description) || err.message || 'Unknown Razorpay error';

    if (status === 401) {
      return json(401, { error: 'Razorpay authentication failed. Check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.' });
    }

    return json(500, { error: 'Failed to create Razorpay order', details: description });
  }
};
