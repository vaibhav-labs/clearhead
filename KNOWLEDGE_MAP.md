# Clearhead — Project Knowledge Map

> **Read this first in every session.** Single source of truth for a 360° view of the project.
> Verified against the repo on **2026-06-09**. If the repo and this file disagree, trust the repo and update this file.
> Companion files: `CLAUDE.md` (legacy/long-form context — partly stale), `audits/` (daily reports).

---

## 1. What this is

**clearhead.in** — the live marketing + lead-gen site for **Vaibhav Jain's** coaching & counselling practice in Mumbai. Vaibhav is an **ICF PCC** coach working with senior corporate professionals (Senior PMs, Eng Directors, VPs, Fortune 500 leaders) on AI anxiety, mid-career identity, and professional loneliness.

- **Business model:** 1:1 coaching packages paid upfront via Razorpay → booked via Cal.com after payment. Free interactive tools + blog feed top-of-funnel and capture leads via Netlify Forms.
- **Brand/tone:** calm, mature, trustworthy advisor. No hype, no urgency tactics.
- **Funnel:** organic/SEO + tools → email capture or "free conversation" CTA → paid package → Cal.com booking.

---

## 2. Tech stack (no framework — this is deliberate)

| Layer | Choice |
|---|---|
| Frontend | **Static HTML + one global `styles.css` + vanilla JS.** No React/Vite/Tailwind/build step. |
| Hosting | Netlify, auto-deploy on push to `main` (~30s) |
| Backend | 3 Netlify Functions (Node ≥18, serverless, esbuild bundler) |
| Payments | Razorpay Standard Checkout (`razorpay` npm dep is the only dependency) |
| Booking | Cal.com embed popup (`cal.com/vaibhavjain`), opened after payment |
| Lead forms | Netlify Forms (6 forms, see §6) |
| DNS | Netlify DNS |
| Repo | `github.com/vaibhav-labs/clearhead` · branch `main` · local `~/Documents/Zen/` |
| Netlify site | `effervescent-meerkat-1f9826` |

> Any instruction implying a framework/build pipeline is wrong — ignore it.

---

## 3. Site map (18 HTML pages)

**Core**
- `index.html` — homepage (hero, services, about, FAQ, contact form). Pricing now lives on its own page.
- `pricing.html` — coaching packages + Razorpay pay buttons.
- `blog.html` — blog index (3 categories, thumbnails).
- `tools.html` — free-tools hub linking the 4 calculators.

**Blog posts (6, all indexed)**
- `post-ai.html` — "Your Job Title Is Changing. Don't Lose Yourself."
- `post-ai-loneliness.html` — "Can AI Cure Loneliness? What a 2026 Study Found."
- `post-unheard.html` — "You're not confused. You're just unheard."
- `post-lonely.html` — "The Loneliest Generation Has the Most Followers."
- `post-conversation.html` — "What One Good Conversation Can Do."
- `post-new-city-loneliness.html` — "Moved Cities for a Job? The Loneliness Is Real."

**Interactive tools (4 — each = `*.html` view + `*-engine.js` pure-math engine, DOM-decoupled, gated by a Netlify Form)**
- `runway.html` + `runway-engine.js` — **Abundance Runway Calculator** (7-step financial-runway sim).
- `bandwidth.html` + `bandwidth-engine.js` — **Cognitive Load & Bandwidth Index**.
- `career-friction.html` + `career-friction-engine.js` — **Career Friction & Alignment Audit**.
- `ai-relevance.html` + `ai-relevance-engine.js` — **AI Automation & Relevance Index** ("will AI replace my job").

**Utility (not indexed)**
- `quiz.html` — fit quiz (disallowed in robots.txt).
- `thank-you.html` — post-form redirect (disallowed in robots.txt).
- `privacy-policy.html`, `terms.html` — legal (excluded from sitemap).

**Indexed in `sitemap.xml` (14):** `/`, pricing, blog, the 6 posts, runway, tools, bandwidth, career-friction, ai-relevance.

> The old CLAUDE.md lists the 3 non-runway tools as "planned/not built" and pricing as on-home — **both are now done.** This file is current.

---

## 4. Routing & redirects (`netlify.toml`)

- **`www → non-www`**: `https://www.clearhead.in/*` → `https://clearhead.in/:splat` (301, forced).
- **Clean URLs**: every page has a `/name → /name.html` 301. Netlify Pretty URLs also serve `/name` at 200; canonical tags point to the `.html` version, so both are fine.
- **API paths** (200 rewrites): `/api/create-order`, `/api/verify-payment`, `/api/razorpay-webhook` → `/.netlify/functions/<name>`.
- **Security headers** (all routes): `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: geolocation=(), microphone=(), camera=()`.

---

## 5. Payments (Razorpay) — `netlify/functions/`

| Function | Route | Role |
|---|---|---|
| `create-order.js` | `POST /api/create-order` | Creates Razorpay order server-side. In: `{amount(paise), currency=INR, receipt?, notes?}`. Out: `{order_id, amount, currency, key_id}`. `405` non-POST · `400` invalid/low amount · `500` if creds missing. |
| `verify-payment.js` | `POST /api/verify-payment` | HMAC-SHA256 signature verify, timing-safe. In: `{razorpay_order_id, razorpay_payment_id, razorpay_signature}`. Out: `{verified:true}` or `400`. |
| `razorpay-webhook.js` | `POST /api/razorpay-webhook` | Verifies webhook secret, **logs only** (no email yet — see TODOs). |

**Flow:** pricing button → `create-order` → Razorpay modal → success → `verify-payment` → Cal.com booking shown.

**Packages** (per-session rate shown on pricing.html; `data-amount` is the full package total in paise):

