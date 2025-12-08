document.addEventListener('DOMContentLoaded', () => {
  const config = window.SQUIRREL_GAME_CONFIG || {};

  const ticketPrice = config.ticketPriceEur;
  if (typeof ticketPrice !== 'undefined') {
    ['ticket-price-display', 'coupon-price-display'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = ticketPrice;
      }
    });
  }

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
