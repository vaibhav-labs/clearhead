# Dashboard setup steps — payment emails, form notifications, webhook secret

This doc covers the 4 items that can't be fixed by editing the repo, because they live in
Netlify/Razorpay/Resend dashboards that require your own login. Code-side, everything is
already wired up and waiting on the values below — see `netlify/functions/razorpay-webhook.js`.

Total time: ~15 minutes. Do these in order.

---

## 1. Resend — payment confirmation emails (~5 min)

The webhook function (`netlify/functions/razorpay-webhook.js`) now sends two emails on every
successful payment: a confirmation to the customer, and an internal heads-up to
`hello@clearhead.in`. It does nothing (safely — no errors, no broken checkout) until you add
a Resend API key.

1. Sign up at **[resend.com](https://resend.com)** (free tier: 3,000 emails/month, 100/day — plenty for this site).
2. **Verify your domain**: Resend dashboard → Domains → Add Domain → enter `clearhead.in` → add the DNS records it gives you (SPF, DKIM, a couple of `TXT`/`CNAME` records) wherever your DNS is managed (Netlify DNS, per `KNOWLEDGE_MAP.md` §2). This can take a few minutes to a few hours to verify.
   - **Skip this and still test today**: until the domain is verified, you can send from Resend's shared test address `onboarding@resend.dev` by setting `RESEND_FROM_EMAIL=Clearhead <onboarding@resend.dev>` (see step 4). Switch it to `hello@clearhead.in` once the domain is verified.
3. Resend dashboard → API Keys → Create API Key → name it `clearhead-production` → copy the key (starts with `re_`). You won't be able to see it again.
4. Add to Netlify env vars (see §4 below):
   - `RESEND_API_KEY` = the key from step 3
   - `RESEND_FROM_EMAIL` = `Clearhead <hello@clearhead.in>` (once domain verified) or the `onboarding@resend.dev` fallback above
   - `INTERNAL_NOTIFY_EMAIL` = `hello@clearhead.in` (optional — this is already the default, only set it if you want the internal payment alert to go somewhere else)

**Test it**: make a real ₹1 test payment (or use Razorpay test mode if you have test-mode keys), then check your inbox and the Netlify function logs (Netlify dashboard → your site → Logs → Functions → `razorpay-webhook`) for `[razorpay-webhook]` lines confirming the send.

---

## 2. Razorpay — webhook secret (~3 min)

`RAZORPAY_WEBHOOK_SECRET` is not set anywhere yet (confirmed missing from both the local `.env`
and, per the earlier audit, Netlify). Until it's set, the webhook function fails closed — it
returns a 500 to Razorpay rather than processing anything, which is the safe default but means
the payment-confirmation emails above can't fire yet either.

1. Log in to the **[Razorpay Dashboard](https://dashboard.razorpay.com)**.
2. Go to **Settings → Webhooks → + Add New Webhook**.
3. **Webhook URL**: `https://clearhead.in/api/razorpay-webhook`
4. **Secret**: click "generate" or type your own secret string — copy it, you'll need it in step 6.
5. **Active events**: check `payment.captured` and `payment.failed` (optionally `order.paid` too).
6. Save. Then add the secret you just created to Netlify env vars (§4 below) as `RAZORPAY_WEBHOOK_SECRET`.

**Test it**: Razorpay's webhook settings page has a "Test Webhook" / recent-deliveries view that shows the response code from your endpoint. You want to see `200`. If you see `500` with "Webhook secret not configured", the env var hasn't propagated yet — redeploy the site after setting it (Netlify → Deploys → Trigger deploy).

---

## 3. Netlify — form email notifications, all 6 forms (~5 min)

Right now, form submissions (leads) only land silently in the Netlify dashboard — nobody gets
emailed. This is a per-site setting, not per-form, but you assign an email per form.

1. Netlify dashboard → your site (`effervescent-meerkat-1f9826`) → **Forms** (left sidebar).
2. Click **Settings and usage** (or the gear icon) → **Form notifications** → **Add notification** → **Email notification**.
3. Repeat this once per form, selecting the form name each time and entering `hello@clearhead.in` (or wherever you want leads to land):
   - `contact` — homepage contact form
   - `quiz-enquiry` — quiz page
   - `runway-leads` — Abundance Runway Calculator
   - `bandwidth-leads` — Cognitive Load & Bandwidth Index
   - `career-leads` — Career Friction & Alignment Audit
   - `ai-relevance-leads` — AI Automation & Relevance Index

**Test it**: submit each form once yourself (with a throwaway note like "test — ignore") and confirm you get 6 separate emails. Delete the test submissions from the Netlify Forms dashboard afterward if you want to keep the lead list clean.

---

## 4. Where to actually set the Netlify env vars

All the env vars mentioned above (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `INTERNAL_NOTIFY_EMAIL`, `RAZORPAY_WEBHOOK_SECRET`) go in the same place:

1. Netlify dashboard → your site → **Site configuration → Environment variables**.
2. **Add a variable** for each one (key + value, scope: all deploy contexts is fine for this site since there's no separate staging environment).
3. After adding/changing env vars, **trigger a redeploy** (Deploys → Trigger deploy → Deploy site) — Netlify Functions only pick up new env vars on a fresh deploy, not live.

Existing vars already set (for reference, don't touch): `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`.

---

## 5. Quick verification checklist

Once all 4 are done and redeployed:

- [ ] `POST {}` to `https://clearhead.in/api/create-order` still returns `400` (confirms Razorpay creds untouched and healthy — see `KNOWLEDGE_MAP.md` §5 for this probe).
- [ ] Razorpay webhook test delivery shows `200`, not `500`.
- [ ] A real (or test-mode) payment produces a customer email and an internal email within a minute or two.
- [ ] All 6 Netlify forms show up under Forms → Settings → Form notifications with an email attached.
- [ ] Submitting each form once yourself produces an email.

If anything doesn't fire, check Netlify → Logs → Functions → `razorpay-webhook` for `[razorpay-webhook]` log lines — the function logs every skip/failure reason (missing key, Resend API error, etc.) rather than failing silently.
