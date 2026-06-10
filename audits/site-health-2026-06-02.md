# Site Health Report — Clearhead — 2026-06-02 10:08 IST

## Status: HEALTHY ✅

## Summary
All 23 HTTP checks and all SEO integrity checks pass. No issues found, no fixes needed. Google indexing remains pending (Day 4 of 1–7 day window since manual re-request on 2026-05-29).

## Critical (0)
None

## High (0)
None

## Medium — SEO (0)
None

## Google Indexing Status
**Days since indexing requested:** 4 days (since 2026-05-29)
**Status:** Pending — Google crawl expected within 1–7 days after manual request.
**Note:** No action required today. If pages remain uncrawled at Day 8 (2026-06-06), escalate to Warning and re-request indexing via GSC URL inspection.

## Warning (0)
None

## Auto-fixed (0)
None — no SEO regressions detected.

## Checks passed (23/23 HTTP + 7/7 SEO files)

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| homepage | 200 | 1526 |
| blog | 200 | 224 |
| post-ai | 200 | 351 |
| post-ai-loneliness | 200 | 651 |
| post-unheard | 200 | 470 |
| post-lonely | 200 | 531 |
| post-conversation | 200 | 398 |
| sitemap.xml | 200 | 654 |
| robots.txt | 200 | 1157 |

### Redirects
| From | Expected | Actual | Location |
|---|---|---|---|
| https://www.clearhead.in/ | 301 | 301 | https://clearhead.in/ |
| /blog | 200 or 30x | 200 | (Netlify Pretty URLs — canonical handles SEO) |
| /post-ai | 200 or 30x | 200 | (Netlify Pretty URLs) |
| /post-unheard | 200 or 30x | 200 | (Netlify Pretty URLs) |
| /post-lonely | 200 or 30x | 200 | (Netlify Pretty URLs) |
| /post-conversation | 200 or 30x | 200 | (Netlify Pretty URLs) |
| /post-ai-loneliness | 200 or 30x | 200 | (Netlify Pretty URLs) |

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
| B — Verify function | GET /api/verify-payment → expect 405 | ✅ 405 (POST-only, alive) |
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ 200 |

### SEO integrity (local files)
| File | Title len | Desc len | Canonical | OG (img/w/h/alt) | Structured data |
|---|---|---|---|---|---|
| index.html | 60 | 140 | ✅ | ✅ ✅ ✅ ✅ | FAQPage + LocalBusiness ✅ |
| blog.html | 50 | 129 | ✅ | ✅ ✅ ✅ ✅ | n/a |
| post-ai.html | 60 | 155 | ✅ | ✅ ✅ ✅ ✅ | BreadcrumbList + Article ✅ |
| post-ai-loneliness.html | 59 | 157 | ✅ | ✅ ✅ ✅ ✅ | BreadcrumbList + Article ✅ |
| post-unheard.html | 60 | 160 | ✅ | ✅ ✅ ✅ ✅ | BreadcrumbList + Article ✅ |
| post-lonely.html | 59 | 149 | ✅ | ✅ ✅ ✅ ✅ | BreadcrumbList + Article ✅ |
| post-conversation.html | 52 | 160 | ✅ | ✅ ✅ ✅ ✅ | BreadcrumbList + Article ✅ |

Sitemap: clean — no `privacy-policy.html` or `terms.html`; all 5 blog posts + runway present.

---

Report saved to: `~/Documents/Zen/audits/site-health-2026-06-02.md`
