# Site Health Report — Clearhead — 2026-05-30 08:08 IST

## Status: HEALTHY ✅ (1 SEO regression auto-fixed; push pending)

## Summary
All 23 live HTTP checks passed. One SEO regression was found and auto-fixed locally (missing `og:image:height` on post-ai-loneliness.html). The commit is queued in the local repo but the sandbox could not authenticate to GitHub — the user needs to run `git push origin main` from their machine to deploy the fix.

## Critical (0)
None.

## High (0)
None.

## Medium — SEO (1, auto-fixed)
- `post-ai-loneliness.html` was missing `<meta property="og:image:height">`. Added with content="1800" (verified actual Unsplash image dimensions: 1200×1800).

## Google Indexing Status
**Days since indexing requested:** 1 day (since 2026-05-29)
**Status:** Pending — Google crawl expected within 1–7 days after manual request.
**Note:** No action needed today. Re-evaluate on day 8 (2026-06-06) if blog posts still show "Discovered — currently not indexed" in GSC.

## Warning (0)
None. All page response times under 2 seconds.

## Auto-fixed (1)
- **File:** `post-ai-loneliness.html`
- **Change:** Inserted `<meta property="og:image:height" content="1800" />` between `og:image:width` and `og:image:alt`
- **Local commit:** `cb897be — monitor: auto-fix SEO regression 2026-05-30 — add og:image:height to post-ai-loneliness.html`
- **Git push status:** ⚠️ FAILED — sandbox has no GitHub credentials (`fatal: could not read Username for 'https://github.com'`). The local branch is **1 commit ahead of origin/main**.
- **Action needed from user:** Open Terminal and run:
  ```
  cd ~/Documents/Zen && git push origin main
  ```

## Checks passed (23/24)
23 live HTTP checks passed. 1 SEO check failed and was auto-fixed.

---

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| Homepage | 200 ✅ | 1606 |
| Blog index | 200 ✅ | 537 |
| post-ai | 200 ✅ | 691 |
| post-ai-loneliness | 200 ✅ | 770 |
| post-unheard | 200 ✅ | 532 |
| post-lonely | 200 ✅ | 739 |
| post-conversation | 200 ✅ | 619 |
| sitemap.xml | 200 ✅ | 1124 |
| robots.txt | 200 ✅ | 530 |

### Redirects
| From | Expected | Actual status | Location |
|---|---|---|---|
| https://www.clearhead.in/ | 301 → clearhead.in | 301 ✅ | https://clearhead.in/ |
| /blog | 200 or 301 → .html | 200 ✅ | Netlify Pretty URLs |
| /post-ai | 200 or 301 → .html | 200 ✅ | Netlify Pretty URLs |
| /post-unheard | 200 or 301 → .html | 200 ✅ | Netlify Pretty URLs |
| /post-lonely | 200 or 301 → .html | 200 ✅ | Netlify Pretty URLs |
| /post-conversation | 200 or 301 → .html | 200 ✅ | Netlify Pretty URLs |
| /post-ai-loneliness | 200 or 301 → .html | 200 ✅ | Netlify Pretty URLs |

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
| A — Order creation | POST /api/create-order → expect 400 | ✅ HTTP 400 (credentials present) |
| B — Verify function | GET /api/verify-payment → expect 405 | ✅ HTTP 405 (function alive) |
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ HTTP 200 |

### Google indexing status
**Days since request:** 1 day (since 2026-05-29)
**Status:** Pending
**Action needed:** None today. Google typically crawls within 1–7 days of a manual indexing request for low-authority new domains. Re-check on 2026-06-06.

### SEO (local file checks)
| File | Title (≤60) | Description (120–160) | Canonical | OG full | Schema | Result |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ | ✅ | ✅ | FAQPage + LocalBusiness ✅ | OK |
| blog.html | ✅ | ✅ | ✅ | ✅ | n/a | OK |
| post-ai.html | ✅ | ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ | OK |
| post-ai-loneliness.html | ✅ | ✅ | ✅ | ⚠️ (missing height — auto-fixed) | BreadcrumbList + Article ✅ | Fixed |
| post-unheard.html | ✅ | ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ | OK |
| post-lonely.html | ✅ | ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ | OK |
| post-conversation.html | ✅ | ✅ | ✅ | ✅ | BreadcrumbList + Article ✅ | OK |

### Sitemap
- ✅ privacy-policy.html not present
- ✅ terms.html not present
- ✅ All 5 blog posts present

---

**Report saved to:** `~/Documents/Zen/audits/site-health-2026-05-30.md`
