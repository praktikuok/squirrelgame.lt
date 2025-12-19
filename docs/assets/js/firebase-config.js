/* assets/js/firebase-config.js */

/**
 * 1) Paste your firebaseConfig from Firebase Console here
 * 2) This file exposes window.sgSaveDiscountEmail(email, extra)
 */

(function () {
  // Paste YOUR config:
  const firebaseConfig = {
    apiKey: "AIzaSyCP9hEfOJ4r62qZRmrDX5OKh4M4qLmfMQs",
    authDomain: "squirrel-game-3229d.firebaseapp.com",
    projectId: "squirrel-game-3229d",
    storageBucket: "squirrel-game-3229d.firebasestorage.app",
    messagingSenderId: "884993245902",
    appId: "1:884993245902:web:16a3fcb9a9aa865dddc69f",
    measurementId: "G-Z3LHZXTQ8T"
  };

  // Initialize
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // Public helper used by the modal submit
  window.sgSaveDiscountEmail = async function sgSaveDiscountEmail(email, extra = {}) {
    const payload = {
      email: String(email || "").trim().toLowerCase(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      ...extra
    };

    // Collection name can be anything you want
    await db.collection("discount_leads").add(payload);
    return payload;
  };
})();
