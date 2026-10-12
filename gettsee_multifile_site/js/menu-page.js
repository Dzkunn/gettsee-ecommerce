'use strict';

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[char]));
}

function getSelectedCategory() {
  const params = new URLSearchParams(window.location.search);
  return window.findMenuCategory(params.get('category') || 'coffee');
}

function setSelectedCategory(categoryId) {
  const safeCategory = window.findMenuCategory(categoryId);
  const url = new URL(window.location.href);
  url.searchParams.set('category', safeCategory);
  window.history.replaceState({}, '', url.toString());
  renderFullMenu(safeCategory);
}
window.setSelectedCategory = setSelectedCategory;

function handleCardClick(categoryId, itemIndex, cardEl, event) {
  if (event) {
    if (typeof event.preventDefault === 'function') event.preventDefault();
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
  }
  const category = window.menuData[categoryId];
  if (!category || !category.items || !category.items[itemIndex]) return;
  const item = category.items[itemIndex];

  if (window.getseeShop && window.getseeShop.addItem) {
    window.getseeShop.addItem({
      category: categoryId,
      name: item.name,
      price: item.price,
      desc: item.desc,
      image: item.image || category.image
    });
    if (window.getseeShop.openCart) {
      window.getseeShop.openCart(document.querySelector('.cart'));
    }
  }

  // Visual card bump feedback
  if (cardEl) {
    cardEl.classList.add('card-clicked');
    setTimeout(() => {
      cardEl.classList.remove('card-clicked');
    }, 400);
  }
}
window.handleCardClick = handleCardClick;

function renderFullMenu(categoryId) {
  const safeCategory = window.findMenuCategory(categoryId);
  const data = window.menuData[safeCategory];
  const panel = document.querySelector('#fullPanel');
  const sideList = document.querySelector('#sideList');

  panel.innerHTML = `
    <div class="full-head">
      <div class="full-head-content">
        <small>Full Menu</small>
        <h1>${escapeHtml(data.title)}</h1>
        <p>${escapeHtml(data.subtitle)}</p>
      </div>
      <div class="full-head-thumb">
        <img src="${escapeHtml(data.image)}" alt="${escapeHtml(data.title)}" loading="lazy" decoding="async">
      </div>
    </div>
    <div class="full-list">
      ${data.items.map((item, idx) => `
        <article class="full-item" data-category="${escapeHtml(safeCategory)}" data-index="${idx}" onclick="handleCardClick('${escapeHtml(safeCategory)}', ${idx}, this, event)" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();handleCardClick('${escapeHtml(safeCategory)}', ${idx}, this, event);}" role="button" tabindex="0" aria-label="Tambah ${escapeHtml(item.name)} ke keranjang">
          <div class="full-item-image">
            <img src="${escapeHtml(item.image || data.image)}" alt="${escapeHtml(item.name)}" loading="lazy" decoding="async">
          </div>
            <div class="full-item-body">
              <div class="full-item-details">
                <div class="full-item-text" style="flex:1;min-width:0;">
                  <strong>${escapeHtml(item.name)}</strong>
                  ${item.desc ? `<small style="display:block;font-size:11px;color:rgba(255,255,255,0.78);margin-top:3px;font-family:Inter,sans-serif;font-style:normal;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(item.desc)}</small>` : ''}
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
                  <span class="full-item-price">${escapeHtml(item.price || '')}</span>
                  <span class="add-plus-badge" style="width:26px;height:26px;border-radius:50%;background:#FFF006;color:#071831;display:grid;place-items:center;font-weight:900;font-size:15px;line-height:1;box-shadow:0 2px 6px rgba(0,0,0,0.3);flex-shrink:0;">+</span>
                </div>
              </div>
            </div>
        </article>`).join('')}
    </div>`;

  sideList.innerHTML = window.menuOrder.map(id => {
    const category = window.menuData[id];
    const activeClass = id === safeCategory ? ' active' : '';
    return `<button class="side-link${activeClass}" type="button" data-menu-id="${escapeHtml(id)}">${escapeHtml(category.title)}</button>`;
  }).join('');

  sideList.querySelectorAll('.side-link').forEach(button => {
    button.addEventListener('click', () => setSelectedCategory(button.dataset.menuId));
  });
}
window.renderFullMenu = renderFullMenu;

function runMenuPageTests() {
  console.assert(window.findMenuCategory('burger') === 'burger', 'Expected burger to resolve to burger');
  console.assert(window.findMenuCategory('unknown-category') === 'coffee', 'Expected invalid category to fallback to coffee');
  console.assert(window.menuData.rice.items.some(item => item.name === 'Beef Rendang'), 'Expected Rice Section to include Beef Rendang');
}

renderFullMenu(getSelectedCategory());
runMenuPageTests();

