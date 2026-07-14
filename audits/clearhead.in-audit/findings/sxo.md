# Clearhead.in — Search Experience Optimization (SXO) Analysis

**Date:** 2026-07-14
**Method:** Structural/intent-based analysis. Target pages were read from live source (static HTML, no build step, so repo source = served content) at `/Users/jain/Documents/Zen`. SERP patterns were checked via live web search on 2026-07-14 for representative queries — this reflects **real, current search-results patterns** (what page types/formats currently rank), but is **not** a citation of clearhead.in's own ranking position for any query, since the site currently has none (see Critical Context below). Where the report says "SERP shows X," that is an observed pattern from an actual search performed today; where it says "expect," that is intent-matching inference, not a measured metric.

---

## Summary

Clearhead.in has an unusually strong *technical* SEO foundation for a solo-practitioner site — rich Schema.org markup (Person, LocalBusiness, ProfessionalService, Article, FAQPage, Service+Offers, SoftwareApplication/ItemList), evidence-backed blog content, and a genuinely differentiated free-tools funnel. But there is a real, fixable gap between the site's **emotionally-led brand voice** and the **literal service-category language** that competing pages use to win local and commercial-informational queries — plus one finding that overrides everything else: **the domain currently has zero pages indexed in Google** (verified live today), so none of the intent-matching work below can pay off until indexing is resolved. That single issue should outrank every other recommendation in this report by priority, even though it sits outside the page-type/intent-match lens the rest of this analysis uses.

Where the site *is* indexed and discoverable, the biggest recurring pattern is: **strong emotional/identity framing, weak literal keyword framing.** Competitors ranking for "executive coach Mumbai" and "burnout coaching for managers" put the service category directly in their titles and H1s ("Executive Coach in Mumbai," "Burnout Coaching for Professionals, Leaders & Managers"). Clearhead's equivalent pages lead with brand poetry ("Someone to actually think with," "You hold the whole team together. So who holds you?") and leave the literal service phrase to bury in meta/schema only. The content underneath is often *better* than what's ranking (more research-cited, more specific) — it's the surface-level signal matching that's under-built.

---

## Critical context (read before the rest of this report)

A live `site:clearhead.in` search today returned **zero results from the clearhead.in domain** — the top results were unrelated companies that happen to also be named "Clearhead" (a UK/Australia mental-health EAP platform at myclearhead.com, a creative agency at weareclearhead.com, a real-estate consultancy at clearheadconsultants.com). This matches `KNOWLEDGE_MAP.md`'s note that pages were "Discovered — not indexed" as of 2026-05-29; six-plus weeks later, live search confirms the domain still is not surfacing at all. Until this resolves, no amount of page-type/intent optimization can be tested against real rankings — everything below describes *readiness for when indexing lands*, not current performance.

Related to this: the "Clearhead" brand name itself is not a clean search asset. If a searcher ever types "Clearhead coaching" or "Clearhead mental health," they will currently surface an unrelated, better-established mental-health EAP company (myclearhead.com) before Vaibhav's site even indexes. **Vaibhav Jain's personal name + ICF PCC credential is the more defensible, differentiated search identity** — which the site already leans on in titles (good instinct), but the homepage H1 and hero don't say "Vaibhav Jain" or "ICF PCC" until the eyebrow line above the H1.

---

## Query-by-query intent-match analysis

### 1. "executive coach Mumbai" — local/commercial intent

**Real SERP pattern observed today:** directory listings (Noomii, Mantra Coach directory, IndiaMART) and individual coaches' service pages with location-specific landing pages, e.g. `coachkshitij.com/mumbai/` ("Best Executive Coach in Mumbai | Coaching for CEOs, CXOs & Leaders"), `anandmunshi.com/executive-coach-in-mumbai`. Every ranking individual-coach page puts the literal phrase "Executive Coach in Mumbai" in the title and typically the H1, and foregrounds who they work with (CEOs, CXOs, senior managers).

