# Site Health Report — Clearhead — 2026-06-10 02:32 UTC

## Status: HEALTHY ✅

## Summary
All 23 HTTP checks passed. 1 SEO title regression auto-fixed. Google indexing still pending (day 12 of wait). All systems operational.

## Critical (0)
None

## High (0)
None

## Medium — SEO (0)
None (1 issue auto-fixed)

## Warning (0)
No infrastructure or availability warnings. Indexing escalation tracked separately.

## Google Indexing Status
**Days since indexing requested:** 12 days (since 2026-05-29)
**Status:** ⚠️ Warning — pages still not crawled by Google

**Action needed:** You're past the 7-day threshold. If no crawl activity appears in Google Search Console within the next 2–3 days, consider:
1. Re-requesting indexing for the blog post pages via GSC URL inspection
2. Sharing 1–2 blog posts on LinkedIn to drive direct traffic signals
3. Checking GSC for any manual actions or crawl rate issues

This is not urgent yet (day 15+ would be critical), but monitoring.

## Auto-fixed (1)

**File:** post-ai-loneliness.html
**Issue:** Title exceeded 60-character limit
**Original:** "Can AI Cure Loneliness? What a 2026 Study Found | Clearhead" (63 chars)
**Fixed to:** "Can AI Cure Loneliness? A 2026 Study | Clearhead" (52 chars)
**Status:** Fixed locally. Git commit blocked by lock file — file change is present but not yet committed to git.

## Checks passed (23/23)

All HTTP availability, redirect, image, and payment infrastructure checks passed without issue.

---

## Full results

### Pages (9 checks)
| Page | Status | Time (ms) |
|---|---|---|
| Homepage | ✅ 200 | 2126 |
| Blog index | ✅ 200 | 740 |
| Post: AI identity | ✅ 200 | 796 |
| Post: AI loneliness | ✅ 200 | 793 |
| Post: Unheard | ✅ 200 | 819 |
| Post: Lonely | ✅ 200 | 775 |
| Post: Conversation | ✅ 200 | 709 |
| Sitemap | ✅ 200 | 511 |
| Robots.txt | ✅ 200 | 495 |

### Redirects (7 checks)
| From | Expected | Actual | Status |
|---|---|---|---|
| www.clearhead.in | 301 → clearhead.in/ | 301 ✅ | ✅ |
| /blog | 200 or 301 | 200 (Pretty URLs) | ✅ |
| /post-ai | 200 or 301 | 200 (Pretty URLs) | ✅ |
| /post-unheard | 200 or 301 | 200 (Pretty URLs) | ✅ |
| /post-lonely | 200 or 301 | 200 (Pretty URLs) | ✅ |
| /post-conversation | 200 or 301 | 200 (Pretty URLs) | ✅ |
| /post-ai-loneliness | 200 or 301 | 200 (Pretty URLs) | ✅ |

### Images (4 checks)
| Image | Status |
|---|---|
| VJ.jpg | ✅ 200 |
| coaching-early.jpg | ✅ 200 |
| coaching-mid.jpg | ✅ 200 |
| coaching-grad.jpg | ✅ 200 |

### Payment workflow (3 checks)
| Step | Check | Result |
|---|---|---|
| A — Order creation | POST /api/create-order → expect 400 | ✅ 400 (credentials present) |
| B — Verify function | GET /api/verify-payment → expect 405 | ✅ 405 (POST-only) |
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ 200 |

### SEO integrity

**Index & Blog pages:**
| File | Title (chars) | Description (chars) | Canonical | OG tags | Structured data |
|---|---|---|---|---|---|
| index.html | ✅ 56 | ✅ 144 | ✅ | ✅ complete | ✅ FAQPage, LocalBusiness |
| blog.html | ✅ 54 | ✅ 138 | ✅ | ✅ complete | ✅ BreadcrumbList |

**Blog posts:**
| File | Title (chars) | Description (chars) | Canonical | OG tags | Structured data |
|---|---|---|---|---|---|
| post-ai.html | ✅ 60 | ✅ 154 | ✅ | ✅ complete | ✅ Article, BreadcrumbList |
| post-ai-loneliness.html | ✅ 52 (fixed) | ✅ 159 | ✅ | ✅ complete | ✅ Article, BreadcrumbList |
| post-unheard.html | ✅ 60 | ✅ 159 | ✅ | ✅ complete | ✅ Article, BreadcrumbList |
| post-lonely.html | ✅ 60 | ✅ 156 | ✅ | ✅ complete | ✅ Article, BreadcrumbList |
| post-conversation.html | ✅ 54 | ✅ 159 | ✅ | ✅ complete | ✅ Article, BreadcrumbList |
| post-new-city-loneliness.html | ✅ 60 | ✅ 147 | ✅ | ✅ complete | ✅ Article, BreadcrumbList |

**Sitemap:**
- ✅ Does NOT contain privacy-policy.html or terms.html
- ✅ Contains all 6 blog posts
- ✅ All referenced pages exist and return 200

---

**Report saved to:** `~/Documents/Zen/audits/site-health-2026-06-10.md`
