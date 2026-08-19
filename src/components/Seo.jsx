// src/components/Seo.jsx
//
// Meta par page, sans dépendance externe (pas de react-helmet).
//
// ⚠️ Portée réelle : les robots de LinkedIn, Facebook et WhatsApp n'exécutent pas le JavaScript.
// Ils ne verront donc JAMAIS ce que ce composant écrit — seulement les balises statiques de
// index.html. Ce composant sert à Google (qui rend le JS) et à la barre de titre du navigateur.
// Si un jour l'aperçu de partage doit différer par page, il faudra un pré-rendu au build.

import { useEffect } from 'react';

const SITE = 'https://architecte-ia.fr';
const DEFAULT_IMAGE = '/images/og-architecte-ia.jpg';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

const Seo = ({ title, description, path = '/', image = DEFAULT_IMAGE, noindex = false, jsonLd = null }) => {
  // jsonLd est sérialisé pour servir de dépendance stable : un objet littéral passé en prop
  // change d'identité à chaque rendu et relancerait l'effet en boucle.
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    const url = SITE + path;

    if (title) document.title = title;
    upsertMeta('name', 'description', description);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', SITE + image);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', SITE + image);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    let robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robots) {
        robots = document.createElement('meta');
        robots.setAttribute('name', 'robots');
        document.head.appendChild(robots);
      }
      robots.setAttribute('content', 'noindex, follow');
    } else if (robots) {
      robots.remove();
    }

    let script = null;
    if (jsonLdKey) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'page');
      script.textContent = jsonLdKey;
      document.head.appendChild(script);
    }

    return () => {
      if (script) script.remove();
    };
  }, [title, description, path, image, noindex, jsonLdKey]);

  return null;
};

export default Seo;
