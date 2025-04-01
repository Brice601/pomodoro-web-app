// src/utils/analyticsUtils.js

/**
 * Envoie un événement personnalisé à Google Analytics
 * @param {string} eventName - Nom de l'événement
 * @param {Object} eventParams - Paramètres additionnels (optionnel)
 */
export const trackEvent = (eventName, eventParams = {}) => {
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
    } else {
      console.warn('Google Analytics non disponible');
    }
  };

export const trackDemoStart = () => {
  trackEvent('demo_start');
};

export const trackDemoEnd = () => {
  trackEvent('demo_end');
};

export const trackDownloadTemplate = () => {
  trackEvent('download_template');
};

export const trackFileUpload = () => {
  trackEvent('file_upload');
};

export const trackContactClick = () => {
  trackEvent('contact_click');
};

  /**
 * Suivi de l'utilisation d'un code de réduction
 * @param {string} couponCode - Le code du coupon utilisé
 */
export const trackCouponUsage = (couponCode) => {
  trackEvent('coupon_applied', {
    coupon_code: couponCode,
    timestamp: new Date().toISOString()
  });
};

/**
 * Suivi d'une erreur lors de l'utilisation d'un code de réduction
 * @param {string} couponCode - Le code du coupon utilisé
 * @param {string} errorType - Le type d'erreur rencontré
 */
export const trackCouponError = (couponCode, errorType) => {
  trackEvent('coupon_error', {
    coupon_code: couponCode,
    error_type: errorType,
    timestamp: new Date().toISOString()
  });
};

/**
 * Suivi d'un achat avec des paramètres additionnels pour les coupons
 * @param {Object} params - Paramètres d'achat incluant les informations de coupon
 */
export const trackPurchaseAttempt = (params = {}) => {
  const eventParams = {
    ...params,
    timestamp: new Date().toISOString()
  };
  
  trackEvent('purchase_attempt', eventParams);
};