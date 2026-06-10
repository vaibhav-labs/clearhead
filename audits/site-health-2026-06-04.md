# Site Health Report — Clearhead — 2026-06-04 21:52 IST

## Status: HEALTHY ✅

## Summary
All 30 checks passed — every page, image, redirect, clean URL, and API endpoint is responding correctly, the Razorpay payment pipeline is intact, and all 7 indexable HTML files have valid SEO metadata. No auto-fixes were needed today.

## Critical (0)
None.

## High (0)
None.

## Medium — SEO (0)
None. All titles 30–60 chars, all descriptions 120–160 chars, all canonical/OG tags present, structured data intact on every page.

## Google Indexing Status
**Days since indexing requested:** 6 days (since 2026-05-29)
**Status:** Pending — Google crawl expected within 1–7 days after manual request.
**Note:** Day 6 of the 7-day pending window. No action required yet. If pages are still not crawled by 2026-06-06 (day 8), escalate to Warning and re-request indexing via GSC URL inspection.

## Warning (0)
None. All response times under the 5000 ms threshold (slowest: VJ.jpg at 2190 ms — well within bounds for a Netlify cold start).

## Auto-fixed (0)
None — no SEO regressions detected.

## Checks passed (30/30)

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| / | 200 | 1991 |
| /blog.html | 200 | 1254 |
| /post-ai.html | 200 | 1260 |
| /post-ai-loneliness.html | 200 | 1241 |
| /post-unheard.html | 200 | 1250 |
| /post-lonely.html | 200 | 1977 |
| /post-conversation.html | 200 | 1955 |
| /sitemap.xml | 200 | 1882 |
| /robots.txt | 200 | 1880 |

### Redirects
| From | Expected | Actual status | Location |
|---|---|---|---|
| https://www.clearhead.in/ | 301 → clearhead.in/ | 301 | https://clearhead.in/ |

### Clean URLs (Netlify Pretty URLs — 200 expected)
| URL | Status |
|---|---|
| /blog | 200 |
| /post-ai | 200 |
| /post-unheard | 200 |
| /post-lonely | 200 |
| /post-conversation | 200 |
| /post-ai-loneliness | 200 |

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
| A — Order creation | POST /api/create-order {} → expect 400 | ✅ 400 ("amount must be a number and at least 100 paise") — credentials present |
| B — Verify function | GET /api/verify-payment → expect 405 | ✅ 405 ("Method not allowed") |
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ 200 (135 ms) |

### SEO (local files)
| File | Title len | Desc len | Canonical | OG image | OG w/h/alt | Structured data |
|---|---|---|---|---|---|---|
| index.html | 60 | 140 | ✅ | VJ.jpg | 1200/849/✅ | FAQPage, LocalBusiness, ProfessionalService, Person ✅ |
| blog.html | 50 | 129 | ✅ | VJ.jpg | 1200/849/✅ | CollectionPage, WebSite ✅ |
| post-ai.html | 60 | 155 | ✅ | VJ.jpg | 1200/849/✅ | Article, BreadcrumbList ✅ |
| post-ai-loneliness.html | 59 | 157 | ✅ | Unsplash | 1200/630/✅ | Article, BreadcrumbList ✅ |
| post-unheard.html | 60 | 160 | ✅ | VJ.jpg | 1200/849/✅ | Article, BreadcrumbList ✅ |
| post-lonely.html | 59 | 149 | ✅ | VJ.jpg | 1200/849/✅ | Article, BreadcrumbList ✅ |
| post-conversation.html | 52 | 160 | ✅ | VJ.jpg | 1200/849/✅ | Article, BreadcrumbList ✅ |

### Sitemap
| Check | Result |
|---|---|
| Excludes privacy-policy.html | ✅ |
| Excludes terms.html | ✅ |
| Includes post-ai.html | ✅ |
| Includes post-ai-loneliness.html | ✅ |
| Includes post-unheard.html | ✅ |
| Includes post-lonely.html | ✅ |
| Includes post-conversation.html | ✅ |

---
Report saved to: `~/Documents/Zen/audits/site-health-2026-06-04.md`
