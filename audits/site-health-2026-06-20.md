# Site Health Report — Clearhead — 2026-06-20 10:04 IST

## Status: ISSUES FOUND ⚠️

## Summary
All 30 infrastructure and SEO checks passed (pages, redirects, images, payment workflow, meta tags, structured data, sitemap) — the only open item is the known Google indexing issue, now at day 22 and escalated to High.

## Critical (0)
None

## High (1)
- **Google indexing stalled (22+ days).** All 5 blog posts + blog index are still not crawled/indexed despite the manual request on 2026-05-29. This is past the 15-day threshold. Requires site-owner action (see Google Indexing Status below). No code fix possible.

## Medium (0) — SEO
None — every indexable page is within title/description limits and has all required canonical, Open Graph, and structured-data tags.

## Warning (0)
None — all response times well under thresholds (max 1064 ms on homepage).

## Auto-fixed (0)
None — no SEO regressions found, so no commits were made.

## Checks passed (30/30 technical; indexing pending external action)

## Full results

### Pages
| Page | Status | Time (ms) |
|---|---|---|
| https://clearhead.in/ | 200 | 1064 |
| https://clearhead.in/blog.html | 200 | 524 |
| https://clearhead.in/post-ai.html | 200 | 322 |
| https://clearhead.in/post-ai-loneliness.html | 200 | 313 |
| https://clearhead.in/post-unheard.html | 200 | 226 |
| https://clearhead.in/post-lonely.html | 200 | 224 |
| https://clearhead.in/post-conversation.html | 200 | 253 |
| https://clearhead.in/sitemap.xml | 200 | 242 |
| https://clearhead.in/robots.txt | 200 | 246 |

### Redirects
| From | Expected | Actual status | Location |
|---|---|---|---|
| https://www.clearhead.in/ | 301 → non-www | 301 | https://clearhead.in/ |

Clean URLs (Netlify Pretty URLs — 200 expected):
| Clean URL | Status |
|---|---|
| /blog | 200 |
| /post-ai | 200 |
| /post-unheard | 200 |
| /post-lonely | 200 |
| /post-conversation | 200 |
| /post-ai-loneliness | 200 |

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
**Days since request:** 22 days (since 2026-05-29)
**Status:** High
**Action needed:** Google has not crawled these pages in 2+ weeks despite the manual request. Recommended next steps for the site owner: (1) add 2–3 quality external backlinks to clearhead.in, (2) share the blog posts on LinkedIn to drive direct traffic/discovery signals, (3) check Google Search Console for any manual actions or crawl errors, and re-submit via URL Inspection. This is a domain-authority/crawl-budget issue, not a site defect.

### SEO
| File | Title len | Desc len | Canonical | og:image(+w/h/alt) | Structured data | Result |
|---|---|---|---|---|---|---|
| index.html | 60 | 140 | ✅ | ✅ | FAQPage + LocalBusiness (telephone, geo, hasMap) | ✅ |
| blog.html | 50 | 129 | ✅ | ✅ | — | ✅ |
| post-ai.html | 60 | 155 | ✅ | ✅ | BreadcrumbList + Article | ✅ |
| post-ai-loneliness.html | 48 | 157 | ✅ | ✅ | BreadcrumbList + Article | ✅ |
| post-unheard.html | 60 | 160 | ✅ | ✅ | BreadcrumbList + Article | ✅ |
| post-lonely.html | 59 | 149 | ✅ | ✅ | BreadcrumbList + Article | ✅ |
| post-conversation.html | 52 | 160 | ✅ | ✅ | BreadcrumbList + Article | ✅ |

Sitemap: clean — no privacy-policy.html or terms.html; all 5 blog posts + blog index present.

---

## AI Search / Answer-Engine Optimization (GEO/AEO)

New section — measures how well clearhead.in is positioned to be **cited by ChatGPT, Gemini, Grok, Claude, Perplexity and AI Overviews**. Based on what demonstrably works in 2026: structured data (pages with schema earn ~42% more AI citations), self-contained answer blocks (55% of AI-Overview citations come from the first 30% of a page), content freshness, statistics/citations in copy, entity/author authority, and AI-crawler access.

**AI-optimization status: GOOD ✅ — 2 enhancement opportunities (no defects)**

### AI-readiness scorecard
| Signal | What AI engines reward | clearhead.in | Result |
|---|---|---|---|
| AI crawler access | Search bots (OAI-SearchBot, Claude-SearchBot/ClaudeBot, PerplexityBot, Google-Extended) must not be blocked | robots.txt = `User-agent: * / Allow: /` → all AI bots allowed; only /api, /thank-you, /quiz disallowed | ✅ allowed |
| Explicit AI-bot directives | Named allow blocks for search bots (clarity/hardening) | none — relies on wildcard (works, but implicit) | ⚠️ optional |
| llms.txt / llms-full.txt | Curated markdown index for AI agents & discovery layer | **404 — missing** | ⚠️ add |
| Structured data | FAQPage, LocalBusiness, Article, BreadcrumbList, Person/author | all present across home + posts | ✅ |
| Author / E-E-A-T | Named author w/ credentials (ICF PCC) in schema | author/Person schema present | ✅ |
| Freshness signals | datePublished + dateModified; sitemap lastmod | posts carry both; all 23 sitemap URLs have lastmod | ✅ |
| Answer blocks / FAQ | Self-contained 40–60 word answers in first 150 words; Q-style headings | FAQPage on home + posts; blog index has 6 question headings | ✅ (room to add more atomic blocks) |
| Statistics & citations | Stats, named studies, quotations (strongest GEO performers) | present on every page checked | ✅ |
| Server-side rendering | Content readable without JS | fully static HTML | ✅ |

### AI-optimization recommendations (report-only — not auto-fixed)
1. **Add `/llms.txt`** (low effort, low risk). A curated markdown index of the key pages. Note: SE Ranking's ~300k-domain study found llms.txt has no measurable *ranking/citation* effect today — its real value is the agentic/discovery layer (IDE agents, AI tools fetch it). Safe to add; don't expect a citation bump on its own. A ready-to-deploy `llms.txt` has been drafted alongside this report.
2. **Add explicit AI search-bot allow blocks to robots.txt** (optional hardening). Current wildcard already allows them, so this is clarity, not a fix. If the owner ever wants "appear in AI search but stay out of training data," the 2026 consensus pattern is: allow `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`; disallow `GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`.
3. **Strengthen atomic answer blocks** (content, ongoing). Open each post with a self-contained 40–60 word answer to its core question within the first 150 words, since the majority of AI-Overview citations are lifted from the top of the page. Most posts already do this implicitly via the lede — make it deliberate.
4. **Keep freshness cycle** — AI engines deprioritise citations after ~14 days of staleness; the existing dateModified + sitemap lastmod discipline already covers this.
