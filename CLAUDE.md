# Clearhead — Project Context for Claude

> **Read [`KNOWLEDGE_MAP.md`](./KNOWLEDGE_MAP.md) first.** It is the single source of truth for this
> project — a full 360° view: business, stack, site map, routing, payments, forms, SEO, automation,
> design tokens, deploy workflow, accounts, and open TODOs.

**One-line orientation:** `clearhead.in` is a plain static HTML/CSS/vanilla-JS site (no React/build step) on Netlify for Vaibhav Jain's ICF PCC coaching practice — Razorpay payments via 3 Netlify Functions, Cal.com booking, and Netlify Forms for leads.

Deploy: `cd ~/Documents/Zen && git add -A && git commit -m "msg" && git push origin main` (auto-deploys ~30s).

Everything else: see `KNOWLEDGE_MAP.md`. Keep both files in sync after structural changes.

## File policy (owner instruction, 2026-10-05)
Do NOT create new files unless the owner explicitly asks. Update these living files in place and add dated entries/rows or version notes instead:
- `KNOWLEDGE_MAP.md` — master map; weekly refresh (Mondays) via `audits/knowledge_map_refresh.py --apply`; version log in §20.
- `audits/SITE_HEALTH_LOG.md` — daily health log (status board, trend, newest-first entries).
- `audits/knowledge_map_refresh.py` — refresh script (run with `PYTHONDONTWRITEBYTECODE=1 python3 -B`).
Use `git --no-optional-locks`. Never read secret values or ask for tokens. No LinkedIn recommendations.
