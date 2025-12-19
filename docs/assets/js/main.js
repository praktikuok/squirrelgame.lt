document.addEventListener('DOMContentLoaded', () => {
  const config = window.SQUIRREL_GAME_CONFIG || {};
  const DAY_MS = 24 * 60 * 60 * 1000;

  // Keep CSS --header-height in sync (used for the fixed header + anchor offsets)
  const syncHeaderHeight = () => {
    const header = document.querySelector('.site-header');
    if (!header) {
      return;
    }
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
  };

  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight);
  window.addEventListener('load', syncHeaderHeight);

  const formatEuro = (value) => (typeof value === 'number'
    ? `${value.toLocaleString('lt-LT', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €`
    : '');

  const calculateDiscount = (original, current) => {
    if (typeof original !== 'number' || typeof current !== 'number' || original <= current) {
      return '';
    }
    const percent = Math.round(((original - current) / original) * 100);
    return percent > 0 ? `Sutaupyk ${percent}%` : '';
  };

  const safeGetStorage = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  };

  const safeSetStorage = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // ignore storage failures
    }
  };

  const updatePrices = () => {
    const pricingConfig = config.pricing;
    if (!pricingConfig) {
      return;
    }

    const subtitleEl = document.getElementById('pricing-subtitle');
    if (subtitleEl && pricingConfig.subtitle) {
      subtitleEl.textContent = pricingConfig.subtitle;
    }

    const banner = pricingConfig.banner || {};
    const bannerIconEl = document.getElementById('pricing-banner-icon');
    const bannerTextEl = document.getElementById('pricing-banner-text');
    const bannerLabelEl = document.getElementById('pricing-discount-label');
    const bannerCodeEl = document.getElementById('pricing-discount-code');

    if (bannerIconEl && banner.icon) {
      bannerIconEl.className = banner.icon;
    }
    if (bannerTextEl && banner.text) {
      bannerTextEl.textContent = banner.text;
    }
    if (bannerLabelEl && banner.label) {
      bannerLabelEl.textContent = banner.label;
    }
    if (bannerCodeEl && banner.code) {
      bannerCodeEl.textContent = banner.code;
    }

    const variants = ['pricing-card--accent', 'pricing-card--holiday'];
    const options = pricingConfig.options || [];

    document.querySelectorAll('[data-pricing-key]').forEach((card) => {
      const key = card.getAttribute('data-pricing-key');
      const option = options.find((item) => item.key === key);
      if (!option) {
        return;
      }

      variants.forEach((cls) => card.classList.remove(cls));
      if (option.variant && option.variant !== 'pricing-card') {
        card.classList.add(option.variant);
      }

      const titleEl = card.querySelector('[data-role="title"]');
      if (titleEl && option.title) {
        titleEl.textContent = option.title;
      }

      const subtitleCardEl = card.querySelector('[data-role="subtitle"]');
      if (subtitleCardEl && option.subtitle) {
        subtitleCardEl.textContent = option.subtitle;
      }

      const iconEl = card.querySelector('[data-role="icon"]');
      if (iconEl && option.icon) {
        iconEl.innerHTML = `<i class="${option.icon}"></i>`;
      }

      const currentPriceEl = card.querySelector('[data-role="current-price"]');
      if (currentPriceEl) {
        currentPriceEl.textContent = formatEuro(option.currentPrice);
      }

      const originalPriceEl = card.querySelector('[data-role="original-price"]');
      if (originalPriceEl) {
        if (typeof option.originalPrice === 'number' && option.originalPrice > option.currentPrice) {
          originalPriceEl.textContent = formatEuro(option.originalPrice);
          originalPriceEl.style.display = 'block';
        } else {
          originalPriceEl.style.display = 'none';
        }
      }

      const discountEl = card.querySelector('[data-role="discount"]');
      if (discountEl) {
        const discountLabel = option.discountLabel || calculateDiscount(option.originalPrice, option.currentPrice);
        if (discountLabel) {
          discountEl.textContent = discountLabel;
          discountEl.style.display = 'inline-flex';
        } else {
          discountEl.style.display = 'none';
        }
      }

      const featuresList = card.querySelector('[data-role="features"]');
      if (featuresList) {
        featuresList.innerHTML = '';
        (option.features || []).forEach((feature) => {
          const li = document.createElement('li');
          const iconClass = feature.icon || 'fas fa-check-circle text-accent';
          li.innerHTML = `<i class="${iconClass}"></i><span>${feature.text || ''}</span>`;
          featuresList.appendChild(li);
        });
      }

      const buttonEl = card.querySelector('[data-role="button"]');
      if (buttonEl) {
        buttonEl.textContent = option.buttonLabel || 'Pasirinkti';
        buttonEl.href = option.buttonUrl || '#';
      }
    });
  };

  const renderLeaderboard = () => {
    const leaderboard = config.leaderboard || {};
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) {
      return;
    }

    tbody.innerHTML = '';
    const entries = leaderboard.entries || [];
    entries.forEach((entry, index) => {
      const tr = document.createElement('tr');
      if (index !== entries.length - 1) {
        tr.className = 'border-b border-subtle';
      }

      const placeCell = document.createElement('td');
      placeCell.className = 'px-6 py-4';
      if (entry.icon) {
        placeCell.innerHTML = `<i class="${entry.icon} mr-2"></i>${entry.place}`;
      } else {
        placeCell.textContent = entry.place;
      }

      const teamCell = document.createElement('td');
      teamCell.className = 'px-6 py-4';
      teamCell.textContent = entry.team || '';

      const pointsCell = document.createElement('td');
      pointsCell.className = 'px-6 py-4';
      pointsCell.textContent = entry.points != null ? entry.points : '';

      const timeCell = document.createElement('td');
      timeCell.className = 'px-6 py-4';
      timeCell.textContent = entry.time || '';

      tr.append(placeCell, teamCell, pointsCell, timeCell);
      tbody.appendChild(tr);
    });

    const noteEl = document.getElementById('leaderboard-note');
    if (noteEl && leaderboard.note) {
      noteEl.textContent = leaderboard.note;
    }
  };

  const renderTestimonials = () => {
    const testimonials = config.testimonials || [];
    const grid = document.getElementById('testimonials-grid');
    if (!grid) {
      return;
    }

    grid.innerHTML = '';
    testimonials.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'bg-white p-6 rounded-lg shadow-md';

      const ratingEl = document.createElement('div');
      ratingEl.className = 'flex gap-1 text-accent mb-3';
      const rating = typeof item.rating === 'number' ? item.rating : 5;
      for (let i = 0; i < 5; i += 1) {
        const star = document.createElement('i');
        star.className = `${i < rating ? 'fas' : 'far'} fa-star`;
        ratingEl.appendChild(star);
      }

      const quoteEl = document.createElement('p');
      quoteEl.className = 'text-gray-700 mb-4 italic';
      quoteEl.textContent = item.quote || '';

      const authorEl = document.createElement('p');
      authorEl.className = 'font-semibold text-primary';
      authorEl.textContent = item.author ? `– ${item.author}` : '';

      card.append(ratingEl, quoteEl, authorEl);
      grid.appendChild(card);
    });
  };

  const renderFaq = () => {
    const faqEntries = config.faq || [];
    const container = document.getElementById('faq-list');
    if (!container) {
      return;
    }

    container.innerHTML = '';
    faqEntries.forEach((item) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'border border-gray-300 rounded-lg overflow-hidden bg-light';

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'w-full text-left px-6 py-4 transition flex justify-between items-center faq-toggle';
      button.innerHTML = `<span class="font-semibold text-primary">${item.question || ''}</span><i class="fas fa-chevron-down text-primary transition-transform faq-icon"></i>`;

      const answer = document.createElement('div');
      answer.className = 'px-6 py-4 text-gray-700 hidden faq-content bg-white';
      answer.textContent = item.answer || '';

      button.addEventListener('click', () => {
        answer.classList.toggle('hidden');
        const icon = button.querySelector('.faq-icon');
        if (icon) {
          icon.classList.toggle('rotate-180');
        }
      });

      wrapper.append(button, answer);
      container.appendChild(wrapper);
    });
  };

  const initNavigation = () => {
    const navToggle = document.getElementById('nav-toggle');
    const siteNav = document.getElementById('site-nav');
    if (!navToggle || !siteNav) {
      return;
    }

    const closeNav = () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    };

    navToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeNav();
      } else {
        siteNav.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });

    document.addEventListener('click', (event) => {
      if (!siteNav.contains(event.target) && event.target !== navToggle) {
        closeNav();
      }
    });

    const normalizePath = (value) => {
      if (!value) {
        return '/';
      }
      let path = value;
      if (path.length > 1 && path.endsWith('/')) {
        path = path.slice(0, -1);
      }
      if (path === '' || path === '/index.html') {
        return '/';
      }
      return path;
    };

    const getHeaderOffset = () => {
      const header = document.querySelector('.site-header');
      if (!header) {
        return 0;
      }
      const position = window.getComputedStyle(header).position;
      if (position !== 'fixed' && position !== 'sticky') {
        return 0;
      }
      return header.getBoundingClientRect().height;
    };

    const scrollToHash = (hash, behavior = 'smooth') => {
      const raw = (hash || '').replace('#', '');
      if (!raw) {
        return false;
      }

      const targetId = decodeURIComponent(raw);
      const target = document.getElementById(targetId);
      if (!target) {
        return false;
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const scrollBehavior = prefersReducedMotion ? 'auto' : behavior;

      const offset = getHeaderOffset();
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset - 8;

      window.scrollTo({ top: Math.max(top, 0), behavior: scrollBehavior });
      return true;
    };

    document.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href') || '';
        // Only intercept same-page hash links (e.g. "#kainos" or "/#kainos")
        if (!href.includes('#')) {
          closeNav();
          return;
        }

        let url;
        try {
          url = new URL(href, window.location.href);
        } catch (error) {
          closeNav();
          return;
        }

        const sameOrigin = url.origin === window.location.origin;
        const samePath = normalizePath(url.pathname) === normalizePath(window.location.pathname);

        if (sameOrigin && samePath && url.hash) {
          const didScroll = scrollToHash(url.hash, 'smooth');
          if (didScroll) {
            event.preventDefault();
            // Keep the hash in the URL without a hard jump
            if (history.pushState) {
              history.pushState(null, '', url.hash);
            } else {
              window.location.hash = url.hash;
            }
          }
        }

        closeNav();
      });
    });

    // If the page loads with a hash, re-apply it with header offset.
    if (window.location.hash) {
      setTimeout(() => {
        scrollToHash(window.location.hash, 'auto');
      }, 0);
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  };

  const initCookiePreferences = () => {
    const form = document.getElementById('cookie-preferences-form');
    if (!form) {
      return;
    }

    const analyticsCheckbox = document.getElementById('analytics-cookies');
    const messageEl = document.getElementById('cookie-update-message');

    if (analyticsCheckbox) {
      analyticsCheckbox.checked = safeGetStorage('cookiesAccepted') === 'true';
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (analyticsCheckbox) {
        safeSetStorage('cookiesAccepted', analyticsCheckbox.checked ? 'true' : 'false');
      }
      if (messageEl) {
        messageEl.classList.remove('hidden');
        messageEl.textContent = 'Nustatymai išsaugoti.';
        setTimeout(() => messageEl.classList.add('hidden'), 3000);
      }
    });
  };

  const showThanks = () => {
    const successContent = document.getElementById('thankYouContent')
    const emptyContent = document.getElementById('emptyCart')
    if (successContent && emptyContent) {
      // Check for session_id in URL parameters
      const url = new URL(window.location.href);
      const sessionId = url.searchParams.get("session_id");

      if (sessionId) {
        if (sessionId !== "12jk4h2ui7nrg") {
          fbq('track', 'Purchase', { value: 5.99, currency: 'EUR' });
          url.searchParams.set("session_id", "12jk4h2ui7nrg");
          window.history.replaceState({}, "", url.toString());
        }
        // Show thank you content if session_id is present
        successContent.style.display = 'block';
      } else {
        // Show empty cart message by default
        emptyContent.style.display = 'block';
      }
    }
  };

  showThanks();
  updatePrices();
  renderLeaderboard();
  renderTestimonials();
  renderFaq();
  initCookiePreferences();
  initNavigation();

  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  const links = [
    { id: 'game-rules-link', url: config.gameRulesUrl },
    { id: 'cookies-policy-link', url: config.cookiesPolicyUrl },
    { id: 'cookies-info-link', url: config.cookiesPolicyUrl },
    { id: 'terms-conditions-link', url: config.termsConditionsUrl }
  ];

  links.forEach(({ id, url }) => {
    const link = document.getElementById(id);
    if (link && typeof url === 'string') {
      link.href = url;
    }
  });

  const setActiveFooterLink = () => {
    let path = window.location.pathname;
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    if (!path) {
      path = '/';
    }

    const map = [
      { selector: '#footer-home-link', paths: ['/', '/index.html'] },
      { selector: '#game-rules-link', paths: ['/game-rules', '/game-rules.html'] },
      { selector: '#cookies-policy-link', paths: ['/cookies', '/cookies.html'] },
      { selector: '#terms-conditions-link', paths: ['/terms', '/terms.html'] }
    ];

    const allFooterLinks = document.querySelectorAll('.footer-link');
    allFooterLinks.forEach((link) => link.classList.remove('footer-link--active'));

    const match = map.find((item) => item.paths.includes(path));
    if (match) {
      const el = document.querySelector(match.selector);
      if (el) {
        el.classList.add('footer-link--active');
      }
    }
  };

  setActiveFooterLink();


  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesBtn = document.getElementById('accept-cookies');

  if (cookieBanner && acceptCookiesBtn) {
    if (safeGetStorage('cookiesAccepted') === 'true') {
      cookieBanner.style.display = 'none';
    }

    acceptCookiesBtn.addEventListener('click', () => {
      safeSetStorage('cookiesAccepted', 'true');
      cookieBanner.style.display = 'none';
    });
  }

  // =========================
  // 20€ discount modal (simple, hardcoded)
  // =========================
  const initDiscountModal = () => {
    document.querySelectorAll('[data-sg-discount]').forEach((root) => {
      const openBtn = root.querySelector('[data-sg-discount-open]');
      const overlay = root.querySelector('[data-sg-discount-overlay]');
      const closeBtn = root.querySelector('[data-sg-discount-close]');
      const form = root.querySelector('[data-sg-discount-form]');
      const submitBtn = root.querySelector('[data-sg-discount-submit]');
      const success = root.querySelector('[data-sg-discount-success]');
      const emailInput = root.querySelector('input[type="email"]');

      if (!openBtn || !overlay || !closeBtn || !form || !submitBtn || !success || !emailInput) return;

      const open = () => overlay.classList.add('active');
      const close = () => {
        overlay.classList.remove('active');
        reset();
      };

      const reset = () => {
        form.style.display = 'flex';
        success.classList.remove('active');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Išsaugoti 20 € nuolaidą';
        emailInput.value = '';
      };

      openBtn.addEventListener('click', open);

      // keyboard open (because openBtn is a div with role=button)
      openBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });

      closeBtn.addEventListener('click', close);

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) close();
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        if (!email) return;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Apdorojama...';

        try {
          // Save email to Firestore
          await window.sgSaveDiscountEmail(email, {
            source: 'discount-modal',
            context: '20EurDiscount'
          });

          form.style.display = 'none';
          success.classList.add('active');
          // success text is already hardcoded in your HTML
          setTimeout(() => {
            overlay.classList.remove('active');
            reset();
          }, 3000);

        } catch (err) {
          // show error nicely
          submitBtn.disabled = false;
          submitBtn.textContent = 'Noriu nuolaidos';
          success.textContent = 'Nepavyko išsaugoti. Bandykite dar kartą.';
          success.classList.add('active');
        }
      });
    });
  };

  // =========================
  // Auto-open DISCOUNT modal using newsletterModal config (ONLY ONCE EVER)
  // =========================
  const DISCOUNT_AUTO_SHOWN_KEY = 'discountModalAutoShownOnce';

  const initDiscountAutoTriggers = () => {
    const discountConfig = config.newsletterModal || {};

    // Find your discount modal elements ("as it is now")
    const giftIcon =
      document.getElementById('giftIcon')
      || document.querySelector('.sg-discount .gift-icon')
      || document.querySelector('.gift-icon');

    const modalOverlay =
      document.getElementById('modalOverlay')
      || document.querySelector('.sg-discount .modal-overlay')
      || document.querySelector('.modal-overlay');

    if (!giftIcon || !modalOverlay) return;

    const alreadyAutoShown = safeGetStorage(DISCOUNT_AUTO_SHOWN_KEY) === 'true';
    if (alreadyAutoShown) return; // never auto-open again

    const markShownOnce = () => {
      safeSetStorage(DISCOUNT_AUTO_SHOWN_KEY, 'true');
    };

    // If user opens it manually before auto triggers — also mark it,
    // so we won't auto-open later in the session or future visits.
    giftIcon.addEventListener('click', () => {
      // mark only when modal actually opens (best effort)
      // your modal adds class "active" to overlay
      setTimeout(() => {
        if (modalOverlay.classList.contains('active')) {
          markShownOnce();
        }
      }, 0);
    });

    const openDiscountModal = () => {
      // re-check right before opening
      if (safeGetStorage(DISCOUNT_AUTO_SHOWN_KEY) === 'true') return;
      if (modalOverlay.classList.contains('active')) return;

      giftIcon.click();       // reuse existing modal logic
      markShownOnce();        // mark immediately so it won't trigger again
      cleanup();
    };

    let delayTimerId = null;
    const exitHandler = (event) => {
      if (event.clientY <= 0) openDiscountModal();
    };

    const cleanup = () => {
      if (delayTimerId) {
        clearTimeout(delayTimerId);
        delayTimerId = null;
      }
      document.removeEventListener('mouseleave', exitHandler);
    };

    // Delay trigger
    if (discountConfig.enableDelay !== false) {
      const delay = typeof discountConfig.delayMs === 'number' ? discountConfig.delayMs : 30000;
      delayTimerId = setTimeout(openDiscountModal, delay);
    }

    // Exit intent trigger
    if (discountConfig.enableExitIntent) {
      document.addEventListener('mouseleave', exitHandler);
    }
  };

  initDiscountAutoTriggers();
  initDiscountModal();

});
