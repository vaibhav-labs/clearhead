# Site Health Report — Clearhead — 2026-06-16 08:02 IST

## Status: HEALTHY ✅

## Summary
All availability, redirect, image, payment, and SEO checks passed (40/40); no regressions found and no auto-fixes needed — the only open item is Google indexing, which is now in High escalation (18 days since manual request) and requires site-owner action in GSC.

## Critical (0)
None

## High (1)
- **Google indexing stalled** — 18 days since manual indexing request (2026-05-29) with no crawl. This is owner-action only (not a site fault). See indexing section for recommended steps.

## Medium (0) — SEO
None — all titles (30–60 chars), descriptions (120–160 chars), canonical tags, OG image tags, and structured data are within spec across all 14 indexable pages.

## Warning (0)
None — homepage responded in 1918 ms (likely a cold start); all other pages under 260 ms.

## Auto-fixed (0)
None — no SEO regressions detected, so no edits, commits, or pushes were made.

## Checks passed (40/40)

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| https://clearhead.in/ | 200 | 1918 |
| https://clearhead.in/blog.html | 200 | 220 |
| https://clearhead.in/post-ai.html | 200 | 220 |
| https://clearhead.in/post-ai-loneliness.html | 200 | 222 |
| https://clearhead.in/post-unheard.html | 200 | 214 |
| https://clearhead.in/post-lonely.html | 200 | 246 |
| https://clearhead.in/post-conversation.html | 200 | 194 |
| https://clearhead.in/sitemap.xml | 200 | 240 |
| https://clearhead.in/robots.txt | 200 | 256 |

### Redirects
| From | Expected | Actual status | Location |
|---|---|---|---|
| https://www.clearhead.in/ | 301 → non-www | 301 | https://clearhead.in/ |
| /blog | 200 or 301 | 200 | (Pretty URL — OK) |
| /post-ai | 200 or 301 | 200 | (Pretty URL — OK) |
| /post-unheard | 200 or 301 | 200 | (Pretty URL — OK) |
| /post-lonely | 200 or 301 | 200 | (Pretty URL — OK) |
| /post-conversation | 200 or 301 | 200 | (Pretty URL — OK) |
| /post-ai-loneliness | 200 or 301 | 200 | (Pretty URL — OK) |

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
**Days since request:** 18 days (since 2026-05-29)
**Status:** High
**Action needed:** Google has not crawled these pages in 2+ weeks despite the manual request. Recommended owner actions: (1) add 2–3 quality external backlinks to clearhead.in, (2) share the blog posts on LinkedIn to drive direct-traffic signals, (3) check Google Search Console for any manual actions or crawl errors. All pages remain crawlable (return 200 with correct titles/canonicals), so the blocker is domain authority / crawl budget, not a site defect.

### SEO
| File | Title len | Desc len | Canonical | OG image (w/h/alt) | Structured data | Result |
|---|---|---|---|---|---|---|
| index.html | 60 | 140 | ✅ | ✅ | FAQPage + LocalBusiness (telephone/geo/hasMap) ✅ | ✅ |
| blog.html | 50 | 129 | ✅ | ✅ | — | ✅ |
| post-ai-loneliness.html | 48 | 157 | ✅ | ✅ | BreadcrumbList + Article ✅ | ✅ |
| post-ai-replacement-dysfunction.html | 55 | 155 | ✅ | ✅ | BreadcrumbList + Article ✅ | ✅ |
| post-ai.html | 60 | 155 | ✅ | ✅ | BreadcrumbList + Article ✅ | ✅ |
| post-cant-switch-off.html | 46 | 155 | ✅ | ✅ | BreadcrumbList + Article ✅ | ✅ |
| post-conversation.html | 52 | 160 | ✅ | ✅ | BreadcrumbList + Article ✅ | ✅ |
| post-lonely-at-work.html | 50 | 148 | ✅ | ✅ | BreadcrumbList + Article ✅ | ✅ |
| post-lonely.html | 59 | 149 | ✅ | ✅ | BreadcrumbList + Article ✅ | ✅ |
| post-multitasking.html | 48 | 160 | ✅ | ✅ | BreadcrumbList + Article ✅ | ✅ |
| post-new-city-loneliness.html | 58 | 141 | ✅ | ✅ | BreadcrumbList + Article ✅ | ✅ |
| post-overwork-brain.html | 51 | 160 | ✅ | ✅ | BreadcrumbList + Article ✅ | ✅ |
| post-quiet-cracking.html | 57 | 157 | ✅ | ✅ | BreadcrumbList + Article ✅ | ✅ |
| post-unheard.html | 60 | 160 | ✅ | ✅ | BreadcrumbList + Article ✅ | ✅ |

**Sitemap:** Clean — no privacy-policy.html or terms.html present. All 22 listed URLs are valid content pages, including all original 5 blog posts and 8 newer posts.

### Notes
- The site has grown since this monitor was first configured: there are now 13 blog posts (up from the original 5) plus pricing/tool pages, all correctly listed in the sitemap with valid SEO metadata.
- Homepage response time of 1918 ms is well under the 3000 ms warning threshold and is consistent with a Netlify cold start; not flagged.
