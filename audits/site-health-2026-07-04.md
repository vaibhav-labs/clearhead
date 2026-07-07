# Site Health Report — Clearhead — 2026-07-04 14:33 IST

## Status: HEALTHY ✅

## Summary
All 23 HTTP checks (pages, redirects, images, payment workflow) and all SEO integrity checks across 19 indexable pages passed; no regressions, no fixes needed. The only open item remains Google indexing, at High escalation (36 days since request).

## Critical (0)
None

## High (1)
- **Google indexing** — 36 days since manual index request (2026-05-29) with no confirmed crawl. Tracked known issue requiring site-owner action in GSC, not a site defect. See Google Indexing Status below.

## Medium (0) — SEO
None. Every indexable page passed title length (30–60), description length (120–160), canonical, and all og:image tags. Sitemap is clean (no privacy-policy/terms; all posts present).

## Warning (0)
None. All responses well under the 3000 ms threshold (slowest page: homepage at 578 ms).

## Auto-fixed (0)
None — no regressions found, nothing committed or pushed.

## Checks passed (23/23 HTTP + all SEO checks)

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| https://clearhead.in/ | 200 ✅ | 578 |
| https://clearhead.in/blog.html | 200 ✅ | 254 |
| https://clearhead.in/post-ai.html | 200 ✅ | 264 |
| https://clearhead.in/post-ai-loneliness.html | 200 ✅ | 206 |
| https://clearhead.in/post-unheard.html | 200 ✅ | 221 |
| https://clearhead.in/post-lonely.html | 200 ✅ | 227 |
| https://clearhead.in/post-conversation.html | 200 ✅ | 207 |
| https://clearhead.in/sitemap.xml | 200 ✅ | 204 |
| https://clearhead.in/robots.txt | 200 ✅ | 254 |

### Redirects
| From | Expected | Actual status | Location |
|---|---|---|---|
| https://www.clearhead.in/ | 301 → https://clearhead.in/ | 301 ✅ | https://clearhead.in/ |
| https://clearhead.in/blog | 200 or 301 | 200 ✅ | Pretty URLs, canonical handles SEO |
| https://clearhead.in/post-ai | 200 or 301 | 200 ✅ | Pretty URLs |
| https://clearhead.in/post-unheard | 200 or 301 | 200 ✅ | Pretty URLs |
| https://clearhead.in/post-lonely | 200 or 301 | 200 ✅ | Pretty URLs |
| https://clearhead.in/post-conversation | 200 or 301 | 200 ✅ | Pretty URLs |
| https://clearhead.in/post-ai-loneliness | 200 or 301 | 200 ✅ | Pretty URLs |

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
| A — Order creation | POST /api/create-order → expect 400 | ✅ 400 — credentials present, validation fired |
| B — Verify function | GET /api/verify-payment → expect 405 | ✅ 405 |
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ 200 |

### Google indexing status
**Days since request:** 36 days (since 2026-05-29)
**Status:** High
**Action needed:** Owner action in GSC — (1) add 2–3 quality external backlinks, (2) share blog posts on LinkedIn to drive direct traffic signals, (3) check GSC for manual actions or crawl errors. Escalation level unchanged since yesterday.

### SEO
| File | Title len | Desc len | Canonical | og:image (+w/h/alt) | Structured data |
|---|---|---|---|---|---|
| index.html | 60 ✅ | 140 ✅ | ✅ | ✅ | FAQPage + LocalBusiness (telephone, geo, hasMap) ✅ |
| blog.html | 50 ✅ | 129 ✅ | ✅ | ✅ | BreadcrumbList ✅ |
| post-ai.html | 60 ✅ | 155 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-ai-loneliness.html | 48 ✅ | 157 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-unheard.html | 60 ✅ | 160 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-lonely.html | 59 ✅ | 149 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-conversation.html | 52 ✅ | 160 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-ai-job-fear.html | 54 ✅ | 154 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-ai-replacement-dysfunction.html | 55 ✅ | 155 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-ai-work-family-exhaustion.html | 44 ✅ | 155 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-cant-switch-off.html | 46 ✅ | 155 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-impostor-syndrome.html | 52 ✅ | 156 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-lonely-at-work.html | 50 ✅ | 148 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-money-anxiety.html | 58 ✅ | 157 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-multitasking.html | 48 ✅ | 160 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-new-city-loneliness.html | 58 ✅ | 141 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-overwork-brain.html | 51 ✅ | 160 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-quiet-cracking.html | 57 ✅ | 157 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-rest-burnout.html | 40 ✅ | 155 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |

Sitemap: 27 URLs; privacy-policy.html and terms.html correctly excluded; all blog posts present.
