# Clearhead.in — Full SEO Audit (claude-seo) — 2026-07-14

Ran via the newly-installed `claude-seo` plugin: 9 specialist sub-agents (technical, content/E-E-A-T, schema, sitemap, performance, GEO/AI-search, SXO, local, topic-clustering) each audited the live site and/or local source in parallel. Full per-category detail is in `findings/*.md` in this folder. This file is the synthesis. **Report-only — no files were edited, no commits made, nothing pushed or deployed.**

## Executive summary

On-page and technical fundamentals remain genuinely strong — clean structured data, zero JS-rendering barrier, solid content depth and citation practice, no thin content. Estimated on-page/technical health score: **~80/100**. But that number is close to irrelevant right now, because of one fact that overrides everything else below:

**The domain has zero indexed pages in Google.** A live `site:clearhead.in` search returned nothing from the domain — confirming `KNOWLEDGE_MAP.md`'s "Discovered — not indexed" status is still true, 6+ weeks later. Every other finding in this report describes readiness *for when indexing lands*, not current performance. Nothing here should be prioritized above getting indexed.

Beyond that, three real themes emerged across the 9 specialist passes:
1. **The site has outgrown its own scaffolding.** It grew from 6 to 26 blog posts fast, but `llms.txt` still lists 7, 8 of 26 posts have zero internal links pointing to them, and none of the 5 blog categories has an actual pillar page — they're same-page anchors, not standalone hub URLs.
2. **A content-quality split by age.** Posts published since 2026-07-08 are excellent — named studies, real citations, matching FAQ schema, honest caveats. Four original posts (`post-ai`, `post-unheard`, `post-lonely`, `post-conversation`) predate that standard and carry no citations at all.
3. **Emotional framing wins the reader; literal framing is what search needs too.** The brand voice ("Someone to actually think with") is a genuine strength for trust, but the literal service terms searchers type ("executive coach Mumbai," "burnout coaching") barely appear in visible text — only in invisible schema.

## Critical (1)

