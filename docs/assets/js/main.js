document.addEventListener('DOMContentLoaded', () => {
  const config = window.SQUIRREL_GAME_CONFIG || {};

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

  updatePrices();
  renderLeaderboard();
  renderTestimonials();

  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  const links = [
    { id: 'game-rules-link', url: config.gameRulesUrl },
    { id: 'privacy-policy-link', url: config.privacyPolicyUrl },
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

  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesBtn = document.getElementById('accept-cookies');

  if (cookieBanner && acceptCookiesBtn) {
    if (localStorage.getItem('cookiesAccepted') === 'true') {
      cookieBanner.style.display = 'none';
    }

    acceptCookiesBtn.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieBanner.style.display = 'none';
    });
  }

  document.querySelectorAll('.faq-toggle').forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const icon = this.querySelector('.faq-icon');

      if (content) {
        content.classList.toggle('hidden');
      }

      if (icon) {
        icon.classList.toggle('rotate-180');
      }
    });
  });
});
