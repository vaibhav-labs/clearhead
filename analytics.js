/* ---------------------------------------------------------------------------
 * Clearhead — Google Analytics 4 loader with Consent Mode v2
 *
 * WHY THIS FILE EXISTS
 * clearhead.in is a no-build static site: 71 hand-written HTML pages. Pasting a
 * gtag block into each one would mean the Measurement ID lives in 71 places and
 * every future change is a 71-file edit. Instead every page loads this one file,
 * and the ID below is the ONLY place it appears.
 *
 * The Measurement ID below belongs to the "The Zen Life — GA4" property and is
 * the only place it appears anywhere in the codebase. To point the site at a
 * different property, change that one line. If it is ever blanked or reset to a
 * placeholder, this file deliberately goes dormant rather than sending junk.
 * (Admin → Data Streams → web stream → Measurement ID.)
 *
 * PRIVACY POSTURE (deliberate — this is a counselling-adjacent practice)
 *   • Nothing is sent to Google until the visitor actively clicks "Allow".
 *     Not a pageview, not a request for gtag.js. Declining means Google is never
 *     contacted from this site at all.
 *   • Consent Mode v2 defaults are all "denied", set before any tag can fire.
 *   • Advertising signals stay denied permanently — this site does not advertise
 *     and never builds ad audiences.
 *   • Do Not Track and Global Privacy Control are honoured silently: those
 *     visitors are treated as having declined and are never shown a banner.
 *   • The choice is remembered for 180 days, then asked again.
 * ------------------------------------------------------------------------- */

