# Site Health Report — Clearhead — 2026-07-13 23:05 IST

## Status: HEALTHY ✅

## Summary
All 52 checks passed — pages, redirects, images, payment workflow, and SEO integrity are all healthy; the only open items are the long-running Google indexing issue (High escalation, day 45) and a growing backlog of uncommitted local content not yet deployed.

## Critical (0)
None

## High (0)
None — see Google Indexing Status below (tracked known issue, not a site fault).

## Medium (0) — SEO
None

## Google Indexing Status
**Days since indexing requested:** 45 days (since 2026-05-29)
**Status:** High
**Note:** No change from yesterday (day 43, High). Google still has not crawled the originally flagged pages in 6+ weeks despite the manual request. Recommendation unchanged: (1) build 2–3 quality external backlinks, (2) drive direct traffic/mention signals via community answers or earned PR, (3) check GSC for manual actions or crawl errors.

## Warning (1)
- **Local content not deployed (growing backlog):** working tree has uncommitted/untracked changes — `post-perfectionism.html` and `post-mattering-at-work.html` are untracked, `post-self-compassion-work-stress.html` is staged, and `blog.html`/`sitemap.xml`/`llms.txt` have unpushed edits. Last git commit was 2026-07-09. Confirmed live: all three of these posts currently 404 on clearhead.in (not yet deployed), even though they're already in the local sitemap with lastmod dates of 07-10, 07-11, and 07-12. This is the same issue flagged in the 07-11 report, now three posts deep instead of one. Not touched by the monitor (content/deploy decisions are outside auto-fix scope) — recommend running `git add -A && git commit -m "publish pending posts" && git push` from ~/Documents/Zen, or letting the next asset-factory run handle it.

## Auto-fixed (0)
None. (Note: an initial pass of the SEO description-length check flagged 7 posts as too short — this was a false positive from a regex that breaks on apostrophes in description text, e.g. "We're statistically...". Re-verified against raw file content with a corrected parser; all 28 indexable files are within range. No site files were touched.)

## Checks passed (52/52)
9 pages + 1 www redirect + 6 clean URLs + 4 images + 3 payment workflow steps + 28 SEO file checks (title/description length, canonical, full og:image set) + 1 homepage structured-data check (FAQPage + LocalBusiness with telephone/geo/hasMap) + 1 sitemap hygiene check.

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| / | 200 | 1765 |
| /blog.html | 200 | 550 |
| /post-ai.html | 200 | 728 |
| /post-ai-loneliness.html | 200 | 627 |
| /post-unheard.html | 200 | 520 |
| /post-lonely.html | 200 | 773 |
| /post-conversation.html | 200 | 529 |
| /sitemap.xml | 200 | 552 |
| /robots.txt | 200 | 560 |

All well under the 3000ms warning threshold.

### Redirects
| From | Expected | Actual status | Location |
|---|---|---|---|
| https://www.clearhead.in/ | 301 → https://clearhead.in/ | 301 | https://clearhead.in/ ✅ |

Clean URLs (/blog, /post-ai, /post-unheard, /post-lonely, /post-conversation, /post-ai-loneliness): all 200 via Netlify Pretty URLs ✅

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
| A — Order creation | POST /api/create-order → expect 400 | ✅ 400 (credentials present, validation fired) |
| B — Verify function | GET /api/verify-payment → expect 405 | ✅ 405 |
| C — Razorpay CDN | checkout.razorpay.com/v1/checkout.js → expect 200 | ✅ 200 (130 ms) |

### SEO
All 28 indexable files checked (index, blog, 26 posts — up from 24 posts on 07-11; `post-perfectionism.html` and `post-mattering-at-work.html` added to the local repo since then):

| Check | Result |
|---|---|
| Title 30–60 chars | ✅ all 28 (range 39–60) |
| Description 120–160 chars | ✅ all 28 (range 129–160) |
| Canonical present | ✅ all 28 |
| og:image / width / height / alt | ✅ all 28 |
| Homepage: FAQPage + LocalBusiness (telephone, geo, hasMap) | ✅ |
| Posts: BreadcrumbList + Article | ✅ all 26 |
| Sitemap excludes privacy-policy/terms | ✅ |
| Sitemap includes all 5 original posts | ✅ (36 URLs total) |

## Deploy note
Local repo is ahead of what's committed — 3 unpublished posts and pending sitemap/blog-index edits. This doesn't affect the health of what's currently live, but the site owner should deploy soon to keep the local sitemap/live sitemap in sync.

Report saved to: ~/Documents/Zen/audits/site-health-2026-07-13.md