| Package | Sessions | Total | Per session | Paise (`data-amount`) |
|---|---|---|---|---|
| Starter | 4 × 60-min | ₹26,000 | ₹6,500 | `2600000` |
| Going Deeper | 6 × 60-min | ₹36,000 | ₹6,000 | `3600000` |
| The Long Game | 12 × 60-min | ₹66,000 | ₹5,500 | `6600000` |

**Env vars** (Netlify dashboard → Site config → Environment variables; **not** in repo; local copy in gitignored `.env`):
`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` (webhook only).

**Credential health probe:** `POST {}` to `/api/create-order` → **400 = healthy** · **500 + "credentials" = broken**.

---

## 6. Netlify Forms (6) — all capture to the Netlify dashboard

`contact` (homepage) · `quiz-enquiry` (quiz) · `runway-leads` · `bandwidth-leads` · `career-leads` · `ai-relevance-leads`.
All use `data-netlify="true"`, a `bot-field` honeypot, and redirect to `/thank-you.html`.
**Email notifications are NOT configured** on any form — submissions only land in the dashboard (see TODOs).

---

## 7. SEO

- All titles ≤ 60 chars; meta descriptions 120–160; canonical + full OG tags (incl. `og:image:width/height/alt`) on every indexable page.
- **JSON-LD:** homepage has `FAQPage` + `LocalBusiness` (telephone, geo, hasMap) + `ProfessionalService` + `Person` (ICF PCC). Each blog post has `Article` + `BreadcrumbList`. Tools carry `SoftwareApplication`.
- Self-hosted OG images: `og-ai-loneliness.jpg`, `og-new-city-loneliness.jpg` (plus `VJ.jpg` default).
- `robots.txt` disallows `/thank-you.html`, `/quiz.html`, `/api/`, `/.netlify/`.
- **GSC (sc-domain:clearhead.in):** new low-authority domain; pages were "Discovered — not indexed", manual indexing requested **2026-05-29**. Key lever: LinkedIn shares + 2–3 backlinks. Escalation timeline tracked by the monitor.

---

## 8. Automation

- **`clearhead-site-monitor`** (skill at `audits/clearhead-site-monitor.skill`) — daily ~8:00 AM. Checks page/redirect/image availability, the 3-step payment workflow, and SEO integrity; **auto-fixes + commits SEO drift**; reports anything needing a human. Reports → `audits/site-health-YYYY-MM-DD.md`.
- **`clearhead-seo-audit`** — every 3 days ~9:00 AM; deeper structured-data/keyword audit → `audits/seo-audit-*.md`.

---

## 9. Design tokens (`styles.css`) — v2 "deep-water" theme (2026-07-07)

```
--bg #f2f6f8 (cool mist) · --bg-alt #e8eff3 · --ink #101d26 · --ink-soft #3d4f5c · --line #d9e2e8
--accent #0e6e64 (deep teal) · --accent-deep #0a5049 · --accent-soft #dcecea
--ember #c2410c (warm CTA) · --ember-deep #9a3412 · --deep #081826 (night-navy bands)
--radius 14px · --maxw 1040px · body: system sans · display: "Sora" (Google Fonts @import in styles.css)
```
No beige anywhere; all stray hexes migrated 2026-07-07. Primary CTAs are ember; hero/safe/trust bands are `--deep` navy. Scroll-reveal text animation: `anim.js` (loaded sitewide, `prefers-reduced-motion` safe).
Illustration assets: `peep-*.svg`, `mix-*.svg`, `happy.svg` (minified, now used as blog thumbnails + in-post figures + homepage cards — Unsplash fully removed from pages; og:image metas still point to Unsplash pending an owned OG template); photos `coaching-early/mid/grad.jpg` (1168×784), `VJ.jpg` (1200×849).

---

## 10. Deploy & ops

```bash
cd ~/Documents/Zen
git add -A && git commit -m "msg" && git push origin main   # auto-deploys in ~30s

# If push fails with a stale lock (Cowork sandbox leftover):
find ~/Documents/Zen/.git -name "*.lock" -delete && git push origin main

npx netlify dev          # local run incl. functions (reads .env)
```

---

## 11. Known issues / open TODOs

| Issue | Severity | Status |
|---|---|---|
| No payment-confirmation email | High | Webhook only logs — wire Resend/Postmark in `razorpay-webhook.js`. |
| Form email notifications off (all 6 forms) | High | Configure in Netlify → Forms → notifications. |
| Pages not yet indexed by Google | Medium | Requested 2026-05-29; needs backlinks + LinkedIn promotion. |
| Zero backlinks | Medium | None yet. |
| `RAZORPAY_WEBHOOK_SECRET` may be unset | Low | Webhook 500s on events until set. |

---

## 12. Accounts & contacts

Owner **Vaibhav Jain** · email **hello@clearhead.in** · WhatsApp **+91-90289-02948** · office **Lokhandwala Complex, Andheri West, Mumbai 400053** · hours Mon–Sat 09:00–19:00 IST · Cal.com **vaibhavjain** · GitHub **vaibhav-labs/clearhead** · Netlify **effervescent-meerkat-1f9826** · GSC **sc-domain:clearhead.in** · geo 19.1405612, 72.8246929.

---

## 13. Conventions for working here

- Edit HTML/CSS/JS directly; no build. Keep new tools to the `*.html` + `*-engine.js` (pure math, DOM-free, `window`-exported) pattern, gated by a new Netlify Form.
- Match the design tokens and calm brand voice.
- Any new indexable page: add to `sitemap.xml`, set canonical + OG + JSON-LD, add a clean-URL 301 to `netlify.toml`.
- Keep this file and `CLAUDE.md` in sync after structural changes.
