// js/nav.js - Shared navigation, active page indicator, and mobile menu toggle
'use strict';

(function initNav() {
  function setupNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
        link.classList.add('active');
      }
    });

    // Mobile hamburger menu toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.querySelector('.nav-links');
    const navBackdrop = document.getElementById('navBackdrop');

    if (hamburgerBtn && navLinks) {
      function toggleMenu(open) {
        const isActive = open !== undefined ? open : !hamburgerBtn.classList.contains('is-active');
        hamburgerBtn.classList.toggle('is-active', isActive);
        hamburgerBtn.setAttribute('aria-expanded', String(isActive));
        navLinks.classList.toggle('is-active', isActive);
        if (navBackdrop) {
          navBackdrop.classList.toggle('is-active', isActive);
        }
        document.body.classList.toggle('mobile-nav-locked', isActive);
      }

      hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
      });

      if (navBackdrop) {
        navBackdrop.addEventListener('click', () => toggleMenu(false));
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hamburgerBtn.classList.contains('is-active')) {
          toggleMenu(false);
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNav);
  } else {
    setupNav();
  }
})();
