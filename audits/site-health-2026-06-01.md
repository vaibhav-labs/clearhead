# Site Health Report — Clearhead — 2026-06-01 08:28 IST

## Status: HEALTHY ✅

## Summary
All 23 availability/SEO checks passed. Site healthy, payments wired correctly, no auto-fixes required. Google indexing still pending (day 3 of 7-day window).

## Critical (0)
None

## High (0)
None

## Medium — SEO (0)
None

## Google Indexing Status
**Days since indexing requested:** 3 days (since 2026-05-29)
**Status:** Pending — Google crawl expected within 1–7 days after manual request.
**Note:** No action needed today. If pages remain uncrawled by 2026-06-05 (day 7), tomorrow's report will escalate to "Warning" and recommend re-requesting indexing via GSC URL inspection.

## Warning (0)
None

## Auto-fixed (0)
None

## Checks passed (23/23)

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| Homepage | 200 | 1271 |
| Blog index | 200 | 597 |
| Post: AI identity | 200 | 954 |
| Post: AI loneliness | 200 | 773 |
| Post: Unheard | 200 | 568 |
| Post: Lonely | 200 | 516 |
| Post: Conversation | 200 | 592 |
| Sitemap | 200 | 512 |
| Robots | 200 | 639 |

### Redirects
| From | Expected | Actual status | Location |
|---|---|---|---|
| https://www.clearhead.in/ | 301 | 301 | https://clearhead.in/ |
| /blog | 200 or 301 | 200 | (Netlify Pretty URLs; canonical handles SEO) |
| /post-ai | 200 or 301 | 200 | (Netlify Pretty URLs) |
| /post-unheard | 200 or 301 | 200 | (Netlify Pretty URLs) |
| /post-lonely | 200 or 301 | 200 | (Netlify Pretty URLs) |
| /post-conversation | 200 or 301 | 200 | (Netlify Pretty URLs) |
| /post-ai-loneliness | 200 or 301 | 200 | (Netlify Pretty URLs) |

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
| B — Verify function | GET /api/verify-payment → expect 405 | ✅ 405 (POST-only function alive) |
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ 200 |

### SEO
| File | Title len | Desc len | Canonical | OG tags | Structured data |
|---|---|---|---|---|---|
| index.html | 60 ✅ | 140 ✅ | ✅ | ✅ all 4 | ✅ FAQPage + LocalBusiness (telephone, geo, hasMap) |
| blog.html | 50 ✅ | 129 ✅ | ✅ | ✅ all 4 | n/a |
| post-ai.html | 60 ✅ | 155 ✅ | ✅ | ✅ all 4 | ✅ BreadcrumbList + Article |
| post-ai-loneliness.html | 59 ✅ | 157 ✅ | ✅ | ✅ all 4 | ✅ BreadcrumbList + Article |
| post-unheard.html | 60 ✅ | 160 ✅ | ✅ | ✅ all 4 | ✅ BreadcrumbList + Article |
| post-lonely.html | 59 ✅ | 149 ✅ | ✅ | ✅ all 4 | ✅ BreadcrumbList + Article |
| post-conversation.html | 52 ✅ | 160 ✅ | ✅ | ✅ all 4 | ✅ BreadcrumbList + Article |

### Sitemap
| Check | Result |
|---|---|
| privacy-policy.html excluded | ✅ |
| terms.html excluded | ✅ |
| All 5 blog posts present | ✅ |
| blog.html present | ✅ |

---

Report saved to: `~/Documents/Zen/audits/site-health-2026-06-01.md`
