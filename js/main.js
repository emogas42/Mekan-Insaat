(function () {
  'use strict';

  /* ── NAV SCROLL ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const tick = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', tick, { passive: true });
    tick();
  }

  /* ── MOBILE MENU ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
    });
  }

  /* ── SCROLL REVEAL ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── SCROLL TO TOP ── */
  const scrollBtn = document.getElementById('scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── COPYRIGHT YEAR ── */
  document.querySelectorAll('#copy-year').forEach(el => el.textContent = new Date().getFullYear());

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-q').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.style.maxHeight = null;
      });
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        btn.nextElementSibling.style.maxHeight = btn.nextElementSibling.scrollHeight + 'px';
      }
    });
  });

  /* ── VIDEO GALLERY ── */
  const videoLightbox = document.getElementById('video-lightbox');
  const videoPlayer = document.getElementById('video-lightbox-player');

  if (videoLightbox && videoPlayer) {
    function openVideo(src) {
      videoPlayer.src = src;
      videoLightbox.classList.add('is-open');
      videoLightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      videoPlayer.play().catch(() => {});
    }

    function closeVideo() {
      videoLightbox.classList.remove('is-open');
      videoLightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      videoPlayer.pause();
      videoPlayer.removeAttribute('src');
      videoPlayer.load();
    }

    document.querySelectorAll('.video-card[data-video]').forEach(card => {
      card.addEventListener('click', () => openVideo(card.getAttribute('data-video')));

      const preview = card.querySelector('video');
      if (preview) {
        card.addEventListener('mouseenter', () => preview.play().catch(() => {}));
        card.addEventListener('mouseleave', () => { preview.pause(); preview.currentTime = 0; });
      }
    });

    videoLightbox.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeVideo));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && videoLightbox.classList.contains('is-open')) closeVideo();
    });
  }

  /* ── SMOOTH ANCHOR SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
