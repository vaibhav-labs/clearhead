# Site Health Report — Clearhead — 2026-06-17 08:02 IST

## Status: HEALTHY ✅

## Summary
All 23 HTTP checks and all SEO integrity checks passed; site, images, redirects, and payment workflow are fully operational — the only open item is Google indexing, now at High escalation (19 days uncrawled).

## Critical (0)
None

## High (1)
- **Google indexing** — blog/content pages still not crawled 19 days after manual request (2026-05-29). See indexing section for recommended actions. (Report-only; requires site-owner action in GSC.)

## Medium (0) — SEO
None

## Warning (0)
None

## Auto-fixed (0)
None — no SEO regressions found.

## Checks passed (23/23 HTTP + all SEO checks)

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| Homepage | 200 | 1254 |
| Blog index | 200 | 541 |
| post-ai | 200 | 540 |
| post-ai-loneliness | 200 | 726 |
| post-unheard | 200 | 557 |
| post-lonely | 200 | 547 |
| post-conversation | 200 | 669 |
| sitemap.xml | 200 | 516 |
| robots.txt | 200 | 561 |

### Redirects
| From | Expected | Actual | Location |
|---|---|---|---|
| www.clearhead.in/ | 301 | 301 | https://clearhead.in/ |
| /blog | 200 or 301 | 200 | Pretty URL (canonical handles SEO) |
| /post-ai | 200 or 301 | 200 | Pretty URL |
| /post-unheard | 200 or 301 | 200 | Pretty URL |
| /post-lonely | 200 or 301 | 200 | Pretty URL |
| /post-conversation | 200 or 301 | 200 | Pretty URL |
| /post-ai-loneliness | 200 or 301 | 200 | Pretty URL |

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

### Google indexing status
**Days since request:** 19 days (since 2026-05-29)
**Status:** High
**Action needed:** Google has not crawled these pages in 2+ weeks despite the manual request. Recommended: (1) add 2–3 quality external backlinks, (2) share the blog posts on LinkedIn to drive direct traffic signals, (3) check GSC for any manual actions or crawl errors. (privacy-policy.html and terms.html remaining unindexed is fine — utility pages.)

### SEO
| File | Title | Desc | Canonical | og:image (+w/h/alt) | Structured data |
|---|---|---|---|---|---|
| index.html | 60 ✅ | 140 ✅ | ✅ | ✅ | FAQPage + LocalBusiness (tel/geo/hasMap) ✅ |
| blog.html | 50 ✅ | 129 ✅ | ✅ | ✅ | — |
| post-ai.html | 60 ✅ | 155 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-ai-loneliness.html | 48 ✅ | 157 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-unheard.html | 60 ✅ | 160 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-lonely.html | 59 ✅ | 149 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-conversation.html | 52 ✅ | 160 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |

**Sitemap:** No privacy-policy.html or terms.html present; all 5 blog posts + blog index present. ✅
