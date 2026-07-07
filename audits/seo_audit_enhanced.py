#!/usr/bin/env python3
"""Static-site SEO checker for the seo-audit skill. Pure stdlib.

ENHANCED VERSION (2026-07-01). Drop-in replacement for scripts/seo_audit.py.
Adds five checks the original skipped + fixes the homepage lastmod bug:
  * BreadcrumbList presence on inner pages
  * LocalBusiness NAP / geo / hasMap completeness
  * skipped heading-level detection (not just H1 count)
  * orphan-page detection (indexable pages nothing links to)
  * sitemap-completeness (every indexable page present in sitemap.xml)
  * FIX: homepage sitemap lastmod is now checked (root URL -> index.html)

Emits evidence lines (SEVERITY | page:line | message). Apply the skill's
rubric/judgment on top — this script gathers facts, it does not decide.

Usage:
  python3 scripts/seo_audit.py --root . --base-url https://clearhead.in
"""
import argparse, glob, html, json, os, re, subprocess, sys

TITLE_MIN, TITLE_MAX = 30, 60
DESC_MIN, DESC_MAX = 120, 160
IMG_MAX_BYTES = 500 * 1024

def read(p):
    with open(p, encoding="utf-8", errors="replace") as f:
        return f.read()

def lineno(text, idx):
    return text.count("\n", 0, idx) + 1

def is_noindex(h):
    m = re.search(r'<meta\s+name=["\']robots["\']\s+content=["\']([^"\']*)["\']', h, re.I)
    return bool(m and "noindex" in m.group(1).lower())

def git_last_date(root, fname):
    try:
        out = subprocess.run(["git", "-C", root, "log", "-1", "--format=%cs", "--", fname],
                             capture_output=True, text=True, timeout=10)
        return out.stdout.strip() or None
    except Exception:
        return None

# Pages that are structurally exempt from certain "inner page" checks.
HOME = "index.html"

def loc_to_filename(loc):
    """Map a sitemap <loc> URL to a local filename. Root URL -> index.html.
    Robust to the domain containing a dot (e.g. clearhead.in)."""
    path = re.sub(r'^https?://[^/]+', '', loc)   # strip scheme + domain
    path = path.split("#")[0].split("?")[0].strip("/")
    if path == "":
        return "index.html"
    fn = path.split("/")[-1]
    if not fn.endswith(".html"):
        fn = fn + ".html"
    return fn

