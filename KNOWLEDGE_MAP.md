# Clearhead — Project Knowledge Map

> **Version v2.5** · full rewrite 2026-10-05 · refreshed every Monday by a scheduled routine · last weekly run 2026-10-26 (AUTO blocks regenerated the same day once the refresh script could be read again, see TOOL-1 in §15) · the v2.3 workflow fixes were committed on 2026-10-26 as `6217801` (COMMIT-1 resolved) · the owner's changes of 2026-10-26 (free call now 15 minutes, no WhatsApp support, homepage headline, enforced security policy, repo-move preparation) are NOT yet committed, see §20 v2.5 · what changed and when: §20 (Version log).
> **Read this first in every session.** It is the single source of truth for the project. If the repo or the live site disagrees with this file, trust them and fix this file.
> Parts between `<!-- AUTO:NAME:BEGIN -->` and `<!-- AUTO:NAME:END -->` are machine-written by `audits/knowledge_map_refresh.py`; everything else is hand-curated and edited in place.
> Previous versions of this file live in git history (`git log -- KNOWLEDGE_MAP.md`) and in the §20 version log. Never keep copies as separate files.

---

## 0. How this map is used and maintained

### 0.1 File policy (owner rule, 2026-10-05)

**Do not create new files unless the owner explicitly asks for one.** Every recurring job updates one of the living files below, in place, and records each new version as a new dated entry or row inside that file. This binds scheduled routines too: no more `audits/site-health-YYYY-MM-DD.md`, no `KNOWLEDGE_MAP-v2.md`, no dated copies.

| Living file | What it holds | Written by | Cadence |
|---|---|---|---|
| `KNOWLEDGE_MAP.md` (this file) | Whole-project map, open-issues register, version log, metrics history | weekly routine (see 13.1) + any session that changes structure | weekly (Mondays) |
| `audits/SITE_HEALTH_LOG.md` | Daily health log: status board, 30-day trend table, newest-first entries, indexing tracker line | `Clearhead site monitor` routine | daily |
| `audits/knowledge_map_refresh.py` | Fact-gatherer. `--apply` rewrites only the AUTO blocks of this file | run by the weekly routine | weekly |
| `CLAUDE.md` | Short orientation + the file policy, for every future session | rarely | when the registry changes |
| `growth/content-queue.md`, `growth/outreach-log.md`, `growth/design-log.md` | State files owned by the growth skills | those skills | per run |
| `audits/` dated reports (`site-health-*.md`, `seo-audit-*.md`, ...) and `growth/reports/*` | **Read-only history.** Growth skills still write dated reports to `growth/reports/` by their own SKILL.md; the owner has not yet asked to change that (see 15, DOC-2) | skills | legacy |

### 0.2 Weekly update procedure (what the Monday routine does)

1. Run `cd $HOME/mnt/Zen && PYTHONDONTWRITEBYTECODE=1 python3 -B audits/knowledge_map_refresh.py --apply`. It rebuilds the AUTO blocks (§1, 5.1, 5.2, 10.5, 14) and prints a delta (added/removed pages and posts, commits since the last entry, integrity findings).
2. Read the last 7 days of `audits/SITE_HEALTH_LOG.md`, the top of `growth/content-queue.md`, `growth/outreach-log.md`, the newest `growth/reports/*`, and `git --no-optional-locks log`.
3. Re-verify what drifts: the file fingerprints in §1 against the previous version-log entry (a changed `netlify.toml`, function file or `styles.css` means re-read it), prices on `pricing.html`, the form list, the live probes in 13.5 (webhook secret status especially), the scheduled-task list (`list_triggers`), and any new GSC export dropped in the folder.
4. Edit the hand-written sections **in place, only where facts changed**. Keep headings and numbering stable. Update the open-issues register (§15) with dates; add a row to the indexing tracker (10.6).
5. Add a new `### vX.Y — YYYY-MM-DD` entry at the **top** of §20 and a row to the metrics table. Routine weekly run = minor bump (v2.1, v2.2 ...); structural rewrite = major bump. Update the Version line at the top of the file.
6. Do not commit or push. The file is tracked in git; whoever next runs `git add -A` carries it along (it is hidden from the public by `netlify.toml`).
7. Notify the owner only when something needs them: a new High/Critical integrity finding, an exposure or secret problem, a decision that is blocking, or the run could not finish. Otherwise stay quiet.

### 0.3 Safety rules for any automated session in this folder

- Never read secret **values**. `.env` may be listed for variable names only. Never print tokens.
- Use `git --no-optional-locks ...` for every read-only git command. Plain `git status` in the device sandbox takes `.git/index.lock` and cannot delete it afterwards (deletes are blocked), which then blocks every commit until the owner removes it.
- Never delete, move or overwrite owner files without being asked. Scheduled sessions cannot approve deletions; report instead.
- Writes outside the living files above need the owner's explicit request.
- Git pushes are impossible from automation (no GitHub credentials). Commit only when a skill's own rules allow it; tell the owner to push.
- Never use LinkedIn as a recommendation or a channel (visibility-OS doctrine, see 10.8).

---

## 1. Snapshot

<!-- AUTO:SNAPSHOT:BEGIN -->
_(auto-generated by `audits/knowledge_map_refresh.py`; do not hand-edit)_

| Fact | Value |
|---|---|
| Refreshed | 2026-10-26 (script: audits/knowledge_map_refresh.py) |
| Repo HEAD | `6217801` 2026-10-26: content: remove phone and WhatsApp links; server-side package pricing; CSP report endpoint |
| Branch / commits | main / 105 commits total; vs origin/main: 0 behind, 0 ahead |
| Working tree | 79 uncommitted path(s); stale locks: none |
| HTML files | 79 total: 61 posts, 6 tools, 5 core, 7 utility/other |
| Indexable pages | 72 (noindex: 404.html, call.html, onboard.html, privacy-policy.html, quiz.html, terms.html, thank-you.html) |
| sitemap.xml / llms.txt | 72 URLs / 73 URLs |
| Blog clusters | Clarity & being heard: 3; Loneliness & connection: 8; AI, work & identity: 12; Pressure & burnout: 32; Money & mental health: 6 |
| Post words | 135,237 total, 2217 average |
| Newest posts | post-coach-vs-therapist-vs-counsellor.html (2026-10-10), post-is-coaching-worth-it-senior-leaders.html (2026-10-10), post-work-stress-counselling-mumbai.html (2026-10-10) |
| Freshness SLA (90d) | 11 past SLA, 9 due within 14 days |
| Forms in HTML | 10: ai-relevance-leads, bandwidth-leads, call-screening, career-leads, client-onboarding, contact, payment-record, quiz-enquiry, readiness-leads, runway-leads |
| Internal links | 0 broken |
| robots.txt Disallow | /thank-you.html, /quiz.html, /api/, /.netlify/ |
| Redirect rules (netlify.toml) | 16; headers set: Cache-Control, Content-Security-Policy, Permissions-Policy, Referrer-Policy, Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options; CSP: enforced |
| Local .env variable NAMES | RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET; not in local .env: RAZORPAY_WEBHOOK_SECRET, RESEND_API_KEY, RESEND_FROM_EMAIL, INTERNAL_NOTIFY_EMAIL |
| File fingerprints (sha256/8) | netlify.toml=9be9aa08, pricing.html=1024a9aa, quiz.html=1b415a4e, call.html=dcd8e7b6, styles.css=a339a369, analytics.js=803f89aa, anim.js=fed0ab96, package.json=5d2d9cd2, create-order.js=24abbf3d, verify-payment.js=7ed25ccc, razorpay-webhook.js=be297a7a, robots.txt=57d1f013, llms.txt=b8a0a5a7 |
| Changes since previous refresh | no pages or posts added/removed |
<!-- AUTO:SNAPSHOT:END -->

---

## 2. The business

**Clearhead** is the private coaching and counselling practice of **Vaibhav**, an **ICF PCC** (Professional Certified Coach), based in Lokhandwala Complex, Andheri West, Mumbai. Tagline on the homepage H1: *"Someone to actually think with."*

- **Who it serves:** senior working professionals (VPs, directors, senior PMs and engineers, Fortune 500 leaders) dealing with AI-driven job anxiety, mid-career identity shifts, workplace loneliness, burnout and overwork, and money-and-mental-health tension. 1:1 only. Online across India and internationally; in person at Lokhandwala Complex (Andheri, Versova, Oshiwara, Lokhandwala).
- **Offer ladder:** free 15-minute conversation (since 2026-10-26; the Cal.com slug in the code is still `30min`, and the owner must shorten that Cal.com event to 15 minutes, CAL-1) -> one of three paid packages (all 60-minute sessions, 1:1) -> Cal.com slot picked right after payment.
- **Tone and brand voice:** calm, mature, trustworthy. No hype, no urgency mechanics, no sales pressure. Confidentiality is part of the promise ("Names withheld. That's the rule here"). The site states plainly that it is coaching and counselling, **not medical or emergency care**.
- **Entity and naming risk:** the word "Clearhead" collides with unrelated, better-established companies (for example a mental-health EAP platform). "Vaibhav, ICF PCC" is the search identity (homepage eyebrow carries locality and "Executive & Life Coach" since 2026-07-14). **Owner instruction, 2026-10-11: use first name only, "Vaibhav," everywhere on the site — surname removed site-wide** (hero, about, bylines, footer, page titles, meta/OG tags, schema.org Person.name, Terms, Privacy Policy, the onboarding agreement, llms.txt). This reverses the earlier "full name is more defensible for search" rationale above; if full-name author signals are wanted back for E-E-A-T on blog posts specifically, that would need to be raised again deliberately.
- **Founder's other property:** vj9.org (Substack, "The other perspective"). It is the only `Person.sameAs` link. Selected vj9 essays are cross-listed on `blog.html`.
- **Social proof:** a homepage testimonials section with permission-based quotes; names withheld. The founder photo was removed from all on-site display on 2026-09-15; the Clearhead logo is now the social-share thumbnail and schema logo.

### Packages (pricing.html; Razorpay `data-amount` is the full package in paise)

| Package | Sessions | Per session | Total | `data-plan` | `data-amount` | Cal slug after payment |
|---|---|---|---|---|---|---|
| Starter | 4 x 60 min, one every 2 to 3 weeks | ₹6,500 | ₹26,000 | `starter` | `2600000` | `starter` |
| Going Deeper ("Most chosen") | 6 x 60 min, about every 3 weeks | ₹6,000 | ₹36,000 | `going-deeper` | `3600000` | `going-deeper` |
| The Long Game | 12 x 60 min, about every 3 weeks | ₹5,500 | ₹66,000 | `long-game` | `6600000` | `the-long-game` |

Every package is delivered online or in person (Lokhandwala) and includes written notes on request. There is no WhatsApp or other support between sessions (owner decision 2026-10-26). No phone or WhatsApp number is published on the site (owner decision 2026-10-25). The old promise "WhatsApp support between sessions" was removed from `pricing.html` (the three package lists), the homepage package line, the onboarding agreement and one post, so the agreement is now silent about contact between sessions (`agreement_version` `v2-2026-10-26`; owner review needed, REVIEW-1; OWN-1 resolved). Wording on the pricing page, in `terms.html` and in the onboarding agreement (aligned in the 2026-10-10 commit and re-checked 2026-10-25): payment is in full, in one payment, before the first session, and part payments and instalments are not offered (the older "two halves" wording is gone); a package can be paused once for up to 30 days; cancellations before the second session are refunded in full; no refund after the second session. The free 15-minute conversation is always offered first.

### Safety and clinical boundary (do not weaken)

Quiz and pre-call form screen out crisis and clinical cases before booking. Crisis numbers shown on those pages: Tele-MANAS **14416** (also dialled as 1800-891-4416), **112**, 1860-266-2345, 9152987821, plus a NIMHANS link. Blog posts that touch distress route to Tele-MANAS 14416 only (the long form is printed inconsistently by official sources). Never add prices, countdowns or scarcity to any screening or crisis surface. As of 2026-10-25 Tele-MANAS 14416 and 112 also appear on the homepage (disclaimer band and contact section), `thank-you.html`, `call.html`, `onboard.html` and `quiz.html`; `call.html` and `onboard.html` show them instantly, before their answers are saved.

---

## 3. Funnel and conversion architecture

```
discovery: Google, AI answers (llms.txt, citations), blog posts, 6 free tools, vj9.org
   |
   v
"Book a free call"  (nav CTA on every page, plus in-page CTAs, all -> quiz.html; gating live since 2026-09-15)
   |
   v
quiz.html  "Is this the right fit?"  noindex, disallowed in robots.txt. 4 questions:
   Q1 what you are looking for (a think-partner / b honest advice / c medical advice or clinical support / d not sure)
   Q2 how you would feel if something unexpected came up mid-session (c = "rather stay in control, not ready to go deep")
   Q3 where you would want to meet (c = somewhere informal such as a cafe or park; the practice needs a private setting)
   Q4 where you are right now (a managing fine / b genuinely hard / c may need clinical treatment / d already referred to a therapist or psychiatrist / e crisis)
   |-- crisis   (Q4 = e)                          -> crisis resources, no booking
   |-- medical  (Q1 = c, or Q4 = c or d)          -> pointed to clinical care instead of coaching
   |-- privacy  (Q3 = c)                          -> explains the setting needs to be private
   |-- notready (Q2 = c)                          -> not-ready message
   `-- good fit (everything else; Q1 = b also sees an honesty note that this is not advice-giving)
         primary CTA: "Book the free 15-minute call" -> call.html?via=quiz&topic=<quiz summary>  (GATED 2026-10-05; was a direct Cal.com link — that was the booking loophole)
         optional:    "Prefer to talk first? Leave your details" -> Netlify form quiz-enquiry
   |
   v
call.html  "Before we talk"  9-step pre-call screening, noindex,nofollow, Netlify form call-screening
   steps: name, email, phone number (asked as "Your phone number?"; the form field is still named `whatsapp`), what you hope for, treated for a condition?, self-harm thoughts (14 days), in crisis now?, optional note, 18+ consent
   outcomes: crisis (exit to resources) · clinical (under care or wants medical advice -> email to Vaibhav) · good
   every response, including screened-out ones, is POSTed to Netlify Forms so Vaibhav can follow up (two attempts; nobody is held up: crisis and clinical exits show at once, a good fit waits a few seconds at most, and if both attempts fail the Cal.com notes say "NOT saved to my inbox" and a `lead_save_failed` event is sent when analytics is allowed)
   good -> on the live domain auto-redirects (~0.9 s) to cal.com/vaibhavjain/<slug>?name=&email=&notes=  (default slug 30min, which is the free 15-minute event once the owner shortens it in Cal.com, CAL-1; a whitelisted `cal` param — 30min/starter/going-deeper/the-long-game — overrides it for paid bookings; notes carry the screening summary)
   |
   v
free 15-minute conversation  ->  pricing.html  ->  create-order (price set on the server from the plan name)  ->  Razorpay Standard Checkout  ->  verify-payment  ->  "Payment received" panel (record kept 45 days in localStorage `ch_paid_v1`, so a refresh resumes here)  ->  call.html?via=paid-<plan>&cal=<plan slug>&pid=<payment id>  (GATED 2026-10-05; paid buyers pass the screening form, which then books the package slot; the Razorpay webhook emails the same link)
   and, as a follow-up rather than a gate, onboard.html (client agreement + intake, Netlify form `client-onboarding`). The success panel offers it unless this browser has already signed (`ch_onboarded_v1`); no other page links to it, so Vaibhav has to send the link after the free call (ONB-1).
