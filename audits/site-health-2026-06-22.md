# Site Health Report — Clearhead — 2026-06-22 08:29 IST

## Status: ISSUES FOUND ⚠️

The only open issue is the long-standing Google indexing problem (now at "High" escalation). The site itself — pages, redirects, images, payments, and SEO — is fully healthy.

## Summary
All 26 live/SEO checks passed (pages 200, www 301, clean URLs 200, images 200, Razorpay flow working, SEO tags valid); the only outstanding item is Google indexing, which has now gone 24 days without a crawl and is escalated to High.

## Critical (0)
None.

## High (1)
- **Google indexing — pages still not crawled after 24 days.** All 6 blog/content pages remain in "Discovered — currently not indexed" since the 2026-05-29 manual request. See Google Indexing Status below for recommended actions. (Requires site-owner action in GSC — not auto-fixable.)

## Medium — SEO (0)
None. Every indexable page has a valid title (30–60 chars), description (120–160 chars), canonical tag, and full og:image set. Homepage has FAQPage + LocalBusiness; each post has BreadcrumbList + Article. Sitemap is clean (no privacy/terms) and contains all 5 posts.

## Google Indexing Status
**Days since indexing requested:** 24 days (since 2026-05-29)
**Status:** High
**Note:** Google has not crawled these pages in 2+ weeks despite the manual request — likely a crawl-budget / domain-authority issue for a new site. Recommended next steps for the site owner: (1) add 2–3 quality external backlinks pointing to clearhead.in, (2) share the blog posts on LinkedIn to generate direct traffic signals, (3) check GSC for any manual actions or crawl errors. All pages confirmed crawlable today (200 + correct canonical), so the blocker is discovery/authority, not the pages themselves.

## Warning (0)
None. All response times were well under 3 s (slowest: 1530 ms on the create-order POST cold start).

## Auto-fixed (0)
None — no SEO regressions found, so no commit/push was needed.

## Checks passed (26/27)
26 of 27 checks passed. The single failing item is Google indexing (External, report-only).

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| / | 200 | 624 |
| /blog.html | 200 | 255 |
| /post-ai.html | 200 | 302 |
| /post-ai-loneliness.html | 200 | 285 |
| /post-unheard.html | 200 | 202 |
| /post-lonely.html | 200 | 548 |
| /post-conversation.html | 200 | 503 |
| /sitemap.xml | 200 | 520 |
| /robots.txt | 200 | 515 |

### Redirects
| From | Expected | Actual status | Location |
|---|---|---|---|
| https://www.clearhead.in/ | 301 → non-www | 301 | https://clearhead.in/ |
| /blog | 200 or 301 | 200 | — |
| /post-ai | 200 or 301 | 200 | — |
| /post-unheard | 200 or 301 | 200 | — |
| /post-lonely | 200 or 301 | 200 | — |
| /post-conversation | 200 or 301 | 200 | — |
| /post-ai-loneliness | 200 or 301 | 200 | — |

### Images
| Image | Status |
|---|---|
| /VJ.jpg | 200 |
| /coaching-early.jpg | 200 |
| /coaching-mid.jpg | 200 |
| /coaching-grad.jpg | 200 |

### Payment workflow
| Step | Check | Result |
|---|---|---|
| A — Order creation | POST /api/create-order → expect 400 | ✅ 400 (credentials present) |
| B — Verify function | GET /api/verify-payment → expect 405 | ✅ 405 |
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ 200 |

### Google indexing status
**Days since request:** 24 days (since 2026-05-29)
**Status:** High
**Action needed:** Add 2–3 quality backlinks, share posts on LinkedIn, and review GSC for manual actions / crawl errors. Pages are crawlable; issue is discovery/authority.

### SEO
| File | Title | Desc | Canonical | og:image set | Structured data | Result |
|---|---|---|---|---|---|---|
| index.html | 60 | 140 | ✅ | ✅ | FAQPage + LocalBusiness | ✅ |
| blog.html | 50 | 129 | ✅ | ✅ | — | ✅ |
| post-ai.html | 60 | 155 | ✅ | ✅ | Breadcrumb + Article | ✅ |
| post-ai-loneliness.html | 48 | 157 | ✅ | ✅ | Breadcrumb + Article | ✅ |
| post-unheard.html | 60 | 160 | ✅ | ✅ | Breadcrumb + Article | ✅ |
| post-lonely.html | 59 | 149 | ✅ | ✅ | Breadcrumb + Article | ✅ |
| post-conversation.html | 52 | 160 | ✅ | ✅ | Breadcrumb + Article | ✅ |

Sitemap: no privacy-policy/terms entries; all 5 blog posts present. ✅

---
Report saved to: ~/Documents/Zen/audits/site-health-2026-06-22.md
