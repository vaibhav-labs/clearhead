# Sitemap Audit — clearhead.in

**Scope:** `/Users/jain/Documents/Zen/sitemap.xml` (local copy) cross-checked against
`/Users/jain/Documents/Zen/robots.txt` and the full local `*.html` inventory (40 files).
Live fetch of `https://clearhead.in/sitemap.xml` was **not performed** — this agent's toolset
in this session had no HTTP fetch/browser capability, so all checks below are based on the
local repo copy. Live 200-status verification and true post-deploy lastmod accuracy should be
confirmed by whichever agent/tool in this audit has live crawl access.

## Summary

The sitemap is well-formed, small (36 URLs, nowhere near the 50,000-URL cap), and has a clean
1:1 match against every indexable local HTML page — no orphaned pages and no stray/incorrect
entries. `robots.txt` correctly references the sitemap and disallows the two pages
(`quiz.html`, `thank-you.html`) that are already flagged as noindex'd; this audit additionally
confirmed `privacy-policy.html` and `terms.html` also carry `noindex` and are correctly excluded
too. The main open items are informational: `priority`/`changefreq` tags are present but ignored
by Google, and most `lastmod` values are identical (2026-07-08), which looks like a bulk-set date
rather than genuine per-page modification history — this could not be verified against git log
in this session (no shell/git access available to this agent). Location-page quality gates do not
apply; this is a single-practice site with no programmatic/city-swapped pages.

## Findings

| Issue | Severity | Evidence | Recommendation |
|---|---|---|---|
| Live URL status codes not independently verified | Info / Limitation | This session's toolset had no fetch/browser access; could not confirm any of the 36 sitemap URLs return live 200s | Have the live-crawl/browser-capable agent in this audit verify 200 status for all 36 URLs, especially the most recently added `post-perfectionism.html` (lastmod 2026-07-12) |
| Majority of `lastmod` values are identical (2026-07-08) across 32 of 36 URLs | Low | Only 4 entries deviate with real-looking incremental dates: `post-manager-burnout.html` (07-09), `post-self-compassion-work-stress.html` (07-10), `post-mattering-at-work.html` (07-11), `post-perfectionism.html` (07-12) — everything else, including much older evergreen pages like `index.html`/`pricing.html`, shares the same date | Suggests the 07-08 date was bulk-applied rather than reflecting true edit history. Could not cross-check against `git log -1 --format=%cd -- <file>` in this session (no git/shell access here). Recommend generating `lastmod` from actual git commit history per file, or dropping the tag for pages where it isn't meaningfully maintained |
| `priority` and `changefreq` present on all 36 URLs | Info | Every `<url>` block includes both tags (e.g. `priority` 0.7–1.0, `changefreq` monthly/weekly) | Both are officially ignored by Google (Bing gives changefreq minor weight at most). Not harmful, but safe to remove for a leaner file — optional cleanup, not urgent |

## What's Already Strong

- **Zero orphans, zero stray entries.** Cross-referenced all 40 local `*.html` files against the sitemap: 4 are correctly non-indexable (`thank-you.html`, `quiz.html` — pre-flagged; plus `privacy-policy.html` and `terms.html`, both confirmed here to carry `<meta name="robots" content="noindex, follow">`), leaving exactly 36 indexable pages — which is exactly the 36 URLs in the sitemap, 1:1 by filename.
- **XML is well-formed.** Correct declaration, single `urlset` with the standard `sitemaps.org/schemas/sitemap/0.9` namespace, 36 matched `<url>`/`</url>` pairs, no duplicate `<loc>` entries, no unescaped characters.
- **robots.txt is correctly wired.** `Sitemap: https://clearhead.in/sitemap.xml` is present, and the `Disallow` lines for `/thank-you.html` and `/quiz.html` line up with their noindex meta tags and their absence from the sitemap.
- **Canonical tags match sitemap `<loc>` values** on the pages spot-checked (`index.html` → `https://clearhead.in/`, `post-perfectionism.html` → `https://clearhead.in/post-perfectionism.html`) — no canonical/sitemap mismatch signal.
- **Well under the 50,000-URL limit** — a single flat sitemap file is the right structure at this scale; no index-sitemap split needed.
- **No location-page doorway risk.** This is a single Mumbai-based practice with no city-swapped or programmatic location pages, so the 30+/50+ location-page quality gates don't apply here.

## Known/Pre-Flagged Issues (not re-reported)

- `post-manager-burnout.html`, `post-self-compassion-work-stress.html`, `post-mattering-at-work.html` are in the sitemap but not yet deployed live — already tracked as a deploy-timing issue elsewhere in this audit.
