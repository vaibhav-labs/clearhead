# Site Health Report — Clearhead — 2026-06-15 21:57 IST

## Status: ISSUES FOUND ⚠️

## Summary
All 23 HTTP checks and all SEO integrity checks passed; the only outstanding item is the known Google indexing issue, which has now crossed 2 weeks (17 days) and escalates to **High**.

## Critical (0)
None

## High (1)
- **Google indexing stalled (17 days).** The 6 blog/content pages requested for indexing on 2026-05-29 have now gone 2+ weeks without being crawled. This requires site-owner action (see Google Indexing Status below). Not auto-fixable.

## Medium (0) — SEO
None — every indexable page passes title length, description length, canonical, and OG image tag checks.

## Warning (0)
None — slowest page response was 1,576 ms (homepage), well under the 3,000 ms threshold.

## Auto-fixed (0)
None — no SEO regressions detected. (Note: five blog-post descriptions initially appeared truncated during scanning due to apostrophes in the text; on direct inspection all are full and within the 120–160 character target. No edits made, no commit/push performed.)

## Checks passed (23/23 HTTP + all SEO)
23 of 23 HTTP checks passed; 7/7 pages pass full SEO integrity.

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| Homepage | 200 | 1576 |
| Blog index | 200 | 843 |
| Post: AI identity | 200 | 840 |
| Post: AI loneliness | 200 | 1043 |
| Post: Unheard | 200 | 864 |
| Post: Lonely | 200 | 879 |
| Post: Conversation | 200 | 755 |
| Sitemap | 200 | 554 |
| Robots | 200 | 640 |

### Redirects
| From | Expected | Actual status | Location |
|---|---|---|---|
| https://www.clearhead.in/ | 301 | 301 | https://clearhead.in/ |
| /blog | 200 or 301 | 200 (Pretty URLs) | — |
| /post-ai | 200 or 301 | 200 (Pretty URLs) | — |
| /post-unheard | 200 or 301 | 200 (Pretty URLs) | — |
| /post-lonely | 200 or 301 | 200 (Pretty URLs) | — |
| /post-conversation | 200 or 301 | 200 (Pretty URLs) | — |
| /post-ai-loneliness | 200 or 301 | 200 (Pretty URLs) | — |

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
**Days since request:** 17 days (since 2026-05-29)
**Status:** High
**Action needed:** Google has not crawled these pages in 2+ weeks despite the manual request. Recommended owner actions: (1) add 2–3 quality external backlinks to clearhead.in, (2) share the blog posts on LinkedIn to drive direct traffic signals, (3) check Google Search Console for any manual actions or crawl errors. All 6 pages remain live and crawlable (HTTP 200, correct canonicals) — this is a crawl-budget / domain-authority issue, not a site defect.

### SEO
| File | Title len | Desc len | Canonical | og:image (+w/h/alt) | Structured data |
|---|---|---|---|---|---|
| index.html | 60 | 140 | ✅ | ✅ | FAQPage + LocalBusiness (telephone/geo/hasMap) ✅ |
| blog.html | 50 | 129 | ✅ | ✅ | — |
| post-ai.html | 60 | 155 | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-ai-loneliness.html | 48 | 157 | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-unheard.html | 60 | 160 | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-lonely.html | 59 | 149 | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-conversation.html | 52 | 160 | ✅ | ✅ | BreadcrumbList + Article ✅ |

Sitemap: contains all 5 blog posts; no privacy-policy.html or terms.html entries. ✅
