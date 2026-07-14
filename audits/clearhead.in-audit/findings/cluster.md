# Clearhead — Content Architecture & Semantic Clustering Findings

**Scope note (read first):** This is a **structural/semantic analysis using on-site signals only** —
post titles, stated angles, existing category groupings on `blog.html`, and actual `href` links found
in the 26 local `post-*.html` files. No real SERP-overlap tool or search-volume data (e.g. DataForSEO)
was available in this environment, so nothing below should be read as confirmed keyword cannibalization
or ranking-competition data. Where I flag possible cannibalization, treat it as a hypothesis to verify
with a real SERP-overlap pass, not a finding.

Source data: `blog.html` (5 named categories, current local version), and cross-post link inventory
from all 26 `post-*.html` files (both the "More from the blog" 3-card block at the foot of every post
and any inline in-body links).

---

## Summary

The five named categories on `blog.html` (Clarity & being heard, Loneliness & connection, AI/work/identity,
Pressure & burnout, Money & mental health) are semantically coherent as *groupings* — the posts inside each
one clearly belong together by topic. But none of them is a real hub-and-spoke pillar architecture. The
category "hub" is a same-page anchor (`#cat-burnout` etc.) on a single shared `blog.html` document with one
shared title/meta/canonical/JSON-LD for the whole page, not a standalone URL with its own synthesizing
content and outbound links to every spoke — so it cannot independently rank for a head term like "workplace
burnout" the way a true pillar page would. Internal linking between posts is real and mostly on-topic
(every post has a 3-card "More from the blog" block, and several have inline contextual links too), but it
is uneven: **8 of 26 posts (31%) — `mattering-at-work`, `manager-burnout`, `multitasking`, `technostress`,
`bedtime-procrastination`, `monday-dread`, `money-anxiety`, `perfectionism` — receive zero incoming links
from any other post** and are reachable only via the `blog.html` index. Meanwhile one post,
`post-quiet-cracking.html`, has organically become the de facto most-linked-to page on the entire site
(referenced by roughly 14 other posts across three different categories) without being structured as a
pillar page itself. The "Money & mental health" category has exactly one post, so it isn't a cluster at
all yet, and "Clarity & being heard" and "AI, work & identity" lean heavily on off-domain links to
`vj9.org` (the founder's personal blog) rather than on-site spokes, which both dilutes internal link
equity and blurs topical focus for the AI cluster in particular. Two of the site's own three stated
content pillars (`AI anxiety`, `mid-career identity`, `professional loneliness` — per `KNOWLEDGE_MAP.md`)
are well covered; "mid-career identity" is not represented as its own cluster and exists only as a
sub-theme inside AI-identity posts.

---

## Cluster-by-cluster assessment

### 1. Clarity & being heard
- **On-site posts:** 2 (`post-conversation.html`, `post-unheard.html`)
- **External (vj9.org) links in this category:** 5
- Only two genuine on-site spokes means this "cluster" is really a pair, padded out to look like a
  6–7 item category by linking to a different domain. The two on-site posts do link to each other and to
  loneliness-cluster posts, which is reasonable (the topics are adjacent), but there is no on-site
  cornerstone post that actually anchors "clarity / being heard" as a theme independent of loneliness.
- The external links point to `vj9.org`, a separate domain with its own branding, no `Article`/citation
  schema, and no coaching-practice CTA — readers who click through leave the funnel entirely, and any
  link equity these category placements generate flows off-site rather than reinforcing clearhead.in.

### 2. Loneliness & connection
- **On-site posts:** 5 (`mattering-at-work`, `lonely-at-work`, `new-city-loneliness`, `ai-loneliness`, `lonely`)
- **External links:** 1
- This is the most internally coherent cluster: `lonely`, `new-city-loneliness`, `ai-loneliness`,
  `unheard`, and `conversation` form a dense, genuinely cross-linked mesh (each links to 2–3 of the
  others). The exception is `mattering-at-work.html` — the post listed *first* in this category on
  `blog.html` — which has **zero incoming links from any other post**. It's an orphan inside its own
  cluster despite being the category's lead item.

### 3. AI, work & identity
- **On-site posts:** 5 (`technostress`, `ai-job-fear`, `ai-work-family-exhaustion`, `ai-replacement-dysfunction`, `ai`)
- **External (vj9.org) links:** 9 — more external links than on-site posts
- `ai.html`, `ai-job-fear`, `ai-work-family-exhaustion`, and `ai-replacement-dysfunction` cross-link
  well and clearly share an angle (AI-driven identity threat, grounded in cited studies). `technostress`
  is thinner on incoming links (0) despite being topically central.
- The bigger issue is composition: 9 of 14 items in this category are external vj9.org pieces, including
  a 4-part "Alignment Problem" series and two short-fiction pieces ("The Reckoning," "The Button") about
  AI-industry risk and AGI alignment. These are general AI-commentary/speculative-fiction content, not
  workplace-psychology-for-senior-professionals content, and they don't carry the site's research-citation
  format or booking CTA. Grouping them with the clinical, cited on-site posts blurs what this cluster is
  actually about and sends the bulk of this category's outbound link volume off clearhead.in.

### 4. Pressure & burnout
- **On-site posts:** 13 — by far the largest category (perfectionism, self-compassion-work-stress,
  manager-burnout, bedtime-procrastination, languishing, holding-it-together, monday-dread,
  impostor-syndrome, rest-burnout, multitasking, overwork-brain, quiet-cracking, cant-switch-off)
- **External links:** 0
- This category is really 3–4 sub-themes bundled under one label: (a) sleep/switching-off
  (`cant-switch-off`, `bedtime-procrastination`, `monday-dread`, `rest-burnout`), (b) cognitive load
  (`multitasking`, `overwork-brain`), (c) self-perception/self-talk (`perfectionism`,
  `impostor-syndrome`, `self-compassion-work-stress`, `languishing`, `quiet-cracking`), (d) leadership
  strain (`manager-burnout`, `holding-it-together`). At 13 posts under one undifferentiated heading, this
  is well past a workable hub-and-spoke cluster size, and it's also where the internal-linking gaps
  concentrate: `manager-burnout`, `multitasking`, `technostress`(AI cluster but burnout-adjacent),
  `bedtime-procrastination`, `monday-dread`, and `perfectionism` all have **zero incoming links**.
- `quiet-cracking.html` is the outlier in the other direction — it's linked from roughly 14 other posts
  spanning burnout, AI, and even the money post, making it the closest thing the site has to a real pillar
  page. But it isn't built as one: it links out to only 3 posts itself, has no wider synthesizing content,
  and its "hub" status appears to be an accident of headline appeal rather than deliberate architecture.

### 5. Money & mental health
- **On-site posts:** 1 (`post-money-anxiety.html`)
- A category with a single post isn't a cluster — there's nothing to interlink within it, and no way for
  it to reinforce topical relevance the way the loneliness or burnout clusters can. Given the site's
  audience (senior PMs, Eng Directors, VPs, Fortune 500 leaders — a genuinely high-income persona), themes
  like lifestyle-inflation anxiety, "golden handcuffs," or status-vs-security stress would fit naturally
  and give this category the 2–4 posts needed to function as an actual cluster.

---

## Findings table

| Issue | Severity | Evidence | Recommendation |
|---|---|---|---|
| No true pillar/hub page per category — category anchors are same-page fragments on `blog.html`, sharing one title/meta/canonical/`CollectionPage` JSON-LD for all 5 categories | High | `blog.html` lines 7–56 (single `<title>`, meta description, canonical, and JSON-LD for the whole page); `#cat-burnout`, `#cat-loneliness` etc. are `id` anchors, not separate URLs | Build a standalone pillar page per cluster (own URL, unique title/meta, 1,500–2,500 words of synthesizing content, `Article`/`CollectionPage` schema) that deliberately links out to every spoke in that cluster. Start with Pressure & Burnout, given it already has the most posts and de facto traffic (`quiet-cracking`). |
| 8 of 26 posts (31%) have zero incoming links from any other post | High | Verified via link inventory: `mattering-at-work`, `manager-burnout`, `multitasking`, `technostress`, `bedtime-procrastination`, `monday-dread`, `money-anxiety`, `perfectionism` appear only as link targets on `blog.html`, never inside another post's "More from the blog" block or body copy | Add each orphaned post into 3–4 existing posts' "More from the blog" blocks (prioritize topically adjacent posts, e.g. add `manager-burnout` to `holding-it-together` and `quiet-cracking`'s related blocks). Make "retrofit new posts into 2–3 older posts' related-links" a standard step in the publishing checklist, since all 8 orphans appear to be recent additions the older posts haven't been updated to reference. |
| `manager-burnout.html` is an internal-linking orphan despite matching the site's core persona | Medium | Zero incoming links found; audience is explicitly "Senior PMs, Eng Directors, VPs" (`KNOWLEDGE_MAP.md` line 11) — i.e., people who manage others | Prioritize this one specifically — link it from `holding-it-together`, `quiet-cracking`, and `impostor-syndrome` at minimum. |
| "Money & mental health" category has only 1 post — not a functioning cluster | Medium | `blog.html` lines 626–649 list a single card under this category heading | Commission 2–3 more posts (e.g. lifestyle-inflation anxiety, financial dependents/"provider" pressure, status vs. security) so the category can actually interlink and reinforce topical relevance. |
| AI cluster is majority off-domain content (9 external vj9.org links vs. 5 on-site posts), and several external pieces (4-part "Alignment Problem" series, 2 fiction pieces) are general AI-industry commentary rather than workplace-psychology content for the stated audience | Medium | `blog.html` lines 346–452 | Either move the AI-industry/fiction pieces out of this cluster's presentation (label them separately as "From the founder's newsletter" rather than blending them into the coaching-practice cluster) or keep the cluster page focused on the 5 on-site, cited, audience-relevant posts and link out to vj9.org only as a clearly separate "further reading" aside. |
| "Clarity & being heard" cluster is 2 on-site posts padded with 5 external links | Medium | `blog.html` lines 94–189 | Same fix as above — either commission 1–2 more on-site posts on articulation/being-heard themes, or clearly separate on-site spokes from off-domain reading. |
| Pressure & burnout category bundles ~4 distinct sub-themes (sleep/switching-off, cognitive load, self-perception, leadership strain) under one 13-post heading | Low–Medium | 13 posts listed under a single category with no sub-grouping (`blog.html` lines 457–624) | Consider splitting into 2–3 visible sub-clusters on the blog index (e.g., "Burnout & recovery" and "Self-doubt & self-talk") so each has a tighter, more linkable spoke set and a clearer pillar target. |
| Possible topical/keyword overlap among burnout-cluster posts — cannot confirm without real SERP data | Low (flagged, unverified) | Titles/angles of `cant-switch-off`, `bedtime-procrastination`, and `monday-dread` all center on stress-and-sleep; `quiet-cracking`, `languishing`, and `holding-it-together` all center on "still performing but quietly struggling" | Run a real SERP-overlap check (e.g. via the `seo-cluster` skill with DataForSEO access) on these two groups before assuming they're fully differentiated. |
| "Mid-career identity" — one of the site's own three stated content pillars — has no dedicated post or cluster | Low–Medium | `KNOWLEDGE_MAP.md` line 11 states pillars as "AI anxiety, mid-career identity, and professional loneliness"; no post addresses career plateau, "what's next," or relevance/legacy questions independent of an AI trigger | Commission 2–3 posts on mid-career identity that don't route through the AI-displacement angle (e.g., career plateau after reaching Director/VP, "is this still what I want," legacy and relevance in general), and consider whether this becomes its own 6th cluster or folds into an expanded Pressure & Burnout split. |
| `quiet-cracking.html` functions as the site's de facto pillar page (~14 inbound links across 3 categories) without being built as one | Low (opportunity, not a defect) | Link inventory shows `quiet-cracking` referenced by far more posts than any other, but it only links out to 3 posts itself and has no expanded synthesizing content | Deliberately upgrade this specific post into (or spin off) the Pressure & Burnout pillar page, since it already has the internal-link authority signal a new pillar page would otherwise have to build from scratch. |

---

## What's already strong

- **Every post has a working "More from the blog" related-links block** (not just a link back to the
  homepage or booking CTA) — this is a real, if uneven, hub-and-spoke linking pattern, not the "spokes
  only link to the homepage" failure mode this kind of audit often finds.
- **Several posts add genuine in-body contextual links**, not just footer cards — e.g.
  `post-rest-burnout.html` links to `cant-switch-off` and `overwork-brain` mid-paragraph,
  `post-ai-job-fear.html` links to two related AI posts inline. This is good practice and should be
  extended to more posts.
- **The Loneliness & connection cluster is a genuinely dense, well-meshed cluster** — `lonely`,
  `new-city-loneliness`, `ai-loneliness`, `unheard`, and `conversation` cross-link each other
  consistently, which is close to what a healthy spoke set should look like.
- **The 5 named categories are semantically sound as groupings.** Post titles and angles within each
  category are genuinely topically related — this isn't a case of miscategorized or randomly bucketed
  content; the raw material for good clusters already exists.
- **Category structure maps closely to the site's audience.** Burnout, loneliness, AI-identity anxiety,
  and manager strain are exactly the pain points a senior-professional coaching audience would search for.
