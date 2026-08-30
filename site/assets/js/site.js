/* Mandala Network — interaction layer.
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

  /* --- 4. FAQ accordion -------------------------------------------------- */
  var faq = document.getElementById('faqList');
  if (faq) {
    faq.querySelectorAll('.faq__q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        var isOpen = panel.hasAttribute('data-on');
        faq.querySelectorAll('.faq__a').forEach(function (p) { p.removeAttribute('data-on'); });
        faq.querySelectorAll('.faq__q').forEach(function (b) {
          b.setAttribute('aria-expanded', 'false');
          b.querySelector('.faq__sign').textContent = '+';
        });
        if (!isOpen) {
          panel.setAttribute('data-on', '');
          btn.setAttribute('aria-expanded', 'true');
          btn.querySelector('.faq__sign').textContent = '−';
        }
      });
    });
  }
})();
