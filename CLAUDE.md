# Clearhead — Project Context for Claude

> **Read [`KNOWLEDGE_MAP.md`](./KNOWLEDGE_MAP.md) first.** It is the single source of truth for this
> project — a full 360° view: business, stack, site map, routing, payments, forms, SEO, automation,
> design tokens, deploy workflow, accounts, and open TODOs.

**One-line orientation:** `clearhead.in` is a plain static HTML/CSS/vanilla-JS site (no React/build step) on Netlify for Vaibhav's ICF PCC coaching practice — Razorpay payments via Netlify Functions (`create-order`, `verify-payment`, `razorpay-webhook`, plus `csp-report` for security-policy reports), Cal.com booking, and Netlify Forms for leads.

Deploy: `cd ~/Documents/Zen && git add -A && git commit -m "msg" && git push origin main` (auto-deploys ~30s).

Everything else: see `KNOWLEDGE_MAP.md`. Keep both files in sync after structural changes.

## File policy (owner instruction, 2026-10-05)
Do NOT create new files unless the owner explicitly asks. Update these living files in place and add dated entries/rows or version notes instead:
- `KNOWLEDGE_MAP.md` — master map; weekly refresh (Mondays) via `audits/knowledge_map_refresh.py --apply`; version log in §20.
- `audits/SITE_HEALTH_LOG.md` — daily health log (status board, trend, newest-first entries).
- `audits/knowledge_map_refresh.py` — refresh script (run with `PYTHONDONTWRITEBYTECODE=1 python3 -B`).
Use `git --no-optional-locks`. Never read secret values or ask for tokens. No LinkedIn recommendations.

## Contact details (owner instruction, 2026-10-25)
Never publish a phone or WhatsApp number anywhere on the site: no `wa.me` or `tel:` links, no `telephone` in schema, and no number in llms.txt, docs or the emails the Netlify functions send. The public contact routes are hello@clearhead.in, the homepage contact form and the booking flow (`call.html`). The visitor's own WhatsApp number may still be collected by the screening and onboarding forms.

## Guardrails learned from the 2026-10-25 workflow audit
- `call.html` is the only door to Cal.com. Never link straight to `cal.com/vaibhavjain` from a page, `llms.txt` or an email.
- Prices live in three places that must match: `data-amount` on `pricing.html`, and `PLANS` in `create-order.js` and `razorpay-webhook.js`. The browser sends a plan name; the server sets the price.
- No personal data in URLs. `analytics.js` strips every query parameter except `via`, `cal` and `utm_*` before Google sees an address, but the booking page still carries `topic` and `pid`.
- Confidentiality wording must match `terms.html` (two narrow exceptions: imminent serious harm, a court order). No "100%", "always" or "without exception".
- Any copy that describes the funnel must be true: the path is blog or tool, then `quiz.html` or `call.html`, then Cal.com. Do not write "no forms".
- The security-policy header is report-only on purpose. Read `KNOWLEDGE_MAP.md` section 6 before enforcing it.
- Forms are saved with `fetch`; a save only counts when the reply is OK. Never show success for a failed save.
