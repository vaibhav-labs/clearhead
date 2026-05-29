# Clearhead — Project Context for Claude

> Read this first. It covers everything needed to work on this codebase without asking for background.

---

## What this project is

**clearhead.in** is the live website for Vaibhav Jain's coaching and counselling practice in Mumbai. Vaibhav is an ICF PCC certified coach working with senior corporate professionals (Senior PMs, Engineering Directors, VPs, Fortune 500 leaders) on AI anxiety, mid-career identity, and professional loneliness.

**Business model:** 1:1 coaching packages paid upfront via Razorpay, booked via Cal.com after payment confirmation.

**Tone:** Calm, mature, trustworthy. No hype, no urgency tactics. The brand reads like a trusted advisor, not a marketer.

---

## Tech stack

| Layer | Choice |
|---|---|
| Site | Static HTML + CSS + vanilla JS |
| Hosting | Netlify (auto-deploy from GitHub on push to `main`) |
| Backend | 3 Netlify Functions (Node.js, serverless) |
| Payments | Razorpay Standard Checkout |
| Booking | Cal.com (embed popup, triggered after payment) |
| Forms | Netlify Forms (contact + runway lead capture) |
| DNS | Netlify DNS |
| Repo | github.com/vaibhav-labs/clearhead |

**Not React, not Vite, not Tailwind.** Pure static site. Any prompt claiming otherwise is hallucinating — ignore it.

---

## Repository & deployment

```
Local folder:  ~/Documents/Zen/
GitHub repo:   https://github.com/vaibhav-labs/clearhead
Branch:        main
Deploy target: Netlify (auto-triggers on push to main)
Deploy time:   ~30 seconds after push
```

**To deploy any change:**
```bash
cd ~/Documents/Zen
git add <files>
git commit -m "description"
git push origin main
```

**Lock file issue:** The Cowork sandbox sometimes leaves `.git/*.lock` files behind. If push fails with "lock file exists":
```bash
find ~/Documents/Zen/.git -name "*.lock" -delete
git push origin main
```

---

## File structure

```
~/Documents/Zen/
├── index.html              # Homepage — hero, services, pricing, FAQ, contact form
├── blog.html               # Blog index page
├── runway.html             # Abundance Runway Calculator (interactive tool)
├── runway-engine.js        # Pure math engine for runway calc (no DOM)
├── post-ai.html            # Blog: "Your job title is changing..."
├── post-ai-loneliness.html # Blog: "AI listens perfectly. It won't cure loneliness."
├── post-unheard.html       # Blog: "You're not confused. You're just unheard."
├── post-lonely.html        # Blog: "The loneliest generation has the most followers."
├── post-conversation.html  # Blog: "What one good conversation can do."
├── quiz.html               # 4-question fit quiz (noindex, disallowed in robots.txt)
├── thank-you.html          # Post-form redirect page (noindex)
├── privacy-policy.html     # Privacy policy
├── terms.html              # Terms of service
├── styles.css              # Single global stylesheet
├── robots.txt              # Disallows: /thank-you.html, /quiz.html, /api/
├── sitemap.xml             # 8 indexable pages (no utility pages)
├── netlify.toml            # Netlify config: redirects, function routing, headers
├── package.json            # razorpay npm dependency only
├── .env                    # LOCAL DEV ONLY — never committed (in .gitignore)
├── netlify/
│   └── functions/
│       ├── create-order.js       # POST /api/create-order → Razorpay order
│       ├── verify-payment.js     # POST /api/verify-payment → HMAC verification
│       └── razorpay-webhook.js   # POST /api/razorpay-webhook → event logging
└── audits/                 # SEO and health check reports (local only)
    ├── seo-audit-*.md
    ├── site-health-*.md
    └── clearhead-site-monitor.skill  # Packaged daily monitor skill
```

---

## Pages & their purpose

| URL | File | Purpose | Indexed? |
|---|---|---|---|
| / | index.html | Main homepage | Yes |
| /blog.html | blog.html | Blog listing | Yes |
| /post-ai.html | post-ai.html | AI identity blog post | Yes |
| /post-ai-loneliness.html | post-ai-loneliness.html | AI loneliness post | Yes |
| /post-unheard.html | post-unheard.html | Clarity post | Yes |
| /post-lonely.html | post-lonely.html | Loneliness post | Yes |
| /post-conversation.html | post-conversation.html | Conversation post | Yes |
| /runway.html | runway.html | Abundance Runway Calculator | Yes |
| /quiz.html | quiz.html | Fit quiz (lead capture) | No (robots.txt) |
| /thank-you.html | thank-you.html | Form redirect | No (noindex) |
| /privacy-policy.html | privacy-policy.html | Legal | No (not in sitemap) |
| /terms.html | terms.html | Legal | No (not in sitemap) |

