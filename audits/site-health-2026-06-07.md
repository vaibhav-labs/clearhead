# Site Health Report — Clearhead — 2026-06-07 23:42 IST

## Status: ISSUES FOUND ⚠️

## Summary
All 9 pages, 4 images, 6 clean URLs, 3 payment checks, and all SEO integrity checks passed (30/30 HTTP checks, 61/61 SEO checks); the only open issue is the ongoing Google indexing delay now at 9 days — escalated to Warning level.

## Critical (0)
None

## High (0)
None

## Medium — SEO (0)
None — all titles, descriptions, canonical tags, OG tags, and structured data are within spec.

## Google Indexing Status
**Days since indexing requested:** 9 days (since 2026-05-29)
**Status:** ⚠️ Warning — pages still not crawled after 9 days.
**Action needed:** Re-request indexing for all 6 content pages via GSC URL Inspection tool. Open Google Search Console → sc-domain:clearhead.in → URL Inspection → submit each URL below and click "Request indexing":
- https://clearhead.in/blog.html
- https://clearhead.in/post-ai.html
- https://clearhead.in/post-ai-loneliness.html
- https://clearhead.in/post-conversation.html
- https://clearhead.in/post-lonely.html
- https://clearhead.in/post-unheard.html

**Note:** This escalated from "Pending" to "Warning" today (Day 9). If pages are still not crawled by Day 15 (2026-06-13), consider building 2–3 quality backlinks and sharing posts on LinkedIn to create traffic signals.

## Warning (0)
None — all response times were under 2 000 ms (homepage: 1 572 ms, all others < 1 000 ms).

## Auto-fixed (0)
None — no regressions found.

## Checks passed (91/91)

---

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| https://clearhead.in/ | 200 ✅ | 1 572 |
| https://clearhead.in/blog.html | 200 ✅ | 580 |
| https://clearhead.in/post-ai.html | 200 ✅ | 924 |
| https://clearhead.in/post-ai-loneliness.html | 200 ✅ | 516 |
| https://clearhead.in/post-unheard.html | 200 ✅ | 595 |
| https://clearhead.in/post-lonely.html | 200 ✅ | 527 |
| https://clearhead.in/post-conversation.html | 200 ✅ | 530 |
| https://clearhead.in/sitemap.xml | 200 ✅ | 512 |
| https://clearhead.in/robots.txt | 200 ✅ | 506 |

### Redirects
| From | Expected | Actual status | Location |
|---|---|---|---|
| https://www.clearhead.in/ | 301 → clearhead.in | 301 ✅ | https://clearhead.in/ |

### Clean URLs (Netlify Pretty URLs — 200 is expected)
| Clean URL | Status |
|---|---|
| https://clearhead.in/blog | 200 ✅ |
| https://clearhead.in/post-ai | 200 ✅ |
| https://clearhead.in/post-unheard | 200 ✅ |
| https://clearhead.in/post-lonely | 200 ✅ |
| https://clearhead.in/post-conversation | 200 ✅ |
| https://clearhead.in/post-ai-loneliness | 200 ✅ |

### Images
| Image | Status | Time (ms) |
|---|---|---|
| https://clearhead.in/VJ.jpg | 200 ✅ | 608 |
| https://clearhead.in/coaching-early.jpg | 200 ✅ | 732 |
| https://clearhead.in/coaching-mid.jpg | 200 ✅ | 601 |
| https://clearhead.in/coaching-grad.jpg | 200 ✅ | 519 |

### Payment workflow
| Step | Check | Result |
|---|---|---|
| A — Order creation | POST /api/create-order → expect 400 | ✅ 400 (credentials present, validation fired) |
| B — Verify function | GET /api/verify-payment → expect 405 | ✅ 405 (function alive, POST-only) |
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ 200 |

### SEO integrity
| File | Title (chars) | Description (chars) | Canonical | OG tags | Structured data |
|---|---|---|---|---|---|
| index.html | 60 ✅ | 140 ✅ | ✅ | ✅ | FAQPage ✅, LocalBusiness ✅ |
| blog.html | 50 ✅ | 129 ✅ | ✅ | ✅ | — |
| post-ai.html | 60 ✅ | 155 ✅ | ✅ | ✅ | Article ✅, BreadcrumbList ✅ |
| post-ai-loneliness.html | 59 ✅ | 157 ✅ | ✅ | ✅ | Article ✅, BreadcrumbList ✅ |
| post-unheard.html | 60 ✅ | 160 ✅ | ✅ | ✅ | Article ✅, BreadcrumbList ✅ |
| post-lonely.html | 59 ✅ | 149 ✅ | ✅ | ✅ | Article ✅, BreadcrumbList ✅ |
| post-conversation.html | 52 ✅ | 160 ✅ | ✅ | ✅ | Article ✅, BreadcrumbList ✅ |

### Sitemap
- privacy-policy.html: absent ✅
- terms.html: absent ✅
- All 5 blog posts present ✅
