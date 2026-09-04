/* Mandala Network - interaction layer.
   Replaces the design-canvas React runtime with ~70 lines of vanilla JS.
   Everything degrades gracefully: with JS off, the page is fully readable. */
(function () {
  'use strict';

  /* --- 1. Scroll-in reveal ----------------------------------------------
     Fails open: if the observer never fires, a timer reveals everything, so
     copy can never be left invisible. */
  var reveals = document.querySelectorAll('.reveal');
  var showAll = function () {
    reveals.forEach(function (el) { el.setAttribute('data-in', ''); });
  };
  if (!('IntersectionObserver' in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.setAttribute('data-in', ''); io.unobserve(e.target); }
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    setTimeout(showAll, 4000);
  }

  /* --- 2. Process steps: hover / tap to lift ---------------------------- */
  var steps = document.getElementById('steps');
  var dots = document.getElementById('dots');
  if (steps && dots) {
    var setStep = function (key) {
      if (key) { steps.setAttribute('data-lifted', ''); } else { steps.removeAttribute('data-lifted'); }
      steps.querySelectorAll('.step').forEach(function (s) {
        s.toggleAttribute('data-on', s.getAttribute('data-step') === key);
      });
      dots.querySelectorAll('button').forEach(function (b) {
        b.toggleAttribute('data-on', b.getAttribute('data-dot') === key);
      });
    };
    dots.querySelectorAll('button').forEach(function (b) {
      var k = b.getAttribute('data-dot');
      b.addEventListener('mouseenter', function () { setStep(k); });
      b.addEventListener('focus', function () { setStep(k); });
      b.addEventListener('click', function () { setStep(k); });
    });
    dots.addEventListener('mouseleave', function () { setStep(null); });
    steps.querySelectorAll('.step').forEach(function (s) {
      var k = s.getAttribute('data-step');
      s.addEventListener('mouseenter', function () { setStep(k); });
    });
    steps.addEventListener('mouseleave', function () { setStep(null); });
  }

  /* --- 3. Upcoming events switcher (Event Intelligence page) ------------- */
  var ueList = document.getElementById('ueList');
  if (ueList) {
    var ueBgs = document.querySelectorAll('.upcoming__bg img');
    var ueCount = document.getElementById('ueCount');
    ueList.querySelectorAll('.ue').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-ue');
        ueList.querySelectorAll('.ue').forEach(function (b) {
          var on = b === btn;
          b.toggleAttribute('data-on', on);
          b.setAttribute('aria-expanded', on ? 'true' : 'false');
        });
        document.querySelectorAll('.ue-panel').forEach(function (p) {
          p.toggleAttribute('data-on', p.getAttribute('data-ue-panel') === id);
        });
        ueBgs.forEach(function (img) {
          img.toggleAttribute('data-on', img.getAttribute('data-ue-bg') === id);
        });
        if (ueCount) { ueCount.textContent = '0' + id; }
      });
    });
  }

  /* --- 4. FAQ accordion --------------------------------------------------
     Items open and close independently, so the two that start open can stay
     open while a third is read. */
  var faq = document.getElementById('faqList');
  if (faq) {
    faq.querySelectorAll('.faq__q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        var willOpen = !panel.hasAttribute('data-on');
        panel.toggleAttribute('data-on', willOpen);
        btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        btn.querySelector('.faq__sign').textContent = willOpen ? '−' : '+';
      });
    });
  }

  /* --- 5. The adoption line draws itself on first scroll ------------------ */
  var chart = document.querySelector('.case__chart');
  if (chart) {
    var draw = function () { chart.setAttribute('data-drawn', ''); };
    if (!('IntersectionObserver' in window)) {
      draw();
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { draw(); cio.disconnect(); }
        });
      }, { threshold: 0.35 });
      cio.observe(chart);
      setTimeout(draw, 6000); /* fails open - the chart is never left blank */
    }
  }

  /* --- 6. Days until Devcon Mumbai ---------------------------------------- */
  var counters = document.querySelectorAll('[data-countdown]');
  if (counters.length) {
    var target = Date.UTC(2026, 10, 3); /* 3 November 2026 - Devcon 8, Mumbai */
    var now = new Date();
    var start = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    var days = Math.round((target - start) / 86400000);
    counters.forEach(function (cd) {
      var num = cd.querySelector('[data-count]');
      var lab = cd.querySelector('[data-count-label]');
      if (!num || !lab) { return; }
      if (days > 1) { num.textContent = days; lab.textContent = 'days until Devcon Mumbai'; }
      else if (days === 1) { num.textContent = '1'; lab.textContent = 'day until Devcon Mumbai'; }
      else if (days === 0) { num.textContent = '0'; lab.textContent = 'Devcon Mumbai opens today'; }
      else { cd.remove(); return; }
      cd.removeAttribute('hidden');
    });
  }
})();
