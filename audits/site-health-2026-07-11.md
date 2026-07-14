# Site Health Report — Clearhead — 2026-07-11 09:20 IST

## Status: HEALTHY ✅

## Summary
All 48 checks passed — pages, redirects, images, payment workflow, and SEO integrity are healthy; open items are Google indexing (High escalation, day 43) and uncommitted local changes not yet deployed.

## Critical (0)
None

## High (0)
None — see Google Indexing Status below (tracked known issue, not a site fault).

## Medium (0) — SEO
None

## Warning (1)
- **Local changes not deployed:** working tree has uncommitted changes — new `post-self-compassion-work-stress.html`, modified `blog.html` and `sitemap.xml` (staged), plus yesterday's audit report. The new post is in the local sitemap but NOT in the live sitemap. Deploy with `git commit + push` when ready, or the next asset-factory run should commit its own work. Not touched by the monitor (content changes are outside auto-fix scope).

## Auto-fixed (0)
None

## Checks passed (48/48)
9 pages + 1 www redirect + 6 clean URLs + 4 images + 3 payment steps + 25 SEO file checks (26 files: title/description lengths, canonical, og:image set, structured data) + sitemap hygiene.

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| / | 200 | 1421 |
| /blog.html | 200 | 1463 |
| /post-ai.html | 200 | 1468 |
| /post-ai-loneliness.html | 200 | 1665 |
| /post-unheard.html | 200 | 1461 |
| /post-lonely.html | 200 | 1666 |
| /post-conversation.html | 200 | 1441 |
| /sitemap.xml | 200 | 1413 |
| /robots.txt | 200 | 1414 |

All < 3000 ms.

### Redirects
| From | Expected | Actual status | Location |
|---|---|---|---|
| https://www.clearhead.in/ | 301 → https://clearhead.in/ | 301 | https://clearhead.in/ ✅ |

Clean URLs (/blog, /post-ai, /post-unheard, /post-lonely, /post-conversation, /post-ai-loneliness): all 200 via Netlify Pretty URLs; each page's canonical tag points to its .html version ✅

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
| A — Order creation | POST /api/create-order → expect 400 | ✅ 400 (validation fired — credentials present) |
| B — Verify function | GET /api/verify-payment → expect 405 | ✅ 405 |
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ 200 (145 ms) |

### Google indexing status
**Days since request:** 43 days (since 2026-05-29)
**Status:** High
**Action needed:** Google has not crawled the originally flagged pages in 6+ weeks despite the manual request. Recommended: (1) build 2–3 quality external backlinks (authority-engine outbox drafts), (2) drive direct traffic signals via community answers, (3) check GSC for manual actions or crawl errors. No change in escalation level since yesterday (High since day 15).

### SEO
All 26 indexable files (index, blog, 24 posts) checked:

| Check | Result |
|---|---|
| Title 30–60 chars | ✅ all 26 (range 39–60) |
| Description 120–160 chars | ✅ all 26 (range 129–160) |
| Canonical present + correct | ✅ all 26 |
| og:image / width / height / alt | ✅ all 26 |
| Homepage: FAQPage + LocalBusiness (telephone, geo, hasMap) | ✅ |
| Posts: BreadcrumbList + Article | ✅ all 24 |
| Sitemap excludes privacy-policy/terms | ✅ |
| Sitemap includes all 5 original posts | ✅ (34 URLs total) |

Note: an earlier automated length-check false-flagged 7 descriptions as short; verified against raw files — the regex broke on apostrophes. Actual lengths are all in range.
