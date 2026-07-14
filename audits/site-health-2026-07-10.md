# Site Health Report — Clearhead — 2026-07-10 08:15 IST

## Status: HEALTHY ✅

## Summary
All 48 checks passed — pages, redirects, images, payment workflow, and SEO integrity are all healthy; the only open item remains Google indexing (report-only, High escalation at 42 days).

## Critical (0)
None

## High (0)
None — see Google Indexing Status below (tracked known issue, not a site fault).

## Medium (0) — SEO
None

## Warning (0)
None

## Auto-fixed (0)
None — no SEO regressions found.

## Checks passed (48/48)
23 of 23 HTTP checks passed (health_check.py) + 25 of 25 local SEO file checks passed.

## Full results

### Pages
| Page | Status |
|---|---|
| https://clearhead.in/ | 200 ✅ |
| https://clearhead.in/blog.html | 200 ✅ |
| https://clearhead.in/post-ai.html | 200 ✅ |
| https://clearhead.in/post-ai-loneliness.html | 200 ✅ |
| https://clearhead.in/post-unheard.html | 200 ✅ |
| https://clearhead.in/post-lonely.html | 200 ✅ |
| https://clearhead.in/post-conversation.html | 200 ✅ |
| https://clearhead.in/sitemap.xml | 200 ✅ |
| https://clearhead.in/robots.txt | 200 ✅ |

All response times well under 3 000 ms (images ~240 ms, API ~1 100 ms).

### Redirects
| From | Expected | Actual | Result |
|---|---|---|---|
| https://www.clearhead.in/ | 301 → https://clearhead.in/ | 301 → https://clearhead.in/ | ✅ |
| /blog | 200 (Pretty URLs) or 301 | 200 | ✅ |
| /post-ai | 200 or 301 | 200 | ✅ |
| /post-unheard | 200 or 301 | 200 | ✅ |
| /post-lonely | 200 or 301 | 200 | ✅ |
| /post-conversation | 200 or 301 | 200 | ✅ |
| /post-ai-loneliness | 200 or 301 | 200 | ✅ |

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
| A — Order creation | POST /api/create-order → expect 400 | ✅ 400 — credentials present |
| B — Verify function | GET /api/verify-payment → expect 405 | ✅ 405 |
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ 200 |

### Google indexing status
**Days since request:** 42 days (since 2026-05-29)
**Status:** High — Google has not been confirmed to crawl these pages in 2+ weeks despite manual request.
**Action needed (unchanged from previous runs at this level):** (1) build 2–3 quality external backlinks (authority-engine drafts), (2) drive direct traffic signals to blog posts, (3) check GSC for manual actions or crawl errors, re-request indexing via URL inspection.
**Note:** All 6 blog URLs remain crawlable (200, correct canonicals) — the block is authority/crawl-budget, not technical.

### SEO (local files, 25 indexable pages checked)
| Check | Result |
|---|---|
| Title 30–60 chars | ✅ all 25 pages (range 39–60) |
| Meta description 120–160 chars | ✅ all 25 pages (range 129–160) |
| Canonical present | ✅ all 25 |
| og:image + width + height + alt | ✅ all 25 |
| Homepage: FAQPage + LocalBusiness (telephone, geo, hasMap) | ✅ |
| Blog posts: BreadcrumbList + Article | ✅ all 23 posts |
| Sitemap excludes privacy-policy.html / terms.html | ✅ |
| Sitemap includes all 5 original blog posts + blog.html | ✅ |

---
No auto-fixes were made; no commit/push needed.
