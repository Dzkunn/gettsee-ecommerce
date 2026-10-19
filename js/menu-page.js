'use strict';

function escapeHtml(value) {
  return String(value || '').replace(/[&<>'"]/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[char]));
}

let activeCustomItem = null;

function ensureCustomModal() {
  if (document.getElementById('customModalOverlay')) return;
  document.body.insertAdjacentHTML('beforeend', `
    <div class="custom-modal-overlay" id="customModalOverlay" role="dialog" aria-modal="true" aria-labelledby="customModalTitle">
      <div class="custom-modal">
        <div class="custom-modal-header">
          <h3 id="customModalTitle">Kustomisasi Pesanan</h3>
          <button type="button" class="custom-modal-close" onclick="closeCustomModal()" aria-label="Tutup">✕</button>
        </div>
        <div class="custom-modal-body">
          <div class="custom-item-summary">
            <img id="customItemImg" src="" alt="">
            <div class="custom-item-info">
              <h4 id="customItemName">Nama Menu</h4>
              <span id="customItemPrice">Rp0</span>
            </div>
          </div>

          <div class="custom-opt-group" id="optGroupTemp">
            <label class="group-label">Suhu Minuman</label>
            <div class="custom-options-row">
              <label class="custom-radio-pill">
                <input type="radio" name="customTemp" value="Iced" checked>
                <span>❄️ Iced</span>
              </label>
              <label class="custom-radio-pill">
                <input type="radio" name="customTemp" value="Hot">
                <span>🔥 Hot</span>
              </label>
            </div>
          </div>

          <div class="custom-opt-group" id="optGroupSugar">
            <label class="group-label">Tingkat Gula (Sugar Level)</label>
            <div class="custom-options-row">
              <label class="custom-radio-pill">
                <input type="radio" name="customSugar" value="Normal Sugar (100%)" checked>
                <span>Normal</span>
              </label>
              <label class="custom-radio-pill">
                <input type="radio" name="customSugar" value="Less Sugar (50%)">
                <span>Less</span>
              </label>
              <label class="custom-radio-pill">
                <input type="radio" name="customSugar" value="No Sugar (0%)">
                <span>No Sugar</span>
              </label>
            </div>
          </div>

          <div class="custom-opt-group">
            <label class="group-label">Catatan Tambahan <span>(Opsional)</span></label>
            <textarea class="custom-notes-input" id="customNotes" placeholder="Contoh: jangan terlalu manis, es sedikit..."></textarea>
          </div>
        </div>
        <div class="custom-modal-footer">
          <button type="button" class="custom-submit-btn" onclick="submitCustomItem()">Tambahkan ke Keranjang</button>
        </div>
      </div>
    </div>
  `);
}

function openCustomModal(item) {
  ensureCustomModal();
  activeCustomItem = item;
  
  document.getElementById('customItemImg').src = item.image || 'assets/logo.png';
  document.getElementById('customItemName').textContent = item.name;
  document.getElementById('customItemPrice').textContent = item.price || '';
  document.getElementById('customNotes').value = '';

  const isDrink = window.getseeShop && window.getseeShop.isDrinkCategory(item.category);
  const tempGroup = document.getElementById('optGroupTemp');
  const sugarGroup = document.getElementById('optGroupSugar');
  
  if (tempGroup) tempGroup.style.display = isDrink ? 'flex' : 'none';
  if (sugarGroup) sugarGroup.style.display = isDrink ? 'flex' : 'none';

  // Reset defaults
  const defaultTemp = document.querySelector('input[name="customTemp"][value="Iced"]');
  if (defaultTemp) defaultTemp.checked = true;
  const defaultSugar = document.querySelector('input[name="customSugar"][value="Normal Sugar (100%)"]');
  if (defaultSugar) defaultSugar.checked = true;

  document.getElementById('customModalOverlay').classList.add('open');
}
window.openCustomModal = openCustomModal;

function closeCustomModal() {
  const overlay = document.getElementById('customModalOverlay');
  if (overlay) overlay.classList.remove('open');
  activeCustomItem = null;
}
window.closeCustomModal = closeCustomModal;

function submitCustomItem() {
  if (!activeCustomItem) return;
  const isDrink = window.getseeShop && window.getseeShop.isDrinkCategory(activeCustomItem.category);
  
  const temp = isDrink ? (document.querySelector('input[name="customTemp"]:checked')?.value || 'Iced') : '';
  const sugar = isDrink ? (document.querySelector('input[name="customSugar"]:checked')?.value || 'Normal Sugar (100%)') : '';
  const notes = document.getElementById('customNotes')?.value?.trim() || '';

  if (window.getseeShop && window.getseeShop.addItem) {
    window.getseeShop.addItem({
      category: activeCustomItem.category,
      name: activeCustomItem.name,
      price: activeCustomItem.price,
      desc: activeCustomItem.desc,
      image: activeCustomItem.image,
      temp,
      sugar,
      notes
    });
  }
  closeCustomModal();
}
window.submitCustomItem = submitCustomItem;

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

  // Visual card bump feedback
  if (cardEl) {
    cardEl.classList.add('card-clicked');
    setTimeout(() => {
      cardEl.classList.remove('card-clicked');
    }, 400);
  }

  // Open customization modal
  openCustomModal({
    category: categoryId,
    name: item.name,
    price: item.price,
    desc: item.desc,
    image: item.image || category.image
  });
}
window.handleCardClick = handleCardClick;

let currentSearchQuery = '';

function renderFullMenu(categoryId) {
  const safeCategory = window.findMenuCategory(categoryId);
  const data = window.menuData[safeCategory];
  const panel = document.querySelector('#fullPanel');
  const sideList = document.querySelector('#sideList');

  // Filter items by search query if any
  let itemsToRender = data.items.map((item, idx) => ({ ...item, originalIdx: idx, cat: safeCategory }));
  if (currentSearchQuery) {
    const q = currentSearchQuery.toLowerCase();
    itemsToRender = itemsToRender.filter(item => 
      item.name.toLowerCase().includes(q) || (item.desc && item.desc.toLowerCase().includes(q))
    );
  }

  panel.innerHTML = `
    <div class="menu-search-wrap">
      <span class="menu-search-icon">🔍</span>
      <input type="text" class="menu-search-input" id="menuSearchInput" placeholder="Cari menu kopi, donat, atau makanan..." value="${escapeHtml(currentSearchQuery)}">
    </div>

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
    
    ${itemsToRender.length === 0 ? `
      <div style="padding: 40px 20px; text-align: center; color: #607089; background: #ffffff; border-radius: 20px; border: 1px dashed rgba(4,73,157,0.2);">
        <p style="font-size: 16px; font-weight: 700; margin-bottom: 6px;">Menu tidak ditemukan</p>
        <p style="font-size: 13px;">Tidak ada menu "${escapeHtml(currentSearchQuery)}" di kategori ${escapeHtml(data.title)}.</p>
      </div>
    ` : `
      <div class="full-list">
        ${itemsToRender.map(item => `
          <article class="full-item" data-category="${escapeHtml(item.cat)}" data-index="${item.originalIdx}" onclick="handleCardClick('${escapeHtml(item.cat)}', ${item.originalIdx}, this, event)" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();handleCardClick('${escapeHtml(item.cat)}', ${item.originalIdx}, this, event);}" role="button" tabindex="0" aria-label="Tambah ${escapeHtml(item.name)} ke keranjang">
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
      </div>
    `}
  `;

  // Attach search listener
  const searchInput = document.getElementById('menuSearchInput');
  if (searchInput) {
    searchInput.focus();
    // Keep cursor at end of input
    const val = searchInput.value;
    searchInput.value = '';
    searchInput.value = val;

    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim();
      renderFullMenu(safeCategory);
    });
  }

  sideList.innerHTML = window.menuOrder.map(id => {
    const category = window.menuData[id];
    const activeClass = id === safeCategory ? ' active' : '';
    return `<button class="side-link${activeClass}" type="button" data-menu-id="${escapeHtml(id)}">${escapeHtml(category.title)}</button>`;
  }).join('');

  sideList.querySelectorAll('.side-link').forEach(button => {
    button.addEventListener('click', () => {
      currentSearchQuery = '';
      setSelectedCategory(button.dataset.menuId);
    });
  });
}
window.renderFullMenu = renderFullMenu;

ensureCustomModal();
renderFullMenu(getSelectedCategory());
