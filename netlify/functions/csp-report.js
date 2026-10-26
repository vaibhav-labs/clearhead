// Netlify Function: csp-report
// Receives Content-Security-Policy violation reports from visitors' browsers and writes one short line per
// violation to the function log. Exposed at /api/csp-report via netlify.toml; named in the policy's report-uri.
//
// Why it exists: the site's policy is still "report-only". Without an endpoint, nobody could ever see what it
// would have blocked, so it could never be switched on safely. Read the log (Netlify > Functions > csp-report)
// for a week or two; when it shows no real violations, rename the header to Content-Security-Policy.
//
// Request:  POST application/csp-report  { "csp-report": { ... } }   (report-uri, all browsers)
//           POST application/reports+json [ { type: "csp-violation", body: { ... } } ]   (report-to, if ever used)
// Response: 204 always for a POST (browsers ignore the answer), 405 for anything else.
//
// Privacy: query strings and fragments are stripped from every URL before logging. The booking page carries a
// visitor's quiz summary and payment reference in its query string, and none of that belongs in a log.

const MAX_BODY = 16 * 1024;

const respond = (statusCode, extra) => ({
  statusCode,
  headers: Object.assign({ 'Cache-Control': 'no-store' }, extra || {}),
  body: '',
});

// Browser extensions inject scripts and styles into pages and trip the policy; that is not the site's problem.
const NOISE = /^(chrome-extension|moz-extension|safari-extension|safari-web-extension|ms-browser-extension|webkit-masked-url):/i;

function clean(u) {
  if (typeof u !== 'string') return '';
  // "inline", "eval", "data", "blob" and "self" are keywords or schemes, not URLs; keep them as they are.
  const s = u.trim().slice(0, 300);
  const cut = s.search(/[?#]/);
  return cut === -1 ? s : s.slice(0, cut);
}

function first(r) {
  for (let i = 1; i < arguments.length; i++) {
    const v = r[arguments[i]];
    if (v !== undefined && v !== null && v !== '') return v;
  }
  return '';
}

function normalise(r) {
  if (!r || typeof r !== 'object') return null;
  // report-uri sends kebab-case keys, the Reporting API (report-to) sends camelCase.
  return {
    directive: String(first(r, 'effective-directive', 'effectiveDirective', 'violated-directive', 'violatedDirective')).slice(0, 60),
    blocked: clean(first(r, 'blocked-uri', 'blockedURL', 'blockedURI')),
    page: clean(first(r, 'document-uri', 'documentURL', 'documentURI')),
    source: clean(first(r, 'source-file', 'sourceFile')),
    line: Number(first(r, 'line-number', 'lineNumber')) || 0,
    mode: String(first(r, 'disposition')).slice(0, 12),
  };
}

function extract(parsed) {
  if (Array.isArray(parsed)) {
    return parsed
      .filter((x) => x && typeof x === 'object' && x.type === 'csp-violation')
      .map((x) => x.body);
  }
  if (parsed && typeof parsed === 'object') {
    return [parsed['csp-report'] || (parsed.type === 'csp-violation' ? parsed.body : null)];
  }
  return [];
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return respond(405, { Allow: 'POST' });
  }

  let raw = event.body || '';
  if (event.isBase64Encoded) {
    try { raw = Buffer.from(raw, 'base64').toString('utf8'); } catch (e) { return respond(204); }
  }
  if (!raw || raw.length > MAX_BODY) return respond(204);

  let parsed;
  try { parsed = JSON.parse(raw); } catch (e) { return respond(204); }

  const reports = extract(parsed).map(normalise).filter(Boolean).slice(0, 10);
  for (const r of reports) {
    if (NOISE.test(r.blocked) || NOISE.test(r.source)) continue;
    if (!r.directive && !r.blocked) continue;
    console.log('[csp-report] ' + JSON.stringify(r));
  }
  return respond(204);
};
