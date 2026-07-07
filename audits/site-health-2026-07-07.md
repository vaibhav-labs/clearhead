# Site Health Report — Clearhead — 2026-07-07 08:40 IST

## Status: ISSUES FOUND ⚠️

## Summary
All 23 live HTTP checks passed (pages, redirects, images, full payment workflow) and all 22 local indexable pages are SEO-clean — but the live site has NOT deployed commits pushed on 2026-06-21 (Netlify deploy appears stale/broken), a large batch of local blog work remains uncommitted/unpushed, and Google indexing is at Day-39 High escalation.

## Critical (0)
None — all monitored pages, images, redirects, and the Razorpay payment workflow are working on the live site.

## High (2)
1. **Netlify deploy is stale — pushed commits are not live.** Origin/main contains `llms.txt` and `post-ai-work-family-exhaustion.html` (pushed 2026-06-21, commits `b62275b` + `6ff0890`), but both return **404 on clearhead.in**. Live sitemap has 22 URLs vs 23 in origin/main. The live site is serving a build from ~2026-06-15 or earlier — **16 days of pushed content is not deployed.** Report-only per fix rules. **Action:** open Netlify dashboard → Deploys for the site; look for failed builds, a paused/stopped auto-publish setting, or a disconnected GitHub repo (vaibhav-labs/clearhead), then trigger a deploy.
2. **Google indexing — Day 39 escalation (High).** See indexing section below.

## Medium — SEO (0)
None. All 22 local indexable pages pass every check (title 30–60, description 120–160, canonical, og:image + width/height/alt, FAQPage + LocalBusiness on homepage, BreadcrumbList + Article on every post). Sitemap excludes privacy-policy/terms and includes all posts. Yesterday's flagged issues are resolved locally: post-languishing description is now 152 chars and post-languishing is in the local sitemap.

## Google Indexing Status
**Days since indexing requested:** 39 days (since 2026-05-29)
**Status:** High — Google has not crawled these pages in 2+ weeks despite manual request.
**Note:** Escalation level unchanged from yesterday (Day 15+ since 2026-06-13). Recommended: (1) add 2–3 quality external backlinks, (2) share blog posts on LinkedIn to drive direct traffic signals, (3) check GSC for manual actions or crawl errors. Note: the stale Netlify deploy (High #1) may itself be hurting crawling — Google is being served an older site, and 8 newer posts aren't reachable at all.

## Warning (1)
1. **Large uncommitted/unpushed local state in ~/Documents/Zen.** Not pushed by the monitor because it would publish what appear to be unreviewed draft posts, and deploys look broken anyway (High #1). Current state:
   - 1 unpushed commit: `acce436` (post-rest-burnout.html)
   - 2 staged new posts: post-ai-job-fear.html, post-money-anxiety.html
   - 4 untracked posts: post-holding-it-together, post-impostor-syndrome, post-languishing, post-monday-dread (includes yesterday's auto-fix)
   - blog.html and sitemap.xml staged + further modified; 8 audit files untracked
   - Net effect: **8 blog posts exist locally that are not on the live site.** Once Netlify deploys are fixed, review and push: `cd ~/Documents/Zen && git add -A && git commit -m "Publish pending blog posts + sitemap" && git push origin main`

## Auto-fixed (0)
None — no SEO regressions found today; nothing to fix.

## Checks passed (54/56)
23/23 live HTTP checks · 22/22 local pages SEO-clean · 9/9 sitemap checks · failed: deploy freshness, indexing.

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| Homepage | 200 | 273 |
| blog.html | 200 | 212 |
| post-ai.html | 200 | 205 |
| post-ai-loneliness.html | 200 | 298 |
| post-unheard.html | 200 | 276 |
| post-lonely.html | 200 | 210 |
| post-conversation.html | 200 | 214 |
| sitemap.xml | 200 | 260 |
| robots.txt | 200 | 218 |

### Redirects
| From | Expected | Actual status | Location |
|---|---|---|---|
| https://www.clearhead.in/ | 301 → https://clearhead.in/ | 301 | https://clearhead.in/ ✅ |
| /blog, /post-ai, /post-unheard, /post-lonely, /post-conversation, /post-ai-loneliness | 200 (Pretty URLs) or 301 | all 200 | canonical tags handle SEO ✅ |

### Images
| Image | Status |
|---|---|
| VJ.jpg | 200 ✅ |
| coaching-early.jpg | 200 ✅ |
| coaching-mid.jpg | 200 ✅ |
| coaching-grad.jpg | 200 ✅ |

### Payment workflow
| Step | Check | Result |
|---|---|---|
| A — Order creation | POST /api/create-order → expect 400 | ✅ 400 (credentials present, 1105 ms) |
| B — Verify function | GET /api/verify-payment → expect 405 | ✅ 405 (985 ms) |
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ 200 (77 ms) |

### Deploy freshness (new finding)
| Check | Result |
|---|---|
| llms.txt (in origin/main since 2026-06-21) | ❌ 404 live |
| post-ai-work-family-exhaustion.html (in origin/main) | ❌ 404 live |
| Live sitemap URLs vs origin/main | 22 vs 23 ❌ |
| Local posts not on live site | 8 (rest-burnout, ai-work-family-exhaustion, ai-job-fear, money-anxiety, holding-it-together, impostor-syndrome, languishing, monday-dread) |

### Google indexing status
**Days since request:** 39 days (since 2026-05-29)
**Status:** High
**Action needed:** Backlinks + LinkedIn sharing + GSC crawl-error check; fix stale deploy first (High #1).

### SEO (local files — all pass)
| File | Title len | Desc len | Canonical/OG | Structured data |
|---|---|---|---|---|
| index.html | 60 ✅ | 140 ✅ | ✅ all | FAQPage + LocalBusiness (tel/geo/hasMap) ✅ |
| blog.html | 50 ✅ | 129 ✅ | ✅ all | — |
| post-ai.html | 60 ✅ | 155 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-ai-job-fear.html | 54 ✅ | 154 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-ai-loneliness.html | 48 ✅ | 157 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-ai-replacement-dysfunction.html | 55 ✅ | 155 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-ai-work-family-exhaustion.html | 44 ✅ | 155 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-cant-switch-off.html | 46 ✅ | 155 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-conversation.html | 52 ✅ | 160 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-holding-it-together.html | 56 ✅ | 154 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-impostor-syndrome.html | 52 ✅ | 156 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-languishing.html | 54 ✅ | 152 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-lonely-at-work.html | 50 ✅ | 148 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-lonely.html | 59 ✅ | 149 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-monday-dread.html | 57 ✅ | 149 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-money-anxiety.html | 58 ✅ | 157 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-multitasking.html | 48 ✅ | 160 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-new-city-loneliness.html | 58 ✅ | 141 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-overwork-brain.html | 51 ✅ | 160 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-quiet-cracking.html | 57 ✅ | 157 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-rest-burnout.html | 40 ✅ | 155 ✅ | ✅ all | Breadcrumb + Article ✅ |
| post-unheard.html | 60 ✅ | 160 ✅ | ✅ all | Breadcrumb + Article ✅ |
| sitemap.xml | — | — | — | no privacy/terms ✅ · all 20 posts present ✅ |