def check_page(root, path, findings):
    fname = os.path.basename(path)
    h = read(path)
    noindex = is_noindex(h)

    # Title
    m = re.search(r"<title>(.*?)</title>", h, re.S)
    if not m:
        findings.append(("High", f"{fname}", "missing <title>"))
    elif not noindex:
        t = html.unescape(m.group(1).strip())
        if not (TITLE_MIN <= len(t) <= TITLE_MAX):
            findings.append(("Medium", f"{fname}:{lineno(h, m.start())}",
                             f"title length {len(t)} (target {TITLE_MIN}-{TITLE_MAX})"))

    # Description
    m = re.search(r'<meta\s+name=["\']description["\']\s+content="(.*?)"', h, re.S)
    if not m and not noindex:
        findings.append(("High", fname, "missing meta description"))
    elif m and not noindex:
        d = html.unescape(m.group(1).strip())
        if not (DESC_MIN <= len(d) <= DESC_MAX):
            findings.append(("Medium", f"{fname}:{lineno(h, m.start())}",
                             f"description length {len(d)} (target {DESC_MIN}-{DESC_MAX})"))

    # Canonical
    if not re.search(r'<link\s+rel=["\']canonical["\']', h) and not noindex:
        findings.append(("High", fname, "missing canonical"))

    # OG/Twitter
    if not noindex:
        if "og:image" in h and not all(x in h for x in
                                       ("og:image:width", "og:image:height", "og:image:alt")):
            findings.append(("Low", fname, "og:image present but missing width/height/alt"))
        if "og:title" not in h:
            findings.append(("Medium", fname, "missing OpenGraph tags"))

    # H1 count
    n_h1 = len(re.findall(r"<h1[\s>]", h))
    if n_h1 != 1 and not noindex:
        findings.append(("High", fname, f"expected exactly one H1, found {n_h1}"))

    # NEW: skipped heading levels (jump of >1, e.g. H1 -> H3). Low severity.
    if not noindex:
        levels = [int(x) for x in re.findall(r"<h([1-6])[\s>]", h)]
        prev = 0
        for lv in levels:
            if prev and lv > prev + 1:
                findings.append(("Low", fname,
                                 f"skipped heading level: H{prev} -> H{lv} (no H{prev+1} between)"))
                break
            prev = lv

    # JSON-LD validity
    for b in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
        try:
            json.loads(b.group(1))
        except Exception as e:
            findings.append(("Critical", f"{fname}:{lineno(h, b.start())}",
                             f"invalid JSON-LD: {e}"))

    # NEW: BreadcrumbList on inner pages (home + noindex exempt). High-ish -> Medium.
    if not noindex and fname != HOME:
        if '"BreadcrumbList"' not in h:
            findings.append(("Medium", fname, "inner page missing BreadcrumbList schema"))

    # NEW: LocalBusiness NAP / geo / hasMap completeness (wherever LocalBusiness appears).
    if '"LocalBusiness"' in h or '"ProfessionalService"' in h:
        required = {
            "name": '"name"', "telephone": '"telephone"', "address": '"address"',
            "streetAddress": '"streetAddress"', "addressLocality": '"addressLocality"',
            "postalCode": '"postalCode"', "geo": '"geo"', "hasMap": '"hasMap"',
            "openingHours": '"openingHours"', "priceRange": '"priceRange"',
        }
        for label, needle in required.items():
            if needle not in h:
                sev = "Low" if label in ("streetAddress", "priceRange", "openingHours") else "Medium"
                findings.append((sev, fname, f"LocalBusiness missing {label}"))

    # FAQ schema vs visible <summary> (Low: rich results deprecated)
    ld = [x.replace('\\"', '"') for x in re.findall(
        r'"@type"\s*:\s*"Question"\s*,\s*"name"\s*:\s*"((?:[^"\\]|\\.)*)"', h)]
    vis = [re.sub(r"<[^>]+>", "", v).strip()
           for v in re.findall(r"<summary[^>]*>(.*?)</summary>", h, re.S)]
    if ld and set(ld) != set(vis):
        for q in set(ld) - set(vis):
            findings.append(("Low", fname, f'FAQ schema question not matched in visible text: "{q}"'))

    # Article schema fields
    if '"Article"' in h:
        for fld in ("headline", "datePublished", "author", "image", "publisher"):
            if f'"{fld}"' not in h:
                findings.append(("High", fname, f"Article schema missing {fld}"))

    # Image alt
    for im in re.finditer(r"<img\b[^>]*>", h, re.I):
        tag = im.group(0)
        alt = re.search(r'alt="(.*?)"', tag)
        if "alt=" not in tag or (alt and not alt.group(1).strip()):
            findings.append(("Medium", f"{fname}:{lineno(h, im.start())}",
                             "image missing/empty alt"))

    # External links missing rel=noopener
    for a in re.finditer(r'<a\b[^>]*href="https?://[^"]*"[^>]*>', h, re.I):
        tag = a.group(0)
        if "clearhead.in" in tag:
            continue
        if 'target="_blank"' in tag and "noopener" not in tag:
            findings.append(("Medium", f"{fname}:{lineno(h, a.start())}",
                             "external target=_blank missing rel=noopener"))

    # Render-blocking scripts in <head>
    head = h[:h.find("</head>")]
    for s in re.finditer(r'<script\b[^>]*src="[^"]*"[^>]*>', head, re.I):
        if "async" not in s.group(0) and "defer" not in s.group(0):
            findings.append(("Low", fname, "render-blocking script in <head> (add defer/async)"))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default=".")
    ap.add_argument("--base-url", default="https://clearhead.in")
    args = ap.parse_args()
    root = os.path.abspath(args.root)
    findings = []

    pages = sorted(glob.glob(os.path.join(root, "*.html")))
    indexable = []
    for p in pages:
        h = read(p)
        if not is_noindex(h):
            indexable.append(os.path.basename(p))
        check_page(root, p, findings)

    # NEW: orphan-page detection — indexable page that no other page links to.
    # Build the set of internally-linked hrefs across all pages.
    linked = set()
    for p in pages:
        h = read(p)
        for a in re.finditer(r'href="([^"]+)"', h):
            href = a.group(1)
            # normalise: strip domain, query, fragment, leading slash, trailing slash
            href = re.sub(r'^https?://(www\.)?clearhead\.in', '', href)
            href = href.split("#")[0].split("?")[0].strip("/")
            if not href:
                href = "index.html"
            if not href.endswith(".html"):
                href = href + ".html"
            linked.add(os.path.basename(href))
    for page in indexable:
        if page == HOME:
            continue
        if page not in linked:
            findings.append(("Medium", page, "orphan: no internal link points to this indexable page"))

    # Local image sizes
    for img in glob.glob(os.path.join(root, "*.jpg")) + glob.glob(os.path.join(root, "*.png")):
        sz = os.path.getsize(img)
        if sz > IMG_MAX_BYTES:
            findings.append(("Medium", os.path.basename(img),
                             f"image {sz//1024} KB > 500 KB"))

    # Sitemap parsing
    sm = os.path.join(root, "sitemap.xml")
    sitemap_files = set()
    if os.path.exists(sm):
        s = read(sm)
        # lastmod freshness (FIX: root URL now maps to index.html)
        for u in re.finditer(r"<loc>([^<]+)</loc>\s*<lastmod>([^<]+)</lastmod>", s):
            loc, lastmod = u.group(1), u.group(2)
            fn = loc_to_filename(loc)
            fp = os.path.join(root, fn)
            if os.path.exists(fp):
                gd = git_last_date(root, fn)
                if gd and gd > lastmod:
                    findings.append(("Medium", f"sitemap.xml ({fn})",
                                     f"lastmod {lastmod} older than last commit {gd}"))
        # collect all sitemap filenames for completeness check
        for loc in re.findall(r"<loc>([^<]+)</loc>", s):
            sitemap_files.add(loc_to_filename(loc))

        # NEW: sitemap-completeness — every indexable page must be present.
        for page in indexable:
            if page not in sitemap_files:
                findings.append(("High", f"sitemap.xml ({page})",
                                 "indexable page missing from sitemap"))
        # NEW: sitemap should NOT list noindex/disallowed pages.
        for fn in sitemap_files:
            fp = os.path.join(root, fn)
            if os.path.exists(fp) and is_noindex(read(fp)):
                findings.append(("Medium", f"sitemap.xml ({fn})",
                                 "noindex page listed in sitemap"))

    order = {"Critical": 0, "High": 1, "Medium": 2, "Low": 3}
    findings.sort(key=lambda x: order.get(x[0], 9))
    for sev, loc, msg in findings:
        print(f"{sev} | {loc} | {msg}")
    print(f"\nTOTAL: {len(findings)} findings across {len(pages)} pages "
          f"({len(indexable)} indexable).")
    print("Reminder: also fetch the live homepage and diff title/canonical/description/OG "
          "vs local for deployed-vs-local divergence.")

if __name__ == "__main__":
    sys.exit(main())
