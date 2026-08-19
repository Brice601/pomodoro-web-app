// src/pages/AProposPage.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

// Défini hors du composant : identité stable, l'effet de <Seo> ne se relance pas à chaque rendu.
const PROFILE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://architecte-ia.fr/apropos#profilepage',
  url: 'https://architecte-ia.fr/apropos',
  name: 'À propos — Brice de la Parra, Architecte IA',
  inLanguage: 'fr-FR',
  isPartOf: { '@id': 'https://architecte-ia.fr/#site' },
  mainEntity: { '@id': 'https://architecte-ia.fr/#brice' },
};

const AProposPage = () => {
  const rootRef = useRef(null);

  // Révélation au scroll (respecte prefers-reduced-motion) — même logique que la home
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const els = rootRef.current ? rootRef.current.querySelectorAll('.ai-reveal') : [];
    els.forEach((el) => el.classList.add('pre'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.remove('pre');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="ai-wrap">
      <Seo
        title="À propos — Brice de la Parra | Architecte IA"
        description="Commerçant pendant vingt ans, aujourd'hui développeur web & data. Je construis des outils sur mesure pour les commerces, depuis Andrézieux-Bouthéon (42) et partout en France à distance."
        path="/apropos"
        jsonLd={PROFILE_JSONLD}
      />

      {/* En-tête de planche */}
      <header className="ai-page-head">
        <div className="ai-eyebrow ai-mono">
          <span>PL.05 — À propos</span><span className="ai-dot">◆</span><span>Brice · Andrézieux, Loire (42)</span>
          <span className="ai-rule" />
        </div>
        <h1 className="ai-page-h1">Derrière <span className="ai-u">Architecte IA.</span></h1>
      </header>

      {/* Portrait + intro */}
      <section className="ai-about ai-reveal" style={{ paddingBottom: 8 }}>
        <div className="ai-portrait">
          <span className="ai-cornermark tl" /><span className="ai-cornermark br" />
          <span className="ai-ph">[ Portrait ]<br />photo à venir</span>
          <img
            className="ai-portrait-img"
            src="/images/profile-picture.jpg"
            alt="Portrait de Brice"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const duo = e.currentTarget.nextElementSibling;
              if (duo) duo.style.display = 'none';
            }}
          />
          <span className="ai-portrait-duo" aria-hidden="true" />
        </div>
        <div className="ai-prose">
          <p style={{ marginTop: 0 }}>
            Je suis <b>Brice</b>. Je ne viens pas de l'informatique : j'ai passé <b>vingt ans</b> à la
            tête de mes propres commerces — un magasin multimarque, puis ma <b>boutique en ligne</b>.
            Le métier de commerçant, ses contraintes et ce qui fait vraiment gagner du temps, je le
            connais de l'intérieur.
          </p>
          <p>
            C'est en cherchant à <b>automatiser</b> ma propre activité que je suis venu au développement,
            puis à l'intelligence artificielle. Aujourd'hui je conçois des outils web sur mesure — dont un
            logiciel avec IA <Link to="/realisations">déjà en ligne</Link>. Je ne vous parle donc pas en
            technicien, mais en <b>commerçant qui sait construire l'outil qui manque</b>.
          </p>
        </div>
      </section>

      {/* Parcours */}
      <section className="ai-section ai-reveal">
        <div className="ai-sec-head">
          <span className="ai-sec-ref">PL.05 / 01 — Parcours</span>
          <h2 className="ai-sec-title">Le terrain avant la théorie.</h2>
        </div>
        <ul className="ai-timeline">
          <li>
            <div className="ai-yr">Le commerce</div>
            <h3>Vingt ans à mon compte</h3>
            <p>D'abord un magasin multimarque, puis ma propre boutique en ligne : commandes, clients, logistique, au quotidien. J'ai appris le métier de commerçant sur le terrain, pas dans un livre.</p>
          </li>
          <li>
            <div className="ai-yr">L'automatisation</div>
            <h3>L'envie de gagner du temps</h3>
            <p>Pour automatiser ma propre activité, je me mets au code : je découvre le développement web, le support informatique, l'automatisation.</p>
          </li>
          <li>
            <div className="ai-yr">La data &amp; l'IA</div>
            <h3>Le passage au sérieux</h3>
            <p>Ce qui était une curiosité devient un vrai métier : science des données, puis architecture en intelligence artificielle — dont je suis aujourd'hui en fin de formation.</p>
          </li>
        </ul>
      </section>

      {/* Formation */}
      <section className="ai-section ai-reveal">
        <div className="ai-sec-head">
          <span className="ai-sec-ref">PL.05 / 02 — Formation</span>
          <h2 className="ai-sec-title">En fin de formation d'architecte IA.</h2>
        </div>
        <div className="ai-prose">
          <p style={{ marginTop: 0 }}>
            Je termine actuellement une formation d'<b>architecte en intelligence artificielle</b> — un
            cursus reconnu au <b>niveau 7</b> (équivalent bac+5) au Répertoire National des Certifications
            Professionnelles.{' '}
            <a href="https://www.francecompetences.fr/recherche/rncp/41993/" target="_blank" rel="noopener noreferrer">
              Voir la fiche officielle (France Compétences) →
            </a>
          </p>
        </div>
        <p className="ai-note">
          En toute transparence : la certification n'est <b>pas encore obtenue</b> — elle se valide en{' '}
          <b>octobre 2026</b>. En attendant, ce sont mes réalisations <b>déjà en ligne</b> qui parlent pour moi.
        </p>
      </section>

      {/* Façon de travailler */}
      <section className="ai-section ai-reveal">
        <div className="ai-sec-head">
          <span className="ai-sec-ref">PL.05 / 03 — Méthode</span>
          <h2 className="ai-sec-title">Ma façon de travailler.</h2>
        </div>
        <div className="ai-grid-3">
          <div className="ai-card">
            <div className="ai-idx">01 — Écoute</div>
            <h3>Je pars de votre métier</h3>
            <p>On commence par ce qui vous fait perdre du temps, pas par une solution toute faite. L'outil sert votre commerce, pas l'inverse.</p>
          </div>
          <div className="ai-card">
            <div className="ai-idx">02 — Maquette</div>
            <h3>Je dessine avant de signer</h3>
            <p>Je vous montre à quoi votre outil ressemblera — une vraie maquette — avant tout engagement. Vous voyez avant de décider.</p>
          </div>
          <div className="ai-card">
            <div className="ai-idx">03 — Suivi</div>
            <h3>Je reste après la livraison</h3>
            <p>Hébergement, mises à jour, évolutions : votre outil vit avec votre commerce, et je reste joignable.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ai-section ai-reveal" style={{ paddingBottom: 8 }}>
        <div className="ai-cta-band">
          <h2>On fait connaissance ?</h2>
          <div className="ai-cta-row">
            <a className="ai-btn ai-btn-primary" href="/#contact">Réserver un appel de 15 min →</a>
            <Link className="ai-btn ai-btn-ghost" to="/realisations">Voir les réalisations</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AProposPage;
