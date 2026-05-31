# Site Health Report — Clearhead — 2026-05-31 10:04 IST

## Status: HEALTHY ✅

## Summary
All 23 automated checks passed and all 7 indexable pages pass SEO integrity — no issues, no auto-fixes needed. Google indexing still pending (day 2 of 7).

## Critical (0)
None

## High (0)
None

## Medium — SEO (0)
None

## Google Indexing Status
**Days since indexing requested:** 2 days (since 2026-05-29)
**Status:** Pending — Google crawl expected within 1–7 days after manual request.
**Note:** No escalation today. If still uncrawled by 2026-06-06, escalate to Warning and re-request via GSC URL inspection.

## Warning (0)
None

## Auto-fixed (0)
None

## Checks passed (23/23)
All HTTP availability + SEO integrity checks green.

---

## Full results

### Pages (9/9 OK)
| Page | Status | Time (ms) |
|---|---|---|
| homepage | 200 | 1417 |
| blog | 200 | 1195 |
| post-ai | 200 | 837 |
| post-ai-loneliness | 200 | 1032 |
| post-unheard | 200 | 1051 |
| post-lonely | 200 | 1057 |
| post-conversation | 200 | 650 |
| sitemap.xml | 200 | 574 |
| robots.txt | 200 | 475 |

### Redirects (7/7 OK)
| From | Expected | Actual | Location |
|---|---|---|---|
| www.clearhead.in/ | 301 → clearhead.in/ | 301 | https://clearhead.in/ |
| /blog | 200 or 301 | 200 | (Pretty URLs; canonical OK) |
| /post-ai | 200 or 301 | 200 | (Pretty URLs; canonical OK) |
| /post-unheard | 200 or 301 | 200 | (Pretty URLs; canonical OK) |
| /post-lonely | 200 or 301 | 200 | (Pretty URLs; canonical OK) |
| /post-conversation | 200 or 301 | 200 | (Pretty URLs; canonical OK) |
| /post-ai-loneliness | 200 or 301 | 200 | (Pretty URLs; canonical OK) |

### Images (4/4 OK)
| Image | Status |
|---|---|
| VJ.jpg | 200 |
| coaching-early.jpg | 200 |
| coaching-mid.jpg | 200 |
| coaching-grad.jpg | 200 |

### Payment workflow (3/3 OK)
| Step | Check | Result |
|---|---|---|
| A — Order creation | POST /api/create-order → expect 400 | ✅ 400 (credentials present) |
| B — Verify function | GET /api/verify-payment → expect 405 | ✅ 405 (function alive) |
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ 200 (117 ms) |

### SEO (all OK)
| File | Title len | Desc len | Canonical | OG tags | Structured data |
|---|---|---|---|---|---|
| index.html | 60 | 140 | ✅ | ✅ all 4 | FAQPage + LocalBusiness ✅ |
| blog.html | 50 | 129 | ✅ | ✅ all 4 | (index page — n/a) |
| post-ai.html | 60 | 155 | ✅ | ✅ all 4 | Article + BreadcrumbList ✅ |
| post-ai-loneliness.html | 59 | 157 | ✅ | ✅ all 4 | Article + BreadcrumbList ✅ |
| post-unheard.html | 60 | 160 | ✅ | ✅ all 4 | Article + BreadcrumbList ✅ |
| post-lonely.html | 59 | 149 | ✅ | ✅ all 4 | Article + BreadcrumbList ✅ |
| post-conversation.html | 52 | 160 | ✅ | ✅ all 4 | Article + BreadcrumbList ✅ |

Sitemap: privacy-policy.html and terms.html correctly excluded; all 5 expected blog posts present.

---

Report saved to: ~/Documents/Zen/audits/site-health-2026-05-31.md