(function () {
  'use strict';

  var MEASUREMENT_ID = 'G-P80E6BNSTS';   // The Zen Life — GA4 web stream

  var STORAGE_KEY = 'ch_consent_v1';
  var CONSENT_TTL_DAYS = 180;

  /* --- 0. Inert until a real Measurement ID is set -------------------------- */
  if (!/^G-[A-Z0-9]{6,}$/.test(MEASUREMENT_ID) || MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    if (window.console && console.info) {
      console.info('[clearhead] Analytics is dormant: no Measurement ID set in analytics.js.');
    }
    window.chTrack = function () {};
    return;
  }

  /* --- 1. Consent Mode v2 defaults, before anything else -------------------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  /* --- 2. Stored choice ----------------------------------------------------- */
  function readChoice() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var saved = JSON.parse(raw);
      var ageDays = (Date.now() - saved.at) / 86400000;
      if (ageDays > CONSENT_TTL_DAYS) return null;
      return saved.choice === 'granted' ? 'granted' : 'denied';
    } catch (e) { return null; }
  }

  function saveChoice(choice) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: choice, at: Date.now() }));
    } catch (e) { /* private mode — the session simply isn't remembered */ }
  }

  /* --- 3. Respect browser-level signals ------------------------------------- */
  function optedOutAtBrowserLevel() {
    return window.navigator.globalPrivacyControl === true ||
           window.navigator.doNotTrack === '1' ||
           window.doNotTrack === '1' ||
           window.navigator.msDoNotTrack === '1';
  }

  /* --- 4. Load gtag.js — only ever called after an explicit "Allow" --------- */
  var loaded = false;
  function loadGtag() {
    if (loaded) return;
    loaded = true;

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    document.head.appendChild(s);

    gtag('js', new Date());
    gtag('config', MEASUREMENT_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
  }

  function grant() {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    loadGtag();
  }

  /* --- 5. Public event helper ----------------------------------------------
   * Safe to call from anywhere, at any time. Silently no-ops when the visitor
   * has declined, so callers never need to check consent themselves.
   *   window.chTrack('tool_complete', { tool: 'runway' });
   * ------------------------------------------------------------------------ */
  window.chTrack = function (name, params) {
    if (!loaded) return;
    try { gtag('event', name, params || {}); } catch (e) { /* never break the page */ }
  };

  /* --- 6. Auto-wired events -------------------------------------------------
   * DOM-level only, so nothing here depends on the internals of the quiz or the
   * tool engines. Those can opt in later by calling window.chTrack directly.
   * ------------------------------------------------------------------------ */
  function wireEvents() {
    // Lead forms — the quiz enquiry and the general contact form.
    document.addEventListener('submit', function (ev) {
      var form = ev.target;
      if (!form || form.tagName !== 'FORM') return;
      var name = form.getAttribute('name') || '';
      if (name === 'quiz-enquiry' || name === 'contact') {
        window.chTrack('generate_lead', { form_name: name });
      }
    }, true);

    // Booking intent — any outbound click to the Cal.com booking page.
    document.addEventListener('click', function (ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.indexOf('cal.com/vaibhavjain') !== -1) {
        window.chTrack('book_call_click', { location: document.title });
      }
    }, true);
  }

  /* --- 7. Consent banner ----------------------------------------------------
   * Injected from JS so the markup lives in one file rather than 71, and so
   * visitors who have already chosen never receive it at all. Styled with the
   * site's own CSS custom properties, so it tracks the design system for free.
   * No dark patterns: "No thanks" carries the same visual weight as "Allow".
   * ------------------------------------------------------------------------ */
  function showBanner() {
    var css = document.createElement('style');
    css.textContent = [
      '.ch-consent{position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:9999;',
      'max-width:34rem;margin-inline:auto;background:var(--bg,#f2f6f8);',
      'color:var(--ink,#101d26);border:1px solid var(--line,#d9e2e8);',
      'border-radius:var(--radius,14px);padding:1.15rem 1.25rem;',
      'box-shadow:0 10px 30px rgba(8,24,38,.16);',
      'font-family:var(--font,system-ui,sans-serif);font-size:.94rem;line-height:1.55;}',
      '.ch-consent p{margin:0 0 .9rem;color:var(--ink-soft,#3d4f5c);}',
      '.ch-consent a{color:var(--accent,#3053c4);}',
      '.ch-consent-row{display:flex;gap:.6rem;flex-wrap:wrap;}',
      '.ch-consent button{font:inherit;font-weight:600;cursor:pointer;',
      'border-radius:var(--radius-sm,10px);padding:.55rem 1.1rem;border:1px solid var(--line,#d9e2e8);}',
      '.ch-allow{background:var(--accent,#3053c4);color:#fff;border-color:var(--accent,#3053c4);}',
      '.ch-allow:hover{background:var(--accent-deep,#23409e);}',
      '.ch-decline{background:transparent;color:var(--ink,#101d26);}',
      '.ch-decline:hover{background:var(--bg-alt,#e8eff3);}',
      '.ch-consent button:focus-visible{outline:2px solid var(--accent,#3053c4);outline-offset:2px;}',
      '@media (prefers-reduced-motion:no-preference){.ch-consent{animation:ch-rise .25s ease-out;}}',
      '@keyframes ch-rise{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}'
    ].join('');
    document.head.appendChild(css);

    var box = document.createElement('div');
    box.className = 'ch-consent';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-live', 'polite');
    box.setAttribute('aria-label', 'Analytics choice');

    var p = document.createElement('p');
    p.innerHTML = 'May we count anonymous page visits? It helps me see which writing ' +
      'is useful. Nothing is shared with advertisers, and declining changes nothing ' +
      'about the site. <a href="/privacy-policy.html">Privacy policy</a>.';

    var row = document.createElement('div');
    row.className = 'ch-consent-row';

    var yes = document.createElement('button');
    yes.type = 'button';
    yes.className = 'ch-allow';
    yes.textContent = 'Allow';

    var no = document.createElement('button');
    no.type = 'button';
    no.className = 'ch-decline';
    no.textContent = 'No thanks';

    function close() {
      if (box.parentNode) box.parentNode.removeChild(box);
    }

    yes.addEventListener('click', function () { saveChoice('granted'); grant(); close(); });
    no.addEventListener('click', function () { saveChoice('denied'); close(); });

    row.appendChild(yes);
    row.appendChild(no);
    box.appendChild(p);
    box.appendChild(row);
    document.body.appendChild(box);
    yes.focus();
  }

  /* --- 8. Boot -------------------------------------------------------------- */
  function boot() {
    wireEvents();

    if (optedOutAtBrowserLevel()) return;      // silent, no banner, no requests

    var choice = readChoice();
    if (choice === 'granted') { grant(); return; }
    if (choice === 'denied') return;

    showBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
