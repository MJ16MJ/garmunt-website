// ============================================================
// GARMUNT – Homepage JS
// ============================================================

// jQuery/Slick removed — brands section uses pure CSS flex layout

document.addEventListener('DOMContentLoaded', () => {

  // ── Hero Slider ──────────────────────────────────────────
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.dot');
  let current  = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
  function startTimer() { timer = setInterval(next, 5000); }
  function stopTimer()  { clearInterval(timer); }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopTimer(); goTo(i); startTimer(); });
  });

  const btnNext = document.getElementById('heroNext');
  const btnPrev = document.getElementById('heroPrev');
  if (btnNext) btnNext.addEventListener('click', () => { stopTimer(); next(); startTimer(); });
  if (btnPrev) btnPrev.addEventListener('click', () => { stopTimer(); prev(); startTimer(); });
  startTimer();

  // Hero touch swipe
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    let touchStartX = 0;
    heroSlider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    heroSlider.addEventListener('touchend',   e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 45) { stopTimer(); diff > 0 ? next() : prev(); startTimer(); }
    }, { passive: true });
  }

  // ── Mobile Nav Drawer ────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navbar    = document.getElementById('navbar');
  const backdrop  = document.getElementById('navBackdrop');
  const navClose  = document.getElementById('navClose');

  function isNavOpen() {
    return navbar && navbar.classList.contains('open');
  }

  function openNav() {
    if (!navbar) return;
    navbar.classList.add('open');
    if (hamburger) hamburger.classList.add('open');
    if (backdrop)  backdrop.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    if (!navbar) return;
    navbar.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
    if (backdrop)  backdrop.classList.remove('visible');
    document.body.style.overflow = '';
  }

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      isNavOpen() ? closeNav() : openNav();
    });
  }

  // Close button inside drawer
  if (navClose) {
    navClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeNav();
    });
  }

  // Backdrop tap to close
  if (backdrop) {
    backdrop.addEventListener('click', closeNav);
  }

  // Swipe left on drawer to close
  if (navbar) {
    let swipeStartX = 0;
    navbar.addEventListener('touchstart', e => { swipeStartX = e.touches[0].clientX; }, { passive: true });
    navbar.addEventListener('touchend', e => {
      const diff = swipeStartX - e.changedTouches[0].clientX;
      if (diff > 60) closeNav(); // swipe left = close
    }, { passive: true });
  }

  // ESC key
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

  // Mobile mega-menu accordion toggle
  document.querySelectorAll('.has-mega > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // Only toggle on mobile (when drawer is visible)
      if (window.innerWidth > 768) return;
      e.preventDefault();
      e.stopPropagation();
      const item = link.closest('.nav-item');
      const wasOpen = item.classList.contains('mega-open');
      // Close all other open megas
      document.querySelectorAll('.nav-item.mega-open').forEach(el => el.classList.remove('mega-open'));
      // Toggle this one
      if (!wasOpen) item.classList.add('mega-open');
    });
  });

  // ── Bottom Nav active state ───────────────────────────────
  document.querySelectorAll('.bottom-nav__item').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.bottom-nav__item').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ── Footer Accordion (mobile) ─────────────────────────────
  document.querySelectorAll('.footer-col:not(.footer-col--brand) h4').forEach(h4 => {
    h4.addEventListener('click', function () {
      const col    = this.closest('.footer-col');
      const isOpen = col.classList.contains('open');
      document.querySelectorAll('.footer-col').forEach(c => c.classList.remove('open'));
      if (!isOpen) col.classList.add('open');
    });
  });

  // ── Cart Sidebar ──────────────────────────────────────────
  const cartToggle   = document.getElementById('cartToggle');
  const cartSidebar  = document.getElementById('cartSidebar');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const cartClose    = document.getElementById('cartClose');
  const cartContinue = document.getElementById('cartContinue');

  function openCart(e) {
    if (e) e.preventDefault();
    cartSidebar.classList.add('open');
    cartBackdrop.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    cartSidebar.classList.remove('open');
    cartBackdrop.classList.remove('visible');
    document.body.style.overflow = '';
  }

  // Qty +/- buttons
  document.querySelectorAll('.cart-item__qty').forEach(qtyWrap => {
    const minus = qtyWrap.querySelector('.qty-btn:first-child');
    const plus  = qtyWrap.querySelector('.qty-btn:last-child');
    const span  = qtyWrap.querySelector('span');
    minus.addEventListener('click', () => {
      let val = parseInt(span.textContent);
      if (val > 1) span.textContent = val - 1;
    });
    plus.addEventListener('click', () => {
      let val = parseInt(span.textContent);
      span.textContent = val + 1;
    });
  });

  if (cartToggle)   cartToggle.addEventListener('click', openCart);
  if (cartClose)    cartClose.addEventListener('click', closeCart);
  if (cartContinue) cartContinue.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

  // ── Search Dropdown ───────────────────────────────────────
  const searchInput = document.getElementById('searchInput');
  const searchDropdown = document.getElementById('searchDropdown');
  if (searchInput && searchDropdown) {
    searchInput.addEventListener('input', () => {
      searchDropdown.classList.toggle('active', searchInput.value.length > 0);
    });
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.length > 0) searchDropdown.classList.add('active');
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-bar')) searchDropdown.classList.remove('active');
    });
  }

  // ── Sticky header shadow on scroll ───────────────────────
  const header = document.querySelector('.main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 8
        ? '0 4px 20px rgba(0,0,0,0.13)'
        : '0 1px 4px rgba(0,0,0,0.07)';
    }, { passive: true });
  }

});
