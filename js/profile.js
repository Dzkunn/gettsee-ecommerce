'use strict';

const profileKey = 'getseeProfiles';

function getProfiles() {
  try {
    return JSON.parse(localStorage.getItem(profileKey)) || {};
  } catch (error) {
    return {};
  }
}

function saveProfiles(profiles) {
  localStorage.setItem(profileKey, JSON.stringify(profiles));
  // Keep getseeProfile in sync too
  const session = window.getseeShop.getSession();
  if (session?.email && profiles[session.email]) {
    localStorage.setItem('getseeProfile', JSON.stringify(profiles[session.email]));
  }
}

function setProfileMessage(text, type = 'info') {
  const message = document.querySelector('#profileMessage');
  if (!message) return;
  message.textContent = text;
  message.dataset.type = type;
  message.style.color = type === 'error' ? '#b42318' : '#027a48';
}

function renderOrderHistory(email) {
  const historyContainer = document.querySelector('#orderHistoryList');
  if (!historyContainer) return;

  let orders = [];
  try {
    orders = JSON.parse(localStorage.getItem('getseeOrders')) || JSON.parse(localStorage.getItem('getseeDemoOrders')) || [];
  } catch (e) {
    orders = [];
  }

  // Filter orders for current user or show recent
  const userOrders = orders.filter(o => !o.email || o.email === email || email.startsWith('guest_'));

  if (!userOrders.length) {
    historyContainer.innerHTML = '<p style="color: #607089; font-size: 13px; margin: 0;">Belum ada riwayat pesanan.</p>';
    return;
  }

  historyContainer.innerHTML = userOrders.map(order => {
    const itemsSummary = (order.items || []).map(it => `${it.qty}x ${it.name}${it.temp ? ` (${it.temp})` : ''}`).join(', ');
    const dateFormatted = order.createdAt ? new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-';
    return `
      <div style="border: 1px solid rgba(4,73,157,.12); border-radius: 14px; padding: 12px; background: #f8faff; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <strong style="color: #00438D; font-size: 14px;">${order.pickupCode || 'GET-ORDER'}</strong>
          <span style="font-size: 11px; font-weight: 800; color: #12b76a; background: #ecfdf3; padding: 2px 8px; border-radius: 999px;">LUNAS</span>
        </div>
        <p style="font-size: 12px; color: #3c4a5e; margin: 4px 0; font-weight: 600;">${itemsSummary}</p>
        <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: #607089;">
          <span>${dateFormatted}</span>
          <strong style="color: #071831; font-size: 13px;">${window.getseeShop.formatRupiah(order.amount || 0)}</strong>
        </div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const session = window.getseeShop.getSession();
  if (!window.getseeShop.isLoggedIn() || !session?.email) {
    window.location.href = 'login.html?redirect=profile.html';
    return;
  }

  const form = document.querySelector('#profileForm');
  const logoutButton = document.querySelector('#logoutButton');
  const profiles = getProfiles();
  const profile = profiles[session.email] || {};

  form.elements.email.value = session.email;
  form.elements.name.value = profile.name || '';
  form.elements.birthDate.value = profile.birthDate || '';
  form.elements.gender.value = profile.gender || '';

  renderOrderHistory(session.email);

  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    profiles[session.email] = {
      email: session.email,
      name: String(data.get('name') || '').trim(),
      birthDate: String(data.get('birthDate') || ''),
      gender: String(data.get('gender') || ''),
      updatedAt: new Date().toISOString()
    };
    saveProfiles(profiles);
    setProfileMessage('Profil berhasil disimpan!', 'success');
  });

  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('getseeAuthToken');
    window.getseeShop.logout();
    window.location.href = 'login.html';
  });
});
