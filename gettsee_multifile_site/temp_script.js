
'use strict';

window.menuData = {
  promo: {
    title: 'Promo Bundling',
    subtitle: 'Combo deals for coffee, donuts, and snacks.',
    image: 'assets/bundling.png',
    description: 'Special combo deals for coffee and donuts.',
    items: [
      { name: 'Coffee + Donuts Combo', desc: 'Pairing drink dan donut pilihan.', price: '38K', image: 'assets/bundling.png' },
      { name: 'Coffee Milk Bundle', desc: 'Bundling coffee milk signature.', price: '50K', image: 'assets/bundling1.png' },
      { name: 'Donuts Party Box', desc: 'Paket donuts untuk sharing.', price: '65K', image: 'assets/food/crop-donuts.jpg' }
    ]
  },
  coffee: {
    title: 'Coffee Milk',
    subtitle: 'Signature milk coffee menu.',
    image: 'assets/cinnamon-wall-crash.png',
    description: 'Milk coffee signature, creamy, and sweet.',
    items: [
      { name: 'F1', desc: 'Milk, Coffee & Palm Sugar', price: '29K', image: 'assets/f1-salted-speed.png' },
      { name: 'Turbo', desc: 'Milk, Coffee & Ginger With Cloud Cinnamon', price: '26K', image: 'assets/cinnamon-wall-crash.png' },
      { name: 'Anti Selip', desc: 'Coffee with Bubblegum Milk', price: '28K', image: 'assets/coffe_milk.png' },
      { name: 'Salted Speed', desc: 'Milk, Coffee & Salted Caramel', price: '28K', image: 'assets/f1-salted-speed.png' },
      { name: 'Butterscratch', desc: 'Milk, Coffee & Butterscotch', price: '25K', image: 'assets/coffe_milk.png' },
      { name: 'Nusantara Green', desc: 'Creamy Bold Coffee with Pandan Syrup', price: '25K', image: 'assets/dirty-latte.png' },
      { name: 'Berry Bloom', desc: 'Creamy Coffee with Strawberry Hint', price: '25K', image: 'assets/cappucino.png' },
      { name: 'Monaco Macchiato', desc: 'Milk, Coffee, Vanilla & Salted Cloud', price: '28K', image: 'assets/coffe_milk.png' },
      { name: 'Wall Crash Crumble', desc: 'Milk, Coffee & Regal Crumble', price: '29K', image: 'assets/cinnamon-wall-crash.png' },
      { name: 'Cinnamon Sroll Coffee', desc: 'Milk, Coffee, Strawberry Syrup & Cinnamon', price: '23K', image: 'assets/cinnamon-wall-crash.png' }
    ]
  },
  espresso: {
    title: 'Espresso Based',
    subtitle: 'Classic espresso and specialty coffee drinks.',
    image: 'assets/cappucino.png',
    description: 'Latte, cappuccino, americano, and more.',
    items: [
      { name: 'Piccolo', desc: 'Single shot ristretto with silky milk', price: '29K', image: 'assets/cappucino.png' },
      { name: 'Dirty Latte', desc: 'Cold milk topped with hot espresso', price: '25K', image: 'assets/dirty-latte.png' },
      { name: 'Americano', desc: 'Espresso topped with hot/cold water', price: '22K', image: 'assets/cappucino.png' },
      { name: 'Barista Breakfast', desc: 'Double espresso & cappuccino combo', price: '33K', image: 'assets/dirty-latte.png' },
      { name: 'Latte', desc: 'Smooth espresso with steamed fresh milk', price: '25K', image: 'assets/cappucino.png' },
      { name: 'Cappuccino', desc: 'Rich espresso with creamy milk foam', price: '25K', image: 'assets/cappucino.png' },
      { name: 'Magic', desc: 'Double ristretto with velvety flat milk', price: '29K', image: 'assets/cappucino.png' }
    ]
  },
  top1: {
    title: 'Top 1 Series',
    subtitle: 'Premium house selections and top picks.',
    image: 'assets/dirty-latte.png',
    description: 'Premium house selections and top picks.',
    items: [
      { name: 'Mandalika', desc: 'Floral Coffee Base Blueberry', price: '28K', image: 'assets/dirty-latte.png' },
      { name: 'Ducatea', desc: 'Base Tea Floral Blueberry Hint Jasmine', price: '28K', image: 'assets/f1-salted-speed.png' },
      { name: 'Matcha Marquez', desc: 'Matcha with Strawberry Cloud', price: '28K', image: 'assets/f1-salted-speed.png' }
    ]
  },
  coldbrew: {
    title: 'Cold Brew',
    subtitle: 'Refreshing cold brew steeped for 16 hours.',
    image: 'assets/dirty-latte.png',
    description: 'Cold brew with fresh fruit character.',
    items: [
      { name: 'Petronas Redbull', desc: 'Coldbrew & Strawberry', price: '27K', image: 'assets/dirty-latte.png' },
      { name: 'Jungle Lap', desc: 'Coldbrew & Apple Juice', price: '27K', image: 'assets/dirty-latte.png' }
    ]
  },
  freshed: {
    title: 'Freshed',
    subtitle: 'Fizzy drinks, mocktails, and fresh tea blends.',
    image: 'assets/f1-salted-speed.png',
    description: 'Fresh tea, soda, lychee, berry, and lemon.',
    items: [
      { name: 'Ginger GP', desc: 'Ginger with Lemon and Soda', price: '25K', image: 'assets/f1-salted-speed.png' },
      { name: 'Red Line', desc: 'Strawberry with Sparkling Water', price: '23K', image: 'assets/f1-salted-speed.png' },
      { name: 'Freshcada', desc: 'Sparkling citrus refresher', price: '30K', image: 'assets/f1-salted-speed.png' },
      { name: 'Lychee Tea', desc: 'Tea & Lychee Syrup with fruit bits', price: '22K', image: 'assets/f1-salted-speed.png' },
      { name: 'Berry Tea', desc: 'Tea & Mixed Berry Syrup', price: '25K', image: 'assets/f1-salted-speed.png' },
      { name: 'Bella Farfalla', desc: 'Tea, Strawberry Syrup & Lemon Juice', price: '25K', image: 'assets/f1-salted-speed.png' }
    ]
  },
  noncoffee: {
    title: 'Non Coffee',
    subtitle: 'Creamy crafted non-coffee favorites.',
    image: 'assets/f1-salted-speed.png',
    description: 'Matcha, chocolate, taro, and red velvet.',
    items: [
      { name: 'Taro', desc: 'Creamy fragrant taro milk', price: '25K', image: 'assets/coffe_milk.png' },
      { name: 'Chocolate', desc: 'Rich Belgian style dark chocolate', price: '25K', image: 'assets/cappucino.png' },
      { name: 'Matcha', desc: 'Pure Japanese green tea latte', price: '25K', image: 'assets/f1-salted-speed.png' },
      { name: 'Red Velvet', desc: 'Velvety smooth cocoa milk', price: '25K', image: 'assets/cinnamon-wall-crash.png' }
    ]
  },
  donuts: {
    title: 'Donuts',
    subtitle: 'Freshly baked classic and artisan specialty donuts.',
    image: 'assets/food/crop-donuts.jpg',
    description: 'Classic and special topping donuts.',
    items: [
      { name: 'Glaze', desc: 'Classic sweet glaze donut', price: '13K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Strawberry', desc: 'Classic strawberry jam glaze', price: '13K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Tiramisu', desc: 'Classic tiramisu cream swirl', price: '13K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Vanilla', desc: 'Classic vanilla bean frosting', price: '13K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Chocolate', desc: 'Classic rich cocoa frosting', price: '13K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Banana Milky', desc: 'Special banana milk glaze', price: '15K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Mango', desc: 'Special tropical mango drizzle', price: '15K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Matcha Crumb', desc: 'Special matcha icing with crumbles', price: '15K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Strawberry Cheese', desc: 'Special strawberry cheese crumble', price: '15K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Cappuccino', desc: 'Special coffee cream topping', price: '15K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Red Velvet Crumb', desc: 'Special red velvet with crumbs', price: '15K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Caramel Berry', desc: 'Special salted caramel & berries', price: '15K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Caramel Glass', desc: 'Special brittle caramel glaze', price: '15K', image: 'assets/food/crop-donuts.jpg' }
    ]
  },
  platter: {
    title: 'Platter',
    subtitle: 'Sharing platters with sausages, fries, and dips.',
    image: 'assets/food/crop-platter.jpg',
    description: 'Mix platter, Gettsee platter, and loaded beef.',
    items: [
      { name: 'Mix Platter', desc: 'Fries, sausages & nuggets', price: '25K', image: 'assets/food/crop-platter.jpg' },
      { name: 'Gettsee Platter', desc: 'Signature complete platter', price: '30K', image: 'assets/food/crop-platter.jpg' },
      { name: 'Loaded Beef', desc: 'Crispy fries with beef bolognaise', price: '20K', image: 'assets/food/crop-platter.jpg' }
    ]
  },
  wings: {
    title: 'Wings',
    subtitle: 'Crispy chicken wings with bold savory sauces.',
    image: 'assets/food/crop-wings.jpg',
    description: 'Nashville wings and BBQ wings.',
    items: [
      { name: 'Nashville Wings', desc: 'Spicy hot Nashville style chicken wings', price: '22K', image: 'assets/food/crop-wings.jpg' },
      { name: 'BBQ Wings', desc: 'Smoky sweet barbecue chicken wings', price: '22K', image: 'assets/food/crop-wings.jpg' }
    ]
  },
  pasta: {
    title: 'Pasta',
    subtitle: 'Italian style al dente pasta creations.',
    image: 'assets/food/crop-pasta.jpg',
    description: 'Aglio olio, carbonara, and meatball.',
    items: [
      { name: 'Aglio Olio', desc: 'Garlic, olive oil, chilli flakes & herbs', price: '22K', image: 'assets/food/crop-pasta.jpg' },
      { name: 'Carbonara', desc: 'Creamy sauce with smoked beef & parmesan', price: '26K', image: 'assets/food/crop-pasta.jpg' },
      { name: 'Spaghetti Meatball', desc: 'Rich marinara sauce with beef meatballs', price: '26K', image: 'assets/food/crop-pasta.jpg' }
    ]
  },
  steak: {
    title: 'Steak',
    subtitle: 'Grilled chicken steak served with french fries & salad.',
    image: 'assets/food/crop-steak.jpg',
    description: 'Chicken steak and grilled chicken.',
    items: [
      { name: 'Chicken Steak', desc: 'Crispy golden chicken steak with brown sauce', price: '24K', image: 'assets/food/crop-steak.jpg' },
      { name: 'Grilled Chicken', desc: 'Char-grilled chicken breast with mushroom sauce', price: '28K', image: 'assets/food/crop-steak.jpg' }
    ]
  },
  burger: {
    title: 'Burger',
    subtitle: 'Juicy brioche burgers with seasoned patties.',
    image: 'assets/food/crop-burger.jpg',
    description: 'Beef burger and Nashville burger.',
    items: [
      { name: 'Beef Burger', desc: 'Juicy beef patty, cheddar cheese & special sauce', price: '35K', image: 'assets/food/crop-burger.jpg' },
      { name: 'Nashville Burger', desc: 'Crispy spicy Nashville chicken with coleslaw', price: '26K', image: 'assets/food/crop-burger.jpg' }
    ]
  },
  bagel: {
    title: 'Bagel',
    subtitle: 'Artisan toasted bagels with savory fillings.',
    image: 'assets/food/crop-bagel.jpg',
    description: 'Beef bagel and Nashville bagel.',
    items: [
      { name: 'Beef Bagel', desc: 'Smoked beef, sunny egg & melted cheese bagel', price: '32K', image: 'assets/food/crop-bagel.jpg' },
      { name: 'Nashville Bagel', desc: 'Spicy chicken fillet & cream cheese bagel', price: '25K', image: 'assets/food/crop-bagel.jpg' }
    ]
  },
  rice: {
    title: 'Rice Section',
    subtitle: 'Hearty Indonesian rice bowls with rich spices.',
    image: 'assets/food/crop-rice.jpg',
    description: 'Beef rendang and beef bulgogi rice.',
    items: [
      { name: 'Beef Rendang', desc: 'Tender slow cooked beef in aromatic coconut rendang', price: '30K', image: 'assets/food/crop-rice.jpg' },
      { name: 'Beef Bulgogi', desc: 'Sweet savory Korean style sliced beef on warm rice', price: '30K', image: 'assets/food/crop-rice.jpg' }
    ]
  }
};