**Target page:** homepage (`index.html`)
**Page-type match:** the homepage *is* structurally the right page type — professional-service landing page with `LocalBusiness` + `ProfessionalService` + `Person` schema, address, geo, phone, hours. That part is genuinely well-built.
**Mismatch severity: MEDIUM–HIGH**, on keyword/on-page signal, not page type. The H1 is "Someone to *actually* think with" and the visible copy never uses the phrase "executive coach" anywhere on the page — only the JSON-LD `serviceType` array (`"Executive Coaching"`) contains it, which is invisible to a scanning user and a weaker relevance signal than visible text. The trust strip ("Google, Meta & Apple professionals," "Fortune 500 leadership") does the *positioning* work well; it just never anchors that positioning to the literal service-category term searchers type.

**User story:** *As a VP or Engineering Director quietly evaluating outside support after a rough quarter, I search "executive coach Mumbai" because I want someone credentialed, local, and used to working with people at my level — and I expect to see "executive coach" + Mumbai + credentials + who-they-work-with within the first screen.* Clearhead's hero delivers credentials and seniority-signaling well, but a fast scanner (or Google's on-page relevance model) can miss that this *is* executive coaching because the term itself never appears in visible text.

---

### 2. "ICF coach Andheri West" / neighborhood-specific local intent

**Real SERP pattern observed today:** essentially no dedicated competition — results were dominated by ICF training/certification bodies (India Coaching Federation, coach-training programs), not individual practicing coaches in that neighborhood. This is a real white-space: nobody is currently winning this hyperlocal query with a genuine local-service page.

**Target page:** homepage / contact section
**Page-type match: ALIGNED in principle** — this is exactly the kind of thin, winnable local query a strong `LocalBusiness` page with correct NAP (name/address/phone) should be able to take. Clearhead's schema has the right address (Lokhandwala Complex, Andheri West, geo-coordinates) and phone.
**Mismatch severity: MEDIUM**, not because the page type is wrong, but because the locality signal is under-surfaced and under-supported: "Lokhandwala" / "Andheri West" appears only in the footer address block and the mid-page "safe space" bullet list ("Online or in-person in Lokhandwala"), never in a hero-level or heading-level locality statement. There is also no confirmed Google Business Profile in the project's own documentation (`KNOWLEDGE_MAP.md` §12 lists contact info but no GBP link) — GBP presence and reviews are what actually win local-pack visibility for this kind of query, and that's outside what page source alone can confirm (see Limitations).

**User story:** *As a professional living in Andheri West or nearby who wants occasional in-person sessions without a long commute, I search "ICF coach Andheri West" because proximity matters to me — and I expect a map, reviews, and a clear "in-person available here" statement above the fold.* Clearhead offers exactly this (in-person in Lokhandwala) but buries it mid-page rather than leading with it for a locally-qualified visitor.

---

### 3. "burnout coaching for managers" — mixed informational/commercial intent

**Real SERP pattern observed today:** a hybrid SERP — individual coaches' service-explainer pages titled explicitly as services ("Burnout Coaching for Professionals, Leaders & Managers | Reclaim Your Energy," "Burnout Coaching: How It Works and What to Expect") sitting alongside research-driven thought-leadership content (a Frontiers peer-reviewed article, an InsideOut Development blog post citing manager-engagement statistics).

**Target page:** `post-manager-burnout.html` ("You hold the whole team together. Who holds you?")
**Page-type match:** genuinely strong on the *research-credibility* half of this SERP — the post cites Gallup's *State of the Global Workplace 2025* and a 2025 peer-reviewed systematic review by name, with a proper `citation` array in its `Article` schema and a well-built `FAQPage` block answering exactly the kind of questions ("Why do managers burn out faster?", "What actually helps a burned-out manager?") that match People-Also-Ask patterns for this query.
**Mismatch severity: MEDIUM.** The gap is on the *service-framing* half: competing pages are titled and structured explicitly as the service itself ("Burnout Coaching for Professionals, Leaders & Managers"), so a searcher immediately knows "this page sells the thing I'm searching for." Clearhead's title ("Why Managers Burn Out First") and H1 read as pure editorial — the word "coaching" never appears in the title, meta description, or H1, and the bottom-of-page CTA is a generic "free 30-minute conversation" invite rather than something that explicitly says "this is what burnout coaching with me looks like."

**User story:** *As an Engineering Director who is still performing but privately hollowed out, I search "burnout coaching for managers" because I want to know (a) is this a credible, evidence-based thing, not woo, and (b) what would actually happen if I booked one — and I expect both a research grounding and an explicit "here's what the coaching itself looks like" section.* Clearhead nails (a) and under-delivers (b) — the research is excellent, but the page never explicitly bridges "here's the research" to "here's what our sessions together would look like."

