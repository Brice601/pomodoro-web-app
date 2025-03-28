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
  
  // Exemples d'événements pré-définis
  export const trackPurchaseAttempt = () => {
    trackEvent('purchase_attempt');
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