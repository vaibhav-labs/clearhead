/* Clearhead · text motion & self-explaining touches (progressive enhancement) */
(function () {
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { document.documentElement.classList.add('no-anim'); return; }

  /* hero headline: word-by-word rise */
  var h1 = document.querySelector('.hero h1');
  if (h1 && !h1.querySelector('.w')) {
    var walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT), nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    var i = 0;
    nodes.forEach(function (node) {
      var frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        var sp = document.createElement('span');
        sp.className = 'w'; sp.textContent = part;
        sp.style.animationDelay = (0.15 + i * 0.09) + 's'; i++;
        frag.appendChild(sp);
      });
      node.parentNode.replaceChild(frag, node);
    });
  }

  /* scroll reveals */
  var sel = '.section-title, .section-sub, .card, .blog-card, .blog-thumb-card, ' +
            '.testimonial-card, .comic-cell, .ai-tag, .trust-chip, .faq details, ' +
            '.explore-points li, .safe-list li, .blog-list-card, .post-invite, ' +
            '.cred-chips li, .disclaimer-inner, .safe-quote';
  var els = [].slice.call(document.querySelectorAll(sel));
  if (els.length && 'IntersectionObserver' in window) {
    els.forEach(function (el) {
      el.classList.add('reveal');
      var p = el.parentElement;
      var sibs = [].slice.call(p.children).filter(function (c) {
        return c.classList && c.classList.contains('reveal');
      });
      var idx = sibs.indexOf(el);
      if (idx > 0) el.style.setProperty('--d', (Math.min(idx, 7) % 8) * 0.07 + 's');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* stat count-up (any .stat-num whose text starts with digits) */
  var stats = [].slice.call(document.querySelectorAll('.stat-num'));
  if (stats.length && 'IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        so.unobserve(e.target);
        var raw = e.target.textContent.trim();
        var m = raw.match(/^([\d,]+)(.*)$/);
        if (!m) return;
        var target = parseInt(m[1].replace(/,/g, ''), 10), suffix = m[2];
        if (!target || target < 10) return;
        var t0 = null;
        function tick(ts) {
          if (!t0) t0 = ts;
          var k = Math.min((ts - t0) / 1200, 1);
          var eased = 1 - Math.pow(1 - k, 3);
          e.target.textContent = Math.round(target * eased).toLocaleString('en-IN') + suffix;
          if (k < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    stats.forEach(function (el) { so.observe(el); });
  }
})();
