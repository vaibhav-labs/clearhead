# Site Health Report — Clearhead — 2026-07-03 20:26 IST

## Status: HEALTHY ✅

## Summary
All 23 HTTP checks and all SEO integrity checks passed; no regressions found and no fixes needed. The only open item remains Google indexing, which is owner-action territory and now at High escalation (35 days since request).

## Critical (0)
None

## High (1)
- **Google indexing** — 35 days since manual index request (2026-05-29) with no crawl. This is a tracked known issue requiring site-owner action in GSC, not a site defect. See Google Indexing Status below.

## Medium (0) — SEO
None. Every indexable page passed title length, description length, canonical, and all og:image tags.

## Warning (1)
- Homepage responded in 3005 ms — marginally over the 3000 ms soft threshold (5 ms). Consistent with a Netlify cold start; transient and below the 5000 ms report line. No action.

## Auto-fixed (0)
None — no SEO regressions detected.

## Checks passed (23/23 HTTP + all SEO)

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| Homepage | 200 | 3005 |
| Blog index | 200 | 802 |
| post-ai | 200 | 546 |
| post-ai-loneliness | 200 | 931 |
| post-unheard | 200 | 874 |
| post-lonely | 200 | 698 |
| post-conversation | 200 | 572 |
| sitemap.xml | 200 | 568 |
| robots.txt | 200 | 437 |

### Redirects
| From | Expected | Actual | Location |
|---|---|---|---|
| www.clearhead.in/ | 301 | 301 | https://clearhead.in/ |
| /blog | 200/301 | 200 | Pretty URL (canonical handles SEO) |
| /post-ai | 200/301 | 200 | Pretty URL |
| /post-unheard | 200/301 | 200 | Pretty URL |
| /post-lonely | 200/301 | 200 | Pretty URL |
| /post-conversation | 200/301 | 200 | Pretty URL |
| /post-ai-loneliness | 200/301 | 200 | Pretty URL |

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
**Days since request:** 35 days (since 2026-05-29)
**Status:** High
**Action needed:** Google has not crawled the 6 blog/content pages in 5+ weeks despite the manual request. Recommended owner actions: (1) add 2–3 quality external backlinks, (2) share blog posts on LinkedIn to generate direct-traffic signals, (3) check GSC for crawl errors or manual actions, and (4) re-request indexing via URL inspection. All pages are confirmed crawlable (200, correct titles/canonicals) — this is a domain-authority/crawl-budget issue, not a technical defect.

### SEO
| File | Title len | Desc len | Canonical | og:image (+w/h/alt) | Structured data |
|---|---|---|---|---|---|
| index.html | 60 ✅ | 140 ✅ | ✅ | ✅ | FAQPage + LocalBusiness (telephone/geo/hasMap) ✅ |
| blog.html | 50 ✅ | 129 ✅ | ✅ | ✅ | — |
| post-ai.html | 60 ✅ | 155 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-ai-loneliness.html | 48 ✅ | 157 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-unheard.html | 60 ✅ | 160 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-lonely.html | 59 ✅ | 149 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-conversation.html | 52 ✅ | 160 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |

**Sitemap:** clean — no privacy-policy.html or terms.html; all 5 blog posts + blog index present.
