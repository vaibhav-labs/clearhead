# Clearhead — Project Knowledge Map

> **Read this first in every session.** Single source of truth for a 360° view of the project.
> Verified against the repo on **2026-07-14**. If the repo and this file disagree, trust the repo and update this file.
> Companion files: `CLAUDE.md` (legacy/long-form context — partly stale), `audits/` (daily reports + `audits/clearhead.in-audit/FULL-AUDIT-REPORT.md`, the 2026-07-14 full SEO/GEO/schema/content audit that most of this session's changes came from).

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

## 3. Site map (~42 HTML pages)

**Core**
- `index.html` — homepage. Hero (VJ photo, shown on mobile too) → "You might recognise this" → free-conversation CTA with testimonial → "How it works" 3-step strip → safe space → blog preview → about → testimonials → disclaimer → FAQ → contact (address, Maps iframe embed, WhatsApp, tel: link). Nav CTA on all pages: "Book a free call" → cal.com/vaibhavjain/30min. JSON-LD merges `Person` (`#vaibhav`), `LocalBusiness`/`ProfessionalService` (`#business`), and `WebSite` as cross-referenced `@id` entities to avoid duplicate/unlinked schema.
- `pricing.html` — coaching packages; Razorpay pay buttons on the three package cards; `Service.provider` references `#business` by `@id`.
- `coaching-andheri-west.html` — dedicated local-intent landing page (in-person sessions, Lokhandwala/Andheri West/Versova/Oshiwara), `BreadcrumbList`+`Service`+`FAQPage` schema, Maps embed. Added 2026-07-14 to close the "everything local is folded into the homepage" gap.
- `blog.html` — blog index, 5 category sections (AI & identity, loneliness & connection, clarity & being heard, pressure & burnout, money & mental health) + external cross-posts from vj9.org.
- `tools.html` — free-tools hub linking the 6 calculators.

**Blog posts (27, all indexed)** — organized into 5 clusters on `blog.html`. Notable/recent additions: `post-golden-handcuffs.html` (Nov 2025 Harris Poll Income Paradox Survey — high earners, golden-handcuffs/lifestyle-inflation mechanism, added 2026-07-14), `post-perfectionism.html`, `post-languishing.html`, `post-rest-burnout.html`, `post-overwork-brain.html`, `post-mattering-at-work.html`, `post-self-compassion-work-stress.html`. Every post has a `.post-author` bio card linking to `index.html#about`, an `Article`/`BreadcrumbList`/`FAQPage` JSON-LD set (author/publisher as `@id` references), a References section, and (where the underlying research supports it) an `Article.citation` array of real, dated, DOI-linked sources — never fabricated. See `blog.html` for the full list per cluster; the **Money & mental health** cluster currently has 2 posts (`post-money-anxiety.html`, `post-golden-handcuffs.html`), cross-linked to each other.

**Interactive tools (6 — each = `*.html` view + `*-engine.js` pure-math engine, DOM-decoupled, gated by a Netlify Form)**
- `runway.html` + `runway-engine.js` — **Abundance Runway Calculator** (7-step financial-runway sim).
- `bandwidth.html` + `bandwidth-engine.js` — **Cognitive Load & Bandwidth Index**.
- `career-friction.html` + `career-friction-engine.js` — **Career Friction & Alignment Audit** (surfaces "golden handcuffs" as one of 4 outcome quadrants — linked from `post-golden-handcuffs.html`).
- `ai-relevance.html` + `ai-relevance-engine.js` — **AI Automation & Relevance Index** ("will AI replace my job").
- `readiness.html` — **Self-Employment Readiness Index**.
- `still-on-your-list.html` — reflection tool (things you've been quietly carrying).
All 5 scored tools carry a scoring-methodology + "no data stored" fine-print line (added in the 2026-07-14 audit pass).

**Utility (not indexed)**
- `quiz.html` — fit quiz (disallowed in `robots.txt`, also carries `noindex`).
- `thank-you.html` — post-form redirect (disallowed in `robots.txt`, also carries `noindex`).
- `privacy-policy.html`, `terms.html` — legal (`noindex`, excluded from sitemap, not disallowed in `robots.txt` — deliberately crawlable-but-noindex so the tag is actually seen).

**Indexed in `sitemap.xml`:** all pages above except the 4 utility pages — currently 32 URLs, `lastmod` genuinely synced to edit dates.

> Run `ls post-*.html | wc -l` and diff against `blog.html`/`sitemap.xml`/`llms.txt` whenever adding a post — these three plus this file are the four places a new post must be wired into.

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
| `razorpay-webhook.js` | `POST /api/razorpay-webhook` | Verifies webhook secret, then on `payment.captured` sends a customer confirmation + internal (`hello@clearhead.in`) notification email via the Resend REST API (native `fetch`, zero new deps). Gracefully no-ops (logs, doesn't throw) if `RESEND_API_KEY`/`RAZORPAY_WEBHOOK_SECRET` aren't set yet — **dashboard setup required, see `SETUP-DASHBOARD-STEPS.md`.** |

**Flow:** pricing button → `create-order` → Razorpay modal → success → `verify-payment` → Cal.com booking shown → (once webhook secret + Resend key are set) confirmation email.

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
- **JSON-LD:** homepage merges `LocalBusiness`/`ProfessionalService` + `Person` (`#vaibhav`) + `WebSite` as cross-referenced `@id` entities (avoids duplicate/unlinked schema entities, which AI crawlers and Google penalize). Every blog post has `Article` (author/publisher as `@id` refs to the homepage entities, `publisher.logo`) + `BreadcrumbList` + `FAQPage` matching a visible on-page FAQ. Tools carry `SoftwareApplication`. `coaching-andheri-west.html` carries `Service` + `FAQPage`.
- **Citations:** where a post makes a research claim, it's backed by a real, dated, DOI/URL-linked source in `Article.citation` + a visible References section — verified via WebSearch/web_fetch before writing, never fabricated. Most recent: The Harris Poll's Nov 2025 Income Paradox Survey (`post-golden-handcuffs.html`).
- Self-hosted OG images: `og-ai-loneliness.jpg`, `og-new-city-loneliness.jpg` (plus `VJ.jpg` default); most posts use topic-matched Unsplash hero images (see `blog.html` for the full de-duplicated set of ~36 photo IDs in rotation — check for reuse before picking a new hero image for a new post).
- `robots.txt` disallows `/thank-you.html`, `/quiz.html`, `/api/`, `/.netlify/`. `llms.txt` lists all core pages, all 6 tools, and all posts by cluster — refresh it whenever a page is added.
- `netlify.toml` sets HSTS, a report-only CSP (verify clean in-browser before promoting to enforced `Content-Security-Policy`), and cache-control headers for CSS/JS/JPG/SVG.
- **GSC (sc-domain:clearhead.in):** new low-authority domain; pages were "Discovered — not indexed", manual indexing requested **2026-05-29**. Key lever: LinkedIn shares + 2–3 backlinks. Escalation timeline tracked by the monitor.

---

## 8. Automation

- **`clearhead-site-monitor`** (skill at `audits/clearhead-site-monitor.skill`) — daily ~8:00 AM. Checks page/redirect/image availability, the 3-step payment workflow, and SEO integrity; **auto-fixes + commits SEO drift**; reports anything needing a human. Reports → `audits/site-health-YYYY-MM-DD.md`.
- **`clearhead-seo-audit`** — every 3 days ~9:00 AM; deeper structured-data/keyword audit → `audits/seo-audit-*.md`.

---

## 9. Design tokens (`styles.css`) — v2 "deep-water" theme (2026-07-07)

```
--bg #f2f6f8 (cool mist) · --bg-alt #e8eff3 · --ink #101d26 · --ink-soft #3d4f5c · --line #d9e2e8
--accent #3053c4 (indigo blue) · --accent-deep #23409e · --accent-soft #e0e7f9
--ember #c2410c (warm CTA) · --ember-deep #9a3412 · --deep #081826 (night-navy bands)
--radius 14px · --maxw 1040px · body: "Figtree" · display: "Bricolage Grotesque" (Google Fonts @import in styles.css)
```
No beige or green anywhere (v2.1 removed all teal; exception: WhatsApp-green `.wa-btn` in contact). Primary CTAs are ember. Free-flowing layout: striped bands dissolved, hero navy has rounded bottom + gradient, contact band rounded top; safe-band is light with a navy quote card. v2.3 (2026-07-08): comic strip removed — "How it works" is now a numbered 3-step strip beside `how-conversation.jpg` (self-hosted); band padding tightened to `clamp(2.25rem, 5vw, 3.5rem)`; hero shows `VJ.jpg` (desktop + mobile). Scroll-reveal text animation: `anim.js` (loaded sitewide, `prefers-reduced-motion` safe).
Illustration assets: `peep-*.svg`, `mix-*.svg`, `happy.svg` (minified, currently UNUSED — peep thumbnails were rejected; thumbnails are curated Unsplash photos again, fully de-duplicated, topic-matched); comic characters are inline SVG on index.html; photos `coaching-early/mid/grad.jpg` (1168×784), `VJ.jpg` (1200×849).
`.post-author` bio-card and mobile touch-target CSS for `.cta-ghost` were added to `styles.css` in the 2026-07-14 audit pass.

---

## 10. Deploy & ops

```bash
cd ~/Documents/Zen
git add -A && git commit -m "msg" && git push origin main   # auto-deploys in ~30s

npx netlify dev          # local run incl. functions (reads .env)
```

**Working from a Cowork sandbox session:** git commits work fine (stale `.git/*.lock` files from the mounted-folder delete restriction are resolved once per session via the `mcp__cowork__allow_cowork_file_delete` tool — no need to ask the user to manually clear locks). **`git push` does not work from the sandbox** — there's no `git-credentials` available outside the mounted project folder, so pushes fail with `could not read Username for 'https://github.com'`. The correct pattern for a Cowork session: commit locally as you go, and tell the user at the end (or when a good batch is ready) that they need to run `git push origin main` themselves from their own machine to actually publish.

---

## 11. Known issues / open TODOs

| Issue | Severity | Status |
|---|---|---|
| No payment-confirmation email | Done (code) / **needs dashboard action** | `razorpay-webhook.js` now sends a customer confirmation + internal notification via Resend on `payment.captured` (native `fetch`, no new npm dep). Inert until `RESEND_API_KEY` is set — see **`SETUP-DASHBOARD-STEPS.md`** §1. |
| Form email notifications off (all 6 forms) | **Needs dashboard action** | Netlify-side setting, not fixable in code — see `SETUP-DASHBOARD-STEPS.md` §3 for the exact 6-form checklist. |
| `RAZORPAY_WEBHOOK_SECRET` may be unset | **Needs dashboard action** | Confirmed unset locally as of 2026-07-14. Webhook fails closed (500) until set — see `SETUP-DASHBOARD-STEPS.md` §2 for the Razorpay-side steps. |
| Pages not yet indexed by Google | Medium | Requested 2026-05-29; needs backlinks + mentions (LinkedIn is a forbidden channel for this practice — see `growth/` visibility-OS skill). |
| Zero backlinks | Medium | First `clearhead-authority-engine` run (2026-07-14) drafted 2 pitches to `growth/outbox/` (a direct pitch to a CNBC India correspondent already covering the AI/IT-jobs beat, and a guest-essay pitch to YourStory built on the new golden-handcuffs post) — both awaiting a human send. Also surfaced two unclaimed directory profiles (Board Infinity, ICF Mumbai Coach Directory) worth confirming in a future run. `growth/` is gitignored by design; check it locally, not in the repo. |
| Pressure & Burnout pillar page | Medium | Cluster audit (2026-07-14) suggested a standalone hub page for this 13-post cluster instead of everything being flat blog posts. Deliberately deferred this session to protect quality — flagged as follow-up. |
| Mid-career-identity content | Medium | Cluster audit flagged this as a real, underserved search intent with no dedicated content yet. Deferred, follow-up. |
| Money & mental health cluster | Low | Now has 2 posts (was 1, effectively orphaned) as of 2026-07-14. Audit suggested a 3rd angle (e.g. "money as scorekeeping/status" or dual-income-household anxiety) — optional next addition. |
| `quiz.html` / `thank-you.html` both `Disallow` in robots.txt AND carry `noindex` | Low | Redundant (a robots.txt disallow prevents Googlebot from ever seeing the noindex tag), not broken. Both pages are correctly kept out of the index either way. Not worth "fixing" without deciding which single mechanism to standardize on — flag to user if it matters. |
| Razorpay checkout script not deferred | Low (intentional) | Left as-is for payment-flow reliability; skipped in the 2026-07-14 performance pass on purpose. |
| CSS minification | Low | Skipped — single global stylesheet, low payoff for the added build complexity on a no-build-step site. |

---

## 12. Accounts & contacts

Owner **Vaibhav Jain** · email **hello@clearhead.in** · WhatsApp **+91-90289-02948** · office **Lokhandwala Complex, Andheri West, Mumbai 400053** · hours Mon–Sat 09:00–19:00 IST · Cal.com **vaibhavjain** · GitHub **vaibhav-labs/clearhead** · Netlify **effervescent-meerkat-1f9826** · GSC **sc-domain:clearhead.in** · geo 19.1405612, 72.8246929.

---

## 13. Conventions for working here

- Edit HTML/CSS/JS directly; no build. Keep new tools to the `*.html` + `*-engine.js` (pure math, DOM-free, `window`-exported) pattern, gated by a new Netlify Form.
- Match the design tokens and calm brand voice.
- Any new indexable page: add to `sitemap.xml`, set canonical + OG + JSON-LD, add a clean-URL 301 to `netlify.toml`.
- Keep this file and `CLAUDE.md` in sync after structural changes.
