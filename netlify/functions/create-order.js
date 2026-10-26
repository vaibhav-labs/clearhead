// Netlify Function: create-order
// Creates a Razorpay order on the server using credentials from environment variables.
// Exposed at /api/create-order via netlify.toml redirects.
//
// THE PRICE IS SET HERE, NOT BY THE BROWSER. The pricing page says which package it wants and this
// function decides what that costs. Keep PLANS in step with razorpay-webhook.js and with the
// data-amount attributes on pricing.html (pricing.html refuses to open checkout if the amount returned
// here is not the amount it shows, so a mismatch fails loudly instead of charging the wrong price).
//
// Request:  POST { plan: 'starter' | 'going-deeper' | 'long-game' }
//           A pricing page loaded before this change may still send { amount, currency, receipt }. That
//           amount is accepted only when it is exactly the price of one package; anything else is rejected.
// Response: 200 { order_id, amount, currency, plan, key_id }
//           400 unknown package | 401 auth failed | 405 method not allowed | 500 server error

const Razorpay = require('razorpay');

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify(body),
});

// Prices in paise (1 rupee = 100 paise). The single source of truth for what the site charges.
const PLANS = {
  'starter':      { label: 'Starter',       amount: 2600000 },
  'going-deeper': { label: 'Going Deeper',  amount: 3600000 },
  'long-game':    { label: 'The Long Game', amount: 6600000 },
};
const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

function planFrom(payload) {
  if (typeof payload.plan === 'string' && has(PLANS, payload.plan)) return payload.plan;
  // Older pages sent the amount instead of the plan: honour it only if it is exactly one package's price.
  if (typeof payload.amount === 'number') {
    const hits = Object.keys(PLANS).filter((k) => PLANS[k].amount === payload.amount);
    if (hits.length === 1) return hits[0];
  }
  return null;
}

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

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return json(400, { error: 'Invalid request body' });
  }

  const plan = planFrom(payload);
  if (!plan) {
    return json(400, { error: 'Unknown package. Please reload the pricing page and try again.' });
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  try {
    const order = await razorpay.orders.create({
      amount: PLANS[plan].amount,
      currency: 'INR',
      receipt: `plan_${plan}_${Date.now()}`.slice(0, 40),
      notes: { plan, source: 'clearhead.in' },
    });

    // We return key_id (publishable) so the frontend can open the checkout modal.
    // The key_secret never leaves the server.
    return json(200, {
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      plan,
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
