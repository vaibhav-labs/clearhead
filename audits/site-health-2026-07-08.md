# Site Health Report — Clearhead — 2026-07-08 10:01 IST

## Status: ISSUES FOUND ⚠️

## Summary
All 23 live HTTP checks passed (pages, redirects, images, full payment workflow) and all 22 local indexable pages are SEO-clean; yesterday's High "stale Netlify deploy" issue is **resolved** (all pushed content is now live, sitemap 31/31), leaving only the ongoing Google indexing escalation (Day 40, High) and two minor warnings.

## Critical (0)
None — all monitored pages, images, redirects, and the Razorpay payment workflow are working on the live site.

## High (1)
1. **Google indexing — Day 40 escalation (High).** See indexing section below. Requires GSC action by site owner; monitor cannot fix.

## Medium — SEO (0)
None. All 22 local indexable pages pass every check (title 30–60 chars, description 120–160 chars, canonical, og:image + width/height/alt, FAQPage + LocalBusiness on homepage, BreadcrumbList + Article on every post). Sitemap excludes privacy-policy/terms and includes all posts.

## Google Indexing Status
**Days since indexing requested:** 40 days (since 2026-05-29)
**Status:** High — Google has not crawled these pages in 2+ weeks despite manual request.
**Note:** Escalation level unchanged from yesterday. However, the stale-deploy blocker flagged yesterday is now resolved — Google is finally being served the current site with all 31 URLs, which removes one obstacle to crawling. Recommended: (1) add 2–3 quality external backlinks, (2) share blog posts to drive direct traffic signals, (3) check GSC for manual actions or crawl errors, and re-request indexing for key pages now that the live site is current.

## Warning (2)
1. **Homepage response time 3,086 ms** (threshold 3,000 ms). Likely a Netlify cold start — all other pages responded in 551–890 ms. Transient; no action unless it recurs.
2. **4 files modified but uncommitted in ~/Documents/Zen** (post-ai.html, privacy-policy.html, quiz.html, runway.html — 102 insertions / 102 deletions, looks like in-progress design work). Not committed by the monitor since it appears to be unreviewed WIP. Local post-ai.html still passes all SEO checks. Note: this is much improved from yesterday — the 8 pending blog posts and sitemap changes are now committed, pushed, and live.

## Auto-fixed (0)
None — no SEO regressions found; nothing to fix.

## Checks passed (23/23 HTTP + 22/22 SEO pages)

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| https://clearhead.in/ | 200 ✅ | 3086 ⚠️ |
| https://clearhead.in/blog.html | 200 ✅ | 851 |
| https://clearhead.in/post-ai.html | 200 ✅ | 621 |
| https://clearhead.in/post-ai-loneliness.html | 200 ✅ | 642 |
| https://clearhead.in/post-unheard.html | 200 ✅ | 551 |
| https://clearhead.in/post-lonely.html | 200 ✅ | 890 |
| https://clearhead.in/post-conversation.html | 200 ✅ | 637 |
| https://clearhead.in/sitemap.xml | 200 ✅ | 573 |
| https://clearhead.in/robots.txt | 200 ✅ | 571 |

Additional spot-checks (deploy freshness): llms.txt 200 ✅, post-ai-work-family-exhaustion.html 200 ✅, post-rest-burnout.html 200 ✅ — yesterday's 404s are gone.

### Redirects
| From | Expected | Actual status | Location |
|---|---|---|---|
| https://www.clearhead.in/ | 301 → https://clearhead.in/ | 301 ✅ | https://clearhead.in/ |
| /blog, /post-ai, /post-unheard, /post-lonely, /post-conversation, /post-ai-loneliness | 200 (Pretty URLs) or 301 | 200 ✅ (all) | canonical tag handles SEO |

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
| A — Order creation | POST /api/create-order → expect 400 | ✅ 400 (credentials present) |
| B — Verify function | GET /api/verify-payment → expect 405 | ✅ 405 |
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ 200 (139 ms) |

### Deploy pipeline
Live sitemap URLs: 31 — matches local sitemap (31). No unpushed commits (last commit `1b56792`, 2026-07-08, is on origin/main). Netlify deploys are current again. ✅

### SEO (local files, 22 indexable pages)
| File | Title len | Desc len | Canonical | og:image set | Schema |
|---|---|---|---|---|---|
| index.html | 60 ✅ | 140 ✅ | ✅ | ✅ | FAQPage + LocalBusiness ✅ |
| blog.html | 50 ✅ | 129 ✅ | ✅ | ✅ | BreadcrumbList ✅ |
| post-ai.html | 60 ✅ | 151 ✅ | ✅ | ✅ | ✅ |
| post-ai-job-fear.html | 54 ✅ | 154 ✅ | ✅ | ✅ | ✅ |
| post-ai-loneliness.html | 48 ✅ | 157 ✅ | ✅ | ✅ | ✅ |
| post-ai-replacement-dysfunction.html | 55 ✅ | 155 ✅ | ✅ | ✅ | ✅ |
| post-ai-work-family-exhaustion.html | 44 ✅ | 155 ✅ | ✅ | ✅ | ✅ |
| post-bedtime-procrastination.html | 54 ✅ | 157 ✅ | ✅ | ✅ | ✅ |
| post-cant-switch-off.html | 46 ✅ | 155 ✅ | ✅ | ✅ | ✅ |
| post-conversation.html | 52 ✅ | 160 ✅ | ✅ | ✅ | ✅ |
| post-holding-it-together.html | 56 ✅ | 154 ✅ | ✅ | ✅ | ✅ |
| post-impostor-syndrome.html | 52 ✅ | 156 ✅ | ✅ | ✅ | ✅ |
| post-languishing.html | 54 ✅ | 152 ✅ | ✅ | ✅ | ✅ |
| post-lonely-at-work.html | 50 ✅ | 148 ✅ | ✅ | ✅ | ✅ |
| post-lonely.html | 59 ✅ | 149 ✅ | ✅ | ✅ | ✅ |
| post-monday-dread.html | 57 ✅ | 149 ✅ | ✅ | ✅ | ✅ |
| post-money-anxiety.html | 58 ✅ | 157 ✅ | ✅ | ✅ | ✅ |
| post-multitasking.html | 48 ✅ | 160 ✅ | ✅ | ✅ | ✅ |
| post-new-city-loneliness.html | 58 ✅ | 141 ✅ | ✅ | ✅ | ✅ |
| post-overwork-brain.html | 51 ✅ | 160 ✅ | ✅ | ✅ | ✅ |
| post-quiet-cracking.html | 57 ✅ | 157 ✅ | ✅ | ✅ | ✅ |
| post-rest-burnout.html | 40 ✅ | 155 ✅ | ✅ | ✅ | ✅ |
| post-unheard.html | 60 ✅ | 160 ✅ | ✅ | ✅ | ✅ |

Sitemap: privacy-policy.html absent ✅, terms.html absent ✅, all monitored posts present ✅. (Post schema = FAQPage + BreadcrumbList + Article.)
