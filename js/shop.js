'use strict';

window.getseeShop = (function createShop() {
  const cartKey = 'getseeCart';
  const authKey = 'getseeSession';
  const guestKey = 'getseeGuest';
  const checkoutRedirectKey = 'getseeCheckoutRedirect';
  const drinkCategories = new Set(['coffee', 'espresso', 'top1', 'coldbrew', 'freshed', 'noncoffee']);

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(cartKey)) || [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }

  function parsePrice(price) {
    const text = String(price || '').trim().toUpperCase();
    if (!text) return 0;
    if (text.endsWith('K')) return Number(text.replace(/\D/g, '')) * 1000;
    return Number(text.replace(/\D/g, '')) || 0;
  }

  function formatRupiah(value) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
  }

  function updateCartCount() {
    const totalQty = getCart().reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('.cart-count').forEach(count => {
      count.textContent = String(totalQty);
    });
  }

  function addItem(item) {
    ensureCartDrawer();
    const cart = getCart();
    
    // Key accommodates customizations
    const customSuffix = [
      item.temp || '',
      item.sugar || '',
      item.notes ? encodeURIComponent(item.notes) : ''
    ].filter(Boolean).join('|');

    const key = [item.category, item.name, item.price, customSuffix].filter(Boolean).join('|');
    const existing = cart.find(cartItem => cartItem.key === key);
    
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        key,
        category: item.category,
        name: item.name,
        desc: item.desc || '',
        price: item.price || '',
        image: item.image || '',
        temp: item.temp || '',
        sugar: item.sugar || '',
        notes: item.notes || '',
        value: parsePrice(item.price),
        qty: 1
      });
    }
    saveCart(cart);
    openCart(document.querySelector('.cart'));
  }

  function removeItem(key) {
    saveCart(getCart().filter(item => item.key !== key));
  }

  function changeQty(key, delta) {
    const cart = getCart().map(item => {
      if (item.key === key) item.qty += delta;
      return item;
    }).filter(item => item.qty > 0);
    saveCart(cart);
  }

  function cartTotal() {
    return getCart().reduce((sum, item) => sum + item.value * item.qty, 0);
  }

  function isLoggedIn() {
    try {
      const session = JSON.parse(localStorage.getItem(authKey));
      return Boolean(session && session.token && session.expiresAt > Date.now());
    } catch (error) {
      return false;
    }
  }

  function isGuest() {
    try {
      return Boolean(JSON.parse(localStorage.getItem(guestKey)));
    } catch (error) {
      return false;
    }
  }

  function setGuest(active = true) {
    if (active) {
      localStorage.setItem(guestKey, JSON.stringify({ guest: true, createdAt: Date.now() }));
    } else {
      localStorage.removeItem(guestKey);
    }
  }

  function login(email, remember) {
    setGuest(false);
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    const token = Array.from(bytes, value => value.toString(16).padStart(2, '0')).join('');
    const maxAge = remember ? 1000 * 60 * 60 * 24 * 30 : 1000 * 60 * 60 * 8;
    localStorage.setItem(authKey, JSON.stringify({
      email,
      token,
      expiresAt: Date.now() + maxAge
    }));
    updateAuthButtons();
  }

  function logout() {
    localStorage.removeItem(authKey);
    setGuest(false);
    updateAuthButtons();
    renderCart();
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(authKey));
    } catch (error) {
      return null;
    }
  }

  function updateAuthButtons() {
    const session = getSession();
    const loggedIn = isLoggedIn() && session?.email;
    document.querySelectorAll('.login-btn').forEach(link => {
      link.classList.toggle('profile-link', loggedIn);
      link.href = loggedIn ? 'profile.html' : 'login.html';
      link.setAttribute('aria-label', loggedIn ? 'Open profile' : 'Login');
      link.innerHTML = loggedIn
        ? `<svg viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M4 21a8 8 0 0 1 16 0"></path>
          </svg>`
        : 'Login';
    });
  }

  function checkout() {
    if (getCart().length === 0) return;
    if (!isLoggedIn() && !isGuest()) {
      closeCart();
      localStorage.setItem(checkoutRedirectKey, 'payment.html');
      window.location.href = 'login.html?redirect=payment.html';
      return;
    }
    window.location.href = 'payment.html';
  }

  function openCart(anchor) {
    ensureCartDrawer();
    const cartButton = anchor || document.querySelector('.cart');
    if (cartButton) {
      const rect = cartButton.getBoundingClientRect();
      const width = Math.min(360, window.innerWidth - 24);
      const left = Math.max(12, Math.min(rect.right - width, window.innerWidth - width - 12));
      const top = rect.bottom > 0 ? Math.round(rect.bottom + 10) : 80;
      document.documentElement.style.setProperty('--cart-popover-top', top + 'px');
      document.documentElement.style.setProperty('--cart-popover-left', Math.round(left) + 'px');
      document.documentElement.style.setProperty('--cart-popover-right', 'auto');
    }
    document.body.classList.add('cart-open');
    renderCart();
  }

  function closeCart() {
    document.body.classList.remove('cart-open');
  }

  function renderCart() {
    ensureCartDrawer();
    const list = document.querySelector('#cartItems');
    const total = document.querySelector('#cartTotal');
    const checkoutButton = document.querySelector('#cartCheckout');
    if (!list || !total || !checkoutButton) return;

    const cart = getCart();
    list.innerHTML = cart.length ? cart.map(item => {
      const customBadge = [item.temp, item.sugar, item.notes ? `Catatan: ${item.notes}` : ''].filter(Boolean).join(' • ');
      return `
      <article class="cart-line" style="display: grid; grid-template-columns: 50px 1fr auto; gap: 12px; align-items: center; border-bottom: 1px solid rgba(4, 73, 157, 0.08); padding-bottom: 12px;">
        <img src="${item.image || 'assets/logo.png'}" alt="${item.name}" style="width: 50px !important; height: 50px !important; min-width: 50px !important; max-width: 50px !important; aspect-ratio: 1/1 !important; object-fit: cover !important; border-radius: 12px !important; background: #f0f5fc !important; display: block !important;">
        <div>
          <strong style="display: block; font-size: 14px; color: #02224d; font-weight: 800;">${item.name}</strong>
          ${customBadge ? `<span style="display: block; font-size: 11px; color: #607089; font-weight: 600; line-height: 1.3; margin: 2px 0;">${customBadge}</span>` : ''}
          <small style="color: #04499D; font-weight: 800; font-size: 12px;">${item.price || 'Custom order'}</small>
          <div class="qty-controls">
            <button type="button" data-cart-minus="${item.key}">-</button>
            <span>${item.qty}</span>
            <button type="button" data-cart-plus="${item.key}">+</button>
          </div>
        </div>
        <button class="cart-remove" type="button" data-cart-remove="${item.key}">x</button>
      </article>`;
    }).join('') : '<p class="cart-empty">Your cart is empty.</p>';

    total.textContent = formatRupiah(cartTotal());
    checkoutButton.textContent = (isLoggedIn() || isGuest()) ? 'Checkout' : 'Pesan Sekarang';
    checkoutButton.disabled = cart.length === 0;
  }

  function ensureCartDrawer() {
    if (document.querySelector('.cart-drawer')) return;
    document.body.insertAdjacentHTML('beforeend', `
      <aside class="cart-drawer" aria-label="Shopping cart" style="position: fixed; top: var(--cart-popover-top, 80px); left: var(--cart-popover-left, auto); right: var(--cart-popover-right, 24px); width: min(360px, calc(100vw - 24px)); max-height: calc(100vh - 110px); background: #ffffff; border: 1px solid rgba(4, 73, 157, 0.16); border-radius: 20px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.22); z-index: 1000; overflow: hidden;">
        <div class="cart-head" style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: #071831; color: #ffffff;">
          <h2 style="font-size: 18px; color: #ffffff; margin: 0; font-family: 'Montserrat', sans-serif; font-weight: 800; font-style: italic;">Cart</h2>
          <button type="button" data-cart-close aria-label="Close cart" style="background: transparent; border: 0; color: #ffffff; font-size: 18px; cursor: pointer; padding: 4px;">x</button>
        </div>
        <div class="cart-items" id="cartItems" style="padding: 16px 20px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 12px; max-height: 320px;"></div>
        <div class="cart-summary" style="padding: 16px 20px; border-top: 1px solid rgba(4, 73, 157, 0.12); background: #f8faff; display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: 800; color: #02224d;">
            <span>Total</span><strong id="cartTotal" style="color: #04499D; font-size: 18px; font-weight: 900;">Rp0</strong>
          </div>
          <button class="checkout-btn" id="cartCheckout" type="button" style="width: 100%; padding: 12px; border-radius: 999px; border: 0; background: #04499D; color: #ffffff; font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 14px; cursor: pointer;">Checkout</button>
        </div>
      </aside>
    `);
  }

  function initCart() {
    ensureCartDrawer();
    updateCartCount();
    updateAuthButtons();
    renderCart();
    document.querySelectorAll('.cart').forEach(button => {
      button.addEventListener('click', event => {
        event.stopPropagation();
        if (document.body.classList.contains('cart-open')) {
          closeCart();
        } else {
          openCart(button);
        }
      });
    });
    document.addEventListener('click', event => {
      const closeTarget = event.target.closest('[data-cart-close]');
      if (closeTarget) closeCart();

      const removeKey = event.target.dataset.cartRemove;
      if (removeKey) removeItem(removeKey);

      const plusKey = event.target.dataset.cartPlus;
      if (plusKey) changeQty(plusKey, 1);

      const minusKey = event.target.dataset.cartMinus;
      if (minusKey) changeQty(minusKey, -1);
    });
    const checkoutButton = document.querySelector('#cartCheckout');
    if (checkoutButton) checkoutButton.addEventListener('click', checkout);
  }

  return {
    addItem,
    openCart,
    closeCart,
    cartTotal,
    checkout,
    formatRupiah,
    getCart,
    getSession,
    initCart,
    isDrinkCategory: category => drinkCategories.has(category),
    isLoggedIn,
    isGuest,
    setGuest,
    login,
    logout,
    parsePrice,
    saveCart
  };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.getseeShop.initCart();
  });
} else {
  window.getseeShop.initCart();
}
