'use strict';

const usersKey = 'getseeUsers';
const attemptsKey = 'getseeLoginAttempts';
const profileKey = 'getseeProfiles';
let authMode = 'login';

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(usersKey)) || [];
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(usersKey, JSON.stringify(users));
}

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

function randomHex(length = 16) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, value => value.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), value => value.toString(16).padStart(2, '0')).join('');
}

function setMessage(text, type = 'error') {
  const message = document.querySelector('#authMessage');
  if (!message) return;
  message.textContent = text;
  message.dataset.type = type;
  if (type === 'error') {
    message.style.color = '#b42318';
  } else if (type === 'success') {
    message.style.color = '#027a48';
  } else {
    message.style.color = '#04499D';
  }
}

function setMode(nextMode) {
  authMode = nextMode;
  document.querySelectorAll('[data-auth-mode]').forEach(button => {
    button.classList.toggle('active', button.dataset.authMode === authMode);
  });
  document.querySelectorAll('.register-only').forEach(field => {
    field.hidden = authMode !== 'register';
  });

  const formTitle = document.querySelector('#formTitle');
  const formSubtitle = document.querySelector('#formSubtitle');
  const submit = document.querySelector('#submitBtn');
  const switchText = document.querySelector('#switchAuthText');

  if (authMode === 'register') {
    if (formTitle) formTitle.textContent = 'Daftar Akun Baru';
    if (formSubtitle) formSubtitle.textContent = 'Buat akun untuk kemudahan pemesanan kopi & donat.';
    if (submit) submit.textContent = 'Daftar Sekarang';
    if (switchText) {
      switchText.innerHTML = 'Sudah punya akun? <a href="#" id="switchModeLink">Masuk di sini</a>';
    }
  } else {
    if (formTitle) formTitle.textContent = 'Masuk ke Akun';
    if (formSubtitle) formSubtitle.textContent = 'Masukkan email dan password Anda untuk melanjutkan.';
    if (submit) submit.textContent = 'Masuk Sekarang';
    if (switchText) {
      switchText.innerHTML = 'Belum punya akun? <a href="#" id="switchModeLink">Daftar sekarang</a>';
    }
  }

  const switchLink = document.querySelector('#switchModeLink');
  if (switchLink) {
    switchLink.addEventListener('click', (e) => {
      e.preventDefault();
      setMode(authMode === 'register' ? 'login' : 'register');
    });
  }

  setMessage('');
}

function redirectAfterLogin() {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect') || localStorage.getItem('getseeCheckoutRedirect') || 'index.html';
  localStorage.removeItem('getseeCheckoutRedirect');
  window.location.href = redirect;
}

// 1-Klik Masuk sebagai Tamu (Guest Checkout)
function continueAsGuest() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const guestEmail = `guest_${randomNum}@getsee.coffee`;
  const profiles = getProfiles();
  profiles[guestEmail] = {
    email: guestEmail,
    name: 'Pelanggan Tamu',
    updatedAt: new Date().toISOString()
  };
  saveProfiles(profiles);

  if (window.getseeShop && window.getseeShop.login) {
    window.getseeShop.login(guestEmail, false);
  }
  redirectAfterLogin();
}

// 1-Klik Masuk Cepat dengan Akun Demo
async function quickDemoLogin() {
  const email = 'demo@getsee.coffee';
  const name = 'Getsee Friend';
  const profiles = getProfiles();
  profiles[email] = {
    email,
    name,
    updatedAt: new Date().toISOString()
  };
  saveProfiles(profiles);

  const users = getUsers();
  if (!users.some(u => u.email === email)) {
    const salt = randomHex();
    const passwordHash = await hashPassword('demo1234', salt);
    users.push({ email, salt, passwordHash, createdAt: new Date().toISOString() });
    saveUsers(users);
  }

  setMessage('Berhasil masuk dengan akun demo...', 'success');
  setTimeout(() => {
    if (window.getseeShop && window.getseeShop.login) {
      window.getseeShop.login(email, true);
    }
    redirectAfterLogin();
  }, 400);
}

async function registerUser(form) {
  const formData = new FormData(form);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');
  const remember = Boolean(formData.get('remember'));

  if (!name) throw new Error('Mohon masukkan nama lengkap Anda.');
  if (password.length < 4) throw new Error('Password minimal 4 karakter.');

  // Try calling backend REST API
  try {
    const baseUrl = (window.GETSEE_CONFIG && window.GETSEE_CONFIG.API_BASE_URL) || '';
    const res = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || 'Pendaftaran gagal di server.');
    }
    if (result.token) {
      localStorage.setItem('getseeAuthToken', result.token);
    }
  } catch (err) {
    if (!err.message.includes('fetch') && !err.message.includes('Failed to fetch')) {
      throw err;
    }
    // Offline local fallback
    const users = getUsers();
    if (users.some(u => u.email === email)) {
      throw new Error('Email ini sudah terdaftar. Silakan masuk (Login).');
    }
    const salt = randomHex();
    const passwordHash = await hashPassword(password, salt);
    users.push({ email, salt, passwordHash, createdAt: new Date().toISOString() });
    saveUsers(users);
  }

  const profiles = getProfiles();
  profiles[email] = { ...(profiles[email] || {}), email, name, updatedAt: new Date().toISOString() };
  saveProfiles(profiles);

  setMessage('Pendaftaran berhasil! Mengalihkan...', 'success');
  setTimeout(() => {
    if (window.getseeShop && window.getseeShop.login) {
      window.getseeShop.login(email, remember);
    }
    redirectAfterLogin();
  }, 400);
}

