# Performance / Core Web Vitals Audit — clearhead.in

**Date:** 2026-07-14
**Method:** Static/heuristic analysis of the local repo (`/Users/jain/Documents/Zen`). **No Lighthouse, PageSpeed Insights, CrUX, or live network/header access was available in this sandbox** (no bash/browser/fetch tool was exposed to this subagent). Findings below are estimated from source inspection (HTML markup, `styles.css`, `anim.js`, `netlify.toml`) — they are **not lab-measured or field CWV numbers**. Treat severities as directional risk signals, and re-run `pagespeed_check.py` / `render_page.py` / Lighthouse CLI against the live site to get real LCP/INP/CLS scores before making priority calls.

Pages inspected: `index.html`, `pricing.html`, `blog.html`, `tools.html`, `post-ai.html`, `styles.css` (partial — 2,374 lines, read first ~1,225), `anim.js`, `netlify.toml`. Images opened directly: `VJ.jpg`, `how-conversation.jpg` (visual inspection only — no byte-size tooling available).

---

## Summary

The site is architecturally well set up for good Core Web Vitals: no framework, one small vanilla-JS animation file, hero image served eagerly with explicit dimensions, below-the-fold images uniformly lazy-loaded with width/height set, and Google Fonts loaded with `preconnect` + `font-display: swap`. The main risks are second-order hygiene items rather than fundamental architecture problems: the hero image lacks `fetchpriority="high"`, the global `styles.css` is unminified and loaded in full on every page regardless of what that page needs, `netlify.toml` sets no explicit long-lived `Cache-Control` for static assets, and a duplicate full-size photo on the homepage About section isn't marked `loading="lazy"`. None of these looked severe enough on their own to push LCP/INP/CLS into "Poor," but they're the first places to check once real field/lab data is available.

**Could not verify from this environment:** exact byte sizes of `VJ.jpg` / `how-conversation.jpg` / `styles.css` (no `ls -la`/`stat` equivalent tool), live response headers (`cache-control`, `content-encoding`) from `https://clearhead.in`, and actual LCP/INP/CLS field or lab numbers. The user's baseline claim ("no images over ~400KB, verified 3 days ago") looks *plausible* from visual inspection (standard photographic quality, not oversized) but was not independently re-verified at the byte level here.

---

## Findings

| Issue | Severity | Evidence | Recommendation |
|---|---|---|---|
| Hero image missing `fetchpriority="high"` | Low–Medium | `index.html` hero: `<img src="VJ.jpg" class="hero-scene" ... loading="eager" decoding="async" />` (no `fetchpriority`) | Add `fetchpriority="high"` to the hero `<img>` so the browser prioritizes it over Google Fonts CSS / Unsplash card images competing for bandwidth in the same initial load. Cheap, high-confidence LCP win if the hero photo is the LCP element. |
| Duplicate `VJ.jpg` in About section loads eagerly (no `loading="lazy"`) | Low | `index.html` About block: `<img src="VJ.jpg" width="1200" height="849" alt="..." />` — no `loading` attribute (defaults to eager in most browsers) despite being far below the fold | Add `loading="lazy" decoding="async"` to the About-section photo. Browser cache means no second network fetch after the hero loads it, but this removes any unnecessary early decode/paint priority contention on first load. |
| `styles.css` is one large, unminified, sitewide stylesheet (2,374 lines) shared across all page types (quiz, runway calculator, pricing, blog, posts) | Low | Direct read of `styles.css`: readable/indented (not minified), and includes full rule sets for `.quiz-*`, `.rw-*` (runway calculator), `.pay-*` etc. that are irrelevant on most pages that load it | Because it's one cached file this is mitigated on repeat page views, but every *first* page view on the site pays for parsing all of it before render. Consider a lightweight minification step (e.g. `csso`/`lightningcss` run manually before each deploy, no build pipeline required) to cut parse/transfer time. Splitting per-template CSS is a bigger lift and probably not worth it given the file is still a single small-to-medium text asset. |
| No explicit `Cache-Control` headers for static assets in `netlify.toml` | Low–Medium | `netlify.toml` only sets `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` under `[[headers]] for = "/*"` — no `Cache-Control`/`immutable` directives for `styles.css`, `anim.js`, `*.jpg` | Add a `[[headers]]` block for static asset paths (e.g. `/*.css`, `/*.js`, `/*.jpg`) with `Cache-Control: public, max-age=31536000, immutable` (only safe if filenames change on update, or pair with cache-busting query strings). This doesn't move LCP/INP/CLS on first visit but meaningfully speeds up repeat visits, which matters for CrUX's 28-day rolling average. |
| Hero-text word-split animation runs via a `defer`red script *after* first paint | Low | `anim.js`: on load it walks `.hero h1` text nodes and re-wraps every word in a `<span class="w">` with a staggered `animationDelay`, executing inside a `defer` script tag at the very end of `<body>` | This runs after parsing (post-DOMContentLoaded), so the H1 renders as plain text first, then gets replaced with animated spans. Same characters/font-size means line-wrapping shouldn't change (low CLS risk), but it is a DOM mutation on what may be the LCP text candidate; worth confirming in real CrUX data that this isn't resetting/delaying the measured LCP paint time for text-heavy viewports (e.g. very narrow phones where the image wraps below the fold and the H1 becomes the LCP element). |
| Razorpay `checkout.js` loaded without `async`/`defer` on `pricing.html` | Low | `pricing.html`: `<script src="https://checkout.razorpay.com/v1/checkout.js"></script>` placed after all visible HTML/footer but before the inline pay-button logic, no `async`/`defer` attribute | Script position (end of body) means it doesn't block the initial paint/LCP of the pricing page, but it does block execution of the immediately-following inline `<script>` that wires up `.pay-btn` click handlers until the third-party file downloads. Adding `defer` (with an event-based init, since `defer` scripts run in order relative to other deferred scripts but not inline ones) or moving to a `DOMContentLoaded`-gated init would remove any window where a user could click "Pay" before Razorpay is ready. Not a CWV metric hit today, but worth tightening for perceived responsiveness. |
| Could not verify live response headers / compression | Info | No network/fetch tool was available to this subagent to `curl -I https://clearhead.in` | Re-run with `python3 scripts/pagespeed_check.py https://clearhead.in --json` (or `curl -sI`) to confirm `content-encoding: br`/`gzip` and actual `cache-control` values Netlify is serving in production — static analysis of `netlify.toml` only shows what's explicitly configured, not Netlify's platform defaults. |
| Could not verify exact image byte sizes | Info | Read tool renders images visually but reports no file size; no `ls`/`stat`/bash access in this sandbox | Re-verify the "no images over ~400KB" baseline with a shell-capable pass (`ls -la *.jpg`, `find . -name "*.jpg" -size +400k`) next time a tool with filesystem stat access is available. |

