// ============================================================
// GARMUNT – Homepage JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

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

  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      isNavOpen() ? closeNav() : openNav();
    });
  }

  if (navClose) {
    navClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeNav();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeNav);
  }

  // Swipe left on drawer to close
  if (navbar) {
    let swipeStartX = 0;
    navbar.addEventListener('touchstart', e => { swipeStartX = e.touches[0].clientX; }, { passive: true });
    navbar.addEventListener('touchend', e => {
      const diff = swipeStartX - e.changedTouches[0].clientX;
      if (diff > 60) closeNav();
    }, { passive: true });
  }

  // ESC key
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

  // Mobile mega-menu accordion toggle
  document.querySelectorAll('.has-mega > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth > 1024) return;
      e.preventDefault();
      e.stopPropagation();
      const item = link.closest('.nav-item');
      const wasOpen = item.classList.contains('mega-open');
      document.querySelectorAll('.nav-item.mega-open').forEach(el => el.classList.remove('mega-open'));
      if (!wasOpen) item.classList.add('mega-open');
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
    if (!cartSidebar) return;
    cartSidebar.classList.add('open');
    if (cartBackdrop) cartBackdrop.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    if (!cartSidebar) return;
    cartSidebar.classList.remove('open');
    if (cartBackdrop) cartBackdrop.classList.remove('visible');
    document.body.style.overflow = '';
  }

  // Qty +/- buttons
  document.querySelectorAll('.cart-item__qty').forEach(qtyWrap => {
    const minus = qtyWrap.querySelector('.qty-btn:first-child');
    const plus  = qtyWrap.querySelector('.qty-btn:last-child');
    const span  = qtyWrap.querySelector('span');
    if (minus) minus.addEventListener('click', () => {
      let val = parseInt(span.textContent);
      if (val > 1) span.textContent = val - 1;
    });
    if (plus) plus.addEventListener('click', () => {
      let val = parseInt(span.textContent);
      span.textContent = val + 1;
    });
  });

  // ── Search Dropdown ───────────────────────────────────────
  const searchInput = document.getElementById('searchInput');
  const searchDropdown = document.getElementById('searchDropdown');
  if (searchInput && searchDropdown) {
    searchInput.addEventListener('focus', () => {
      searchDropdown.classList.remove('hidden');
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.relative')) {
        searchDropdown.classList.add('hidden');
      }
    });
  }

  if (cartToggle)   cartToggle.addEventListener('click', openCart);
  if (cartClose)    cartClose.addEventListener('click', closeCart);
  if (cartContinue) cartContinue.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

});