- **Zero indexed pages on Google** — live `site:clearhead.in` search today returned no results from the domain (confirms `KNOWLEDGE_MAP.md`, unresolved since 2026-05-29). Until this resolves, none of the on-page work below can be tested against real rankings or deliver any organic value. *Recommended: request indexing via Google Search Console for the homepage + 2-3 strongest posts, and pursue any backlink/mention opportunities (the site's own `clearhead-authority-engine` skill exists for exactly this) — indexing is very often unlocked by a single credible inbound link plus a GSC indexing request.*

## High (9)

- **`llms.txt` lists only 7 of 26 live articles and omits all 6 interactive tools** — stale since the catalog grew. *(GEO)*
- **4 original posts (`post-ai`, `post-unheard`, `post-lonely`, `post-conversation`) carry no citations, no References section, no named study** — unlike the 21+ posts published since, which all follow a "named study + citation + FAQ" house style. This is both a content-quality gap and, per the site's own AI-citation-first growth strategy, the exact kind of page least likely to ever get quoted by an AI engine. *(Content + GEO, same finding from two independent passes)*
- **"Clearhead" the brand name collides with unrelated, better-established companies** (a mental-health EAP platform at myclearhead.com, others) in search — "Vaibhav Jain, ICF PCC" is the more defensible, differentiated search identity but isn't led with in the homepage H1/hero. *(SXO)*
- **Sitewide footer is missing the phone number and state/country on every page except the homepage** — the shared footer partial used on ~38 pages only carries the address line. *(Local)*
- **Neither JSON-LD address block (`Person` or `LocalBusiness`) includes `streetAddress`** — "Lokhandwala Complex" exists in visible HTML but never in structured data. *(Local)*
- **No dedicated local-intent landing page** — every local signal is folded into the homepage contact section; per Whitespark 2026, a dedicated service/location page is the #1 local-organic ranking factor. *(Local)*
- **None of the 5 blog categories has a true pillar/hub page** — the "hub" is a same-page anchor on `blog.html` sharing one title/meta/canonical for the entire index, so it can't independently rank for a head term like "workplace burnout." *(Cluster)*
- **8 of 26 posts (31%) have zero incoming links from any other post** — `mattering-at-work`, `manager-burnout`, `multitasking`, `technostress`, `bedtime-procrastination`, `monday-dread`, `money-anxiety`, `perfectionism` are reachable only via the blog index, never from another post's "More from the blog" block. Notably `manager-burnout` targets the site's core persona (people who manage others) and gets zero internal reinforcement. *(Cluster)*

## Medium (14)

- Homepage `FAQPage` JSON-LD text doesn't exactly match the visible FAQ copy on 3 of 5 questions — a real defect now that FAQ schema's only remaining value is accurate AI/LLM citation, not SERP rich results. *(Schema)*
- `Article.publisher` is missing `logo` on all posts (Google's Article/Discover guidelines expect one). *(Schema)*
- No visible, linked author-bio/credentials block on individual blog posts — the ICF PCC credential and "3,000+ conversations" trust signal live only on the homepage `#about` anchor, unreachable in one click from a post. *(Content)*
- `dateModified` in Article schema is stale and inconsistent with `sitemap.xml` `lastmod` for the 4 legacy posts (39-day gap, no corresponding edit). *(GEO)*
- No high-authority off-page entity signals — `Person.sameAs` only links to a personal site; no LinkedIn, Wikipedia, YouTube, or Reddit, which the GEO literature ranks as stronger AI-citation correlates than backlinks/domain authority. *(GEO)*
- Homepage never uses the literal phrase "executive coach" in visible title/H1/body — only in invisible JSON-LD `serviceType`. *(SXO)*
- Locality ("Andheri West," "Lokhandwala") is buried in footer/mid-page copy rather than surfaced above the fold; no confirmed Google Business Profile link anywhere on-site. *(SXO + Local)*
- `post-manager-burnout.html` reads as pure editorial rather than being framed as a bookable "burnout coaching" service — competing pages that rank for that query are titled as the service itself. *(SXO)*
- The 5 free interactive tool pages are lean on methodology/trust content (how scoring works, data handling) relative to what typically-ranking calculator tools carry. *(SXO)*
- No `tel:` click-to-call link anywhere on the site — only `wa.me` WhatsApp deep links, which aren't a standard phone-citation signal. *(Local)*
- Google Maps embed was removed in the last redesign; only a text link remains — a weaker on-page GBP corroboration signal. *(Local)*
- Two disconnected business-schema entities (`ProfessionalService` + `LocalBusiness`) dilute the local entity signal — this is the same known-open finding flagged in the last two audits, confirmed still present (`index.html:73-129`); flagged here again because it's specifically relevant to local SEO, not just schema hygiene. *(Schema + Local, one underlying issue)*
- "Money & mental health" blog category has exactly one post — not a functioning cluster yet. *(Cluster)*
- AI cluster is majority off-domain content (9 links to the founder's personal blog `vj9.org` vs. 5 on-site posts), diluting on-site link equity and blurring what the cluster is about. *(Cluster)*

## Low (16 — grouped by area, full detail in `findings/*.md`)

**Technical:** no HSTS header; no CSP header (notable given the Razorpay checkout flow on `pricing.html`); no explicit `/index.html → /` redirect; mobile nav CTA pill under the 44×44px touch-target guideline; no IndexNow implementation despite weekly publishing cadence; robots.txt/noindex conflict on `/thank-you.html` + `/quiz.html` (known, still open since 2026-07-09).

**Schema:** `Article.author` re-declared as a fresh anonymous Person on every post instead of referencing the homepage's `@id`; `Person.sameAs` includes a Google Maps URL that belongs on the business entity, not the person; tool-page `ItemList` entries thinner than the canonical detail pages; no sitewide `WebSite` entity.

**Performance** *(heuristic only — no Lighthouse/CrUX access this session)*: hero image missing `fetchpriority="high"`; duplicate About-section photo not lazy-loaded; `styles.css` unminified; no explicit long-lived `Cache-Control` for static assets; Razorpay checkout script not `async`/`defer`.

**Local:** phone number formatted three different ways across schema/footer/WhatsApp links (same digits, no transcription error); `openingHours` uses the older plain-string format instead of `openingHoursSpecification`; `Person` schema missing `postalCode` (present on `LocalBusiness`); geo meta tags present on only 2 of ~38 pages.

**Content:** one post's `og:image` and JSON-LD `image` point to different pictures; 5 "AI & work identity" posts target closely overlapping queries (watch for cannibalization once indexed, not urgent yet).

**Sitemap:** `priority`/`changefreq` tags present but ignored by Google (safe to remove); 32 of 36 `lastmod` values share one date, suggesting a bulk-set rather than true edit history.

**Cluster:** Pressure & Burnout category bundles 4 distinct sub-themes under one 13-post heading; "mid-career identity" — one of the site's own three stated content pillars — has no dedicated post or cluster.

## What's already strong

- **Zero JS-rendering dependency anywhere** — every page's core content is in raw HTML. A genuinely rare, clean "pass" that removes any crawler-accessibility risk entirely.
- **Content depth and honesty are well above category norm**: 21+ of 26 posts cite a specific, named, dated study with working references, several explicitly caveat study limitations rather than overstating findings, and no page anywhere is thin.
- **Structured data is broad and clean**: zero JSON-LD parse errors anywhere on the site; Article/FAQPage/BreadcrumbList/SoftwareApplication/LocalBusiness all present and well-scoped.
- **robots.txt blocks no AI crawler** — GPTBot, ClaudeBot, PerplexityBot, Google-Extended are all implicitly allowed, which is the right call for this business's AI-citation strategy.
- **Internal linking is real, not the "everything links only to the homepage" failure mode** — every post has a working related-posts block, and the Loneliness & connection cluster in particular is a genuinely dense, well-meshed set.
- **The 5 free interactive tools are a real, underused differentiator** — no competing Mumbai executive-coach site found in this audit's live searches offers anything comparable.
- **Local NAP fundamentals are accurate at the source**: correct geo-coordinates, a genuine Google Maps place link with a real CID (evidence of an actual GBP listing), digit-consistent WhatsApp number everywhere.
- **No images anywhere over ~270KB, all images have alt text, OG image dimensions present on every page checked** (verified directly this run).
- **CTA architecture is honest and low-pressure** — a real fit for a senior-professional audience wary of being sold to.

## Prioritized action plan

**Do first (unlocks everything else):**
1. Get the domain indexed — GSC indexing request for homepage + strongest posts, plus any earned mention/backlink the authority-engine skill can generate.
2. Refresh `llms.txt` to cover all 26 posts + 6 tools; add it to the existing site-monitor automation so it can't drift again.
3. Backfill citations on the 4 legacy posts to match the now-established house style.

**Quick wins (small, targeted edits):**
4. Fix the 3 FAQ schema text mismatches on the homepage.
5. Fix the footer partial so phone + state/country appear on every page, not just the homepage.
6. Add `streetAddress` to both JSON-LD address blocks.
7. Add a visible service-category line near the homepage H1 (e.g. "Executive & Life Coaching for Senior Professionals in Mumbai") without touching the emotional lede.
8. Link the 8 orphaned posts into 2-3 existing posts' "More from the blog" blocks each, starting with `manager-burnout`.
9. Add a visible author-bio card (credential + link to `#about`) to the post template.

**Bigger, worth planning for:**
10. Build one real pillar page for Pressure & Burnout (the largest, most-linked cluster) — `post-quiet-cracking.html` has already organically become the de facto hub and is the natural candidate to expand.
11. Build a dedicated local-intent landing page/section distinct from the homepage.
12. Add a LinkedIn `sameAs` link at minimum; consider seeding Reddit/YouTube presence per the GEO literature's citation correlates.
13. Merge the `ProfessionalService`/`LocalBusiness` schema nodes (carried over from the last two audits — corrected JSON-LD is in `findings/schema.md`).

## Per-category detail

Full findings tables, evidence, and corrected code snippets are in:
`findings/technical.md` · `findings/content.md` · `findings/schema.md` · `findings/sitemap.md` · `findings/performance.md` · `findings/geo.md` · `findings/sxo.md` · `findings/local.md` · `findings/cluster.md`

## Notes on this run

- Several specialist sub-agents did not have live web-fetch access in their sandboxed context and audited the local source mirror instead (which, per project convention, is what Netlify serves verbatim for this build-step-free static site). The SXO agent did have live search access and used it to confirm the zero-indexing finding and current SERP patterns — that is the one genuinely live data point in this audit.
- Image optimization was checked directly (not via a sub-agent, since `claude-seo:seo-images` turned out not to be an available agent type in this plugin build — only `seo-image-gen`, which generates images rather than auditing them): no local images over ~270KB, zero images missing alt text, OG dimensions present on all pages sampled.
- This audit deliberately did not re-litigate the two Low findings already tracked from the 2026-07-09 and 2026-07-12 audits (robots.txt/noindex conflict, ProfessionalService/LocalBusiness split) as new — they're referenced above for completeness since some are now cross-relevant to local SEO specifically.
- No files were edited, no commits made, nothing pushed or deployed.
