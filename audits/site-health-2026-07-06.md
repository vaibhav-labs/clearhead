# Site Health Report — Clearhead — 2026-07-06 (IST)

## Status: ISSUES FOUND ⚠️

## Summary
Local SEO integrity fully checked (22 indexable pages) — one over-length meta description auto-fixed and one sitemap omission found; HTTP availability/payment checks could not run this session (no shell or web-fetch tooling available in the sandbox), and Google indexing remains at High escalation (38 days).

## Critical (0)
None confirmed — but note: page availability, images, redirects, and the Razorpay payment workflow were NOT verified today (see Warnings). Last known state was healthy.

## High (1)
- **Google indexing:** 38 days since manual indexing request (2026-05-29) with pages previously stuck in "Discovered — currently not indexed". Day 15+ escalation applies: (1) add 2–3 quality external backlinks, (2) share blog posts on LinkedIn to drive direct traffic signals, (3) check GSC for manual actions or crawl errors.

## Medium — SEO (2)
1. **post-languishing.html meta description was 168 chars** (limit 160) — AUTO-FIXED (see below).
2. **post-languishing.html is missing from sitemap.xml** — the new post is indexable (robots: index,follow, canonical present) but has no `<url>` entry. Report-only per fix rules (sitemap additions are not on the auto-fix list). Recommended: add it with lastmod 2026-07-06, changefreq monthly, priority 0.8.

## Warning (2)
1. **HTTP checks not run:** shell and web-fetch tools were unavailable in this session (subagent also reported NO_SHELL_AVAILABLE). Pages, clean URLs, www redirect, images, /api/create-order, /api/verify-payment, and the Razorpay CDN were not probed. Re-run when tooling is back.
2. **Auto-fix committed locally only:** git was unavailable (no shell), so the description fix is an **uncommitted local edit** in ~/Documents/Zen. It will NOT deploy until pushed. Run: `cd ~/Documents/Zen && git add -A && git commit -m "monitor: auto-fix SEO regression 2026-07-06" && git push origin main`

## Auto-fixed (1)
- **post-languishing.html** — meta description trimmed 168 → 152 chars, first sentence preserved:
  - Before: "…Here is what it is, and the three habits that pull people out."
  - After: "…Here is what it is, and what pulls people out."
  - ⚠️ Not yet committed/pushed (no git access this session — see Warning 2).

## Checks passed (113/116 local; 23 HTTP checks skipped)

## Full results

### Pages / Redirects / Images / Payment workflow
| Check group | Result |
|---|---|
| 9 pages (200) | ⏭️ Skipped — no HTTP tooling this session |
| www → non-www 301 | ⏭️ Skipped |
| 6 clean URLs | ⏭️ Skipped |
| 4 images | ⏭️ Skipped |
| A — POST /api/create-order (expect 400) | ⏭️ Skipped |
| B — GET /api/verify-payment (expect 405) | ⏭️ Skipped |
| C — Razorpay CDN checkout.js (expect 200) | ⏭️ Skipped |

### Google indexing status
**Days since request:** 38 days (since 2026-05-29)
**Status:** High
**Action needed:** Escalation unchanged from recent runs (High since day 15, i.e. 2026-06-13). Owner action required in GSC: re-request indexing, check crawl stats/errors, build 2–3 external backlinks, share posts on LinkedIn.

### SEO (local files — 22 indexable pages: index, blog, 20 posts)
| File | Title 30–60 | Desc 120–160 | Canonical | og:image + w/h/alt | Structured data |
|---|---|---|---|---|---|
| index.html | ✅ 60 | ✅ 140 | ✅ | ✅ | ✅ FAQPage + LocalBusiness (telephone/geo/hasMap present) |
| blog.html | ✅ 50 | ✅ 129 | ✅ | ✅ | — |
| post-ai.html | ✅ 60 | ✅ 155 | ✅ | ✅ | ✅ Breadcrumb + Article |
| post-lonely.html | ✅ 59 | ✅ 149 | ✅ | ✅ | ✅ |
| post-unheard.html | ✅ 60 | ✅ 160 | ✅ | ✅ | ✅ |
| post-conversation.html | ✅ 52 | ✅ 160 | ✅ | ✅ | ✅ |
| post-ai-loneliness.html | ✅ 48 | ✅ 157 | ✅ | ✅ | ✅ |
| post-holding-it-together.html | ✅ 56 | ✅ 154 | ✅ | ✅ | ✅ |
| post-monday-dread.html | ✅ 57 | ✅ 149 | ✅ | ✅ | ✅ |
| post-money-anxiety.html | ✅ 58 | ✅ 157 | ✅ | ✅ | ✅ |
| post-lonely-at-work.html | ✅ 50 | ✅ 148 | ✅ | ✅ | ✅ |
| post-rest-burnout.html | ✅ 40 | ✅ 155 | ✅ | ✅ | ✅ |
| post-multitasking.html | ✅ 48 | ✅ 160 | ✅ | ✅ | ✅ |
| post-overwork-brain.html | ✅ 51 | ✅ 160 | ✅ | ✅ | ✅ |
| post-new-city-loneliness.html | ✅ 58 | ✅ 141 | ✅ | ✅ | ✅ |
| post-ai-job-fear.html | ✅ 54 | ✅ 154 | ✅ | ✅ | ✅ |
| post-impostor-syndrome.html | ✅ 52 | ✅ ~156 | ✅ | ✅ | ✅ |
| post-ai-work-family-exhaustion.html | ✅ 44 | ✅ 155 | ✅ | ✅ | ✅ |
| post-ai-replacement-dysfunction.html | ✅ 55 | ✅ 155 | ✅ | ✅ | ✅ |
| post-quiet-cracking.html | ✅ 57 | ✅ 157 | ✅ | ✅ | ✅ |
| post-cant-switch-off.html | ✅ 46 | ✅ 155 | ✅ | ✅ | ✅ |
| post-languishing.html | ✅ 54 | ⚠️ 168 → fixed to 152 | ✅ | ✅ | ✅ |

### Sitemap
| Check | Result |
|---|---|
| privacy-policy.html excluded | ✅ |
| terms.html excluded | ✅ |
| 5 original blog posts present | ✅ (post-ai, post-unheard, post-lonely, post-conversation, post-ai-loneliness) |
| All indexable posts present | ❌ post-languishing.html missing (report-only) |

---
*Note: this run had no shell/network tooling, so HTTP probes were skipped and the auto-fix could not be committed. Next run with normal tooling should re-verify availability and payment checks, and commit/push the pending fix if still uncommitted.*