window.menuOrder = [
  'promo', 'coffee', 'espresso', 'top1', 'coldbrew', 'freshed', 'noncoffee',
  'donuts', 'platter', 'wings', 'pasta', 'steak', 'burger', 'bagel', 'rice'
];

window.findMenuCategory = function findMenuCategory(categoryId) {
  if (window.menuData[categoryId]) return categoryId;
  return 'coffee';
};


  /* --- SINGLE PAGE APP VIEW CONTROLLER & STORE --- */
  let currentActiveCategory = 'coffee';

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[char]));
  }

  // 1. CAROUSEL
  (function initCarousel() {
    const slides = document.querySelector('#slides');
    const dots = Array.from(document.querySelectorAll('.dot'));
    if (!slides || dots.length === 0) return;
    let index = 0;
    function goToSlide(nextIndex) {
      index = nextIndex;
      slides.style.transform = 'translateX(-' + (index * 100) + '%)';
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }
    dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));
    setInterval(() => goToSlide((index + 1) % dots.length), 4200);
  })();

  // 2. VIEW NAVIGATION
  function navigateToView(viewName, categoryId) {
    const views = ['delivery', 'getfresh', 'login', 'payment', 'profile'];
    if (!views.includes(viewName)) viewName = 'delivery';

    // Hide all views
    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.remove('active');
      view.style.display = 'none';
    });

    // Show target view
    const targetId = 'view' + viewName.charAt(0).toUpperCase() + viewName.slice(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.style.display = 'block';
      targetEl.classList.add('active');
    }

    // Update topbar nav link states
    document.querySelectorAll('.nav-links .nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.view === viewName);
    });

    // Update URL hash without reload
    const hash = categoryId ? `#${viewName}?category=${categoryId}` : `#${viewName}`;
    if (window.location.hash !== hash) {
      history.pushState(null, '', hash);
    }

    // View specific actions
    if (viewName === 'getfresh') {
      renderFullMenu(categoryId || currentActiveCategory || 'coffee');
    } else if (viewName === 'payment') {
      renderPaymentList();
    } else if (viewName === 'profile') {
      loadProfileData();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 3. RENDER DELIVERY CATEGORY CARDS
  function renderDeliveryCards() {
    const grid = document.querySelector('#menuGrid');
    if (!grid) return;
    grid.innerHTML = window.menuOrder.map(id => {
      const cat = window.menuData[id];
      return `
        <article class="menu-card" data-menu-id="${escapeHtml(id)}" tabindex="0" role="button" aria-label="Open ${escapeHtml(cat.title)} menu" onclick="navigateToView('getfresh', '${escapeHtml(id)}')">
          <div class="menu-image"><img src="${escapeHtml(cat.image)}" alt="${escapeHtml(cat.title)}" loading="lazy" decoding="async"></div>
          <div class="menu-body">
            <h3>${escapeHtml(cat.title)}</h3>
            <div class="order-row"><button class="order-btn" type="button" onclick="event.stopPropagation(); navigateToView('getfresh', '${escapeHtml(id)}')">Order</button></div>
          </div>
        </article>`;
    }).join('');
  }

  // 4. FULL MENU (GET FRESH)
  function renderFullMenu(categoryId) {
    const safeCategory = window.findMenuCategory ? window.findMenuCategory(categoryId) : (window.menuData[categoryId] ? categoryId : 'coffee');
    currentActiveCategory = safeCategory;
    const data = window.menuData[safeCategory];
    const panel = document.querySelector('#fullPanel');
    const sideList = document.querySelector('#sideList');
    if (!panel || !sideList || !data) return;

    panel.innerHTML = `
      <div class="full-head">
        <div class="full-head-content">
          <small>Get Fresh Menu</small>
          <h1>${escapeHtml(data.title)}</h1>
          <p>${escapeHtml(data.subtitle)}</p>
        </div>
        <div class="full-head-thumb">
          <img src="${escapeHtml(data.image)}" alt="${escapeHtml(data.title)}" loading="lazy" decoding="async">
        </div>
      </div>
      <div class="full-list">
        ${data.items.map((item, idx) => `
          <article class="full-item" onclick="handleCardClick('${escapeHtml(safeCategory)}', ${idx}, this, event)" role="button" tabindex="0">
            <div class="full-item-image">
              <img src="${escapeHtml(item.image || data.image)}" alt="${escapeHtml(item.name)}" loading="lazy" decoding="async">
            </div>
            <div class="full-item-body">
              <div class="full-item-details">
                <strong>${escapeHtml(item.name)}</strong>
                <span class="full-item-price">${escapeHtml(item.price || '')}</span>
              </div>
            </div>
          </article>`).join('')}
      </div>`;

    sideList.innerHTML = window.menuOrder.map(id => {
      const cat = window.menuData[id];
      const activeClass = id === safeCategory ? ' active' : '';
      return `<button class="side-link${activeClass}" type="button" onclick="renderFullMenu('${escapeHtml(id)}')">${escapeHtml(cat.title)}</button>`;
    }).join('');
  }

  function handleCardClick(categoryId, itemIndex, cardEl, event) {
    if (event) {
      if (typeof event.preventDefault === 'function') event.preventDefault();
      if (typeof event.stopPropagation === 'function') event.stopPropagation();
    }
    const cat = window.menuData[categoryId];
    if (!cat || !cat.items || !cat.items[itemIndex]) return;
    const item = cat.items[itemIndex];

    window.getseeShop.addItem({
      category: categoryId,
      name: item.name,
      price: item.price,
      desc: item.desc,
      image: item.image || cat.image
    });

    if (cardEl) {
      cardEl.classList.add('card-clicked');
      setTimeout(() => cardEl.classList.remove('card-clicked'), 400);
    }
  }

  // 5. SHOPPING CART & CLIENT STORE
  window.getseeShop = (function() {
    const cartKey = 'getseeCart';
    const authKey = 'getseeSession';

    function getCart() {
      try { return JSON.parse(localStorage.getItem(cartKey)) || []; } catch (e) { return []; }
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

    function formatRupiah(val) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    }

    function updateCartCount() {
      const total = getCart().reduce((sum, item) => sum + item.qty, 0);
      document.querySelectorAll('.cart-count').forEach(el => el.textContent = String(total));
    }

    function addItem(item) {
      const cart = getCart();
      const key = [item.category, item.name, item.price].join('|');
      const found = cart.find(i => i.key === key);
      if (found) {
        found.qty += 1;
      } else {
        cart.push({
          key,
          category: item.category,
          name: item.name,
          desc: item.desc || '',
          price: item.price || '',
          image: item.image || '',
          value: parsePrice(item.price),
          qty: 1
        });
      }
      saveCart(cart);
      openCart();
    }

    function removeItem(key) {
      saveCart(getCart().filter(i => i.key !== key));
    }

    function changeQty(key, delta) {
      const cart = getCart().map(i => {
        if (i.key === key) i.qty += delta;
        return i;
      }).filter(i => i.qty > 0);
      saveCart(cart);
    }

    function cartTotal() {
      return getCart().reduce((sum, item) => sum + item.value * item.qty, 0);
    }

    function isLoggedIn() {
      try {
        const sess = JSON.parse(localStorage.getItem(authKey));
        return Boolean(sess && sess.email && sess.expiresAt > Date.now());
      } catch (e) { return false; }
    }

    function login(email) {
      localStorage.setItem(authKey, JSON.stringify({
        email,
        expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30
      }));
      updateAuthButtons();
    }

    function logout() {
      localStorage.removeItem(authKey);
      updateAuthButtons();
    }

    function updateAuthButtons() {
      const logged = isLoggedIn();
      document.querySelectorAll('.login-btn').forEach(btn => {
        btn.classList.toggle('profile-link', logged);
        btn.setAttribute('href', logged ? '#profile' : '#login');
        btn.innerHTML = logged
          ? `<svg viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path></svg>`
          : 'Login';
      });
    }

    function openCart() {
      ensureCartDrawer();
      document.body.classList.add('cart-open');
      renderCart();
    }

    function closeCart() {
      document.body.classList.remove('cart-open');
    }

    function ensureCartDrawer() {
      if (document.querySelector('.cart-drawer')) return;
      document.body.insertAdjacentHTML('beforeend', `
        <aside class="cart-drawer" aria-label="Shopping cart" style="position: fixed; top: 84px; right: 24px; width: min(360px, calc(100vw - 24px)); max-height: calc(100vh - 110px); background: #ffffff; border: 1.5px solid #00438D; border-radius: 20px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.22); z-index: 1000; overflow: hidden; display: flex; flex-direction: column;">
          <div class="cart-head" style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: #00438D; color: #ffffff;">
            <h2 style="font-size: 18px; color: #ffffff; margin: 0; font-family: 'Montserrat', sans-serif; font-weight: 800; font-style: italic;">Cart</h2>
            <button type="button" data-cart-close aria-label="Close cart" style="background: transparent; border: 0; color: #ffffff; font-size: 20px; cursor: pointer; padding: 4px;">✕</button>
          </div>
          <div class="cart-items" id="cartItems" style="padding: 16px 20px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 12px; max-height: 320px;"></div>
          <div class="cart-summary" style="padding: 16px 20px; border-top: 1px solid rgba(0, 67, 141, 0.12); background: #f8faff; display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: 800; color: #071831;">
              <span>Total</span><strong id="cartTotal" style="color: #00438D; font-size: 18px; font-weight: 900;">Rp0</strong>
            </div>
            <button class="checkout-btn" id="cartCheckout" type="button" style="width: 100%; padding: 12px; border-radius: 999px; border: 0; background: #00438D; color: #ffffff; font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 14px; cursor: pointer;">Checkout</button>
          </div>
        </aside>
      `);
    }

    function renderCart() {
      ensureCartDrawer();
      const list = document.querySelector('#cartItems');
      const total = document.querySelector('#cartTotal');
      const checkoutBtn = document.querySelector('#cartCheckout');
      if (!list || !total || !checkoutBtn) return;

      const cart = getCart();
      list.innerHTML = cart.length ? cart.map(item => `
        <article class="cart-line" style="display: grid; grid-template-columns: 50px 1fr auto; gap: 12px; align-items: center; border-bottom: 1px solid rgba(0, 67, 141, 0.08); padding-bottom: 12px;">
          <img src="${item.image || 'assets/logo.png'}" alt="${item.name}" style="width: 50px !important; height: 50px !important; border-radius: 12px; object-fit: cover;">
          <div>
            <strong style="display: block; font-size: 14px; color: #071831; font-weight: 800;">${item.name}</strong>
            <small style="color: #00438D; font-weight: 800; font-size: 12px;">${item.price || ''}</small>
            <div class="qty-controls" style="display:flex;align-items:center;gap:8px;margin-top:6px;">
              <button type="button" data-cart-minus="${item.key}" style="width:24px;height:24px;border-radius:6px;border:1px solid rgba(0,67,141,.2);background:#fff;cursor:pointer;font-weight:900;">-</button>
              <span style="font-size:13px;font-weight:800;">${item.qty}</span>
              <button type="button" data-cart-plus="${item.key}" style="width:24px;height:24px;border-radius:6px;border:1px solid rgba(0,67,141,.2);background:#fff;cursor:pointer;font-weight:900;">+</button>
            </div>
          </div>
          <button class="cart-remove" type="button" data-cart-remove="${item.key}" style="background:transparent;border:0;color:#b42318;cursor:pointer;font-weight:900;">✕</button>
        </article>
      `).join('') : '<p class="cart-empty" style="text-align:center;color:#607089;padding:24px 0;">Keranjang belanja Anda masih kosong.</p>';

      total.textContent = formatRupiah(cartTotal());
      checkoutBtn.disabled = cart.length === 0;
    }

    return {
      addItem, openCart, closeCart, cartTotal, formatRupiah, getCart,
      isLoggedIn, login, logout, removeItem, changeQty, saveCart,
      updateAuthButtons, updateCartCount
    };
  })();

  // 6. PAYMENT LIST & ACTION
  function renderPaymentList() {
    const list = document.getElementById('paymentList');
    const totalEl = document.getElementById('paymentTotal');
    const cart = window.getseeShop.getCart();
    if (!list || !totalEl) return;

    if (!cart.length) {
      list.innerHTML = '<p style="padding: 24px 0; color: #607089;">Tidak ada item untuk di-checkout. Silakan pilih menu terlebih dahulu.</p>';
      totalEl.textContent = 'Rp0';
      return;
    }

    list.innerHTML = cart.map(item => `
      <div class="payment-line" style="display: grid; grid-template-columns: 86px 1fr auto; gap: 14px; align-items: center; border: 1px solid rgba(0,67,141,.12); border-radius: 18px; padding: 12px; background: #f7faff; margin-bottom: 12px;">
        <img src="${item.image || 'assets/logo.png'}" alt="${item.name}" style="width: 86px; height: 86px; object-fit: contain; background: #ffffff; border-radius: 14px;">
        <div>
          <strong style="display: block; font-size: 15px; color: #071831;">${item.name}</strong>
          <small style="color: #607089; font-weight: 800;">${item.price} × ${item.qty}</small>
        </div>
        <strong style="color: #00438D; font-size: 16px;">${window.getseeShop.formatRupiah(item.value * item.qty)}</strong>
      </div>
    `).join('');

    totalEl.textContent = window.getseeShop.formatRupiah(window.getseeShop.cartTotal());
    document.getElementById('pickupResult').style.display = 'none';
  }

  function handlePayNow() {
    const cart = window.getseeShop.getCart();
    if (!cart.length) {
      alert('Keranjang masih kosong!');
      return;
    }
    const code = 'GETSEE-' + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('pickupCode').textContent = code;
    
    // Simple mock QR matrix
    const qrBox = document.getElementById('qrBox');
    qrBox.innerHTML = Array.from({ length: 121 }, () => {
      const dark = Math.random() > 0.45 ? 'dark' : '';
      return `<span class="${dark}"></span>`;
    }).join('');

    document.getElementById('pickupResult').style.display = 'grid';
    document.getElementById('paymentStatus').textContent = 'Pembayaran Diterima! Silakan simpan kode pickup di bawah.';

    // Clear cart after checkout
    window.getseeShop.saveCart([]);
  }

  // 7. AUTH / LOGIN / PROFILE HANDLERS
  function handleAuthSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('authEmail').value;
    if (!email) return;
    window.getseeShop.login(email);
    alert('Berhasil masuk sebagai ' + email);
    navigateToView('delivery');
  }

  function handleProfileSave(event) {
    event.preventDefault();
    alert('Profil berhasil disimpan!');
  }

  function handleLogout() {
    window.getseeShop.logout();
    alert('Anda telah keluar.');
    navigateToView('delivery');
  }

  function loadProfileData() {
    try {
      const sess = JSON.parse(localStorage.getItem('getseeSession'));
      if (sess && sess.email) {
        const emailField = document.getElementById('profileEmail');
        if (emailField) emailField.value = sess.email;
      }
    } catch(e) {}
  }

  // 8. GLOBAL LISTENERS & ROUTING INITIALIZATION
  document.addEventListener('DOMContentLoaded', () => {
    renderDeliveryCards();
    window.getseeShop.updateCartCount();
    window.getseeShop.updateAuthButtons();

    // Route on initial load based on URL hash
    function routeFromHash() {
      const hash = window.location.hash.replace('#', '');
      const parts = hash.split('?category=');
      const view = parts[0] || 'delivery';
      const cat = parts[1] || 'coffee';
      navigateToView(view, cat);
    }
    window.addEventListener('hashchange', routeFromHash);
    if (window.location.hash) {
      routeFromHash();
    } else {
      navigateToView('delivery');
    }

    // Cart trigger
    document.querySelectorAll('.cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (document.body.classList.contains('cart-open')) {
          window.getseeShop.closeCart();
        } else {
          window.getseeShop.openCart();
        }
      });
    });

    // Cart close & events
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-cart-close]')) window.getseeShop.closeCart();
      const remKey = e.target.dataset.cartRemove;
      if (remKey) window.getseeShop.removeItem(remKey);
      const plusKey = e.target.dataset.cartPlus;
      if (plusKey) window.getseeShop.changeQty(plusKey, 1);
      const minusKey = e.target.dataset.cartMinus;
      if (minusKey) window.getseeShop.changeQty(minusKey, -1);
      if (e.target.id === 'cartCheckout') {
        window.getseeShop.closeCart();
        navigateToView('payment');
      }
    });

    // Tab login / register switcher
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const fieldName = document.getElementById('fieldRegisterName');
    const formTitle = document.getElementById('formTitle');
    const authSubmitBtn = document.getElementById('authSubmitBtn');

    if (tabLogin && tabRegister) {
      tabLogin.addEventListener('click', () => {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        fieldName.style.display = 'none';
        formTitle.textContent = 'Masuk ke Akun';
        authSubmitBtn.textContent = 'Masuk Sekarang';
      });
      tabRegister.addEventListener('click', () => {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        fieldName.style.display = 'grid';
        formTitle.textContent = 'Daftar Akun Baru';
        authSubmitBtn.textContent = 'Daftar Sekarang';
      });
    }
  });
  