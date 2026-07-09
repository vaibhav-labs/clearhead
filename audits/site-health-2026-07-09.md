# Site Health Report — Clearhead — 2026-07-09 08:48 IST

## Status: HEALTHY ✅

## Summary
All 86 checks passed (23 HTTP + 63 SEO); one transient slow response (post-lonely.html, 4.8s) and Google indexing remains at High escalation (41 days).

## Critical (0)
None

## High (0)
None — (indexing escalation tracked separately below; requires owner action, not a site fault)

## Medium (0) — SEO
None

## Warning (1)
- post-lonely.html responded in 4812 ms (> 3000 ms threshold, < 5000 ms). Likely CDN cold start — transient, report-only.

## Auto-fixed (0)
None — no SEO regressions found.

## Checks passed (86/86)
23 of 23 HTTP checks passed; 63 of 63 SEO checks passed.

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| / | 200 | 1788 |
| /blog.html | 200 | 1136 |
| /post-ai.html | 200 | 737 |
| /post-ai-loneliness.html | 200 | 513 |
| /post-unheard.html | 200 | 899 |
| /post-lonely.html | 200 | 4812 ⚠️ |
| /post-conversation.html | 200 | 1040 |
| /sitemap.xml | 200 | 869 |
| /robots.txt | 200 | 912 |

### Redirects
| From | Expected | Actual status | Location |
|---|---|---|---|
| https://www.clearhead.in/ | 301 → https://clearhead.in/ | 301 | https://clearhead.in/ ✅ |
| /blog | 200 (Pretty URLs) or 301 | 200 | canonical → blog.html ✅ |
| /post-ai | 200 or 301 | 200 | canonical ✅ |
| /post-unheard | 200 or 301 | 200 | canonical ✅ |
| /post-lonely | 200 or 301 | 200 | canonical ✅ |
| /post-conversation | 200 or 301 | 200 | canonical ✅ |
| /post-ai-loneliness | 200 or 301 | 200 | canonical ✅ |

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
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ 200 |

### Google indexing status
**Days since request:** 41 days (since 2026-05-29)
**Status:** High
**Action needed:** Google has not crawled these pages in 2+ weeks despite manual request. Recommended: (1) build 2–3 quality external backlinks (authority-engine drafts), (2) drive direct traffic signals to blog posts, (3) check GSC for manual actions or crawl errors, and re-request indexing via URL inspection. No change in escalation level since yesterday (already at High).

### SEO
| File | Title len (30–60) | Desc len (120–160) | Canonical | og:image + w/h/alt | Structured data |
|---|---|---|---|---|---|
| index.html | 60 ✅ | 140 ✅ | ✅ | ✅ | FAQPage ✅, LocalBusiness (telephone/geo/hasMap) ✅ |
| blog.html | 50 ✅ | 129 ✅ | ✅ | ✅ | BreadcrumbList ✅ |
| post-ai.html | 60 ✅ | 151 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-ai-loneliness.html | 48 ✅ | 157 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-unheard.html | 60 ✅ | 160 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-lonely.html | 59 ✅ | 149 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-conversation.html | 52 ✅ | 160 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |

Sitemap: privacy-policy.html absent ✅, terms.html absent ✅, all 5 blog posts present ✅.
