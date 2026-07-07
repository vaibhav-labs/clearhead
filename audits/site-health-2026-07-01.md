# Site Health Report — Clearhead — 2026-07-01 08:02 IST

## Status: HEALTHY ✅ (one tracked long-running indexing issue)

## Summary
All 23 HTTP checks (pages, redirects, images, payment workflow) and all SEO integrity checks passed with zero regressions; the only open item is the long-standing Google indexing gap, now at Day 33 and escalated to High per the skill's own escalation schedule (owner action required, nothing broken on the site).

## Critical (0)
None

## High (1)
- **Google indexing (tracked, not a site fault):** 6 content pages still show no evidence of being crawled 33 days after the manual indexing request. This is a domain-authority/crawl-budget issue requiring Search Console action by the site owner — not a page, deploy, or code failure. Details and recommended actions in the Google Indexing section below.

## Medium — SEO (0)
None. Every indexable page passed all checks:

| File | Title | Desc | Canonical | og:image + w/h/alt | Structured data |
|---|---|---|---|---|---|
| index.html | 60 ✅ | 140 ✅ | ✅ | ✅ | FAQPage + LocalBusiness (tel/geo/hasMap) ✅ |
| blog.html | 50 ✅ | 129 ✅ | ✅ | ✅ | — |
| post-ai.html | 60 ✅ | 155 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-ai-loneliness.html | 48 ✅ | 157 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-unheard.html | 60 ✅ | 160 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-lonely.html | 59 ✅ | 149 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |
| post-conversation.html | 52 ✅ | 160 ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ |

Sitemap: contains all 5 blog posts + blog index; no privacy-policy or terms entries. ✅

## Google Indexing Status
**Days since indexing requested:** 33 days (since 2026-05-29)
**Status:** High — Google has not crawled these pages in 2+ weeks despite the manual request. Likely crawl-budget / low site-authority issue on a new domain.
**Note:** Escalation level is unchanged from prior days (has been "High" since Day 15). All 6 content URLs remain live and crawlable (HTTP 200, correct title/canonical), so nothing is technically blocking Google. Recommended owner actions:
1. Add 2–3 quality external backlinks pointing to clearhead.in (directories, guest mentions, professional profiles).
2. Share the blog posts on LinkedIn to generate direct-traffic and discovery signals.
3. In Search Console, re-run URL Inspection → Request Indexing on the 6 pages and check for any manual actions or crawl errors.

Pages still awaiting crawl:
- https://clearhead.in/blog.html
- https://clearhead.in/post-ai.html
- https://clearhead.in/post-ai-loneliness.html
- https://clearhead.in/post-conversation.html
- https://clearhead.in/post-lonely.html
- https://clearhead.in/post-unheard.html
(privacy-policy.html and terms.html are utility pages — OK if never indexed.)

## Warning (0)
None. Slowest response was the homepage at 2,220 ms (under the 3,000 ms warning threshold).

## Auto-fixed (0)
None. No SEO regressions found — no files edited, no commit/push needed.

## Checks passed (23/23 HTTP + all SEO)

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| homepage | 200 ✅ | 2220 |
| blog.html | 200 ✅ | 769 |
| post-ai.html | 200 ✅ | 583 |
| post-ai-loneliness.html | 200 ✅ | 720 |
| post-unheard.html | 200 ✅ | 998 |
| post-lonely.html | 200 ✅ | 841 |
| post-conversation.html | 200 ✅ | 843 |
| sitemap.xml | 200 ✅ | 846 |
| robots.txt | 200 ✅ | 728 |

### Redirects
| From | Expected | Actual | Location |
|---|---|---|---|
| www.clearhead.in/ | 301 | 301 ✅ | https://clearhead.in/ |
| /blog | 200 or 301 | 200 ✅ | Netlify Pretty URLs (canonical handles SEO) |
| /post-ai | 200 or 301 | 200 ✅ | Netlify Pretty URLs |
| /post-unheard | 200 or 301 | 200 ✅ | Netlify Pretty URLs |
| /post-lonely | 200 or 301 | 200 ✅ | Netlify Pretty URLs |
| /post-conversation | 200 or 301 | 200 ✅ | Netlify Pretty URLs |
| /post-ai-loneliness | 200 or 301 | 200 ✅ | Netlify Pretty URLs |

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
| B — Verify function | GET /api/verify-payment → expect 405 | ✅ 405 (POST-only) |
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ 200 |

### SEO
See the Medium — SEO table above. All titles 30–60 chars, all descriptions 120–160 chars, all canonical + og:image (with width/height/alt) present, homepage FAQPage/LocalBusiness present, every post has BreadcrumbList + Article, sitemap clean.