---

### 4. "AI anxiety at work coaching" — mixed B2B/individual intent

**Real SERP pattern observed today:** dominated by enterprise EAP/HR-vendor content — Lyra Health ("AI Anxiety at Work: What Leaders Can't Ignore"), Spring Health ("What HR Leaders Need to Know"), Modern Health, Meditopia for Work. Every top result is written *for organizational buyers* (HR leaders deciding on a benefits platform), not for an individual employee searching for personal help.

**Target page:** `post-ai.html` ("Your job title is changing. You don't have to lose yourself with it.")
**Page-type match:** this is actually a case where the target page is a **better fit for the underlying human need than what's currently ranking** — post-ai.html speaks directly to the individual ("If you're a working professional... you've felt this") with FAQ schema, third-party citations (WEF Future of Jobs 2025, McKinsey, ICF), and an embedded video reference. It should not try to become an HR-buyer pillar page to compete on this exact compound phrase.
**Mismatch severity: LOW, but flag as a keyword-targeting note rather than a page fix.** The literal query "AI anxiety at work coaching" currently pulls B2B/organizational content because Google reads "coaching" + "at work" as an enterprise-benefits signal. Clearhead's individual-facing content is structurally right for adjacent, higher-individual-intent variants (which the blog already targets well in sibling posts: "AI job fear," "AI Replacement Dysfunction," "keeping up with AI is exhausting you") — this is a validation of existing content strategy, not a defect.

**User story:** *As a Senior PM who feels a specific dread every time a new AI tool rolls out at my company, I search something closer to "AI job replacement anxiety" or "will AI take my job fear" because I want to know I'm not overreacting and want a low-commitment next step — and I expect a piece that names the specific fear, cites real research, and offers a way to talk to someone without a hard sell.* `post-ai.html` delivers this well for the right query shape; the compound "...at work coaching" phrase itself is not a fight worth entering.

---

## Additional key-page note: the 5 free tools

`tools.html` presents five calculators (Bandwidth Index, Career Friction Audit, AI Relevance Index, Abundance Runway Calculator, Quit-to-Solo Readiness Index) plus one reflection tool, with solid `ItemList`/`SoftwareApplication` schema at the hub level. A spot-check of `career-friction.html` shows good title/meta targeting ("Should I Change Careers? Career Alignment Test") but the individual tool pages are lean on the trust/methodology content that ranking calculator-style pages typically carry (how the score is calculated, what happens to the data, sample output) — this matters both for SXO trust with a first-time visitor and for capturing longer-tail queries like "career alignment test free" or "AI job replacement test." This is a genuine differentiator versus the competitor set observed in the SERP scans above (none of the ranking Mumbai coaches offer free interactive tools) — it's underexploited rather than broken.

---

## Findings table

