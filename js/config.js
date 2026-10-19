// js/config.js - Konfigurasi endpoint API Backend
'use strict';

window.GETSEE_CONFIG = {
  // Ganti URL ini dengan domain Railway backend kamu setelah di-deploy
  // Contoh: 'https://getsee-backend-production.up.railway.app'
  // Jika masih di komputer lokal: 'http://localhost:3000'
  API_BASE_URL: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000'
    : 'https://gettsee-ecommerce-production.up.railway.app'
};