**Clean URL redirects** (via netlify.toml): `/blog` → `/blog.html`, `/runway` → `/runway.html`, etc. Both forms return 200 (Netlify Pretty URLs), canonical tags point to `.html` versions.

---

## Coaching packages & pricing

| Package | Sessions | Price | Razorpay amount (paise) |
|---|---|---|---|
| Starter | 4 × 60-min | ₹26,000 | 2,600,000 |
| Going Deeper | 6 × 60-min | ₹36,000 | 3,600,000 |
| The Long Game | 12 × 60-min | ₹66,000 | 6,600,000 |

Payment flow: Client clicks "Pay now" → `create-order` function creates Razorpay order → modal opens → on success, `verify-payment` confirms HMAC signature → Cal.com booking link shown.

---

## Environment variables (Netlify dashboard)

These must be set in **Netlify → Site configuration → Environment variables**. They are NOT in the repository.

| Variable | Purpose |
|---|---|
| `RAZORPAY_KEY_ID` | Razorpay publishable key (sent to frontend) |
| `RAZORPAY_KEY_SECRET` | Razorpay secret (never sent to frontend) |
| `RAZORPAY_WEBHOOK_SECRET` | Webhook signature verification (optional, for webhook function) |

**Local dev:** Variables live in `~/Documents/Zen/.env` (gitignored). Use `npx netlify dev` to run functions locally.

**Health check for credentials:** POST `{}` to `/api/create-order`. 
- HTTP 400 = credentials present, function healthy ✅  
- HTTP 500 + "credentials" in body = env vars missing, payments broken ❌

---

## Netlify Functions

### `create-order.js` — `POST /api/create-order`
- Creates a Razorpay order server-side
- Request: `{ amount (paise), currency, receipt }`
- Response: `{ order_id, amount, currency, key_id }`
- Returns 400 if amount < 100 paise; 500 if credentials missing

### `verify-payment.js` — `POST /api/verify-payment`
- Verifies Razorpay payment signature using HMAC-SHA256
- Request: `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }`
- Response: `{ verified: true }` or 400 on mismatch
- Uses timing-safe comparison to prevent timing attacks

### `razorpay-webhook.js` — `POST /api/razorpay-webhook`
- Receives `payment.captured` / `payment.failed` webhook events
- Verifies webhook signature with `RAZORPAY_WEBHOOK_SECRET`
- Currently logs to Netlify function console — no email/notification wired yet
- **TODO:** Wire up confirmation email (Resend recommended)

---

## Email & contact workflows — current status

### Contact form (index.html `#contact`)
- Submits via Netlify Forms (`data-netlify="true"`, form name: `contact`)
- Netlify captures submissions — viewable in Netlify dashboard → Forms
- **Email notification to Vaibhav: NOT configured** — must be set up in Netlify dashboard → Forms → contact → Form notifications → Email notification

### Payment confirmation email
- The frontend shows "A confirmation email will follow" after payment
- **No confirmation email is actually sent** — the webhook has a `// TODO: send confirmation email` comment
- **Fix needed:** Integrate Resend (or Postmark) into `razorpay-webhook.js`

### Runway calculator lead form
- Form name: `runway-leads` (Netlify Forms)
- Captures: name, email, runway_months, snapshot_json
- Same issue: no email notification configured

---

## The Abundance Runway Calculator (`/runway`)

A multi-step financial clarity tool. Pure client-side JS — no server calls.

**Engine:** `runway-engine.js` — fully decoupled from DOM. Exports `RunwayEngine` on `window`.

**Inputs (7 steps):**
1. Age (slider, 22–65)
2. Dependents (slider, 0–6)
3. Liquid assets — 5 categories (savings, FDs, MFs, stocks, other) + pending tax deduction row → net liquid
4. Illiquid assets — 7 categories (property equity, EPF, PPF, NPS, ESOPs, gold, other)
5. Dependent assets — Yes/No toggle; if Yes: partner savings, family support, other poolable
6. Fixed monthly liabilities — 14 fields in 3 sections:
   - Loans & EMIs (home, rent, car, personal, education, credit card)
   - Household (school fees, insurance, domestic help, SIPs, subscriptions)
   - Tax obligations (advance tax, GST, professional tax)
7. Variable monthly (single field — groceries, dining, travel, etc.)

