// src/components/GoogleAnalytics.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleAnalytics = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Envoyer une vue de page à GA lors du changement de route
    if (window.gtag) {
      window.gtag('config', 'G-ZJT9Z41EQT', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  return null; // Ce composant ne rend rien visuellement
};

export default GoogleAnalytics;