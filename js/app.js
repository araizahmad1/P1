/* ═══════════════════════════════════════════
   DECODELABS — app.js
   All Interactive Features
   Updated: Form now connected to Backend API
═══════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────
  // 1. MOBILE NAVIGATION TOGGLE
  // ─────────────────────────────────────────

  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const body = document.body;

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close nav when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      });
    });

    // Close nav on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
        hamburger.focus();
      }
    });
  }

  // ─────────────────────────────────────────
  // 2. STICKY HEADER ON SCROLL
  // ─────────────────────────────────────────

  const header = document.querySelector('.site-header');

  if (header) {
    const handleHeaderScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
  }

  // ─────────────────────────────────────────
  // 3. SMOOTH SCROLL
  // ─────────────────────────────────────────

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─────────────────────────────────────────
  // 4. ACTIVE NAV HIGHLIGHTING ON SCROLL
  // ─────────────────────────────────────────

  const sections = document.querySelectorAll('section[id]');
  const navHeight = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--nav-height')) || 72;

  const highlightNav = () => {
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - navHeight - 60;
      if (window.scrollY >= top) currentId = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active',
        link.getAttribute('href') === `#${currentId}`
      );
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // ─────────────────────────────────────────
  // 5. SCROLL-TRIGGERED ANIMATIONS
  // ─────────────────────────────────────────

  const animEls = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animEls.forEach(el => observer.observe(el));
  } else {
    animEls.forEach(el => el.classList.add('animate-in'));
  }

  // ─────────────────────────────────────────
  // 6. FORM VALIDATION HELPERS
  // ─────────────────────────────────────────

  const contactForm = document.querySelector('#contact-form');

  function showError(input, message) {
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
    input.setAttribute('aria-invalid', 'true');
    input.classList.add('error');
  }

  function clearError(input) {
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
    input.setAttribute('aria-invalid', 'false');
    input.classList.remove('error');
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateInput(input) {
    const value = input.value.trim();
    if (!value) {
      let labelText = 'This field';
      if (input.labels && input.labels.length > 0) {
        labelText = input.labels[0].textContent.replace(/\*/g, '').trim();
      }
      showError(input, `${labelText} is required.`);
      return false;
    }
    if (input.type === 'email' && !validateEmail(value)) {
      showError(input, 'Please enter a valid email address.');
      return false;
    }
    if (input.minLength > 0 && value.length < input.minLength) {
      showError(input, `Minimum ${input.minLength} characters required.`);
      return false;
    }
    clearError(input);
    return true;
  }

  // ─────────────────────────────────────────
  // 6B. BACKEND API CONFIG
  // ─────────────────────────────────────────
  // Agar backend alag port pe ho to yahan
  // sirf yeh ek line badlo — baaki sab same

  const API_BASE = 'http://localhost:5000/api/v1';

  // ─────────────────────────────────────────
  // 6C. FORM SUBMIT — REAL BACKEND CONNECTED
  // ─────────────────────────────────────────

  if (contactForm) {
    const requiredInputs = contactForm.querySelectorAll('[required]');

    // Live validation on blur
    requiredInputs.forEach(input => {
      input.addEventListener('blur', () => validateInput(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) validateInput(input);
      });
    });

    // ── SUBMIT HANDLER (async — fetch API use karta hai) ──
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // ── Step 1: Frontend validation pehle ──
      let allValid = true;
      requiredInputs.forEach(input => {
        if (!validateInput(input)) allValid = false;
      });

      // Koi error hai to pehle wala focus karo
      if (!allValid) {
        const firstError = contactForm.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
        return;
      }

      // ── Step 2: Button ko loading state mein daalo ──
      const btn = contactForm.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';

      // ── Step 3: Backend ko data bhejo ──
      try {

        const response = await fetch(`${API_BASE}/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            // level field subject ki jagah use ho raha hai
            subject: document.getElementById('level').value
              ? `Internship Application — ${document.getElementById('level').value}`
              : 'Internship Application',
            message: document.getElementById('message').value.trim(),
          }),
        });

        // ── Step 4: Backend ka response parse karo ──
        const data = await response.json();

        // ── Step 5: Success ya Error handle karo ──
        if (response.ok && data.success) {

          // ✅ SUCCESS — form reset karo, toast dikhao
          contactForm.reset();
          requiredInputs.forEach(input => clearError(input));
          showToast('✓ ' + data.message, 'success');

        } else {

          // ❌ BACKEND VALIDATION ERRORS
          // Backend ne specific field errors bheje hain
          if (data.errors && Array.isArray(data.errors)) {
            data.errors.forEach(err => {
              // Field ka input element dhundo
              const input = document.getElementById(err.field);
              if (input) {
                showError(input, err.message);
              }
            });
            // Pehle error pe focus karo
            const firstErr = contactForm.querySelector('[aria-invalid="true"]');
            if (firstErr) firstErr.focus();
          }

          showToast(
            '✕ ' + (data.message || 'Please fix the errors and try again.'),
            'error'
          );

        }

      } catch (networkErr) {

        // 🔌 NETWORK ERROR — backend chal nahi raha
        console.error('API connection error:', networkErr);
        showToast(
          '✕ Cannot connect to server. Please make sure the backend is running.',
          'error',
          6000
        );

      } finally {

        // Hamesha — chahe success ho ya error — button wapas enable karo
        btn.disabled = false;
        btn.textContent = 'Send Application →';

      }
    });
  }

  // ─────────────────────────────────────────
  // 7. TOAST NOTIFICATIONS
  // ─────────────────────────────────────────

  const toast = document.getElementById('toast');

  function showToast(message, type = 'success', duration = 4000) {
    if (!toast) return;
    const icon = toast.querySelector('.toast-icon');
    const text = toast.querySelector('.toast-text');
    if (icon) icon.textContent = type === 'success' ? '✓' : '✕';
    if (text) text.textContent = message;
    toast.className = `toast ${type} show`;

    if (toast._timer) clearTimeout(toast._timer);
    const timer = setTimeout(() => hideToast(), duration);
    toast._timer = timer;
  }

  function hideToast() {
    if (!toast) return;
    toast.classList.remove('show');
    clearTimeout(toast._timer);
  }

  const toastClose = document.querySelector('.toast-close');
  if (toastClose) toastClose.addEventListener('click', hideToast);

  // ─────────────────────────────────────────
  // 8. READING PROGRESS BAR
  // ─────────────────────────────────────────

  const progressBar = document.querySelector('.progress-bar');

  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }, { passive: true });
  }

  // ─────────────────────────────────────────
  // 9. CURSOR GLOW (desktop only)
  // ─────────────────────────────────────────

  const cursorGlow = document.querySelector('.cursor-glow');

  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }, { passive: true });
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  // ─────────────────────────────────────────
  // 10. COUNTER ANIMATION (Stats section)
  // ─────────────────────────────────────────

  const counters = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 1800;
      const start = performance.now();

      const animate = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        el.textContent = prefix + (
          Number.isInteger(target)
            ? Math.round(current).toLocaleString()
            : current.toFixed(1)
        ) + suffix;
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  // ─────────────────────────────────────────
  // 11. THEME TOGGLE (bonus)
  // ─────────────────────────────────────────

  const themeBtn = document.querySelector('.theme-toggle');

  if (themeBtn) {
    const saved = localStorage.getItem('dl-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeBtn(saved);

    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('dl-theme', next);
      updateThemeBtn(next);
    });

    function updateThemeBtn(theme) {
      themeBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      themeBtn.textContent = theme === 'dark' ? '☀' : '☾';
    }
  }

});