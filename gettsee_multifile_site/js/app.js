'use strict';

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

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[char]));
}

function renderMenuCards() {
  const grid = document.querySelector('#menuGrid');
  if (!grid) return;

  grid.innerHTML = window.menuOrder.map(id => {
    const category = window.menuData[id];
    return `
      <article class="menu-card" data-menu-id="${escapeHtml(id)}" tabindex="0" role="button" aria-label="Open ${escapeHtml(category.title)} menu">
        <div class="menu-image"><img src="${escapeHtml(category.image)}" alt="${escapeHtml(category.title)}" loading="lazy" decoding="async"></div>
        <div class="menu-body">
          <h3>${escapeHtml(category.title)}</h3>
          <div class="order-row"><button class="order-btn" type="button">Order</button></div>
        </div>
      </article>`;
  }).join('');
}

function openMenu(categoryId) {
  const safeCategory = window.findMenuCategory(categoryId);
  window.location.href = 'menu.html?category=' + encodeURIComponent(safeCategory);
}
window.openMenu = openMenu;

function orderCategoryItem(categoryId, event) {
  if (event) {
    if (typeof event.preventDefault === 'function') event.preventDefault();
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
  }
  openMenu(categoryId);
}
window.orderCategoryItem = orderCategoryItem;

function attachMenuCardEvents() {
  const cards = Array.from(document.querySelectorAll('.menu-card'));
  cards.forEach(card => {
    const categoryId = card.dataset.menuId;
    card.addEventListener('click', () => {
      openMenu(categoryId);
    });
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openMenu(categoryId);
      }
    });
  });
}

function runSmokeTests() {
  console.assert(Boolean(window.menuData.burger), 'Expected burger category to exist');
  console.assert(window.menuData.burger.items.length === 2, 'Expected burger category to have 2 items');
  console.assert(window.menuOrder.includes('rice'), 'Expected menu order to include rice section');
}

renderMenuCards();
attachMenuCardEvents();
runSmokeTests();
