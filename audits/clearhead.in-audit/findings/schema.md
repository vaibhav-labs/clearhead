# Schema.org / Structured Data Audit — clearhead.in

Audited: 2026-07-14. Source: local repo (`~/Documents/Zen`), verified against homepage + all 6 blog posts, all 4 tool pages, `blog.html`, `pricing.html`, `tools.html`. All JSON-LD blocks parsed cleanly — no syntax errors found anywhere on the site. `@context` is consistently `https://schema.org`, all URLs are absolute, all dates are ISO 8601.

## Summary

The site's structured data is in good shape overall: every blog post carries `Article` + `BreadcrumbList` + `FAQPage`, every tool page carries a well-formed `SoftwareApplication` block, and the homepage carries `Person` + `ProfessionalService` + `LocalBusiness` + `FAQPage`. The one previously-known defect (duplicate/un-cross-linked `ProfessionalService` node on the homepage) is still present and unchanged. The one new defect worth fixing is a text mismatch between the homepage's `FAQPage` JSON-LD and the visible FAQ copy on 3 of 5 questions — small wording/punctuation drift that should be corrected since FAQ schema is now kept specifically for AI/LLM citation accuracy, not SERP rich results. Everything else below is an incremental improvement, not a defect.

## Findings

| Issue | Severity | Evidence | Recommendation |
|---|---|---|---|
| **Duplicate/un-cross-linked `ProfessionalService` node** (known open finding — confirmed still present, unchanged) | Low | `index.html:73-97` — `ProfessionalService` (`@id #service`) has only `name`/`provider`/`serviceType`/`areaServed`/`url`/`email`. No `address`, `geo`, or `telephone`. Sits beside a fully-populated `LocalBusiness` (`@id #business`, `index.html:98-129`) with full NAP, `geo`, `hasMap`, `priceRange`, `openingHours`. Both reference `#vaibhav` as provider/founder but never reference each other. | Either merge `ProfessionalService` into the `LocalBusiness` node (add `"@type": ["LocalBusiness","ProfessionalService"]` on the single `#business` node) or add `"address": {"@id": ".../#business"}`-style cross-reference so crawlers don't see two competing "service" entities for the same practice. See snippet 1 below. |
| **Homepage `FAQPage` text doesn't exactly match visible FAQ copy** (3 of 5 questions) | Medium | `index.html:135-172` (schema) vs `index.html:473-490` (visible `<details>`). Q1: schema says *"...going; counselling is about how you're feeling..."* vs visible *"...going. Counselling is about how you're feeling..."* Q2: schema says *"...coaching and counselling - rigorous, confidential support. It's not **suited for** diagnosed mental health conditions."* vs visible *"...coaching and counselling. It's rigorous, confidential support. It's not **meant for** diagnosed mental health conditions."* (actual wording difference, not just punctuation). Q5: schema uses a colon (*"...about identity: who you are..."*) vs visible uses a period + capital (*"...about identity. Who you are..."*). Q3 and Q4 match exactly. | Since Google retired FAQ rich results, this markup's only remaining value is helping AI/LLM systems cite the page accurately — so the mismatch is a real (if low-traffic-impact) defect: an LLM citing the schema text would misquote the page. Sync the schema text to the visible copy verbatim. Corrected JSON-LD in snippet 2 below. |
| **`Article.publisher` missing `logo`** (all 6 blog posts) | Medium | `post-ai.html:43`, `post-ai-loneliness.html:44`, `post-unheard.html:44`, `post-lonely.html:43`, `post-conversation.html:43`, `post-new-city-loneliness.html:43` — all identical: `"publisher": { "@type": "Organization", "name": "Clearhead", "url": "https://clearhead.in/" }`, no `logo`. | Google's Article guidelines expect `publisher.logo` (an `ImageObject`, min 112×112px) for Discover/Top Stories eligibility. Add a shared logo image. Snippet 3 below. |
| **`Article.author` re-declared as an anonymous `Person` on every post instead of referencing the homepage's `@id`** | Low | Every post's `author` block (e.g. `post-ai.html:42`) is a fresh, unlinked `{"@type":"Person","name":"Vaibhav Jain",...}` rather than `{"@id": "https://clearhead.in/#vaibhav"}`. Same issue for `pricing.html:54` (`Service.provider`). | Reference the canonical `#vaibhav` node by `@id` everywhere instead of re-declaring the entity. Helps Google/LLMs consolidate "Vaibhav Jain" as one entity across the site rather than six near-duplicate Person nodes. Snippet 4 below. |
| **`Article.author.sameAs` includes a Google Maps place URL** | Low / Info | All 6 posts: `"sameAs": ["https://www.vj9.org/human", "https://www.google.com/maps/place/Clearhead/@19.1405612,72.8246929,17z"]` — a Maps place link isn't a canonical identity profile for a *Person*, it's the business location. | Drop the Maps URL from `Person.sameAs` (it belongs on the `LocalBusiness`/`hasMap`, where it already correctly lives). Keep only genuine identity profiles (e.g. `vj9.org/human`, LinkedIn if available). |
| **`SoftwareApplication` on all 4 tool pages has no `aggregateRating`** | Info | `bandwidth.html:40-63`, `career-friction.html`, `ai-relevance.html`, `runway.html` — all otherwise well-formed (`name`, `description`, `applicationCategory`, `offers` w/ price 0, `provider`, `isAccessibleForFree`). No `aggregateRating`/`review`. | This is correct as-is, not a defect — Google's "Software App" rich result (star rating in SERP) requires `aggregateRating`, but **do not fabricate one**. Only add it once genuine user ratings exist (e.g. via a lightweight feedback capture on the tool result screen). Flagging as a future opportunity, not a fix. |
| **`tools.html` hub page `ItemList` entries are thin vs. the detail pages** | Low | `tools.html:47-80` — each `SoftwareApplication` in the `ItemList` only has `name`/`url`/`applicationCategory`, missing the `offers`/`isAccessibleForFree`/`provider` that the individual tool pages carry. | Low priority since the fuller markup lives on the canonical detail page (Google will pick that up), but for consistency you could reference `@id`s pointing at the detail-page entities instead of re-describing them thinly. |
| **No sitewide `WebSite` entity** | Low / Opportunity | Homepage `@graph` (`index.html:39-176`) has `Person`, `ProfessionalService`, `LocalBusiness`, `FAQPage` — no `WebSite` node. `blog.html:43` references `"isPartOf": {"@type":"WebSite","name":"Clearhead","url":"https://clearhead.in/"}` as an anonymous, unlinked node. | Add one canonical `WebSite` node (`@id https://clearhead.in/#website`) on the homepage and have `blog.html` (and other inner pages) reference it by `@id` rather than re-declaring it. Snippet 5 below. |
| **Do not add `Review`/`AggregateRating` for the homepage testimonials** | Info / Guidance | `index.html:432-449` — 2 testimonials, explicitly anonymous ("Names withheld. That's the rule here, not a choice.") | This was flagged as a possible opportunity in the audit brief, but it should **not** be implemented: (1) `Review.author` is a required property and these testimonials have no identifiable author, and (2) Google's structured-data policies treat a business marking up praise about *itself*, hosted on its *own* site, as a self-serving review — it isn't eligible for rich results and risks a manual action if attempted. Leave these as plain HTML testimonials (as they are now); do not wrap them in `Review`/`AggregateRating`. |
| **JSON-LD parse errors** | None found | Checked all `<script type="application/ld+json">` blocks on `index.html`, all 6 posts, `blog.html`, `pricing.html`, `tools.html`, and all 4 tool pages. | No action needed. |
| **FAQPage on the 6 blog posts** | Info | Each post has its own `FAQPage` (4 Q&As), text verified to match the visible `<details>` copy **verbatim** on all 6 posts — no drift found here (unlike the homepage). | No action needed beyond what's already flagged for the homepage. Per current policy, keep these — they have no SERP rich-result value post May-2026 retirement, but they materially help AI/LLM engines extract and cite accurate Q&A content. |

