// coupon.js
(function () {
  // Get URL parameters
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  // If ?code=something is present, update the coupon text
  if (code) {
    const codeElement = document.getElementById('voucherCode');
    if (codeElement) {
      // Use textContent to avoid any HTML injection
      codeElement.textContent = code;
    }
  }
})();
