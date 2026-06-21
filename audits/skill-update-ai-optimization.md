# Skill update: add AI Search / Answer-Engine checks to `clearhead-site-monitor`

**How to apply:** I can't edit the saved skill from this session (skill files here are a read-only cache). To make this permanent, open **Settings → Capabilities → clearhead-site-monitor**, edit its `SKILL.md`, and paste the two blocks below. Block 1 is a new check section; Block 2 extends the report format.

---

## BLOCK 1 — paste as a new check (after "### 5. SEO integrity")

```markdown
### 5b. AI Search / Answer-Engine Optimization (GEO/AEO)
Measures whether the site is positioned to be cited by ChatGPT, Gemini, Grok, Claude,
Perplexity, and Google AI Overviews. Based on what works in 2026: structured data
(schema'd pages earn ~42% more AI citations), self-contained answer blocks (55% of
AI-Overview citations come from the first 30% of a page), freshness, statistics/citations
in copy, author/E-E-A-T authority, and AI-crawler access.

Check (mostly report-only — see fix rules):
- **AI crawler access** (live robots.txt): the AI *search* bots must NOT be disallowed —
  `OAI-SearchBot`, `Claude-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`,
  `GPTBot`. A wildcard `User-agent: * / Allow: /` satisfies this. Flag **High** only if a
  search bot is explicitly Disallowed.
- **llms.txt / llms-full.txt** at root: GET https://clearhead.in/llms.txt → note 200 vs 404.
  Missing = **Low/enhancement** (no proven citation effect per SE Ranking's ~300k-domain
  study; value is the agentic/discovery layer). Auto-fixable (see fix rules).
- **Structured data present** (already covered in §5): FAQPage, LocalBusiness, Article,
  BreadcrumbList, Person/author. Confirm still present — strongest AEO lever.
- **Author / E-E-A-T**: each post's JSON-LD has an `author` (Person) with the ICF PCC credential.
- **Freshness**: every post has `datePublished` + `dateModified`; every sitemap `<url>` has
  `<lastmod>`. Flag **Medium** if a post lacks dateModified.
- **Answer blocks**: each post opens with a self-contained 40–60 word answer to its core
  question within the first ~150 words. Report as enhancement if missing (do not auto-edit prose).
- **Statistics / citations**: page contains at least one stat, named study, or quotation.

Escalation: AI-optimization gaps are **enhancements/Medium at most** — never Critical.
The site can be fully healthy with AI gaps open.
```

## Auto-fix addition (paste into the "Auto-fix" table)

```markdown
| Missing /llms.txt | Generate from sitemap + page titles/descriptions; write llms.txt at repo root, commit, push. Use H1 = site name, a one-line blockquote summary, then `## Core pages` / `## Articles` sections with `- [title](url): description` lines. |
```

> Note: explicit AI-bot allow/deny directives and answer-block prose rewrites stay **report-only** —
> they involve editorial/strategy judgment the owner should make.

---

## BLOCK 2 — paste into the "Report format" template (after the SEO table)

```markdown
### AI Search / Answer-Engine (GEO/AEO)
**Status:** GOOD ✅ / GAPS ⚠️
| Signal | Result |
|---|---|
| AI crawler access (robots.txt) | ✅/⚠️ |
| llms.txt present | ✅/⚠️ |
| Structured data (FAQ/LocalBusiness/Article/Breadcrumb/Person) | ✅/⚠️ |
| Author / E-E-A-T | ✅/⚠️ |
| Freshness (datePublished+dateModified, sitemap lastmod) | ✅/⚠️ |
| Answer blocks (40–60w, first 150 words) | ✅/⚠️ |
| Statistics / citations in copy | ✅/⚠️ |
**Enhancements:** [list or "None"]
```
