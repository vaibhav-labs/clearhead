# Site Health Report — Clearhead — 2026-07-15 11:18 IST

## Status: HEALTHY ✅

## Summary
All 23 HTTP checks (pages, images, redirect, clean URLs, payment workflow) and all 7 SEO-integrity page checks passed; no site faults and no SEO regressions. The only open item is the long-standing Google indexing/crawl issue, which needs site-owner action (GSC), not a code fix.

## Critical (0)
None

## High (0)
None — see Google Indexing Status below (tracked known issue, not a site fault).

## Medium — SEO (0)
None. Titles (30–60 chars), meta descriptions (120–160 chars), canonicals, and the full og:image tag set (image, width, height, alt) verified on index.html, blog.html, and all 5 post-*.html files. Homepage has FAQPage + LocalBusiness; each post has BreadcrumbList + Article. Sitemap contains all 5 blog posts + blog.html and excludes privacy-policy.html and terms.html.

## Google Indexing Status
**Days since indexing requested:** 47 days (since 2026-05-29)
**Status:** High — Google has not crawled these pages in 2+ weeks despite the manual request. Likely crawl-budget / site-authority issue on a new low-authority domain.
**Note:** Escalation level unchanged from prior runs (still High, Day 15+). All 6 blog URLs are confirmed live and crawlable (HTTP 200, correct titles/canonicals), so the blocker is external authority, not the pages themselves. Recommended owner actions: (1) add 2–3 quality external backlinks, (2) share blog posts on LinkedIn/communities to drive direct-traffic signals, (3) check GSC for manual actions or crawl errors and re-request indexing via URL inspection. These are being worked by the growth/authority-engine and community-radar workflows.

## Warning (0)
None

## Auto-fixed (0)
None — no SEO regressions detected, so no commits or pushes were made.

## Checks passed (30/30)
- Page availability: 9/9 (all 200)
- www redirect: 1/1 (301 → https://clearhead.in/)
- Clean URLs: 6/6 (all 200 via Netlify Pretty URLs)
- Images: 4/4 (all 200)
- Payment workflow: 3/3 (create-order 400 = credentials OK; verify-payment 405 as expected; Razorpay CDN 200)
- SEO integrity: 7/7 pages clean
- Sitemap integrity: pass

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| homepage | 200 | 2456 |
| blog.html | 200 | 1341 |
| post-ai.html | 200 | 1236 |
| post-ai-loneliness.html | 200 | 1139 |
| post-unheard.html | 200 | 1192 |
| post-lonely.html | 200 | 2040 |
| post-conversation.html | 200 | 1293 |
| sitemap.xml | 200 | 1041 |
| robots.txt | 200 | 1523 |

### Redirects
| From | Expected | Actual | Location |
|---|---|---|---|
| www.clearhead.in/ | 301 | 301 | https://clearhead.in/ |
| /blog, /post-ai, /post-unheard, /post-lonely, /post-conversation, /post-ai-loneliness | 200 or 30x | 200 | served via Pretty URLs (canonical handles SEO) |

### Images
| Image | Status |
|---|---|
| VJ.jpg | 200 |
| coaching-early.jpg | 200 |
| coaching-mid.jpg | 200 |
| coaching-grad.jpg | 200 |

### Payment workflow
| Step | Check | Result |
|---|---|---|
| A — Order creation | POST /api/create-order → expect 400 | ✅ 400 (credentials present) |
| B — Verify function | GET /api/verify-payment → expect 405 | ✅ 405 |
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ 200 |

### SEO (title / description lengths)
| File | Title | Desc | Result |
|---|---|---|---|
| index.html | 60 | 140 | ✅ (FAQPage + LocalBusiness present) |
| blog.html | 50 | 129 | ✅ |
| post-ai.html | 60 | 151 | ✅ (Breadcrumb + Article) |
| post-ai-loneliness.html | 48 | 157 | ✅ (Breadcrumb + Article) |
| post-unheard.html | 60 | 160 | ✅ (Breadcrumb + Article) |
| post-lonely.html | 59 | 149 | ✅ (Breadcrumb + Article) |
| post-conversation.html | 52 | 160 | ✅ (Breadcrumb + Article) |

_Report saved to: ~/Documents/Zen/audits/site-health-2026-07-15.md_