| Issue | Severity | Evidence | Recommendation |
|---|---|---|---|
| Domain has zero indexed pages in Google | CRITICAL | Live `site:clearhead.in` search today returned no results from the domain; matches `KNOWLEDGE_MAP.md` note of "Discovered — not indexed" as of 2026-05-29, unresolved 6+ weeks later | Prioritize above all SXO work: backlink acquisition, LinkedIn distribution of posts, and re-request indexing via GSC for priority URLs (home, pricing, 2–3 strongest posts) |
| "Clearhead" brand name collides with unrelated, better-established companies (incl. a mental-health EAP platform, myclearhead.com) | HIGH | Live search for `site:clearhead.in` and general "Clearhead" queries surface myclearhead.com, weareclearhead.com, clearheadconsultants.com instead | Lean harder on "Vaibhav Jain, ICF PCC" as the primary searchable identity in titles/H1s; treat "Clearhead" as a secondary brand element, not the main disambiguator |
| Homepage never uses the literal phrase "executive coach" in visible title/H1/body | MEDIUM–HIGH | Competing pages ranking for "executive coach Mumbai" (coachkshitij.com/mumbai/, anandmunshi.com) put the phrase directly in title and H1; Clearhead's H1 is "Someone to actually think with," phrase only exists in invisible JSON-LD `serviceType` | Add a visible service-category line near the H1 (eyebrow or subhead) — e.g. "Executive & Life Coaching for Senior Professionals in Mumbai" — without changing the emotional lede itself |
| Locality ("Andheri West," "Lokhandwala") is buried in footer/mid-page copy, not surfaced above the fold; no confirmed Google Business Profile | MEDIUM | Address/geo only in `LocalBusiness` schema and footer; "in-person in Lokhandwala" is one bullet mid-page; `KNOWLEDGE_MAP.md` §12 lists no GBP link | Add a visible locality statement near hero/trust-strip; confirm and link a Google Business Profile (cross-reference `/seo local`) |
| `post-manager-burnout.html` reads as pure editorial, not framed as a bookable "burnout coaching" service | MEDIUM | Competing pages for "burnout coaching for managers" are titled as services (e.g. "Burnout Coaching for Professionals, Leaders & Managers"); Clearhead's title/H1/meta never use the phrase "burnout coaching"; CTA is a generic free-call invite | Add one explicit mid-article line positioning the post as burnout coaching itself, and test a title variant containing the phrase |
| Individual free-tool pages are lean on methodology/trust content (how scoring works, data handling, sample output) | MEDIUM | Spot-check of `career-friction.html`: strong title/meta, thin explanatory/trust content relative to what ranking calculator tools typically carry | Add a short "how this is calculated" + no-data-stored note to each tool page — improves both trust and long-tail capture (e.g. "career alignment test") |
| "AI anxiety at work coaching" phrase is B2B/HR-buyer-skewed; individual-facing content shouldn't chase it as-is | LOW (validation, not defect) | Top results for that exact phrase are enterprise EAP vendors (Lyra Health, Spring Health, Modern Health) writing for HR leaders | Continue targeting individual-intent variants, which sibling posts already do well ("AI Replacement Dysfunction," "keeping up with AI is exhausting you") — no page change needed |

---

## What's already strong

- **Structured data is above-average for a solo-practitioner site.** `Person`, `LocalBusiness`, `ProfessionalService`, `Article` + `citation`, `FAQPage`, `Service` + `Offer` (with real prices), and `SoftwareApplication`/`ItemList` are all present and correctly scoped across the relevant page types — a real technical foundation once indexing resolves.
- **Blog content is genuinely evidence-based**, citing 2025–2026 peer-reviewed studies, Gallup, WEF, and McKinsey by name, with `FAQPage` blocks that closely mirror People-Also-Ask patterns for the topics covered. This is a stronger E-E-A-T posture than several of the competitor pages surfaced in the SERP scans, which lean on generic coaching-marketing language without citations.
- **The five free interactive tools are a real, underused differentiator** — none of the competing Mumbai executive-coach pages found in this scan offer anything comparable, and the tools double as a low-friction lead-capture layer.
- **CTA architecture is honest and low-pressure** ("free 30-minute conversation," "no lock-ins," WhatsApp as a direct alternative), which matches the trust-building need of a senior professional who is wary of being sold to — this tonal choice is a strength, not just a brand quirk, for this specific audience.
- **Local business schema is technically correct and complete** (address, geo-coordinates, hours, phone) on both the homepage and pricing page, giving local intent a solid technical base to build visible on-page signals on top of.

---

## Limitations

- No Google Search Console or rank-tracking data was available for this analysis; all SERP observations above come from live web searches performed today (2026-07-14) for representative queries, reflecting real current result patterns — not a citation of clearhead.in's own ranking position, since the domain currently has none.
- A live `site:clearhead.in` search was used to confirm indexing status; this is the one piece of "real" clearhead.in search data in this report, and it shows zero indexed pages.
- Google Business Profile presence, review count/quality, backlink profile, and mobile Core Web Vitals could not be assessed from page source and were not in scope here — see `/seo local` and `/seo page` for those.
- Only a representative sample of pages was read in full detail (`index.html`, `pricing.html`, `blog.html`, `tools.html`, `post-ai.html`, `post-manager-burnout.html`, `career-friction.html`); the remaining ~20 blog posts and 4 other tool pages were reviewed only via their index-page summaries, not individually audited.
- This report is intentionally structural/intent-based reasoning, not a live ranking audit — per instructions, no ranking positions for clearhead.in were fabricated.