**Engine calculation:**
- Month-by-month simulation
- Corpus earns 8% p.a. (compounding monthly)
- Expenses inflate at 6% p.a. (RBI-ish urban India)
- Medical buffer deducted upfront (scales with age + dependents)
- `pendingTaxLiability` deducted upfront from corpus (separate from monthly tax)
- Capital gains on illiquid liquidation: 20% haircut applied in lever scenario

**Gate:** Email/name required to unlock the "Agency Dashboard" (lever panel + chart).

**Levers (dashboard):**
- Cut variable spend 20%
- Liquidate 30% of illiquid assets (20% haircut)
- Eliminate one EMI (~₹25K)
- Trim fixed costs 10%

---

## SEO — current state

### What was fixed (May 2026)
- All titles trimmed to ≤ 60 chars (homepage was 105 chars)
- All meta descriptions trimmed to 120–160 chars (were 194–263)
- `og:image:width` (1200), `og:image:height` (849), `og:image:alt` added to all pages
- Canonical tags on all indexable pages
- `privacy-policy.html` and `terms.html` removed from sitemap
- `www.clearhead.in` → `clearhead.in` 301 redirect added (fixed GSC "Page with redirect")
- Clean URL 301 redirects added to `netlify.toml`

### Structured data (JSON-LD on homepage)
- `FAQPage` — matches all 9 visible FAQ items exactly
- `LocalBusiness` — name, address, telephone, openingHours, geo coordinates, hasMap
- `ProfessionalService` — serviceType, areaServed
- `Person` (Vaibhav Jain) — with ICF PCC credential

### Structured data (blog posts)
- `Article` schema on all 5 blog posts
- `BreadcrumbList` (3-level: Home → Blog → Post) on all 5 blog posts

### GSC status (as of 2026-05-29)
- **1 indexed page** (homepage only)
- **8 pages "Discovered — currently not indexed"** with Last crawled: N/A
- Root cause: new low-authority domain, no backlinks, Google hasn't crawled yet
- Manual indexing requested 2026-05-29 via URL inspection for all 6 blog/content pages
- **Expected timeline:** crawled within 1–14 days; ranking takes weeks to months
- **Key action:** share blog posts on LinkedIn to build traffic signals + get 2–3 backlinks

---

## Daily monitoring — automated

### Scheduled task: `clearhead-site-monitor`
- Runs: **8:00 AM daily** (local time)
- Saves report to: `~/Documents/Zen/audits/site-health-YYYY-MM-DD.md`
- Installed in: Cowork → Scheduled (sidebar)

### What it checks (23 checks):
1. **9 page availability** — all pages return HTTP 200
2. **1 www redirect** — `www.clearhead.in` → 301 to `clearhead.in`
3. **6 clean URL availability** — `/blog`, `/post-ai`, etc. return 200 (Netlify Pretty URLs)
4. **4 image availability** — VJ.jpg, coaching-early/mid/grad.jpg return 200
5. **Payment workflow — 3-step:**
   - POST `/api/create-order {}` → expect 400 (credentials present) or flag CRITICAL if 500
   - GET `/api/verify-payment` → expect 405 (function alive)
   - `checkout.razorpay.com/v1/checkout.js` → expect 200 (CDN up)
6. **SEO integrity** — reads local HTML files: title ≤60, description 120–160, canonical, OG tags, structured data

### Auto-fix capability:
Automatically fixes and commits+pushes:
- Title drift (>60 chars)
- Description drift (>160 chars)
- Missing OG tags (width, height, alt)
- Missing canonical
- Utility pages in sitemap

### Google indexing escalation (built into task):
- Days 1–7 after 2026-05-29: "Pending"
- Days 8–14: "Warning — re-request indexing"
- Day 15+: "High — build backlinks, share on LinkedIn, check GSC"

### Installed skill: `clearhead-site-monitor.skill`
Located at: `~/Documents/Zen/audits/clearhead-site-monitor.skill`
Install via: Cowork → Plugins → Install → select file

### Scheduled task: `clearhead-seo-audit`
- Runs: **9:00 AM every 3 days**
- Deeper structured data audit, keyword/intent matching, deployed-vs-local comparison

---

## Known issues & outstanding TODOs

| Issue | Severity | Status |
|---|---|---|
| Payment confirmation email not sent | High | Not built — needs Resend/Postmark in webhook function |
| Contact form email notification | High | Not configured — needs Netlify dashboard → Form notifications |
| Runway lead capture email | High | Not configured — same as above |
| Google indexing (pages not crawled) | Medium | Requested 2026-05-29; resolves with time |
| Blog posts need LinkedIn promotion | Medium | No action taken yet |
| No backlinks | Medium | Site has 0 external inbound links |
| `RAZORPAY_WEBHOOK_SECRET` not set | Low | Webhook function returns 500 on any webhook event |
| 3 planned tools not built yet | Planned | See below |