## Generated JSON-LD

### 1. Merge `ProfessionalService` into `LocalBusiness` (fixes the known duplicate-entity issue)

```json
{
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://clearhead.in/#business",
  "name": "Clearhead",
  "founder": { "@id": "https://clearhead.in/#vaibhav" },
  "provider": { "@id": "https://clearhead.in/#vaibhav" },
  "description": "ICF PCC certified coaching and counselling for working professionals navigating AI anxiety, mid-career identity, and loneliness. 1:1 only. Online across India and internationally.",
  "serviceType": ["Life Coaching", "Executive Coaching", "Career Counselling"],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lokhandwala, Andheri West",
    "addressRegion": "Maharashtra",
    "postalCode": "400053",
    "addressCountry": "IN"
  },
  "url": "https://clearhead.in/",
  "email": "hello@clearhead.in",
  "telephone": "+91-90289-02948",
  "priceRange": "₹₹₹",
  "openingHours": "Mo-Sa 09:00-19:00",
  "areaServed": [
    { "@type": "City", "name": "Mumbai" },
    { "@type": "Country", "name": "India" },
    "Online India-wide"
  ],
  "geo": { "@type": "GeoCoordinates", "latitude": 19.1405612, "longitude": 72.8246929 },
  "hasMap": "https://www.google.com/maps/place/Clearhead/@19.1405612,72.8246929,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7b7fd5d83a8e3:0x45bf3d053989dcf3"
}
```