async function loginUser(form) {
  const formData = new FormData(form);
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');
  const remember = Boolean(formData.get('remember'));

  if (!email) throw new Error('Mohon masukkan alamat email.');
  if (!password) throw new Error('Mohon masukkan password.');

  // Try calling backend REST API
  try {
    const baseUrl = (window.GETSEE_CONFIG && window.GETSEE_CONFIG.API_BASE_URL) || '';
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, remember })
    });
    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || 'Login gagal.');
    }
    if (result.token) {
      localStorage.setItem('getseeAuthToken', result.token);
    }
    if (result.user && result.user.name) {
      const profiles = getProfiles();
      profiles[email] = { email, name: result.user.name, updatedAt: new Date().toISOString() };
      saveProfiles(profiles);
    }
  } catch (err) {
    if (!err.message.includes('fetch') && !err.message.includes('Failed to fetch')) {
      throw err;
    }
    // Offline local fallback
    const users = getUsers();
    let user = users.find(item => item.email === email);
    if (!user) {
      const salt = randomHex();
      const passwordHash = await hashPassword(password, salt);
      const autoName = email.split('@')[0];
      const formattedName = autoName.charAt(0).toUpperCase() + autoName.slice(1);
      user = { email, salt, passwordHash, createdAt: new Date().toISOString() };
      users.push(user);
      saveUsers(users);
      const profiles = getProfiles();
      profiles[email] = { email, name: formattedName, updatedAt: new Date().toISOString() };
      saveProfiles(profiles);
    } else {
      const passwordHash = await hashPassword(password, user.salt);
      if (passwordHash !== user.passwordHash) {
        throw new Error('Password salah. Silakan coba lagi atau gunakan tombol Masuk Cepat Demo.');
      }
    }
  }

  setMessage('Login berhasil! Mengalihkan...', 'success');
  setTimeout(() => {
    if (window.getseeShop && window.getseeShop.login) {
      window.getseeShop.login(email, remember);
    }
    redirectAfterLogin();
  }, 400);
}

function initLoginPage() {
  const form = document.querySelector('#authForm');
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const isRedirectFromCheckout = params.get('redirect') === 'payment.html';

  // Tampilkan banner ramah jika datang dari proses Checkout
  const checkoutNotice = document.querySelector('#checkoutNotice');
  const guestLinkRow = document.querySelector('#guestLinkRow');
  if (isRedirectFromCheckout) {
    if (checkoutNotice) checkoutNotice.style.display = 'flex';
    if (guestLinkRow) guestLinkRow.style.display = 'block';
  }

  // Event listener tombol Guest Checkout
  const guestCheckoutBtn = document.querySelector('#guestCheckoutBtn');
  if (guestCheckoutBtn) {
    guestCheckoutBtn.addEventListener('click', continueAsGuest);
  }
  const guestTextBtn = document.querySelector('#guestTextBtn');
  if (guestTextBtn) {
    guestTextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      continueAsGuest();
    });
  }

  // Event listener tombol Demo Login 1-Klik
  const quickDemoBtn = document.querySelector('#quickDemoBtn');
  if (quickDemoBtn) {
    quickDemoBtn.addEventListener('click', quickDemoLogin);
  }

  // Event listener toggle Password Visibility (lihat / sembunyikan)
  const togglePasswordBtn = document.querySelector('#togglePasswordBtn');
  const passwordInput = document.querySelector('#passwordInput');
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      togglePasswordBtn.classList.toggle('active', isPassword);
    });
  }

  // Event listener lupa password
  const forgotPasswordLink = document.querySelector('#forgotPasswordLink');
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      setMessage('Untuk demo ini, Anda bisa memasukkan password apa saja atau klik "Masuk Cepat Demo".', 'info');
    });
  }

  // Switch mode tabs
  document.querySelectorAll('[data-auth-mode]').forEach(button => {
    button.addEventListener('click', () => setMode(button.dataset.authMode));
  });

  const switchLink = document.querySelector('#switchModeLink');
  if (switchLink) {
    switchLink.addEventListener('click', (e) => {
      e.preventDefault();
      setMode(authMode === 'register' ? 'login' : 'register');
    });
  }

  // Form submit
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const submit = form.querySelector('.login-submit');
    if (submit) submit.disabled = true;
    setMessage('Memproses...', 'info');

    try {
      if (authMode === 'register') {
        await registerUser(form);
      } else {
        await loginUser(form);
      }
    } catch (error) {
      setMessage(error.message, 'error');
      if (submit) submit.disabled = false;
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLoginPage);
} else {
  initLoginPage();
}