---

## What's already strong

- **Hero image (LCP candidate) is correctly configured**: `loading="eager"`, `decoding="async"`, explicit `width="1200" height="849"` — prevents layout shift and doesn't fight lazy-loading against its own priority.
- **All below-the-fold images site-wide use `loading="lazy"` with explicit `width`/`height`** — checked across `index.html` cards, `blog.html`'s ~25+ Unsplash thumbnail cards, and blog post hero images. This is consistently applied, which is a strong CLS defense and keeps initial-load image weight down.
- **Font loading follows current best practice**: `<link rel="preconnect">` to both `fonts.googleapis.com` and `fonts.gstatic.com` (the second with `crossorigin`), plus `&display=swap` in the Google Fonts URL — avoids invisible-text (FOIT) waits and minimizes connection setup latency for the font request.
- **No render-blocking third-party scripts in the `<head>`** on any page checked. The only third-party scripts found (Razorpay checkout, Cal.com is link-only/no embed) load at the bottom of `<body>` and don't gate first paint.
- **`anim.js` is small and INP-friendly**: it uses `IntersectionObserver` for scroll-reveal (no scroll-event listeners, no layout thrashing), `requestAnimationFrame` for the stat count-up, respects `prefers-reduced-motion` (bails out entirely via a top-of-file guard), and is loaded with `defer`. No long synchronous loops or heavy computation were found — this is a well-built pattern for avoiding main-thread blocking.
- **No ads, no third-party embeds/iframes on indexed pages** (the site notes confirm the Cal.com embed script and Google Maps iframe were previously removed from the homepage) — removes a common CLS/INP risk category entirely.
- **Single global `styles.css`** (not per-page) means it's cached once and reused across all 18 pages — good for repeat navigation within the site even though it's unminified.
- **JSON-LD structured data blocks are `type="application/ld+json"`** (inert to the render path, parsed but never executed as JS) — doesn't cost main-thread time.

---

## Priority recommendations (highest expected impact first)

1. Add `fetchpriority="high"` to the homepage hero `<img>` — cheapest, most direct LCP lever available.
2. Add explicit long-lived `Cache-Control` headers for static assets (`.css`, `.js`, `.jpg`) in `netlify.toml` — improves repeat-visit LCP/TTFB-adjacent experience, which factors into the 28-day CrUX field average.
3. Add `loading="lazy"` to the duplicate About-section `VJ.jpg`.
4. Minify `styles.css` before deploy (manual pass is fine — no build step required).
5. Re-run this audit with live tooling (`pagespeed_check.py`, `render_page.py`, or Lighthouse CLI) to replace these heuristic severities with actual field/lab LCP, INP, and CLS numbers, and to confirm live response headers/compression.
