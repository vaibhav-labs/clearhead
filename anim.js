/* Clearhead · scroll-reveal text motion (progressive enhancement) */
(function () {
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('no-anim');
    return;
  }
  var sel = '.section-title, .section-sub, .card, .blog-card, .blog-thumb-card, ' +
            '.testimonial-card, .steps li, .ai-tag, .trust-chip, .faq details, ' +
            '.explore-points li, .safe-list li, .blog-list-card, .post-invite';
  var els = [].slice.call(document.querySelectorAll(sel));
  if (!els.length || !('IntersectionObserver' in window)) return;
  els.forEach(function (el) {
    el.classList.add('reveal');
    var p = el.parentElement;
    var sibs = [].slice.call(p.children).filter(function (c) {
      return c.classList && c.classList.contains('reveal');
    });
    var i = sibs.indexOf(el);
    if (i > 0) el.style.setProperty('--d', (Math.min(i, 7) % 8) * 0.07 + 's');
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach(function (el) { io.observe(el); });
})();