### 2. Corrected homepage `FAQPage` (text synced to visible copy verbatim)

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What's the difference between coaching and counselling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Coaching is about where you're going. Counselling is about how you're feeling. Most people need both - you don't have to choose before you come."
      }
    },
    {
      "@type": "Question",
      "name": "Is this therapy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. This is coaching and counselling. It's rigorous, confidential support. It's not meant for diagnosed mental health conditions."
      }
    },
    {
      "@type": "Question",
      "name": "Is everything confidential?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fully. ICF ethics and professional counselling codes bind this practice absolutely."
      }
    },
    {
      "@type": "Question",
      "name": "How many sessions will I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sometimes one is enough. Most people find 3-4 meaningful. No lock-ins. You come when it makes sense."
      }
    },
    {
      "@type": "Question",
      "name": "Can coaching help me navigate the AI wave?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. It comes up a lot. The real AI conversation is about identity. Who you are when your skills shift, and what you want before the market decides."
      }
    }
  ]
}
```

### 3. `Article.publisher` with `logo` (apply to all 6 posts)

```json
"publisher": {
  "@type": "Organization",
  "@id": "https://clearhead.in/#business",
  "name": "Clearhead",
  "url": "https://clearhead.in/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://clearhead.in/VJ.jpg",
    "width": 1200,
    "height": 849
  }
}
```
(Swap in a dedicated square/wide logo asset if one exists rather than reusing the founder photo — `VJ.jpg` works as a stopgap since it's already hosted and correctly sized.)

### 4. `Article.author` referencing the canonical Person by `@id` (apply to all 6 posts)

```json
"author": { "@id": "https://clearhead.in/#vaibhav" }
```
(Requires the homepage's `Person` node to keep its `@id`, which it already has: `https://clearhead.in/#vaibhav`. `sameAs` on that node should drop the Google Maps URL — keep only `https://www.vj9.org/human`.)

### 5. Sitewide `WebSite` entity (add to homepage `@graph`, reference by `@id` elsewhere)

```json
{
  "@type": "WebSite",
  "@id": "https://clearhead.in/#website",
  "name": "Clearhead",
  "url": "https://clearhead.in/",
  "publisher": { "@id": "https://clearhead.in/#business" },
  "inLanguage": "en-IN"
}
```

## What's already strong

- **Zero parse errors** across every `<script type="application/ld+json">` block on the site; consistent `https://schema.org` context, absolute URLs, ISO 8601 dates throughout.
- **All 6 blog posts** carry complete `Article` (headline, description, author, publisher, url, mainEntityOfPage, datePublished, dateModified, image, keywords) + `BreadcrumbList` + `FAQPage` — and critically, **all 6 posts' FAQ schema text matches the visible `<details>` copy verbatim**, word for word (only the homepage has drifted).
- **All 4 free-tool pages** (`bandwidth.html`, `career-friction.html`, `ai-relevance.html`, `runway.html`) have clean, well-structured `SoftwareApplication` markup: correct `applicationCategory` per tool (HealthApplication / BusinessApplication / FinanceApplication), `offers` correctly set to price 0 INR, `isAccessibleForFree: true`, `provider`, `browserRequirements`, and their own `BreadcrumbList`.
- **`pricing.html`** has a clean `Service` block with three `Offer`s carrying real INR prices and anchor URLs, plus its own `BreadcrumbList`.
- **`Person` node** (`index.html`) correctly models the ICF PCC credential via `EducationalOccupationalCredential` + `recognizedBy` — a nice touch that goes beyond the minimum and gives AI/LLM systems a clean, structured way to verify the certification claim.
- **`LocalBusiness` node** is fully populated (NAP, `geo`, `hasMap`, `priceRange`, `openingHours`) — this is the strongest single block on the site.
- No deprecated types in use anywhere (no `HowTo`, no `SpecialAnnouncement`, no `CourseInfo`/`EstimatedSalary`/`LearningVideo`).