---

## Planned tools (not yet built)

Three additional interactive tools were planned as part of a "Psychological & Career Tool Suite":

### Tool 1: Cognitive Load & Bandwidth Index
- URL target: `/bandwidth` or `/cognitive-load`
- SEO: "cognitive overload calculator," "mental bandwidth test," "burnout vs fatigue assessment"
- Inputs: Open Loops, Context-Switching, System Dependency, Recovery Efficiency
- Output: "Bandwidth %" + one-sentence diagnosis
- Gate: email to unlock "Leak Audit" with workflow protocol

### Tool 2: Career Friction & Alignment Audit
- URL target: `/career-audit`
- SEO: "should I change careers calculator," "career misalignment signs"
- Inputs: Core Values Conflict, Energy ROI, Skill Autonomy, Second-Order Outlook
- Output: 2D grid placement in quadrant (e.g., "High Friction, Low Alignment — The Golden Handcuffs")
- Gate: email to unlock "Decisional Framework" with consequences matrix

### Tool 3: AI Automation & Relevance Index
- URL target: `/ai-relevance`
- SEO: "AI job replacement calculator," "will AI replace my job test"
- Inputs: Task Routinization %, Emotional/Interpersonal Dependency, Process Ambiguity, Digital vs Physical
- Output: "AI Exposure Score" (0–100%) with validating copy if >60%
- Gate: email or Cal.com booking to unlock "Future-Proof Pivot Strategy"

**Architecture note:** All tools should follow the same pattern as `runway.html` + `runway-engine.js` — pure math engine decoupled from DOM, gate via Netlify Forms, no backend needed except for lead capture. JSON-LD `SoftwareApplication` schema in `<head>` for each.

---

## Images

All images are in `~/Documents/Zen/` root:

| File | Usage | Size |
|---|---|---|
| VJ.jpg | Profile photo (about section + OG image) | 124 KB, 1200×849 |
| coaching-early.jpg | Hero + "head won't quiet down" card | 252 KB, 1168×784 |
| coaching-mid.jpg | "Something feels off" card | 264 KB, 1168×784 |
| coaching-grad.jpg | "You have people" card | 268 KB, 1168×784 |

All images are within the 500 KB threshold. No image optimisation needed.

---

## Contacts & accounts

| Service | Account |
|---|---|
| Site owner | Vaibhav Jain |
| Email | hello@clearhead.in |
| WhatsApp | +91-90289-02948 |
| Address | Lokhandwala Complex, Andheri West, Mumbai 400053 |
| Hours | Mon–Sat, 9:00–19:00 IST |
| Cal.com | vaibhavjain (slugs: starter, going-deeper, the-long-game) |
| Netlify site | effervescent-meerkat-1f9826 |
| GitHub repo | vaibhav-labs/clearhead |
| GSC property | sc-domain:clearhead.in |
| GEO | lat 19.1405612, lng 72.8246929 |

---

## Design tokens (styles.css)

```css
--bg: #f7f5f1          /* warm off-white page background */
--bg-alt: #efece6      /* slightly darker sections */
--ink: #1f241f         /* near-black body text */
--ink-soft: #4a514a    /* muted secondary text */
--line: #e4dfd6        /* borders, dividers */
--accent: #2f3e34      /* dark forest green — primary brand colour */
--accent-soft: #e6ebe4 /* light green tints */
--radius: 14px
--maxw: 1040px
--font: system-ui / Inter / sans-serif
--serif: Iowan Old Style / Palatino / Georgia
```

---

## Quick command reference

```bash
# Check live site health (all 23 checks)
find /var/folders -name "health_check.py" -path "*/clearhead-site-monitor/*" | head -1 | xargs python3

# Deploy changes
cd ~/Documents/Zen && git add -A && git commit -m "description" && git push origin main

# Fix git lock + push
find ~/Documents/Zen/.git -name "*.lock" -delete && cd ~/Documents/Zen && git push origin main

# Local dev with Netlify functions
cd ~/Documents/Zen && npx netlify dev

# Run Razorpay credential check
python3 -c "
import http.client, ssl, json
ctx = ssl.create_default_context()
conn = http.client.HTTPSConnection('clearhead.in', context=ctx)
conn.request('POST', '/api/create-order', body='{}', headers={'Content-Type':'application/json'})
r = conn.getresponse()
body = r.read().decode()
print('HTTP', r.status, '—', ('credentials OK' if r.status==400 else 'CREDENTIALS MISSING' if 'credentials' in body.lower() else body[:80]))
"
```