```

Other entry points: homepage contact form (`contact`), the five scored tool pages (each with a lead form; `still-on-your-list.html` has none), the call invite block at the end of every post (since 2026-10-25 it says "A few quick questions first, then you pick a time"; it used to promise "No forms", which was false), and the `quiz.html` link on `pricing.html` ("take the 4-question fit quiz"). The `via` query parameter on `call.html` (e.g. `?via=quiz`, `?via=ai-relevance`, `?via=readiness`, `?via=paid-<plan>`) is stored as `source`; `?topic=` prefills the note field; `?cal=<slug>` overrides the Cal.com event (whitelisted). **As of 2026-10-05, call.html is the ONLY path to the Cal.com calendar** — quiz, pricing (post-payment), and the ai-relevance/readiness "Book a discovery call" buttons all route through it. The ai-relevance/readiness buttons open the form in a new tab and still unlock the on-page result. There are no other contact paths into a chat or a calendar: the "or WhatsApp me directly" link on index.html, the in-person WhatsApp link on coaching-andheri-west.html and every generic WhatsApp link were removed on 2026-10-25 (owner decision: nobody can WhatsApp Vaibhav directly from the site). What remains is `mailto:hello@clearhead.in`, the homepage contact form and this booking flow. All five tool pages now send `via=<tool>` to call.html.

Quiz mechanics: answers are stored in hidden fields `q1`..`q4` on the `quiz-enquiry` form. For a good fit, the Cal.com link gets prefilled notes ("From the 'Is this the right fit?' quiz — Looking for: ...; Where they are: ..."). The phone field accepts digits, spaces, hyphens and one leading + and needs 8 to 15 digits, so numbers from outside India work (it required exactly 10 digits until 2026-10-25).

Analytics events: see section 9 for the full list and the URL scrubbing rule.

---

## 4. Tech stack and repository layout

**No framework, on purpose.** Static HTML + one global `styles.css` + vanilla JS. No React, Vite, Tailwind or build step. Any instruction that implies a build pipeline is wrong.

| Layer | Choice |
|---|---|
| Frontend | Hand-written HTML (one file per page), `styles.css` (about 83 KB, single stylesheet), `anim.js` (scroll-reveal text, `prefers-reduced-motion` safe), `analytics.js` (GA4 + consent), five `*-engine.js` tool engines |
| Hosting | Netlify, auto-deploys on every push to `main` (about 30 s). Publish directory is the repo root (`publish = "."`), so **anything tracked in git is public** unless `netlify.toml` blocks it |
| Backend | 4 Netlify Functions (create-order, verify-payment, razorpay-webhook, csp-report; Node 18+, esbuild bundler) under `netlify/functions/`, exposed as `/api/*` |
| Payments | Razorpay Standard Checkout (`razorpay` npm package, the only dependency; two `package.json` files: root `^2.9.4`, functions folder `^2.8.2`) |
| Booking | Cal.com (`cal.com/vaibhavjain/...`), opened after payment and from the free-call flow |
| Leads | Netlify Forms, 10 forms (section 8) |
| Email (planned) | Resend REST API from the webhook function; **inactive**, see 7.3 |
| DNS | Netlify DNS |
| Repo | `github.com/vaibhav-labs/clearhead`, branch `main`, local `~/Documents/Zen`, which is inside iCloud Drive (the sandbox sees it as `$HOME/mnt/Zen`); the planned new home is `~/Developer/Zen`, outside iCloud (GIT-2) |
| Netlify site | name `effervescent-meerkat-1f9826`, id `1316f32d-6269-4699-bde6-50bf9eca7cc8` (from `.netlify/state.json`) |

### Folder layout

```
Zen/                         repo root = Netlify publish dir
  \g<1>79 pages (section 5)
  styles.css  anim.js  analytics.js  runway-engine.js  bandwidth-engine.js  career-friction-engine.js  ai-relevance-engine.js  readiness-engine.js
  llms.txt  robots.txt  sitemap.xml  netlify.toml  404.html  favicon.* apple-touch-icon.png
  images: how-conversation.jpg  clearhead-logo-og.jpg  og-ai-loneliness.jpg  og-new-city-loneliness.jpg  vaibhav-jain-illustration.jpg
          coaching-early/mid/grad.jpg  VJ.jpg   (the last five are referenced by no page any more, see 15 HYG-1)
          peep-*.svg (23)  mix-*.svg (7)  happy.svg   (retired illustration library, unused)
  netlify/functions/         create-order.js  verify-payment.js  razorpay-webhook.js  package.json
  KNOWLEDGE_MAP.md  CLAUDE.md                      living docs (404'd publicly by netlify.toml)
  AUDIT_CHANGES.md  MANUAL_PUSH_INSTRUCTIONS.md  PAYMENT_FIX_SUMMARY.md  SETUP-DASHBOARD-STEPS.md     older docs (see 19)
  scripts/contrast.py  __pycache__/                tracked build leftovers, currently served publicly (HYG-2)
  audits/        (gitignored)  SITE_HEALTH_LOG.md  knowledge_map_refresh.py  + legacy dated reports, 2 skills, GSC/SEO audits
  growth/        (gitignored)  content-queue.md  outreach-log.md  design-log.md  outbox/  reports/  vj9/  brand/  tools/citability_audit.py
  brand-kit/  clearhead-brand-kit.pdf  *.skill  *.xlsx  files.zip   (gitignored: never deploy)
  node_modules/  .netlify/  .env  .DS_Store                          (gitignored)
  .claude/launch.json  .claude/settings.local.json                    tracked; launch.json points at a stale path ("Zen Coaching")
```

### Git and deploy

```bash
cd ~/Documents/Zen
git add -A && git commit -m "msg" && git push origin main      # auto-deploys in about 30 s
npx netlify dev                                                 # local run incl. functions (reads .env)
```

Reality of automation (see also 13.4): scheduled and sandboxed sessions can commit but **cannot push** (no GitHub credentials; pushes fail with `could not read Username`), and they cannot delete stale `.git/*.lock` files without owner approval. Finished work therefore sits as local commits until the owner runs `git push origin main` from the Mac. As of 2026-10-05 `origin/main` equals local `HEAD`. The folder sits in iCloud Drive, which evicts files to the cloud and makes them unreadable to the sandbox; once it made git hit a bus error. On 2026-10-26 the evicted files were downloaded again and the move out of iCloud was prepared (GIT-2).

---

## 5. Site inventory

### 5.1 Pages other than blog posts

<!-- AUTO:PAGES:BEGIN -->
_(auto-generated by `audits/knowledge_map_refresh.py`; do not hand-edit)_

| File | Role | Title | Robots | Forms | Schema types |
|---|---|---|---|---|---|
| `404.html` | Custom 404 | Page not found / Clearhead | noindex | - | - |
| `ai-relevance.html` | Tool: AI Exposure / Relevance | Will AI Replace My Job? AI Exposure Calculator / Clearhead | index | ai-relevance-leads | BreadcrumbList, Organization, SoftwareApplication |
| `bandwidth.html` | Tool: Cognitive Overload / Bandwidth | Cognitive Overload Calculator / Mental Bandwidth / Clearhead | index | bandwidth-leads | BreadcrumbList, Organization, SoftwareApplication |
| `blog.html` | Blog index (5 clusters) | Blog / Clearhead — Clarity, Identity & Being Heard | index | - | BreadcrumbList, CollectionPage, WebSite |
| `call.html` | Pre-call screening form | Before we talk / Clearhead | noindex | call-screening | - |
| `career-friction.html` | Tool: Career Friction & Alignment | Should I Change Careers? Career Alignment Test / Clearhead | index | career-leads | BreadcrumbList, Organization, SoftwareApplication |
| `coaching-andheri-west.html` | Local-intent landing page | In-Person Coaching in Andheri West, Mumbai / Clearhead | index | - | BreadcrumbList, FAQPage, LocalBusiness, Organization, Person, ProfessionalService, Service |
| `index.html` | Homepage | Clearhead Mumbai / Vaibhav — ICF PCC Coach & Counsellor | index | contact | FAQPage, LocalBusiness, Organization, Person, ProfessionalService, WebSite |
| `onboard.html` | (unclassified) | Client onboarding and agreement / Clearhead | noindex | client-onboarding | - |
| `pricing.html` | Packages + Razorpay pay buttons | Pricing / Clearhead — Coaching Packages, Mumbai | index | payment-record | BreadcrumbList, Service |
| `privacy-policy.html` | Legal | Privacy Policy / Clearhead Mumbai | noindex | - | - |
| `quiz.html` | Fit quiz (gates call booking) | Is this the right fit? / Clearhead Mumbai | noindex | quiz-enquiry | - |
| `readiness.html` | Tool: Self-Employment Readiness | Should I Quit My Job? Self-Employment Readiness / Clearhead | index | readiness-leads | BreadcrumbList, Organization, SoftwareApplication |
| `runway.html` | Tool: Abundance Runway Calculator | Abundance Runway Calculator / Clearhead | index | runway-leads | BreadcrumbList, Organization, SoftwareApplication |
| `still-on-your-list.html` | Reflection tool | What Are You Still Putting Off? / Clearhead Mumbai | index | - | BreadcrumbList, Person, Thing, WebPage, WebSite |
| `terms.html` | Legal | Terms of Service / Clearhead Mumbai | noindex | - | - |
| `thank-you.html` | Post-form landing | Thank you / Clearhead Mumbai | noindex | - | - |
| `tools.html` | Free-tools hub | Free Tools for Working Professionals / Clearhead | index | - | BreadcrumbList, CollectionPage, ItemList, SoftwareApplication, WebApplication |
<!-- AUTO:PAGES:END -->

Notes: `index.html` JSON-LD is a cross-referenced `@id` graph (Person `#vaibhav`, LocalBusiness/ProfessionalService `#business` with `#business-address`, WebSite `#website`). Homepage section ids: `what`, `sessions`, `safe`, `approach`, `blog-preview`, `about`, `testimonials`, `disclaimer`, `faq`, `contact`. `coaching-andheri-west.html` carries Service + FAQPage + BreadcrumbList for local intent. `404.html` is a custom branded page (noindex, follow). `thank-you.html` and `quiz.html` are both `noindex` and disallowed in `robots.txt` (redundant but harmless: a disallowed page's noindex is never seen by Google; both stay out of the index either way). `privacy-policy.html` and `terms.html` are `noindex, follow`, crawlable on purpose, excluded from the sitemap.

### 5.2 Blog posts (61) by cluster

Note (hand-written, 2026-10-12): three posts were added on 2026-10-10 and wired into `blog.html`, `sitemap.xml` and `llms.txt`: `post-coach-vs-therapist-vs-counsellor.html` (Clarity & being heard), `post-is-coaching-worth-it-senior-leaders.html` (Money & mental health) and `post-work-stress-counselling-mumbai.html` (Pressure & burnout). Nine posts were also re-dated on 2026-10-10. The AUTO table below still shows the 2026-10-05 set until TOOL-1 is fixed.

Five clusters, each a section of `blog.html` (no standalone hub pages yet, see 15 CLUSTER-1). Each post follows one house format: answer block in the first 150 words, question-phrased H2s (at least one third), a References section with real DOI/URL-linked primary sources mirrored in `Article.citation`, a 4 to 5 question FAQ whose text matches the `FAQPage` JSON-LD exactly, a `.post-author` card linking to `index.html#about`, an exploratory-call invite block, "More from the blog" related cards, `<time datetime>` equal to `dateModified`, and a robots meta with `max-snippet:-1, max-image-preview:large`.

<!-- AUTO:POSTS:BEGIN -->
_(auto-generated by `audits/knowledge_map_refresh.py`; do not hand-edit)_

**Clarity & being heard** (3 posts on-site, 5 external vj9.org cross-posts)

| # | Page | Topic (title tag) | Published | Modified | Words | Cites | FAQ | Q-H2 | In | SLA |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `post-coach-vs-therapist-vs-counsellor.html` | Coach vs Counsellor vs Therapist in India | 2026-10-10 | 2026-10-10 | 3429 | 8 | 5 | 6/9 | 0 | due 2027-01-08 |
| 2 | `post-conversation.html` | What One Good Conversation Can Do | 2025-04-01 | 2026-09-18 | 1296 | 3 | 4 | 2/4 | 5 | due 2026-12-17 |
| 3 | `post-unheard.html` | You're not confused. You're just unheard. | 2025-04-01 | 2026-09-18 | 1314 | 2 | 4 | 2/4 | 4 | due 2026-12-17 |

**Loneliness & connection** (8 posts on-site, 1 external vj9.org cross-posts)

| # | Page | Topic (title tag) | Published | Modified | Words | Cites | FAQ | Q-H2 | In | SLA |
|---|---|---|---|---|---|---|---|---|---|---|
| 4 | `post-lonely-at-the-top.html` | Lonely at the Top: Why Leaders Feel It | 2026-08-07 | 2026-08-07 | 2379 | 4 | 4 | 5/7 | 2 | due 2026-11-05 |
| 5 | `post-workplace-loneliness-research.html` | Workplace Loneliness: Why It's Not on You | 2026-07-23 | 2026-07-23 | 1960 | 3 | 4 | 5/7 | 2 | PAST by 5d |
| 6 | `post-mattering-at-work.html` | Indispensable at Work but Feeling Invisible? | 2026-07-11 | 2026-10-10 | 2411 | 5 | 4 | 6/7 | 10 | due 2027-01-08 |
| 7 | `post-lonely-at-work.html` | Feeling Alone at Work? The Hidden Cost | 2026-06-14 | 2026-10-02 | 2140 | 5 | 4 | 3/7 | 8 | due 2026-12-31 |
| 8 | `post-alone-at-work.html` | Lonely at Work but Not at Home? | 2026-07-20 | 2026-07-20 | 1743 | 1 | 4 | 2/5 | 1 | PAST by 8d |
| 9 | `post-new-city-loneliness.html` | Moved Cities for a Job? The Loneliness Is Real | 2026-05-31 | 2026-09-27 | 2868 | 0 | 5 | 4/9 | 6 | due 2026-12-26 |
| 10 | `post-ai-loneliness.html` | Can AI Cure Loneliness? A 2026 Study | 2026-05-15 | 2026-10-02 | 2065 | 7 | 4 | 3/7 | 9 | due 2026-12-31 |
| 11 | `post-lonely.html` | The Loneliest Generation Has the Most Followers | 2025-04-01 | 2026-09-18 | 1342 | 2 | 4 | 2/5 | 4 | due 2026-12-17 |

**AI, work & identity** (12 posts on-site, 9 external vj9.org cross-posts)

| # | Page | Topic (title tag) | Published | Modified | Words | Cites | FAQ | Q-H2 | In | SLA |
|---|---|---|---|---|---|---|---|---|---|---|
| 12 | `post-ai-comparison-exhaustion.html` | Everyone Else Gets AI. Why That Exhausts You | 2026-09-21 | 2026-09-21 | 3020 | 3 | 4 | 4/6 | 0 | due 2026-12-20 |
| 13 | `post-ai-replaceable-lonely.html` | Why AI at Work Leaves You Anxious and Alone | 2026-09-07 | 2026-09-07 | 2225 | 2 | 4 | 5/7 | 1 | due 2026-12-06 |
| 14 | `post-career-insecurity.html` | The Fear of Losing Control of Your Career | 2026-08-17 | 2026-08-17 | 2140 | 2 | 4 | 5/7 | 2 | due 2026-11-15 |
| 15 | `post-ai-productivity-burnout.html` | AI Was Meant to Save Time, Not Burn You Out | 2026-08-10 | 2026-08-10 | 2317 | 4 | 4 | 5/7 | 0 | due 2026-11-08 |
| 16 | `post-ai-psychological-safety.html` | Your Job's Safe. So Why Does Work Feel Unsafe? | 2026-08-01 | 2026-08-01 | 2053 | 1 | 4 | 3/7 | 1 | due 2026-10-30 |
| 17 | `post-ai-deskilling.html` | Is AI Quietly Making You Worse at Your Job? | 2026-07-21 | 2026-07-21 | 1982 | 3 | 4 | 3/6 | 3 | PAST by 7d |
| 18 | `post-ai-job-insecurity.html` | Job Insecurity Hurts Before Any Layoff | 2026-07-15 | 2026-07-15 | 1964 | 3 | 4 | 3/6 | 5 | PAST by 13d |
| 19 | `post-technostress.html` | Keeping Up With AI Is Quietly Exhausting You | 2026-07-08 | 2026-10-10 | 2408 | 7 | 4 | 3/6 | 7 | due 2027-01-08 |
| 20 | `post-ai-job-fear.html` | The Fear of AI Taking Your Job Has a Shape | 2026-06-23 | 2026-10-02 | 2597 | 7 | 4 | 3/8 | 3 | due 2026-12-31 |
| 21 | `post-ai-work-family-exhaustion.html` | AI Job Fear Doesn't Stay at Work | 2026-06-21 | 2026-10-02 | 2198 | 7 | 4 | 3/7 | 2 | due 2026-12-31 |
| 22 | `post-ai-replacement-dysfunction.html` | Fear of Being Replaced by AI Now Has a Name | 2026-06-10 | 2026-10-02 | 2392 | 9 | 4 | 3/7 | 7 | due 2026-12-31 |
| 23 | `post-ai.html` | Your Job Title Is Changing. Don't Lose Yourself. | 2025-04-01 | 2026-09-18 | 1503 | 3 | 4 | 2/5 | 6 | due 2026-12-17 |

**Pressure & burnout** (32 posts on-site)

| # | Page | Topic (title tag) | Published | Modified | Words | Cites | FAQ | Q-H2 | In | SLA |
|---|---|---|---|---|---|---|---|---|---|---|
| 24 | `post-work-stress-counselling-mumbai.html` | Work Stress Counselling in Mumbai: What Helps | 2026-10-10 | 2026-10-10 | 2653 | 9 | 5 | 7/10 | 0 | due 2027-01-08 |
| 25 | `post-evening-recovery.html` | The First Hour After Work Decides Your Next Day | 2026-09-23 | 2026-09-23 | 2950 | 1 | 4 | 4/6 | 2 | due 2026-12-22 |
| 26 | `post-career-plateau.html` | Career Plateau: Why Being Stuck Hurts So Much | 2026-09-14 | 2026-09-14 | 2725 | 2 | 4 | 5/7 | 2 | due 2026-12-13 |
| 27 | `post-underused-at-work.html` | You're Not Overworked. You're Underused. | 2026-08-30 | 2026-09-14 | 2082 | 4 | 4 | 3/6 | 1 | due 2026-12-13 |
| 28 | `post-workaholism.html` | Workaholism: When Work Won't Let You Go | 2026-08-29 | 2026-08-29 | 2043 | 3 | 4 | 5/7 | 0 | due 2026-11-27 |
| 29 | `post-workplace-incivility.html` | The Hidden Cost of Rudeness at Work | 2026-08-26 | 2026-08-26 | 2080 | 2 | 4 | 5/7 | 0 | due 2026-11-24 |
| 30 | `post-boreout.html` | Bored at Work Isn't Harmless. It's Boreout | 2026-08-14 | 2026-08-14 | 2034 | 2 | 4 | 3/6 | 2 | due 2026-11-12 |
| 31 | `post-return-to-office-mandate.html` | Return-to-Office Mandate: Why It Hurts So Much | 2026-08-11 | 2026-08-11 | 2050 | 3 | 4 | 2/5 | 0 | due 2026-11-09 |
| 32 | `post-surface-acting.html` | The Quiet Cost of Faking It at Work | 2026-08-23 | 2026-08-23 | 2229 | 2 | 4 | 6/8 | 1 | due 2026-11-21 |
| 33 | `post-presenteeism.html` | Showing Up at Work When You're Not Okay | 2026-08-05 | 2026-08-05 | 1836 | 2 | 4 | 3/6 | 2 | due 2026-11-03 |
| 34 | `post-hybrid-work-recovery.html` | Working From Home but Never Recovering | 2026-08-02 | 2026-08-02 | 2511 | 3 | 4 | 5/7 | 2 | due 2026-10-31 |
| 35 | `post-job-control-depression.html` | Low Job Control and Depression Risk | 2026-07-29 | 2026-07-29 | 2173 | 2 | 4 | 5/7 | 2 | due 2026-10-27 |
| 36 | `post-sleep-mental-health.html` | What Too Little Sleep Does to Your Mind | 2026-07-28 | 2026-07-28 | 2003 | 2 | 4 | 5/7 | 1 | due 2026-10-26 |
| 37 | `post-allostatic-load.html` | Your Body Is Keeping Score of Work Stress | 2026-07-27 | 2026-07-27 | 2070 | 3 | 4 | 6/8 | 6 | PAST by 1d |
| 38 | `post-after-hours-messages.html` | Why Your After-Hours Messages Exhaust Your Team | 2026-07-26 | 2026-07-26 | 1955 | 1 | 4 | 5/7 | 4 | PAST by 2d |
| 39 | `post-layoff-survivor-guilt.html` | Layoff Survivor Guilt: Why Staying Hurts Too | 2026-07-25 | 2026-07-25 | 1898 | 2 | 4 | 3/6 | 0 | PAST by 3d |
| 40 | `post-flourishing-research.html` | Why Success Doesn't Feel Like Enough | 2026-07-24 | 2026-07-24 | 1888 | 2 | 4 | 5/7 | 2 | PAST by 4d |
| 41 | `post-mid-career-crisis.html` | Mid-Career Slump: Real, But Not for Everyone | 2026-07-19 | 2026-09-14 | 1914 | 1 | 4 | 3/6 | 6 | due 2026-12-13 |
| 42 | `post-effort-reward-imbalance.html` | Giving More Than You Get Back at Work | 2026-07-16 | 2026-07-16 | 2011 | 3 | 4 | 3/6 | 3 | PAST by 12d |
| 43 | `post-perfectionism.html` | Perfectionism: Why Nothing Ever Feels Enough | 2026-07-12 | 2026-07-12 | 2102 | 3 | 4 | 3/6 | 3 | PAST by 16d |
| 44 | `post-self-compassion-work-stress.html` | Is Self-Criticism Fueling Your Work Anxiety? | 2026-07-10 | 2026-10-10 | 2426 | 4 | 4 | 3/6 | 3 | due 2027-01-08 |
| 45 | `post-manager-burnout.html` | Why Managers Burn Out First | 2026-07-09 | 2026-10-10 | 2383 | 4 | 4 | 3/6 | 7 | due 2027-01-08 |
| 46 | `post-bedtime-procrastination.html` | Why You Stay Up Late When You're Exhausted | 2026-07-07 | 2026-10-10 | 2657 | 6 | 4 | 3/8 | 5 | due 2027-01-08 |
| 47 | `post-languishing.html` | You're Not Burned Out. You're Languishing. | 2026-07-06 | 2026-10-10 | 2594 | 7 | 4 | 3/8 | 6 | due 2027-01-08 |
| 48 | `post-holding-it-together.html` | The Quiet Cost of Always Holding It Together | 2026-07-05 | 2026-10-10 | 2639 | 6 | 4 | 3/6 | 6 | due 2027-01-08 |
| 49 | `post-monday-dread.html` | Why Monday Dread Stays in Your Body for Weeks | 2026-07-04 | 2026-10-10 | 2322 | 4 | 4 | 4/6 | 2 | due 2027-01-08 |
| 50 | `post-impostor-syndrome.html` | Feel Like a Fraud at Work? It Has a Name | 2026-07-03 | 2026-10-10 | 2451 | 6 | 4 | 3/6 | 6 | due 2027-01-08 |
| 51 | `post-rest-burnout.html` | Why Rest Doesn't Fix Burnout | 2026-06-22 | 2026-10-02 | 2339 | 6 | 4 | 3/7 | 12 | due 2026-12-31 |
| 52 | `post-multitasking.html` | Multitasking Is Quietly Draining You | 2026-06-15 | 2026-10-02 | 1954 | 4 | 4 | 3/6 | 3 | due 2026-12-31 |
| 53 | `post-overwork-brain.html` | Long Work Hours Are Changing Your Brain | 2026-06-13 | 2026-10-02 | 2128 | 5 | 4 | 3/8 | 8 | due 2026-12-31 |
| 54 | `post-quiet-cracking.html` | Quiet Cracking: When High Performers Burn Out | 2026-06-11 | 2026-10-02 | 2327 | 6 | 4 | 3/6 | 20 | due 2026-12-31 |
| 55 | `post-cant-switch-off.html` | Why You Can't Switch Off From Work | 2026-06-12 | 2026-10-02 | 2437 | 6 | 4 | 3/6 | 19 | due 2026-12-31 |

**Money & mental health** (6 posts on-site)

| # | Page | Topic (title tag) | Published | Modified | Words | Cites | FAQ | Q-H2 | In | SLA |
|---|---|---|---|---|---|---|---|---|---|---|
| 56 | `post-is-coaching-worth-it-senior-leaders.html` | Is Coaching Worth It for VPs and Directors? | 2026-10-10 | 2026-10-10 | 3309 | 7 | 5 | 5/10 | 0 | due 2027-01-08 |
| 57 | `post-cost-of-getting-help.html` | Is Coaching or Counselling Worth the Money? | 2026-10-04 | 2026-10-04 | 2353 | 11 | 4 | 6/8 | 5 | due 2027-01-02 |
| 58 | `post-money-bandwidth.html` | Money Stress Is Quietly Draining Your Focus | 2026-08-21 | 2026-08-21 | 1790 | 3 | 4 | 2/5 | 1 | due 2026-11-19 |
| 59 | `post-money-comparison.html` | Earn Well But Still Feel Behind Your Peers? | 2026-07-30 | 2026-07-30 | 2013 | 1 | 4 | 3/7 | 1 | due 2026-10-28 |
| 60 | `post-money-anxiety.html` | Why Money Feels Unsafe Even When You Earn Well | 2026-07-01 | 2026-10-02 | 2303 | 6 | 4 | 3/7 | 6 | due 2026-12-31 |
| 61 | `post-golden-handcuffs.html` | Six Figures, Still Feels Like Survival Mode | 2026-07-14 | 2026-07-14 | 1859 | 1 | 4 | 3/6 | 7 | PAST by 14d |
<!-- AUTO:POSTS:END -->

Columns: Cites = `Article.citation` entries · FAQ = `FAQPage` questions · Q-H2 = question-phrased H2s / all H2s · In = inbound links from other posts · SLA = the 90-day refresh rule (see 10.5).

### 5.3 Interactive tools

Pattern: `*.html` view + `*-engine.js` (pure math, DOM-decoupled, exported on `window`) + a Netlify lead form. All five scored tools carry a scoring-methodology line. Answers stay in the browser until the visitor unlocks the full results, which POSTs name, email, `privacy_consent` and `snapshot_json` (the answers) to the tool's Netlify form. The save (`saveLead`) has a 12 s timeout and one quiet retry; if both fail a visible note asks the visitor to press the button again or email, and the results open either way. The gate offers a second way in: "Book a free 30-minute conversation" (`call.html?via=<tool>`, new tab), which also unlocks the results without sending anything. The old "no data stored" line was replaced on 2026-10-25 by "Nothing is sent unless you choose to unlock the full results with your email", because the old line was false. Events since 2026-10-25: `tool_start`, `tool_complete`, `tool_unlock` (method email or booking), `generate_lead` (only after a confirmed save), `lead_save_failed`; none carries answers or contact details. The "Weekly" accountability wording on these pages was removed because sessions are every 2 to 3 weeks.

| Tool | Files | Form | Purpose |
|---|---|---|---|
| Abundance Runway Calculator | `runway.html`, `runway-engine.js` | `runway-leads` | how long finances last if income stopped (liability and tax detail, 7 steps) |
| Cognitive Overload / Bandwidth Index | `bandwidth.html`, `bandwidth-engine.js` | `bandwidth-leads` | open loops, context switching, system dependency, recovery |
| Career Friction and Alignment Audit | `career-friction.html`, `career-friction-engine.js` | `career-leads` | four quadrants: Aligned, Hard but Right, Drift, Golden Handcuffs (linked from `post-golden-handcuffs`) |
| AI Exposure / Relevance Index | `ai-relevance.html`, `ai-relevance-engine.js` | `ai-relevance-leads` | "will AI replace my job" |
| Self-Employment Readiness Index | `readiness.html`, `readiness-engine.js` | `readiness-leads` | six-question audit before quitting to go solo |
| Still On Your List | `still-on-your-list.html` | none | six-minute reflection on what you have been quietly carrying |

`tools.html` is the hub (CollectionPage + ItemList). Its copy says "four free calculators" while six tools exist; harmless but worth correcting when that page is next edited.

### 5.4 Shared scripts and assets

- `analytics.js`: GA4 loader with Consent Mode v2 (section 9). `anim.js`: reveal animations. Fonts load by `<link>` in each page head (Google Fonts: Bricolage Grotesque, Figtree; Patrick Hand on the quiz).
- Hero and card imagery: curated Unsplash photos (de-duplicated, topic-matched; check `blog.html` for reuse before picking one for a new post) plus self-hosted `how-conversation.jpg` on the homepage. Social-share image on every page: `clearhead-logo-og.jpg`. Two posts use their own OG images (`og-ai-loneliness.jpg`, `og-new-city-loneliness.jpg`).
- **Illustration library (`SVG/`, 439 files, added 2026-10-07):** a second source of imagery besides Unsplash — read `SVG/MANIFEST.md` first, every time, before picking one. Two sub-libraries: `individual_svg_assets_2/` ("blackart", 383 files across 10 sheets — sheet `8570` is the good one: moody black-ink editorial illustrations of solitude, overwork, quiet conversation; the rest are mostly off-palette or off-topic, see the manifest's per-sheet table) and `individual_svg_assets/` (57 files: `work_*`/`lifestyle_*` usable with care, `shopping_*` skip entirely). Files are raster PNGs wrapped in an SVG shell — not CSS-colorable, and extraction crops are approximate (crop out stray adjacent-panel fragments and any baked-in English caption before using one). The six homepage illustrations added in the 2026-10-07 redesign (`scene-overwhelm.svg`, `scene-alone-together.svg`, `scene-quiet-pause.svg`, `scene-two-people.svg`, `scene-video-call.svg`, `scene-focused.svg`, all at the repo root) are cropped derivatives from sheet 8570 — the manifest has the exact source-asset mapping. Five further raster illustrations (2026-10-11) at the repo root, cropped from the owner's Gemini set in `clearhead-vector-redrawn/` with the caption removed and background whitened to #fff: `scene-confusion.png` (homepage card 3, career-friction gutter), `scene-work-solution.png` (readiness gutter), `scene-business-discussion.png` (call gutter), `scene-busy-laptop.png` (bandwidth gutter), `scene-bench-pause.png` (still-on-your-list gutter).

---

## 6. Routing, headers and hosting (`netlify.toml`)

- Build: `publish = "."`, `functions = "netlify/functions"`, `node_bundler = "esbuild"`.
- **Redirects:** `www.clearhead.in/*` -> `https://clearhead.in/:splat` (301, forced). `/index.html` -> `/` (301, forced). `/coaching-andheri-west` -> `/coaching-andheri-west.html` (200 rewrite).
- **Internal files hidden** with forced 404s to `/404.html`: `/audits/*`, `/CLAUDE.md`, `/KNOWLEDGE_MAP.md`, `/AUDIT_CHANGES.md`, `/MANUAL_PUSH_INSTRUCTIONS.md`, `/PAYMENT_FIX_SUMMARY.md`, `/SETUP-DASHBOARD-STEPS.md`, `/package.json`, `/package-lock.json`. Netlify only supports trailing-splat globs, so every file is enumerated on purpose. A new internal `.md` in the repo root must be added here or it becomes public. (`netlify.toml`, `.gitignore`, `.claude/*`, `.env` already return 404 live; `scripts/`, `__pycache__/` and `netlify/functions/*.js` source return 200, see HYG-2.)
- **API rewrites (200):** `/api/create-order`, `/api/verify-payment`, `/api/razorpay-webhook`, `/api/csp-report` -> `/.netlify/functions/<name>`.
- **Pretty URLs:** `/blog` and `/blog.html` both return 200; canonical tags point to the `.html` version. The explicit clean-URL 301 rules were removed on 2026-06-13 (they caused API redirect loops; commits `b2227e3`, `ce484fb`, `5c188b6`). Google Search Console lists the clean variants as "Alternative page with proper canonical tag", which is benign.
- **Headers on `/*`:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (geolocation, microphone, camera denied), `Strict-Transport-Security` (1 year, includeSubDomains, preload), and **`Content-Security-Policy`**, ENFORCED since 2026-10-26 (it was `Content-Security-Policy-Report-Only` from 2026-10-25): self; `*.razorpay.com` (script, frame, connect, img and, for its redirect flow, form-action); `www.google.com` (the Maps frame on the home and Andheri pages, and the endpoint GA4 posts its beacon to); `www.googletagmanager.com`; `*.google-analytics.com`, `analytics.google.com` and `*.analytics.google.com` (connect); Google Fonts; `images.unsplash.com`; data: images. `'unsafe-inline'` stays for scripts and styles because every page has inline blocks. Also `object-src 'none'`, `base-uri 'self'` and `frame-ancestors 'none'`; violations are POSTed to `/api/csp-report`. A browser probe on 2026-10-26 found that GA4 posts to `https://www.google.com/g/collect`, which the report-only policy would have blocked, so that host and `analytics.google.com` were added before enforcing. The policy was then run in a real browser against the live Razorpay checkout, Maps, Fonts, GA4 (consent granted) and a native form post, about 27 scenarios across the pricing, home, Andheri, post, tool, call, quiz, onboard, thank-you and tools pages, with zero violations; a control run showed that all six violation classes are blocked in enforce mode. **A new third-party host (video embed, chat widget, another font or analytics host) must be added to the matching directive before it goes on a page, or the browser blocks it silently.** Rollback is one word: rename the header back to `Content-Security-Policy-Report-Only` and redeploy. After the push, read the function log (Netlify > Functions > csp-report, search `[csp-report]`) for a week or two (CSP-1).
- **Caching:** CSS and JS 1 hour with must-revalidate; JPG and SVG 7 days with must-revalidate.

---

## 7. Payments and backend (`netlify/functions/`)

### 7.1 Functions

| Function | Route | Behaviour |
|---|---|---|
| `create-order.js` | `POST /api/create-order` | Creates a Razorpay order server-side. In `{plan}` (starter, going-deeper or long-game): the price is set on the server (`PLANS`, in paise), so the browser cannot choose it; a pre-change page that still sends `{amount}` is accepted only if the amount equals exactly one package price. Out `{order_id, amount, currency, plan, key_id}`. 405 non-POST · 400 unknown package · 401 auth failed · 500 credentials missing or Razorpay error. `PLANS` is duplicated in `create-order.js` and `razorpay-webhook.js` and must match the `data-amount` values on `pricing.html` (the page refuses to open checkout if the returned amount differs from the one it shows) |
| `verify-payment.js` | `POST /api/verify-payment` | HMAC-SHA256 of `order_id|payment_id` with the key secret, timing-safe compare. 200 `{verified:true}` · 400 missing fields or mismatch · 405 non-POST · 500 secret missing |
| `razorpay-webhook.js` | `POST /api/razorpay-webhook` | Fails closed with 500 if `RAZORPAY_WEBHOOK_SECRET` is unset; 400 if the signature header is missing or wrong; verifies HMAC of the raw body. On `payment.captured`: customer confirmation email plus an internal heads-up to `INTERNAL_NOTIFY_EMAIL` (default `hello@clearhead.in`) via Resend. `payment.failed` is logged only. Never fails Razorpay's retry loop because of email errors. The package is worked out from the amount and never guessed (an amount that matches no package gets a plain confirmation and a "check by hand" internal email). The customer's link goes to `call.html?via=paid-<plan>&cal=<slug>&pid=<id>`, not straight to the calendar. Duplicate deliveries are not de-duplicated, so a retry can send a second email |
| `csp-report.js` | `POST /api/csp-report` | Added 2026-10-25, committed 2026-10-26 (`6217801`), answered 204 to a probe on 2026-10-26. Receives Content-Security-Policy violation reports (`report-uri`, also the `reports+json` shape), writes one `[csp-report] {...}` line per violation to the function log with query strings and fragments stripped, drops browser-extension noise, caps a request at 16 KB and 10 reports. 204 for any POST, 405 otherwise |

### 7.2 Flow

pricing button (sends only the plan) -> `create-order` (server-side price) -> Razorpay modal -> success handler -> `verify-payment` (retried; if it still fails an "unconfirmed" panel says not to pay again and offers a pre-filled email with the payment ID) -> "Payment received" panel with "Continue to book your first session" (same tab, `call.html?via=paid-<plan>&cal=<slug>&pid=<id>`) and, unless this browser has signed, "Sign the client agreement" (`onboard.html`). The plan and payment ID are kept for 45 days in localStorage (`ch_paid_v1`), so a refresh or a later visit resumes at the booking step and a second payment is warned about. A background `payment-record` Netlify form stores plan, IDs and amount. A dismissed checkout or a failed payment stays on the page with a plain message. The Razorpay script is loaded without `defer` on purpose.

### 7.3 Environment variables (Netlify dashboard; never in the repo)

`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` (present: the live probe returns 400), `RAZORPAY_WEBHOOK_SECRET`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `INTERNAL_NOTIFY_EMAIL`. A local `.env` exists (gitignored) with only the first two.

**Verified live on 2026-10-05, 2026-10-12, 2026-10-19 and 2026-10-26:** an unsigned `POST /api/razorpay-webhook` returned **500 "Webhook secret not configured"**, so `RAZORPAY_WEBHOOK_SECRET` is **still not set on Netlify** (re-checked 2026-10-26 with the same result). Consequence: the webhook cannot process anything, so **no payment confirmation emails are sent** to customers or to Vaibhav. Payments themselves work (order creation and signature verification do not depend on it). `RESEND_API_KEY` cannot be probed safely; treat it as unset until the owner confirms. Steps are in `SETUP-DASHBOARD-STEPS.md` sections 1, 2 and 4 (see 15 PAY-1). Email deliverability (DNS checked 2026-10-25): there are no Resend records for clearhead.in (no DKIM, no return-path), SPF lists only iCloud and there is no DMARC record, so even with the secret set the confirmation emails will fail or land in spam until the domain is verified in Resend.

### 7.4 Health probes (safe, no side effects)

| Probe | Healthy | Broken means |
|---|---|---|
| `POST /api/create-order` with `{}` | 400 | 500 + "credentials" = keys missing; 404 = function not deployed; 502/503 = Netlify |
| `GET /api/verify-payment` | 405 | anything else = function missing or broken |
| `GET https://checkout.razorpay.com/v1/checkout.js` | 200 | payment modal cannot open |
| `POST /api/razorpay-webhook` with `{}` and no signature | 400 (secret set) | **500 = secret not set** (current state) |
| `GET /api/razorpay-webhook` | 405 | 404 = function not deployed |
| `POST /api/csp-report` with `{}` | 204 | 404 = function or redirect not deployed |
| `GET /api/csp-report` | 405 | anything else = function missing or broken |

---

## 8. Forms and lead capture (Netlify Forms, 10)

| Form | Page | Notes |
|---|---|---|
| `contact` | `index.html` | homepage contact; fires `generate_lead` |
| `quiz-enquiry` | `quiz.html` | name, phone (8 to 15 digits, international allowed), email, `privacy_consent`, hidden `q1`..`q4`; fires `generate_lead` |
| `call-screening` | `call.html` | name, email, whatsapp, `looking_for`, `diagnosed`, `self_harm_thoughts`, `in_crisis`, `topic`, `consent`, `source`, `outcome`; submitted by `fetch` on the final screen, including screened-out cases; also `plan` and `payment_id` for paid buyers; `lead_save_failed` event if both attempts fail |
| `client-onboarding` | `onboard.html` | details, `treated`, `medication`, `self_harm_thoughts`, `in_crisis`, emergency contact, `package`, `payment_id`, `source`, `agree_terms`, `agree_18`, `signature`, `signed_at`, `agreement_version`; submitted by `fetch` with one retry; the ending depends on the answers (crisis, clinical, paid, not paid); fires `onboarding_complete`, or `lead_save_failed` and a visible error if the save fails |
| `payment-record` | `pricing.html` (hidden form) | `plan`, `payment_id`, `order_id`, `amount_inr`, `verified`, `page`; posted in the background after a verified payment |
| `runway-leads`, `bandwidth-leads`, `career-leads`, `ai-relevance-leads`, `readiness-leads` | the matching tool pages | one lead form per scored tool: name, email, `privacy_consent`, `snapshot_json` (the answers) and a result field; posted only when the visitor unlocks by email; `generate_lead` fires after a confirmed save |

All use `data-netlify="true"` and a `bot-field` honeypot. `contact` and `quiz-enquiry` are native POSTs that land on `/thank-you.html`; the other eight are posted with `fetch('/')` and counted as saved only when the reply is OK (a 404 means the form is not registered), and each shows a failure message or event when the save fails. The sitewide monitor probes every form daily with the honeypot filled (Netlify rejects those silently, so the probe leaves no record): 200 = registered, 404 = **unregistered, every submission is being lost**.

**Incident (recorded 2026-09-27):** form detection had never been enabled, so every form was unregistered from launch until 2026-09-27. All contact, quiz and tool-lead submissions before that date were lost. All 8 return 200 as of 2026-10-05.

**Notifications:** email notifications for form submissions were documented as **off** on 2026-07-14 (leads only land in the Netlify dashboard). Current state is unverified from here. `SETUP-DASHBOARD-STEPS.md` section 3 lists only 6 forms; the real count is 10 (`call-screening`, `readiness-leads`, `client-onboarding` and `payment-record` are missing there). `call-screening` and `client-onboarding` carry safety answers (self-harm thoughts, crisis, treatment), so turning notifications on for them is the most important dashboard step (FORM-2). If a form is added, update: the HTML, this section, `DOCUMENTED_FORMS` in `audits/knowledge_map_refresh.py`, the monitor skill's form table, and the dashboard notification setup.

---

## 9. Analytics and consent

- **GA4** property "The Zen Life — GA4", measurement ID `G-P80E6BNSTS` (public in page source). The ID lives in exactly one place, `analytics.js`, which every page loads.
- **Privacy posture (deliberate, counselling-adjacent):** nothing is sent to Google, not even a request for `gtag.js`, until the visitor clicks Allow. Consent Mode v2 defaults are all denied; advertising signals stay denied permanently; Do Not Track and Global Privacy Control are honoured silently (no banner); choice is stored 180 days in `localStorage` key `ch_consent_v1`; `anonymize_ip` on, Google signals off.
- **Events:** `window.chTrack(name, params)` no-ops without consent. Auto-wired in `analytics.js`, DOM-level: `generate_lead` (forms `quiz-enquiry` and `contact`, on submit) and `book_call_click` (any link to `call.html`, or to `cal.com/vaibhavjain`, with `via` read from the link; fixed 2026-10-25, the old selector only matched direct Cal.com links, which no longer exist). Page-level calls added 2026-10-25: tools `tool_start`, `tool_complete`, `tool_unlock` (method email or booking), `generate_lead` (after a confirmed save), `lead_save_failed`; quiz `quiz_start`, `quiz_complete` (outcome `good` or `other` only, never the category); call.html `screening_complete` (good or screened_out), `booking_redirect`, `lead_save_failed`; pricing `begin_checkout`, `purchase`, `payment_unconfirmed`, `checkout_dismissed`, `payment_failed`; onboarding `onboarding_complete`, `lead_save_failed`. No event carries a name, email, phone, answer or health category.
- **URL scrubbing (2026-10-25):** GA4 sends the page address with every event, and `call.html` carries the quiz summary (`topic`) and the payment reference (`pid`) in its query string. `analytics.js` now passes only `via`, `cal` and `utm_*` in `page_location` and `page_referrer`. Keep it that way: never add personal data to a URL on this site without extending that filter.
- **Limits:** most visitors who decline consent are invisible to GA4, so counts are a floor, and `lead_save_failed` only fires for visitors who allowed analytics: treat it as a smoke alarm, not a count. The thank-you page and blog-to-quiz clicks are page views only. Google Fonts and the Unsplash images load for every visitor before any choice is made (disclosed in the privacy policy; self-hosting them is the way to stop that, PRIV-1).
- Search Console property: `sc-domain:clearhead.in`. The Generative-AI performance report in GSC (launched 2026-06-03, impressions only) has not been confirmed for this property.

---

## 10. SEO, AEO and GEO system

### 10.1 On-page standards (enforced daily by the monitor and the citability audit)

- Title 30 to 60 characters (keep "Clearhead" in it); meta description 120 to 160 (measured after HTML-unescape); one `<h1>`; self-referencing canonical on every indexable page (`https://clearhead.in/<file>`, homepage `https://clearhead.in/`).
- Open Graph: `og:image`, `og:image:width`, `og:image:height`, `og:image:alt` on every indexable page, plus `twitter:card`. The share image is the Clearhead logo (`clearhead-logo-og.jpg`), not the founder photo.
- Robots meta on indexable pages: `index, follow, max-snippet:-1, max-image-preview:large` (preview control, an AEO factor). Noindex pages: `404`, `call`, `privacy-policy`, `quiz`, `terms`, `thank-you`.
- Local signals: standard footer address and email on every page (no phone number, by owner decision 2026-10-25), geo meta tags, Maps link.
- Images: all have alt text; none over about 270 KB; author portraits and the removed founder photo no longer appear on pages.

### 10.2 Structured data

- **Homepage:** `Person` (`#vaibhav`, ICF PCC credential, `sameAs` = vj9.org only), `LocalBusiness` + `ProfessionalService` merged as `#business` (address with `streetAddress`, `openingHoursSpecification` Mon to Sat 09:00 to 19:00, geo, `hasMap`, `priceRange`, `areaServed` Mumbai/India/online), `WebSite` (`#website`), `FAQPage` (visible FAQ text must match the schema text exactly).
- **Posts:** `Article` (author and publisher by `@id` reference, `publisher.logo`, `datePublished`, `dateModified`, `citation` array of real DOI/URL-linked sources), `BreadcrumbList`, `FAQPage`.
- **Tools:** `SoftwareApplication` + `Offer` + `Organization` + `BreadcrumbList`; hub is `CollectionPage` + `ItemList`. **Pricing:** `Service` + `Offer`. **Andheri West page:** `Service`, `FAQPage`, `LocalBusiness`, `BreadcrumbList`. **Blog index:** `CollectionPage`, `WebSite`.
- Zero JSON-LD parse errors site-wide is a standing invariant; the refresh script checks it.

### 10.3 Crawl and discovery files

- `robots.txt`: `Allow: /`; `Disallow: /thank-you.html`, `/quiz.html`, `/api/`, `/.netlify/`; sitemap line. No AI crawler is blocked (GPTBot, ClaudeBot, PerplexityBot, Google-Extended all allowed, deliberately).
- `sitemap.xml`: every indexable page; excludes privacy-policy, terms and all noindex pages. `lastmod` should move with a genuine edit (AUTO integrity block shows drift; about two dozen posts carry a bulk-set 2026-08-01 value later than their `dateModified`).
- `llms.txt` (about 39 KB): lists every indexable page with a one-line summary, grouped by cluster. Must be updated whenever a page is added.
- A new post must be wired into four places: `blog.html` (cluster card), `sitemap.xml`, `llms.txt`, and at least one inbound link from another post. The map itself is refreshed weekly by the script.

### 10.4 AEO rules in force (from the `clearhead-visibility-os` skill; `RULES_LAST_VERIFIED: 2026-10-01`)

Preview control on all pages; machine-readable `<time datetime>` equal to `dateModified`; at least one third of H2s phrased as questions; a 40 to 60 word answer block inside the first 150 words; stat density target of about one statistic per 100 words (heuristic); at least one primary-source link and one list or table per post; FAQ text identical to schema; freshness as a system (below). Recency, topic match and URL accessibility matter more than formatting tricks. Re-research the rules every 30 days.

### 10.5 Freshness SLA (90 days)

<!-- AUTO:FRESHNESS:BEGIN -->
_(auto-generated by `audits/knowledge_map_refresh.py`; do not hand-edit)_

Posts past the 90-day refresh SLA or due within 14 days (a refresh must be substantive: new sourced stats, tightened answer block, claims re-checked; then dateModified + `<time>` + sitemap lastmod move together).

| Page | Last modified | SLA due | Status |
|---|---|---|---|
| `post-perfectionism.html` | 2026-07-12 | 2026-10-10 | PAST by 16d |
| `post-golden-handcuffs.html` | 2026-07-14 | 2026-10-12 | PAST by 14d |
| `post-ai-job-insecurity.html` | 2026-07-15 | 2026-10-13 | PAST by 13d |
| `post-effort-reward-imbalance.html` | 2026-07-16 | 2026-10-14 | PAST by 12d |
| `post-alone-at-work.html` | 2026-07-20 | 2026-10-18 | PAST by 8d |
| `post-ai-deskilling.html` | 2026-07-21 | 2026-10-19 | PAST by 7d |
| `post-workplace-loneliness-research.html` | 2026-07-23 | 2026-10-21 | PAST by 5d |
| `post-flourishing-research.html` | 2026-07-24 | 2026-10-22 | PAST by 4d |
| `post-layoff-survivor-guilt.html` | 2026-07-25 | 2026-10-23 | PAST by 3d |
| `post-after-hours-messages.html` | 2026-07-26 | 2026-10-24 | PAST by 2d |
| `post-allostatic-load.html` | 2026-07-27 | 2026-10-25 | PAST by 1d |
| `post-sleep-mental-health.html` | 2026-07-28 | 2026-10-26 | due in 0d |
| `post-job-control-depression.html` | 2026-07-29 | 2026-10-27 | due in 1d |
| `post-money-comparison.html` | 2026-07-30 | 2026-10-28 | due in 2d |
| `post-ai-psychological-safety.html` | 2026-08-01 | 2026-10-30 | due in 4d |
| `post-hybrid-work-recovery.html` | 2026-08-02 | 2026-10-31 | due in 5d |
| `post-presenteeism.html` | 2026-08-05 | 2026-11-03 | due in 8d |
| `post-lonely-at-the-top.html` | 2026-08-07 | 2026-11-05 | due in 10d |
| `post-ai-productivity-burnout.html` | 2026-08-10 | 2026-11-08 | due in 13d |
| `post-return-to-office-mandate.html` | 2026-08-11 | 2026-11-09 | due in 14d |
<!-- AUTO:FRESHNESS:END -->

Last wave: 11 posts refreshed on 2026-10-02 (commit `977b165`). A refresh must be substantive, never a date bump.

Hand note 2026-10-26: the AUTO table above is the 2026-10-05 snapshot and is stale. Nine posts were refreshed on 2026-10-10 (§11), so impostor-syndrome, monday-dread, holding-it-together, languishing, bedtime-procrastination, technostress, manager-burnout, self-compassion-work-stress and mattering-at-work are no longer overdue. The citability audit of 2026-10-25 lists these ten posts as more than 90 days old and overdue: post-after-hours-messages, post-ai-deskilling, post-ai-job-insecurity, post-alone-at-work, post-effort-reward-imbalance, post-flourishing-research, post-golden-handcuffs, post-layoff-survivor-guilt, post-perfectionism and post-workplace-loneliness-research.

### 10.6 Google indexing: what is actually known

Tracker (add a row whenever new evidence arrives; the daily monitor's "day N" counter is a standing rule, not evidence):

| Date | Evidence | Reading |
|---|---|---|
| 2026-05-29 | GSC: 8 pages "Discovered, currently not indexed", never crawled. Manual indexing requested | baseline |
| 2026-07-14 | Full audit: live `site:clearhead.in` search returned nothing | zero indexed at that time |
| 2026-09-20 | GSC Coverage Drilldown export (`clearhead.in-Coverage-Drilldown-2026-09-20.xlsx`, in the folder): issue **"Alternative page with proper canonical tag"**, 8 affected pages (6 on 06-30, 7 on 07-11, 8 on 08-15, flat to 09-14). The 8 URLs are clean-URL variants (`/tools`, `/post-new-city-loneliness`, `/coaching-andheri-west`, `/ai-relevance`, `/post-impostor-syndrome`, `/bandwidth`, `/runway`, `/career-friction`) with last-crawled dates between 2026-05-30 and 2026-08-20 | **Google has crawled the site and recognised canonicals.** The export does not say how many canonical `.html` pages are indexed |
| 2026-09-24 to about 10-08 | Google September 2026 spam update rollout (per the visibility-OS update) | treat GSC swings in this window as noise; do not react with content changes |
| 2026-10-05 | Monitor reports "High, day 129" (standing escalation); every tracked page returns 200 with correct canonicals | not a technical fault on the site |
| 2026-10-19 | No new GSC export in the folder (the only export is still 2026-09-20). Monitor counter reads day 142 on 10-18, so day 143 today. All tracked pages return 200 | No new indexing evidence. The indexed count is still unknown |
| 2026-10-26 | No new GSC export (the newest export in the folder is still 2026-09-20). Day 150 by calendar count from 2026-05-29 (the monitor's 10-25 entry said 148, a counter slip). All six tracked pages return 200 | No new indexing evidence. The indexed count is still unknown |

**Still unknown:** the GSC "Indexed" count and the list of indexed URLs. That needs the owner to open Search Console. Owner action and what to report back: see 15 IDX-1.

### 10.7 Local search

Address and email: Lokhandwala Complex, Andheri West, Mumbai 400053 · Mon to Sat 09:00 to 19:00 · hello@clearhead.in. No phone or WhatsApp number is published anywhere on the site (owner decision 2026-10-25: removed from footers, schema, the contact section and the payment emails). The local-intent page `coaching-andheri-west.html` shipped 2026-07-14.

Google Business Profile (owner-managed; `growth/outbox/2026-08-29-gbp-profile-correction.md` is the draft plan): 139 customer interactions recorded, but the profile was miscategorised ("Psychotherapist"), had no phone number, claimed 24/7 hours, and had **zero reviews**. The plan weighs asking the four already-quoted testimonial givers for reviews against the practice's confidentiality promise (ask once, never in-session, never incentivised, never gated). Whether the owner has applied the corrections is unknown.

### 10.8 Off-site authority and channel doctrine

Doctrine (visibility OS): on-site content and schema may be auto-published; Reddit/Quora, journalist replies, guest essays, GBP and directory work are **draft-only** into `growth/outbox/` for the owner to send; **LinkedIn is forbidden** (never draft for, suggest or post there; accepted cost); paid ads, follower buying, PBNs and AI-content spam are forbidden; no sockpuppets, no fake reviews, disclose affiliation.

Status: zero known backlinks or brand mentions (searched 2026-07-14). Two pitches drafted 2026-07-14 and still awaiting a human send: a CNBC India correspondent covering the AI and IT-jobs beat, and a YourStory guest essay built on `post-golden-handcuffs`. Two unclaimed profile opportunities noted: a Board Infinity coach listing (unverified whether it is the same person) and the ICF Mumbai Chapter coach directory.

### 10.9 vj9.org (founder's Substack, "The other perspective")

16 posts as of 2026-09-14. Audited by the `vj9-substack-visibility` skill into `growth/vj9/reports/` and paste-ready worklists in `growth/vj9/outbox/` (batches 09-04, 09-09, 09-14). Platform floor: training crawlers blocked, search crawlers open; structured data cannot be edited; `dateModified` never updates. High findings on 2026-09-14: the About page names no one and links nowhere, no post links to clearhead.in, 6 titles carry the default publication suffix, 14 of 16 descriptions are outside 120 to 160 characters. Fixes are manual Substack edits by the owner; status unknown. clearhead.in's `sameAs` link to vj9.org resolves (fixed 2026-09-09).

---

## 11. Content system and queue

**Pipeline:** the `clearhead-asset-factory` skill publishes and refreshes posts (one of three jobs per run: publish, refresh, stat asset); the `clearhead-citability-audit` skill keeps every page technically and citation-ready; the owner can request topics directly (for example `post-cost-of-getting-help`, 2026-10-04).

**Quality rules:** every statistic is checked on its primary page before publishing and logged in `growth/content-queue.md` ("Published claims log"); never fabricate or round up a source; state study limits; prose has no em dashes or curly quotes and passes the humanize scorer; clinical boundary and Tele-MANAS 14416 on any distress topic; no urgency; no prices inside editorial posts.

**Publishing checklist (new post):** copy a recent post as the template; set title (30 to 60), description (120 to 160), canonical, OG set, robots meta; Article + BreadcrumbList + FAQPage JSON-LD with real `citation` array; `<time datetime>` = `dateModified`; answer block, question H2s, References section, `.post-author` card, call invite block; pick an unused hero image (Unsplash as before, or `SVG/` — read `SVG/MANIFEST.md` first, sheet `8570` is the strongest fit); add the card to the right cluster in `blog.html`; add `sitemap.xml` URL with true `lastmod`; add the `llms.txt` entry; link it from 2 or 3 adjacent posts (and take one inbound link); add the claims log to `growth/content-queue.md`. No `netlify.toml` change is needed (clean-URL rules were removed).

**Queue as of 2026-10-04 (`growth/content-queue.md`):**
- Freshness (updated 2026-10-19 from the dateModified values in the files): the nine posts refreshed on 2026-10-10 are current until 2027-01-08. Six posts are at or past the 90-day SLA: post-perfectionism (due 2026-10-10), post-golden-handcuffs (10-12), post-ai-job-insecurity (10-13), post-effort-reward-imbalance (10-14), post-alone-at-work (10-18), and post-ai-deskilling (due today, 10-19). The 2026-10-16 citability audit listed the first four. The 10.5 table is the 2026-10-05 snapshot and stays stale until the script runs.
- Buyer-intent gaps (updated 2026-10-19): the three pages added on 2026-10-10 (`post-coach-vs-therapist-vs-counsellor`, `post-is-coaching-worth-it-senior-leaders`, `post-work-stress-counselling-mumbai`) close the five buyer-intent queries that the 2026-10-04 queue listed as Gap or Weak. The coverage claim comes from the content queue and was not re-verified in this run.
- Leftovers from earlier runs: `post-ai-work-family-exhaustion` mediation wording may overstate the study; `post-lonely-at-work` (turnover versus intention); older FAQ-versus-schema wording drift on some posts; `post-ai-loneliness` Folk and Dunn 2026 has no link yet; `post-money-anxiety` Fortune reference is secondary; `post-cant-switch-off` techno-stress source is a write-up; `post-cost-of-getting-help` reuses a hero photo and its new `.post-table` has not been seen rendered.
- Strategy gaps from the 2026-07-14 audit: no pillar or hub page per cluster (Pressure and burnout is the biggest at 31 posts and bundles at least four sub-themes); mid-career identity (one of three stated content pillars) has no dedicated cluster.

---

## 12. Design system (`styles.css`, "Notion-style minimal", since 2026-10-07)

The site moved from the "deep-water" v2 look (indigo, dawn gold, Figtree and Bricolage) to a black-and-white minimal system in commit `3027d90` (2026-10-07). The old tokens are gone. Values below were re-read from `styles.css` on 2026-10-12.

```
--bg #ffffff  --bg-alt #fafafa  --ink #000000  --ink-soft #40403f  --ink-faint #767673
--line #000000  --line-soft #e6e6e3
--navy #142850 (the one accent, primary CTAs only)  --navy-press #1f3a6e  --navy-soft #eef1f6
--rag-green #15803d  --rag-amber #9a6700  --rag-red #b42318   (status colours only)
--radius 8px  --radius-sm 4px  --maxw 1040px  --pad clamp(1.25rem, 4vw, 2.5rem)
body Inter; serif accents Newsreader (Google Fonts, the only external stylesheet)
```

- Illustrations: custom Open Peeps style line art. Owner-supplied true-vector versions replaced the homepage and tool art on 2026-10-07 to 2026-10-09 (`dccb20b`, `c69fa77`), and five line-art pieces were placed across the site on 2026-10-11 (`5ab271b`). The retired `peep-*`, `mix-*` and `happy.svg` set in the folder is unused (see BRAND-1 in §15).
- Layout and components still in place: `.post-author` bio card, `.post-table` comparison table, consent banner from `analytics.js`.
- Not re-verified after the redesign (unverified): the accessibility minors from the old phase list (global `:focus-visible`, skip link, Esc closes mobile nav, 44 px nav-toggle target); `growth/design-log.md` phase state; `brand-kit/` assets, which may still show the older palette.

---

## 13. Automation

### 13.1 Scheduled tasks
| Task | Trigger id | Schedule | Writes to |
|---|---|---|---|
| Clearhead site monitor (daily health check) | `trig_01R7kxNJe9hqh3gfWrej88bf` | daily, 08:00 IST | appends an entry to `audits/SITE_HEALTH_LOG.md` (no new files). Confirmed enabled and listed on 2026-10-19 (closes the SCHED-2 question). Re-read 2026-10-26: the stored prompt is unchanged. Its fix rule still ends with `git add -A`, commit and push (MON-2), and it still recommends LinkedIn sharing (DOCTRINE-1); the 10-20 to 10-25 entries repeat that advice |
| Knowledge-map weekly refresh | `trig_01MYmdLUZBWyLdM6kPPjz8uF` | Mondays 09:26 IST (auto-approve, bound to the owner's computer) | updates this file in place and adds a §20 version entry. Its 2026-10-19 run fired on time, but the script step could not read the script (TOOL-1) |
| Clearhead seo audit (citability and technical audit, auto-fix enabled) | `trig_01NHYYdQZXfS3fKvkeBVrjDH` | every 3 days, 09:00 IST | writes `growth/reports/citability-YYYY-MM-DD.md`. Its stored prompt (updated 2026-10-25) allows `audit:` commits and a push only after a deploy-freshness gate; the 2026-10-25 run found no push credentials (push dry-run failed) and stayed report-only (SCHED-1). The 2026-10-19 run finished in about 5 s and wrote `growth/reports/citability-2026-10-19.md`: Critical push-credential gap again, nothing committed, 9 Medium sitemap lastmod items, 5 stale posts. It also left two hidden sitemap caches (`growth/reports/.live-sitemap.xml`, `.origin-sitemap.xml`) in that folder |
| Clearhead blog (named "Blog" in list_triggers) | `trig_01SRPvPNXVSvzzFeuicWzT43` | monthly, 23rd, 09:00 IST; next run 2026-11-23 | one mental-health research post per run; prompt last changed 2026-10-23 and still has no output location or publishing steps (SCHED-2). Folder Zen attached. Model claude-fable-5-1 |

The Eco Happy tasks in the same account are bound to the Araatrika folder, not this one, and are not part of this map.

2026-10-26 check (weekly run): `list_triggers` shows 10 tasks on the account. Four are Clearhead tasks (the monitor, the SEO audit, the blog task and this weekly refresh). Four are Eco Happy tasks and two are personal career radars, none of them in this map. The prompts of the four Clearhead tasks were re-read; the changes are noted above.

2026-10-26 (owner session, v2.5). All four Clearhead tasks are bound to the connected folder `/Users/jain/Documents/Zen`, which is inside iCloud Drive. When the repo moves (GIT-2) the folder of each task must be changed in the Claude desktop app: `update_trigger` has no folder field, and it cannot change the prompt of a task bound to the owner's computer without the owner's approval, which a session that skips approvals cannot give. The prompt-edit note handed to the owner was updated: the monitor's check 8 now expects the ENFORCING security-policy header (a missing one, or a return to report-only, is what to flag), and the SEO audit's owner rules say the policy is enforced. The SEO audit's stored prompt (updated 2026-10-25) does not contain the owner-rules paragraph yet.

2026-10-25 findings. (a) The monitor's stored prompt still ends its fix rules with `git add -A && git commit ... && git push`: if it ever runs with this folder reachable it would commit every uncommitted change, reviewed or not (MON-2). (b) The 25 Oct catch-up runs of the monitor and the SEO audit each finished in about 7 seconds, which suggests they could not reach the Mac, so no real check happened. (c) Changing a task prompt needs the owner's approval, and `update_trigger` was refused in the 2026-10-25 session, so the replacement wording was handed to the owner instead of applied. The monitor prompt needs: stage only the files it edited, never push, no LinkedIn, and new checks (each Netlify form by name on the deployed HTML, the webhook and `csp-report` probes in 7.4, helplines on call, onboard and thank-you, no direct Cal.com link anywhere, no phone or WhatsApp number anywhere). The SEO audit prompt needs an owner-rules paragraph (no phone or WhatsApp, never auto-fix call, onboard, pricing, thank-you, quiz, analytics, `netlify.toml` or the functions, never stage unreviewed work). The blog prompt has no publishing steps, so a finished post never reaches the site (SCHED-2).

2026-10-12 note: the refresh script could not be read from the folder (TOOL-1), so that week's run edited the hand-written sections only.

Weekly procedure: run `PYTHONDONTWRITEBYTECODE=1 python3 -B audits/knowledge_map_refresh.py --apply`, review the printed delta, hand-edit the prose sections that drifted, add a §20 entry, bump the version line. Notify the owner only if something needs them.

### 13.2 Growth skills vs. evidence of output
Growth skills (SEO audit, content, design studio, visibility OS) still write dated reports into `growth/reports/` and `audits/seo-audit-*.md`. These are legacy; do not add new dated files. Consolidation into the living files is offered to the owner (see HYG-3 in §15).

### 13.3 Git pipeline reality
The sandbox has no GitHub push credentials. Commits and pushes are done by the owner. Always call git as `git --no-optional-locks ...`. No stale `.git/index.lock` exists on 2026-10-26 (the refresh script reports none). If one appears, the owner removes it with `rm -f .git/index.lock`; automation cannot delete it.

### 13.4 Monitor tooling gaps and probe commands
- Probes: `curl -sI https://clearhead.in/<path>` for status; sitemap/`llms.txt` via curl; GSC property `sc-domain:clearhead.in` (needs owner auth, never ask for tokens).
- Gaps: monitor image checks include unreferenced files; monitor text recommends LinkedIn (see DOCTRINE-1).

## 14. Live snapshot blocks

### 14.1 Integrity findings
<!-- AUTO:INTEGRITY:BEGIN -->
_(auto-generated by `audits/knowledge_map_refresh.py`; do not hand-edit)_

4 finding(s): 4 Low.

| Severity | Area | Finding |
|---|---|---|
| Low | Content | post-new-city-loneliness.html has no Article.citation entries |
| Low | Hygiene | 51 image/svg files in the site root are referenced by no page, stylesheet or script: VJ.jpg, coaching-early.jpg, coaching-grad.jpg, coaching-mid.jpg, favicon-192x192.png, happy.svg, how-conversation.jpg, mix-1.svg, mix-2.svg, mix-3.svg, mix-4.svg, mix-5.svg, mix-6.svg, mix-7.svg, peep-1.svg, peep-101.svg, peep-105.svg, peep-16.svg, peep-23.svg, peep-25.svg, peep-26.svg, peep-3.svg, peep-32.svg, peep-42.svg, peep-47.svg, peep-56.svg, peep-59.svg, peep-64.svg, peep-66.svg, peep-68.svg, peep-77.svg, peep-8.svg, peep-82.svg, peep-87.svg, peep-90.svg, peep-94.svg, peep-98.svg, scene-alone-together.png, scene-conversation.svg, scene-crowd.svg |
| Low | Hygiene | internal build leftovers are tracked and therefore publicly served: __pycache__/comic-defs.cpython-310.pyc, scripts/__pycache__/contrast.cpython-310.pyc, scripts/contrast.py |
| Low | Linking | 9 post(s) have no inbound links from other posts: post-ai-comparison-exhaustion.html, post-ai-productivity-burnout.html, post-coach-vs-therapist-vs-counsellor.html, post-is-coaching-worth-it-senior-leaders.html, post-layoff-survivor-guilt.html, post-return-to-office-mandate.html, post-work-stress-counselling-mumbai.html, post-workaholism.html, post-workplace-incivility.html |
<!-- AUTO:INTEGRITY:END -->

### 14.2 Git state
<!-- AUTO:GIT:BEGIN -->
_(auto-generated by `audits/knowledge_map_refresh.py`; do not hand-edit)_

Last 20 commits:

| Commit | Date | Subject |
|---|---|---|
| `6217801` | 2026-10-26 | content: remove phone and WhatsApp links; server-side package pricing; CSP report endpoint; analytics URL scrubbing |
| `1f72ee8` | 2026-10-13 | docs: refresh KNOWLEDGE_MAP for the Notion-style design, new illustrations, and 2026-10-12 state |
| `5ab271b` | 2026-10-11 | content: place the five new line-art illustrations across the site |
| `c0b7a89` | 2026-10-11 | content: source two previously unsourced claims (Keyes, Dhingra & Simoes 2010 AJPH on languishing -> later mental illnes |
| `b91ed66` | 2026-10-11 | content: add 3 buyer-intent pages (coach vs therapist, coaching for VPs/directors, work-stress counselling Mumbai) alrea |
| `4d49899` | 2026-10-11 | content: site-wide, remove surname, use Vaibhav only |
| `a5ff733` | 2026-10-10 | content: refresh Andheri West page (work-stress framing, new section, SEO headings); fix sitemap lastmod dates |
| `5272ce5` | 2026-10-10 | Add client onboarding; no part payments |
| `c69fa77` | 2026-10-09 | design: swap all 9 site illustrations for true-vector versions (owner-supplied) |
| `9aff35e` | 2026-10-07 | fix: gutter art on every page, full opacity (no more washed-out look), responsive sizing |
| `02b40f4` | 2026-10-07 | fix: flatten illustration backgrounds to white, sharpen, fill wide-screen gutters, add 3 tool illustrations |
| `10b830d` | 2026-10-07 | fix: convert scene illustrations to plain PNG, fix two real whitespace bugs, place video-call art on pricing |
| `dccb20b` | 2026-10-07 | design: swap homepage illustrations for curated black-ink pieces from the new SVG/ library |
| `3027d90` | 2026-10-07 | design: Notion-style minimal redesign — black/white/navy palette, Inter + Newsreader, custom Open Peeps line-art illustr |
| `5e73ac0` | 2026-10-07 | content: route all booking CTAs (tools, quiz, post-payment) through call.html screening instead of WhatsApp/Cal.com dire |
| `911b558` | 2026-10-04 | content: add post-cost-of-getting-help (is coaching or counselling worth the money; the cost of waiting) |
| `947faba` | 2026-10-02 | chore: gitignore *.zip so stray archives never deploy |
| `d172a69` | 2026-10-02 | content: link the pre-call screening form (/call?via=quiz) from the quiz good-fit result |
| `977b165` | 2026-10-02 | refresh: 11 posts past the 90-day SLA |
| `69a1d22` | 2026-09-27 | Add pre-call screening form |

Files changed in commits since 2026-10-26: none
Uncommitted paths: `CLAUDE.md`, `KNOWLEDGE_MAP.md`, `ai-relevance.html`, `bandwidth.html`, `call.html`, `career-friction.html`, `coaching-andheri-west.html`, `index.html`, `llms.txt`, `netlify.toml`, `onboard.html`, `post-after-hours-messages.html`, `post-ai-comparison-exhaustion.html`, `post-ai-deskilling.html`, `post-ai-job-fear.html`, `post-ai-job-insecurity.html`, `post-ai-loneliness.html`, `post-ai-productivity-burnout.html`, `post-ai-psychological-safety.html`, `post-ai-replaceable-lonely.html`, `post-ai-replacement-dysfunction.html`, `post-ai-work-family-exhaustion.html`, `post-ai.html`, `post-allostatic-load.html`, `post-alone-at-work.html`, `post-bedtime-procrastination.html`, `post-boreout.html`, `post-cant-switch-off.html`, `post-career-insecurity.html`, `post-career-plateau.html`
<!-- AUTO:GIT:END -->

## 15. Open-issues register

| ID | Sev | Issue | Next action |
|---|---|---|---|
| IDX-1 | High | Indexing slow (day 143 on 2026-10-19, §10.6; no new GSC evidence since the 2026-09-20 export) | Owner opens GSC: report indexed count and any manual actions; request indexing; internal links |
| PAY-1 | High | `RAZORPAY_WEBHOOK_SECRET` unset on Netlify, webhook returns 500, no payment confirmation emails. Still open: probes on 2026-10-12, 2026-10-19 and 2026-10-26 all returned 500 "Webhook secret not configured". Even with the secret, confirmation emails need the clearhead.in domain verified in Resend (no DKIM or return-path records exist, 2026-10-25) | Owner sets the env var in Netlify, verifies the domain in Resend, adds the Razorpay webhook (payment.captured and payment.failed) pointing at https://clearhead.in/api/razorpay-webhook, redeploys, then makes a test payment |
| FORM-1 | Low | Form detection fragile (2026-09-27 incident) | Re-probe forms after each deploy |
| GBP-1 | Med | Google Business Profile not verified/confirmed | Owner action |
| AUTH-1 | Low | Author/E-E-A-T signals thin on some posts | Add author cards |
| FRESH-1 | Med | Updated 2026-10-26 (v2.5). The refresh script lists 11 posts past the 90-day SLA: perfectionism, golden-handcuffs, ai-job-insecurity, effort-reward-imbalance, alone-at-work, ai-deskilling, workplace-loneliness-research, flourishing-research, layoff-survivor-guilt, after-hours-messages, allostatic-load; 9 more fall due within 14 days (§10.5, §11). The citability audit of 2026-10-25 listed 10 (allostatic-load fell due on 2026-10-25) | Refresh substantively; set dateModified, `<time>` and sitemap lastmod together |
| GAP-1/2/3 | Low | Content gaps listed in §11 | Queue posts |
| CLUSTER-1 | Low | Blog cluster imbalance | Rebalance |
| MON-1 | Low | Monitor tooling gaps (§13.4) | Fix monitor prompt |
| DOC-1 | Low | `SETUP-DASHBOARD-STEPS.md` lists 6 forms; real count is 10 | Update legacy doc (the file is readable again since the 2026-10-26 download, see GIT-2) |
| DOC-2 | Low | Legacy docs outdated (§19) | Archive or refresh |
| HYG-1 | Low | `netlify/functions/*.js`, `scripts/`, `__pycache__/` publicly served | Block in `netlify.toml` |
| HYG-2 | Low | 35 unreferenced image/SVG files | Owner decides on removal |
| HYG-3 | Low | Dated report files in `growth/reports/` and `audits/` | Consolidate on request |
| SEC-1 | Med | Public exposure of function source | Same fix as HYG-1 |
| SITEMAP-1 | Low | Sitemap/page set drift check | Weekly script |
| LINK-1 | Low | Internal link checks | Weekly script |
| CITE-1 | Low | Citation/AEO coverage | Review |
| DOCTRINE-1 | Med | Monitor text recommends LinkedIn; doctrine forbids it. Still present in the 2026-10-11 to 2026-10-18 monitor entries and in the stored monitor prompt (confirmed 2026-10-19); repeated in the 10-20, 10-21, 10-22, 10-23 and 10-25 entries and still in the prompt on 2026-10-26 | Remove from the daily monitor prompt |
| SPAM-1 | Low | Form spam probes | Monitor |
| BRAND-1 | Low | Retired illustration set still in repo | Owner decides |
| TOOL-1 | Low | Opened 2026-10-12. The refresh script and some git objects were unreadable because iCloud had evicted them ("Resource deadlock avoided", git bus errors), so the weekly `--apply` did nothing and the AUTO blocks stayed at 2026-10-05. Mitigated 2026-10-26: the 885 evicted files were downloaded, the script ran, and the AUTO blocks now carry 2026-10-26 data. Two bugs in the script were fixed the same day: the first uncommitted path lost its first letter, and the forms `client-onboarding` and `payment-record` were reported as undocumented | Confirm on the Monday 2026-11-02 run that the script is readable and `--apply` prints a delta, then move this to the resolved log. It can come back until the repo leaves iCloud Drive (GIT-2) |
| SCHED-1 | Med | Opened 2026-10-12, still open 2026-10-19. Scheduled task "Clearhead seo audit" is set to auto-fix, and its prompt says to commit and push `audit:` commits. §0.3 says automation never pushes. The 2026-10-16 audit found no GitHub push credentials in the scheduled environment (Critical), so no push could happen; the risk returns if credentials are ever added. The prompt was rewritten on 2026-10-25 with a deploy-freshness gate, and the 2026-10-25 run again found no push credentials (dry-run failed) | Owner decides: remove the push step from that task's prompt, or confirm that pushes are wanted |
| SCHED-2 | Low | Opened 2026-10-12. The blog task (monthly, next run 2026-10-23) has no output location in its prompt and no publishing steps (copy the newest post as template, add its card to `blog.html`, update `sitemap.xml` and `llms.txt`, run `growth/tools/citability_audit.py`, leave everything uncommitted for the owner). The site-monitor task is now confirmed enabled and listed (2026-10-19), so that part is closed. Ready-to-paste publishing steps were written on 2026-10-25 and handed to the owner in chat (a task prompt cannot be changed from a session that skips approvals). Re-checked 2026-10-26: the blog task's prompt was last changed on 2026-10-23 and still has no output location or publishing steps | Owner: paste the steps into the blog task prompt, or confirm the task is no longer wanted |
| CONTENT-1 | Low | Opened 2026-10-12. Three new buyer-intent posts and nine refreshed posts are in (commits `b91ed66` and earlier, 2026-10-10 and 2026-10-11). Post count re-counted 2026-10-19: 61 files. The AUTO table is still stale | Re-apply the refresh after TOOL-1 is fixed |
| DESIGN-1 | Low | Opened 2026-10-12. The 2026-10-07 redesign replaced the tokens this map described. §12 was rewritten; `brand-kit/` may still show the old palette | Owner or next design session: check `brand-kit/` against the new look |
| SURNAME-1 | Low | Opened 2026-10-19. The site-wide surname removal (commit `4d49899`, 2026-10-11) may weaken entity consistency for the Person schema and for any external profile that uses the full name. The 2026-10-16 citability audit asked for a human look | Owner: decide whether full-name signals return (see §2); check external profiles for the full name (unverified) |
| SITEMAP-2 | Low | Opened 2026-10-19. Nine sitemap `lastmod` values (2026-10-10) differ from the 2026-10-11 surname commit. The 2026-10-16 audit calls this cosmetic and recommends no bump. The 2026-10-25 site-wide copy edits (blog invite line, WhatsApp removal) deliberately did not bump `lastmod` or `dateModified`, and neither did the 2026-10-26 edits (15-minute call, no WhatsApp support, homepage headline); the citability audit run on 2026-10-26 counts 16 Medium items of this kind | Owner or next content run: decide whether to bump lastmod and dateModified together, or leave them |
| FORM-2 | High | Opened 2026-10-25. Email notifications for the 10 forms are unverified (documented off on 2026-07-14). `call-screening` and `client-onboarding` carry safety answers (self-harm thoughts, crisis, treatment) | Owner turns notifications on for all ten in the Netlify dashboard and submits a test |
| MON-2 | High | Opened 2026-10-25. The monitor prompt's fix rule ends with `git add -A && git commit && git push` (see 13.1) | Still in the stored prompt on 2026-10-26. Owner replaces it before any run can reach the Mac |
| MON-3 | Low | Opened 2026-10-26. The monitor trend table has no 2026-10-24 entry. The 2026-10-23 entry ran from the cloud container because the device shell was not ready, so its SEO checks covered 7 core files only | Owner confirms the Mac is reachable at the 08:00 IST runs; no action unless it repeats |
| CAL-1 | Med | Opened 2026-10-26. The free call is 15 minutes everywhere on the site, but the Cal.com event behind the slug `30min` (used by `call.html` for every free booking) is still set up as a 30-minute event on the Cal.com side (public booking page checked 2026-10-26: event title "30 min meeting", 30 minutes), which only the owner can change | Owner sets that event's length to 15 minutes in Cal.com and renames the event, because its title is shown to bookers and in their confirmation emails. Renaming the slug is optional; if done, update the default slug in `call.html` and the whitelist described in section 3 |
| ONB-1 | Med | Opened 2026-10-25. No page links to `onboard.html` except the post-payment panel | Send the link after each free call, or add it to the Cal.com confirmation email |
| CSP-1 | Med | Opened 2026-10-25. The security policy is ENFORCED since 2026-10-26 in `netlify.toml`; it goes live when the owner pushes. Before enforcing, a browser probe found that GA4's `www.google.com/g/collect` beacon would have been blocked, so `www.google.com` and `analytics.google.com` were added to `connect-src`, and `form-action` also allows `https://*.razorpay.com`. Scripts and styles keep `'unsafe-inline'`, so the policy does not stop an injected inline script (replaces the CSP half of SEC-1) | After the push, read the function log (Netlify > Functions > csp-report, search `[csp-report]`) for a week or two. A line that names a real site resource means something legitimate is blocked: add its host, or roll back by renaming the header to `Content-Security-Policy-Report-Only`. First review about 2026-11-09 |
| PRIV-1 | Med | Opened 2026-10-25. The privacy policy was rewritten to match the real data flows (screening and onboarding health answers, Cal.com booking notes, Netlify Forms, Resend, Google Fonts, Maps, Unsplash, local storage). It is legal text written without a lawyer. Google Fonts and Unsplash images still load for every visitor before any consent choice | Owner reads it; consider legal review; consider self-hosting fonts and images |
| GIT-2 | Med | Opened 2026-10-25. The repo lives in iCloud Drive, which evicts files to the cloud: they then fail to read ("Resource deadlock avoided") and git hit bus errors. 2026-10-26: all 885 evicted files were downloaded again, so every file reads now, but macOS can evict them again (the Mac's disk was 91% full). A copy was checked in a scratch area: `git fsck --full --strict` clean; `git gc` packs 2,109 loose objects into one 13 MB pack and removes 169 leftover `tmp_obj_*` files and 34 unreachable old commits (each a rebased or amended duplicate of a commit on `main`, or touching only the untracked `audits/` reports); the working tree is byte-identical (1,319 files). The move itself is NOT done: creating a new folder in the home directory needs the owner's approval, which an unattended session cannot get | Owner runs the "Move the repo out of iCloud Drive" runbook in §17 (six steps, about two minutes), then changes the folder of the four Clearhead scheduled tasks to `~/Developer/Zen` (the folder name stays `Zen`, so `$HOME/mnt/Zen` keeps working) and deletes `~/Documents/Zen` after a week. Until then: Finder > right-click the folder > Keep Downloaded |
| REVIEW-1 | Med | Opened 2026-10-25. New behaviour written under "fix all" that the owner has not reviewed: the refund wording on pricing.html, the payment success panel and its same-tab redirect, the client agreement as a follow-up rather than a gate, the onboarding outcome logic, prices held in three places (pricing.html and two functions), the dropped "Send an enquiry" link on the bandwidth and career pages, the homepage stat "1:1 private sessions", the homepage headline (rewritten 2026-10-26 to "Private by default.", with the paragraph under it naming the two exceptions and linking to `terms.html#confidentiality`), the free call cut to 15 minutes, the onboarding agreement without any between-session contact (version `v2-2026-10-26`), and the enforced security policy (CSP-1) | Owner reads each on the deployed preview and says what to change |

Resolved log:
- **OWN-1**, resolved 2026-10-26 by the owner's decision: no WhatsApp support. The promise is out of `pricing.html` (the three package lists), the homepage package line, the onboarding agreement (the sentence was deleted; `agreement_version` is now `v2-2026-10-26`), one post and the privacy policy (now: the number is used for operational messages only, and no support or coaching is offered over WhatsApp; last updated 26 October 2026). The screening and onboarding forms still ask for the visitor's phone number (label "Phone number"; the field name `whatsapp` is kept so earlier submissions line up). Uncommitted at the time of writing. The agreement and privacy wording is legal text written without a lawyer and needs the owner's review (REVIEW-1, PRIV-1).
- **COMMIT-1**, resolved 2026-10-26. The v2.3 work is committed as `6217801` on `main`, `netlify/functions/csp-report.js` is tracked, `git status` is clean and the local branch matches its `origin/main` tracking ref. The `csp-report` endpoint answering 204 on the live site shows the code is deployed. The test payment that the item asked for is still owed (PAY-1 covers the webhook side).
- **GIT-1**, resolved 2026-10-12. The stale `.git/index.lock` is gone (no `.git/*.lock` in the folder on that date). Local HEAD equals the `origin/main` tracking ref at `5ab271b`, so nothing is waiting to be pushed. Re-check next run, because `git rev-list` hit a bus error in the sandbox.

## 16. House rules
1. Do not create new files unless the owner explicitly asks. Update the living files only.
2. Never enter or request tokens or passwords; list `.env` names only, never values.
3. Never delete without permission; use `mv -n` into `_to_delete/` if needed.
4. No LinkedIn in any recommendation (doctrine).
5. Use `git --no-optional-locks`; do not commit or push unless asked.
6. Clinical boundary: no medical claims; see §2.
7. Never publish a phone or WhatsApp number, a `wa.me` or `tel:+91` link, or a `telephone` schema field (owner decision 2026-10-25). The public routes are hello@clearhead.in, the contact form and the booking flow.
8. Never put personal data (names, answers, payment IDs) into a URL. `analytics.js` strips query strings except `via`, `cal` and `utm_*`, but the safest URL carries nothing personal.

## 17. Runbooks
- **Weekly map refresh:** §13.1.
- **Daily health check:** probe pages, forms, functions, sitemap; append to `audits/SITE_HEALTH_LOG.md`; notify only on problems.
- **Payment issue:** check Netlify env names, function logs, Razorpay dashboard webhook delivery.
- **Deploy check:** confirm latest commit on GitHub equals live Netlify deploy.
- **Security-policy check:** read the `csp-report` function log in Netlify (search `[csp-report]`). The policy has been enforced since 2026-10-26, so a line that names a real site resource means a legitimate host is being blocked: add it to the matching directive in `netlify.toml`, or roll back by renaming the header to `Content-Security-Policy-Report-Only` (§6, CSP-1).
- **Move the repo out of iCloud Drive (GIT-2), owner, once, in Terminal:** (1) In Finder, right-click the `Zen` folder in iCloud Drive and choose Keep Downloaded. (2) `mkdir -p ~/Developer`. (3) `rsync -a --exclude='/.git/.audit_write_test' --exclude='/.git/*.lock.bak*' --exclude='/.git/*.lock.stale*' --exclude='/.git/*.lock.rm-*' --exclude='/.git/_probe_*' --exclude='/.git/testwrite' --exclude='/.git/objects/maintenance.lock*' ~/Documents/Zen/ ~/Developer/Zen/`. (4) `cd ~/Developer/Zen && git fsck --full && git gc && git status --short | wc -l`: fsck prints only notices about unreachable objects, and the count equals the number of changed files before the move. (5) In the Claude desktop app change the folder of the four Clearhead scheduled tasks to `~/Developer/Zen`, and replace `~/Documents/Zen` in their prompts. (6) Keep `~/Documents/Zen` for a week, then delete it. These steps were tested on a copy on 2026-10-26: fsck clean, gc fine, files byte-identical.

## 18. Contacts and identifiers
- Email hello@clearhead.in; Lokhandwala Complex, Andheri West, Mumbai 400053; hours Mon–Sat 09:00–19:00. No phone or WhatsApp number is published anywhere on the site (owner decision 2026-10-25).
- Cal.com `vaibhavjain`; GitHub `vaibhav-labs/clearhead`; Netlify site `effervescent-meerkat-1f9826`; GSC `sc-domain:clearhead.in`.

## 19. Legacy docs index
`AUDIT_CHANGES.md`, `MANUAL_PUSH_INSTRUCTIONS.md`, `PAYMENT_FIX_SUMMARY.md`, `SETUP-DASHBOARD-STEPS.md` (lists 6 forms, real count 8). Older dated `audits/site-health-*.md` and `seo-audit-*.md` remain as history.

## 20. Version log (newest first)

### v2.5 — 2026-10-26 (owner session, not a weekly run)

Five owner requests, done after the weekly run of the same day. Everything below is in the working tree and **nothing is committed or pushed**; 79 files differ from `6217801` (the site files, `netlify.toml`, this map and `CLAUDE.md`).

**1. No WhatsApp support.** The sentence "WhatsApp support between sessions" is gone from the three package lists on `pricing.html`, the homepage package line, the onboarding agreement (the sentence was deleted, so the agreement is now silent about contact between sessions; `agreement_version` is `v2-2026-10-26`) and one post. `privacy-policy.html` (last updated 26 October 2026) now says the number is used for operational messages only and that no support or coaching is offered over WhatsApp. The screening and onboarding forms still ask for the visitor's phone number: the label says "Phone number" and the field name `whatsapp` is kept so earlier submissions line up (OWN-1 resolved).

**2. Free call is 15 minutes everywhere.** Homepage, `pricing.html` (meta description, lede, H2, button), `quiz.html`, `thank-you.html`, `tools.html`, the five tool pages, `coaching-andheri-west.html`, the `call.html` step text, `llms.txt` and the invite block of all 61 posts ("I keep a free, unhurried 15 minutes for exactly this."). The Cal.com slug `30min` is unchanged in code; the Cal.com event itself must be shortened and renamed by the owner (CAL-1; on 2026-10-26 its public page still showed "30 min meeting", 30 minutes).

**3. Homepage headline.** "Nothing leaves this room." is replaced by "Private by default." The paragraph under it names the two exceptions (imminent serious harm, a court order) and links to `terms.html#confidentiality`. The note under each post's invite now reads "Private by default, with two narrow exceptions (see the Terms)".

**4. Security policy enforced.** The header in `netlify.toml` is now `Content-Security-Policy`. Details, the two hosts added after the probe and the one-word rollback are in §6 and CSP-1.

**5. iCloud Drive.** All 885 evicted files were downloaded again. A copy of the repo was checked in a scratch area: `git fsck --full --strict` clean, `git gc` fine, files byte-identical. The move itself is not done, because creating a folder in the home directory needs the owner's approval; the steps are in §17 and GIT-2.

**Verification.** The nine earlier browser and function suites give the same results as before the changes (29 and 56 function checks; browser suites 20, 22, 39, 28, 8, 162 and 23 checks), and a new 48-check suite for these changes passes. Static scans on the working tree: 206 JSON-LD blocks valid, 2,601 internal references with no broken link or fragment, no phone number in any deployable file, no WhatsApp-support wording, all 10 forms registered, helplines present on `call.html`, `onboard.html` and `thank-you.html`, prices unchanged (`data-amount` 2600000, 3600000, 6600000, matching `PLANS` in both functions). The 37 files used in the browser tests are byte-identical to the files on disk. The citability audit finds no Critical or High item.

**File fingerprints (sha256, first 8 characters), 2026-10-26, after the changes:** `netlify.toml=9be9aa08`, `pricing.html=1024a9aa`, `quiz.html=1b415a4e`, `call.html=dcd8e7b6`, `styles.css=a339a369`, `analytics.js=803f89aa`, `anim.js=fed0ab96`, `package.json=dc0db772`, `create-order.js=24abbf3d`, `verify-payment.js=7ed25ccc`, `razorpay-webhook.js=be297a7a`, `csp-report.js=dfc34385`, `robots.txt=57d1f013`, `llms.txt=b8a0a5a7`, `index.html=10807732`, `onboard.html=5ec66064`, `privacy-policy.html=b2a51f00`.

**Refresh script.** It could be read again after the download and rewrote the AUTO blocks. Two bugs in `audits/knowledge_map_refresh.py` were fixed: the first uncommitted path lost its first letter (`NOWLEDGE_MAP.md`), and the forms `client-onboarding` and `payment-record` were reported as undocumented. The integrity block now lists 4 Low findings and no High one.

**Scheduled tasks.** No prompt could be changed (approval cannot be given in a session that skips approvals). The prompt-edit note for the owner was updated: the monitor's check 8 now expects the enforcing header, and it has a new section for the folder move.

**Map edits.** Version line; §2 (offer ladder, packages); §3 (funnel steps and the 15-minute wording); §4 (functions 4, forms 10, repo row, iCloud note); §6 (headers); §13.1 and §13.3; §15 (OWN-1 resolved; CAL-1 new; CSP-1, GIT-2, TOOL-1, FRESH-1, SITEMAP-2, REVIEW-1, DOC-1 updated); §17 (security-policy check and the move runbook); this entry and the metrics row. `CLAUDE.md` was updated to match.

**Pending owner decisions.** (1) Review `git diff`, commit and push, then watch the `[csp-report]` log for a week or two (CSP-1). (2) Set the Cal.com `30min` event to 15 minutes (CAL-1). (3) Run the §17 move runbook and repoint the four scheduled tasks (GIT-2). (4) Read the legal wording that changed: the onboarding agreement and the privacy policy (REVIEW-1, PRIV-1). (5) Still open from before: PAY-1, FORM-2, MON-2, DOCTRINE-1, IDX-1.

### v2.4 — 2026-10-26

Weekly run, partial. The refresh script still cannot be read from the folder (TOOL-1). `--apply` exits 0 with no output and the file is unchanged, so the AUTO blocks in §1, §5, §10.5 and §14 still hold the 2026-10-05 snapshot. They were not hand-edited.

**What changed on the site, 2026-10-19 to 2026-10-26.** One commit in the window: `6217801` (2026-10-26), which carries the v2.3 workflow fixes (phone and WhatsApp links removed, server-side package pricing, the `csp-report` endpoint, analytics URL scrubbing). The tracked-file check confirms the 2026-10-10 buyer-intent posts and the `csp-report.js` function are in git. `git status` is clean. Package prices are unchanged on `pricing.html` (`data-amount` 2600000, 3600000, 6600000) and match `PLANS` in `create-order.js`. The pricing copy still says "WhatsApp support between sessions" (OWN-1).

**Live probes, 2026-10-26.** `create-order` 400 (expected for an empty body), `verify-payment` 405, Razorpay `checkout.js` 200, `razorpay-webhook` 500 "Webhook secret not configured" (PAY-1 still open), `csp-report` POST 204 and GET 405, homepage and `call.html` 200, `KNOWLEDGE_MAP.md` 404 (hidden as intended).

**File fingerprints (sha256, first 8 characters), 2026-10-26.** Changed since the v2.2 record: `netlify.toml=73cde3cb`, `create-order.js=24abbf3d`, `verify-payment.js=7ed25ccc`, `razorpay-webhook.js=be297a7a`, `analytics.js=803f89aa`, `llms.txt=1de41a41`, `pricing.html=b8192813`, `quiz.html=fa45b9a6`, `call.html=ef37ffcf`, `styles.css=a339a369`. New: `netlify/functions/csp-report.js=dfc34385`. Unchanged: `anim.js`, `package.json`, `robots.txt`. For the changed files, only targeted checks were run this time (the CSP header is still report-only and points at `/api/csp-report`; `PLANS` and the webhook secret check are as documented). The full files were not re-read, so their content beyond those checks is unverified.

**Scheduled tasks (`list_triggers`, 2026-10-26).** The account has 10 tasks. Four are Clearhead tasks and are covered in §13.1. The site monitor's prompt is unchanged, and its fix rule still ends in a push (MON-2). The SEO audit's prompt was rewritten on 2026-10-25 with a deploy-freshness gate; its 2026-10-25 run found no push credentials and stayed report-only. The blog task's prompt was last changed on 2026-10-23 and still has no publishing steps. The weekly refresh prompt is unchanged. The other six tasks (four Eco Happy, two personal career radars) are outside this map.

**Indexing.** No new Search Console export. The newest export is still `clearhead.in-Coverage-Drilldown-2026-09-20.xlsx`. The count is day 150 from 2026-05-29. The indexed count is still unknown.

**Monitor and content.** Monitor entries for 2026-10-18 to 2026-10-25 read HEALTHY, with no entry for 2026-10-24. The citability audit of 2026-10-25 reports no High or Critical item on the site, a Critical push-credential gap in automation, 9 Medium sitemap lastmod items (SITEMAP-2) and 10 posts past the 90-day SLA (§10.5).

**Map edits.** Version line; §7.1, §7.3 (probes repeated); §10.5 (hand note on the stale AUTO table); §10.6 (row for 2026-10-26); §13.1 (task notes and the 2026-10-26 check); §15 (COMMIT-1 resolved and moved to the resolved log; PAY-1, MON-2, DOCTRINE-1, OWN-1, TOOL-1, SCHED-1, SCHED-2, FRESH-1 and CSP-1 updated; MON-3 added); §20 and the metrics table.

**Pending owner decisions.** (1) Set `RAZORPAY_WEBHOOK_SECRET`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `INTERNAL_NOTIFY_EMAIL` in Netlify, verify the domain in Resend, add the Razorpay webhook, then make a test payment on the `6217801` deploy (PAY-1). (2) Replace the monitor prompt's fix rule and its LinkedIn wording (MON-2, DOCTRINE-1). (3) Decide whether the SEO audit keeps its push step (SCHED-1) and supply the blog task's publishing steps (SCHED-2). (4) Decide the "WhatsApp support between sessions" copy and the required WhatsApp field on `onboard.html` (OWN-1). (5) Open Search Console and report the indexed count and any manual actions (IDX-1). (6) Turn on form notifications for all ten forms (FORM-2). (7) Release the lock on `audits/knowledge_map_refresh.py` so the next run can apply the refresh (TOOL-1). (8) Refresh the ten overdue posts (FRESH-1).

### v2.3 — 2026-10-25

Manual workflow-fix session, not a weekly run. A full audit of every visitor workflow ("fix all") found broken, unsafe or untrue paths, and each one was fixed in place and then tested. **Nothing is committed or pushed.** 88 tracked files are modified and `netlify/functions/csp-report.js` is new and untracked (COMMIT-1). The AUTO blocks were not touched and still hold the 2026-10-05 snapshot. Hand-edited this session: the version line, §2, §3, §5.3, §6, §7, §8, §9, §13.1, §15, §16 (rules 7 and 8), §17 and this log. `CLAUDE.md` carries the matching guardrails.

**Owner instruction.** The owner's phone and WhatsApp number were removed from the whole site: the footer line on 77 pages, the WhatsApp button and its CSS, and every `wa.me` and `tel:+91` link. A scan of every file that deploys finds no copy of the number and none of `wa.me`, `api.whatsapp.com`, `tel:+91` or `telephone`. The only `tel:` links left are the public Tele-MANAS helpline. §16 rule 7 forbids adding any of it back, and automation must never "fix" a missing number. The number can still exist in git history, in untracked internal files (`growth/`, `audits/`, `clearhead_proposed/`) and in external listings (OWN-1).

**Booking and safety.** On `call.html` a fast double tap can no longer skip the self-harm question, and a failed save is retried once, then shown to the visitor and written into the Cal.com notes as "NOT saved to my inbox" (event `lead_save_failed`). Buyers who have paid are recognised from `via=paid-<plan>`: they still answer the safety questions, they are no longer told the call is free, and the payment ID travels in the Cal.com notes. Crisis and clinical answers still end the booking and show Tele-MANAS 14416 and 112. `thank-you.html` now shows the helpline and no longer pushes payment. The quiz accepts international phone numbers.

**Payments.** The price is set on the server from the plan name, `verify-payment` checks the signature, and the reworked `razorpay-webhook` works out the package from the amount (never guessing, flagging any mismatch for a manual check), emails the customer and the owner through Resend, stays at 200 when email fails (with a loud log marker), and sends nothing for replayed or wrongly signed bodies. `pricing.html` posts a `payment-record` entry after a verified payment and offers `onboard.html` in the success panel. The three package prices must agree in three places: `data-amount` on pricing.html and `PLANS` in `create-order.js` and `razorpay-webhook.js` (2600000, 3600000 and 6600000 paise).

**Onboarding and funnel leaks.** `onboard.html` used to be disconnected from the rest of the site and could end on an unsafe message. It is now offered from the payment success panel, retries and reports save failures, and its crisis outcome shows the helplines and never pushes payment. The invite at the end of all 61 posts no longer promises "No forms" (it says a few quick questions come first), and the homepage FAQ, the Andheri page FAQ, `llms.txt` and the overwork-brain post no longer describe booking as a direct calendar link. The five scored tools save their leads with a visible failure path, show results straight away, and send `call.html?via=<tool>` links.

**Claims made true.** Confidentiality now reads the same on the homepage (FAQ, JSON-LD and the safe band), the quiz and `terms.html#confidentiality`: confidential, with two narrow exceptions (clear and imminent risk of serious harm, or a court order). The privacy policy (last updated 25 October 2026) was rewritten to match the real data flows (PRIV-1). The homepage contact aside and disclaimer band carry the crisis line.

**Measurement.** `analytics.js` strips personal data from the page address it sends to Google (quiz answers and payment IDs used to travel in `page_location`; now only the path and `via`, `cal` and `utm_*` survive), `book_call_click` matches `call.html` links, `quiz_start` and `quiz_complete` were added, and `lead_save_failed` is sent by the screening, onboarding and tool forms. The full event list is in §9.

**Security policy.** The report-only Content-Security-Policy in `netlify.toml` was rewritten. The old one would have blocked Razorpay's checkout script, frames and logging hosts and the Google Maps frame on the day it was enforced. The new one was tested against the real checkout script, Google Fonts, Maps and GA4 and recorded zero violations in ten page scenarios. The new `csp-report` function (route `/api/csp-report`) writes one log line per violation, so the policy can be enforced after one or two quiet weeks (CSP-1).

**Verification, 2026-10-25.** All automated checks pass against the final files: 85 function checks (29 payment and webhook, 56 `csp-report`) and 302 browser checks (call flow 20, paid booking 22, pricing and checkout 39, onboarding 28, misc 8, the five tools 162, measurement 23). Static checks: 79 pages, 206 JSON-LD blocks all valid, 2,539 internal references with no broken link or fragment, all 72 sitemap URLs exist, 10 forms declared with a honeypot and no unregistered form name in any script, no Cal.com link outside `call.html` (apart from the `book_call_click` selector in `analytics.js`), and no em dash or curly quote in any added site line. `growth/tools/citability_audit.py` reports no High or Critical item (9 Medium, all the old SITEMAP-2 dates). Not testable from here: Netlify Forms on the live server, Resend delivery, the Razorpay dashboard webhook and the live function logs.

**Scheduled tasks.** No task prompt could be changed (approval cannot be given in a session that skips approvals). The text to paste was handed to the owner in chat: the monitor's `git add -A ... git push` fix rule (MON-2), LinkedIn removal (DOCTRINE-1), new monitor checks for the webhook, `csp-report`, forms and the owner rules, the SEO audit's owner-rules paragraph, and the blog task's missing publishing steps (SCHED-2). The monitor and the SEO audit both finished their 2026-10-25 catch-up runs in about 6 seconds, so they most likely did not reach the Mac; check that the next run does real work.

**Pending owner decisions.** (1) Review `git diff`, add the new file, commit and push, then make a test payment (COMMIT-1). (2) Set `RAZORPAY_WEBHOOK_SECRET`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `INTERNAL_NOTIFY_EMAIL` in Netlify, verify the domain in Resend (DKIM, SPF and return-path DNS records), and add the Razorpay webhook for `payment.captured` and `payment.failed` (PAY-1). (3) Turn on email notifications for all ten forms (FORM-2). (4) Paste the prompt edits into the monitor, SEO audit and blog tasks (MON-2, SCHED-2). (5) Decide on the "WhatsApp support between sessions" package copy and update external listings that may still show the number (OWN-1). (6) Send the onboarding link after each free call (ONB-1). (7) Read the `[csp-report]` log, then enforce the policy (CSP-1). (8) Read the privacy policy and the items in REVIEW-1 (PRIV-1). (9) Move the repo out of iCloud Drive (GIT-2).

### v2.2 — 2026-10-19

Partial weekly run again. The refresh script could not be read from the folder (TOOL-1). `--apply` returned no output and exit 0, and `cat` on the script still fails with "Resource deadlock avoided", so the AUTO blocks were not regenerated and their effect cannot be verified. The hand-written sections were updated from the git log, the health log, the scheduled-task list, live probes and the files themselves.

**What changed on the site, 2026-10-12 to 2026-10-19.** No site content or code changed. The last site commit is `5ab271b` (2026-10-11). The only later commit is `1f72ee8` (2026-10-13), which changed this map. Local HEAD equals origin/main (0 ahead, 0 behind), and the working tree is clean. The post count is 61 and the sitemap lists 72 URLs. The daily monitor entries for 10-13, 10-15, 10-16, 10-17 and 10-18 report HEALTHY, with indexing as the only High item (10-14 has no entry).

**Live probes, 2026-10-19.** `create-order` returned 400 (expected for an empty body), `verify-payment` returned 405, the Razorpay `checkout.js` returned 200, and `razorpay-webhook` returned 500 "Webhook secret not configured". PAY-1 is still open.

**File fingerprints (sha256, first 8 characters), 2026-10-19.** Unchanged since v2.0: `netlify.toml=76ca5e3a`, `create-order.js=2775acdf`, `verify-payment.js=e549b137`, `razorpay-webhook.js=67721681`, `analytics.js=b5449720`, `anim.js=fed0ab96`, `package.json=5d2d9cd2`, `robots.txt=57d1f013`. Changed since v2.0: `llms.txt=569b0f03` (was 851673e1; surname removal, 10-11). Changed since v2.0 and first recorded here: `pricing.html=87bdd1b6`, `quiz.html=61a4d4bf`, `call.html=37e5ec7b`, `styles.css=a2a0ed4f`. None of the fingerprinted site files has a modification time after 2026-10-12 04:00, so the v2.1 re-read caveat still applies only to the content of those four files, which was not re-read in full in this run. Pricing is unchanged: `data-plan` starter, going-deeper, long-game with `data-amount` 2600000, 3600000 and 6600000.

**Scheduled tasks, 2026-10-19 (list_triggers).** Four Clearhead tasks are enabled: the site monitor (daily, now confirmed listed), the SEO audit (every 3 days, auto-fix on), the blog task (monthly, next run 2026-10-23) and this weekly refresh. Three of them show an `updated_at` stamp of 2026-10-19 04:44 UTC, minutes before this run fired. The cause is unverified, and this run found no change to their prompts. The SEO audit's 2026-10-19 report (`growth/reports/citability-2026-10-19.md`) appeared during this run and repeats the 10-16 push-credential Critical; it reports 5 stale posts (ai-deskilling not yet over 90 days) and nine Medium sitemap lastmod items that it judges likely cosmetic.

**Indexing.** No new Search Console export is in the folder. The monitor counter reads day 143 today. All tracked pages return 200. The indexed count is still unknown and needs the owner.

**Content.** The nine posts refreshed on 2026-10-10 are current until 2027-01-08. Six posts are at or past the 90-day SLA: post-perfectionism, post-golden-handcuffs, post-ai-job-insecurity, post-effort-reward-imbalance, post-alone-at-work and post-ai-deskilling (due today). Their dateModified values were checked in the files.

**Map edits.** Version line; §7.3 (probe repeated); §10.6 (new row); §11 (freshness and buyer-intent lines); §13.1 (task table rewritten from list_triggers); §15 (IDX-1, PAY-1, FRESH-1, TOOL-1, SCHED-1, SCHED-2, DOCTRINE-1, CONTENT-1 updated; SURNAME-1 and SITEMAP-2 added). The AUTO blocks in §1, §5, §10.5 and §14 are still the 2026-10-05 snapshot and were deliberately not hand-edited.

**Pending owner decisions.** (1) Set `RAZORPAY_WEBHOOK_SECRET` in Netlify and redeploy (PAY-1). (2) Release whatever holds `audits/knowledge_map_refresh.py` so the next run can apply the refresh (TOOL-1). (3) Open Search Console and report the indexed count and any manual actions (IDX-1). (4) Decide whether the SEO audit task keeps its push step (SCHED-1), and remove the forbidden channel from the monitor prompt (DOCTRINE-1). (5) Decide whether full-name signals return (SURNAME-1).

### v2.1 — 2026-10-12

Partial weekly run. The refresh script could not be read (TOOL-1), so the AUTO blocks were not regenerated. Hand-written sections were updated from the git log, the health log and live probes.

**What changed on the site, 2026-10-05 to 2026-10-12.** On 10-07 the site got a Notion-style minimal redesign (`3027d90`), all booking CTAs were routed through `call.html` (`5e73ac0`), and the illustration passes landed (`dccb20b`, `10b830d`, `02b40f4`, `9aff35e`, `c69fa77`). On 10-10 the client onboarding page and the no-part-payments wording were added (`5272ce5`) and the Andheri West page was refreshed (`a5ff733`). On 10-10 and 10-11 nine posts were re-dated, three buyer-intent posts were added (`b91ed66`), two claims were sourced (`c0b7a89`), the surname was removed site-wide (`4d49899`), and five line-art illustrations were placed (`5ab271b`). Pricing `data-amount` values are unchanged (2600000, 3600000, 6600000). The folder has no new GSC export since 2026-09-20.

**Live probes, 2026-10-12.** `create-order` returned 400 (expected for an empty body), `verify-payment` returned 405, the Razorpay `checkout.js` returned 200, and `razorpay-webhook` returned 500 "Webhook secret not configured". PAY-1 is therefore still open. The health log for 10-12 reads HEALTHY, with indexing as the only High item (day 136).

**File fingerprints.** Changed since v2.0: `pricing.html`, `quiz.html`, `call.html`, `styles.css`. Their content changes match the commits above, but the full files were not re-read in this run (unverified beyond the commit messages). Unchanged: `netlify.toml`, `create-order.js`, `verify-payment.js`, `razorpay-webhook.js`.

**Map edits.** §5.2 (61 posts and the three new ones), §12 (design tokens rewritten), §13.1 (two Clearhead scheduled tasks added, plus a note on the monitor task), §15 (PAY-1 reconfirmed, IDX-1 at day 136, GIT-1 resolved, DOCTRINE-1 still open, new TOOL-1, SCHED-1, SCHED-2, CONTENT-1 and DESIGN-1).

**Pending owner decisions.** (1) Set `RAZORPAY_WEBHOOK_SECRET` in Netlify and redeploy (PAY-1). (2) Decide whether the scheduled SEO audit may push commits (SCHED-1). (3) Release the lock on `audits/knowledge_map_refresh.py` so the next run can apply the refresh (TOOL-1). (4) Open Search Console and report the indexed count (IDX-1).

### v2.0.1 — 2026-10-05
Booking-loophole fix: closed every direct Cal.com booking path. Quiz booking buttons + nav, pricing post-payment, and the ai-relevance/readiness "Book a discovery call" buttons now all route through the `call.html` screening form. Added `cal`/`topic` params to call.html. Only WhatsApp chat links (human-screened) remain outside the form. (Superseded 2026-10-25: all WhatsApp links were removed, see v2.3.) Files changed: quiz.html, call.html, pricing.html, ai-relevance.html, readiness.html. Not yet committed/pushed.

### v2.0 — 2026-10-05
Full rewrite from live repo and probes. Added file policy, AUTO blocks and the refresh script, open-issues register, weekly trigger.

| Version | Date | Posts | Indexable pages | Forms | Commits | Unpushed | Health | Overdue posts | Findings |
|---|---|---|---|---|---|---|---|---|---|
| v2.0 | 2026-10-05 | 58 | 69 | 8 | 90 | 0 | healthy; indexing High (day 129) | 4 past SLA, 11 due in 14d | 7 (1 High, 6 Low) |
| v2.1 | 2026-10-12 | 61 (hand count) | 72 per 10-10 queue (unverified this run) | 8 | unverified (git error) | 0 (tracking ref) | healthy; indexing High (day 136); PAY-1 still open | unverified (script not run) | not computed (TOOL-1) |
| v2.2 | 2026-10-19 | 61 (hand count) | 72 (79 HTML files minus 7 noindex; hand count) | 8 | unverified (git rev-list bus error) | 0 (0 ahead and 0 behind origin/main) | healthy; indexing High (day 143); PAY-1 still open | 6 at or past SLA (hand count from dateModified) | not computed (TOOL-1) |
| v2.3 | 2026-10-25 | 61 (hand count) | 72 (hand count) | 10 | 88 files uncommitted at close, committed later as `6217801` | n/a | healthy; indexing High (day 148 per monitor); PAY-1 open | not recorded | not computed (TOOL-1) |
| v2.4 | 2026-10-26 | 61 (61 `post-*.html` files on disk) | 72 (sitemap and citability audit) | 10 | 1 in the window (`6217801`); total unverified (TOOL-1) | 0 (local main matches its tracking ref) | healthy; indexing High (day 150); PAY-1 still open | 10 past SLA (citability audit 2026-10-25) | not computed (TOOL-1) |
| v2.5 | 2026-10-26 | 61 (61 `post-*.html` files on disk) | 72 (sitemap) | 10 | 105 on `main` (script count); this session's changes are uncommitted | 0 (local main matches its tracking ref); 79 files uncommitted | healthy per the monitor entry of 2026-10-25; indexing High (day 150); PAY-1 still open | 11 past SLA, 9 due within 14 days (script) | 4 (4 Low; two script bugs fixed) |
