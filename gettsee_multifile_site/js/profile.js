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
}

function setProfileMessage(text, type = 'info') {
  const message = document.querySelector('#profileMessage');
  if (!message) return;
  message.textContent = text;
  message.dataset.type = type;
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
    setProfileMessage('Profile saved.');
  });

  logoutButton.addEventListener('click', async () => {
    try {
      const token = localStorage.getItem('getseeAuthToken') || '';
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
      });
    } catch (e) {}
    localStorage.removeItem('getseeAuthToken');
    window.getseeShop.logout();
    window.location.href = 'login.html';
  });
});
