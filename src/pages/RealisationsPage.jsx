// src/pages/RealisationsPage.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const RealisationsPage = () => {
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
      {/* En-tête de planche */}
      <header className="ai-page-head">
        <div className="ai-eyebrow ai-mono">
          <span>PL.04 — Réalisations</span><span className="ai-dot">◆</span><span>Conçu, développé, mis en ligne</span>
          <span className="ai-rule" />
        </div>
        <h1 className="ai-page-h1">Des projets livrés, en ligne, <span className="ai-u">qui tournent.</span></h1>
        <p className="ai-page-lead">
          Pas des maquettes de démonstration : des produits que j'ai <b>imaginés, développés et mis en ligne
          de bout en bout</b>. Chacun est présenté par ce qu'il apporte — la technique vient après.
        </p>
      </header>

      {/* 01 — Screener Small Caps */}
      <section className="ai-proj ai-reveal">
        <div className="ai-proj-media">
          <span className="ai-cornermark tl" /><span className="ai-cornermark br" />
          <svg viewBox="0 0 220 140" role="img" aria-label="Courbe de score financier montant, sur une grille de plan.">
            <g stroke="var(--ai-pencil)" strokeWidth="1">
              <line x1="24" y1="20" x2="24" y2="116" /><line x1="24" y1="116" x2="200" y2="116" />
              <line x1="24" y1="86" x2="200" y2="86" /><line x1="24" y1="56" x2="200" y2="56" />
            </g>
            <polyline points="24,104 52,88 80,94 108,60 136,68 164,36 196,26"
                      fill="none" stroke="var(--ai-outremer)" strokeWidth="1.6" />
            <circle cx="164" cy="36" r="3" fill="var(--ai-outremer)" />
            <text className="pl-anb" x="128" y="22">SCORE IA ↑</text>
          </svg>
        </div>
        <div className="ai-proj-body">
          <div className="ai-idx">PL.04 / 01 — Micro-SaaS financier</div>
          <h2>Screener Small Caps</h2>
          <p>
            Un logiciel d'analyse financière complet, <b>imaginé et développé seul</b>, de la base de données
            jusqu'au paiement. Il note des centaines de petites valeurs cotées grâce à un modèle d'intelligence
            artificielle, pour aider un investisseur à repérer les plus prometteuses.
          </p>
          <ul className="ai-points">
            <li>Conçu de A à Z : données, algorithme, interface, facturation</li>
            <li>Un modèle de machine learning (XGBoost) qui attribue un score à chaque valeur</li>
            <li>Abonnements mensuels en ligne — le produit encaisse tout seul</li>
            <li>En production, ouvert au public aujourd'hui</li>
          </ul>
          <div className="ai-stack"><span>Python</span><span>Machine Learning</span><span>XGBoost</span><span>Abonnements</span></div>
          <div className="ai-live">● <a href="https://screener-smallcaps.fr" target="_blank" rel="noopener noreferrer">En ligne — screener-smallcaps.fr</a></div>
        </div>
      </section>

      {/* 02 — Analytics Etsy */}
      <section className="ai-proj rev ai-reveal">
        <div className="ai-proj-media">
          <span className="ai-cornermark tl" /><span className="ai-cornermark br" />
          <svg viewBox="0 0 220 140" role="img" aria-label="Histogramme de ventes sur une grille de plan.">
            <g stroke="var(--ai-pencil)" strokeWidth="1"><line x1="24" y1="20" x2="24" y2="116" /><line x1="24" y1="116" x2="200" y2="116" /></g>
            <g stroke="var(--ai-outremer)" strokeWidth="1.4" fill="none">
              <rect x="34" y="72" width="22" height="44" /><rect x="66" y="48" width="22" height="68" />
              <rect x="98" y="84" width="22" height="32" /><rect x="130" y="36" width="22" height="80" fill="var(--ai-outremer)" />
              <rect x="162" y="60" width="22" height="56" />
            </g>
          </svg>
        </div>
        <div className="ai-proj-body">
          <div className="ai-idx">PL.04 / 02 — Tableau de bord</div>
          <h2>Analytics pour boutiques Etsy</h2>
          <p>
            Un tableau de bord qui transforme les <b>données de vente brutes</b> d'une boutique en décisions
            claires : ce qui se vend, quand, et ce qu'il faut mettre en avant — lisible par un vendeur qui
            n'est pas technicien.
          </p>
          <ul className="ai-points">
            <li>Récupération automatique des données via l'API de la plateforme</li>
            <li>Indicateurs simples, pensés pour décider vite</li>
            <li>Architecture propre : back-end séparé du front-end</li>
          </ul>
          <div className="ai-stack"><span>Python</span><span>API</span><span>Data</span><span>Dashboard</span></div>
          <div className="ai-live">● Étude de cas — sur demande</div>
        </div>
      </section>

      {/* 03 — Pomodoro */}
      <section className="ai-proj ai-reveal">
        <div className="ai-proj-media">
          <span className="ai-cornermark tl" /><span className="ai-cornermark br" />
          <svg viewBox="0 0 220 140" role="img" aria-label="Horloge stylisée en trait de plan.">
            <circle cx="110" cy="70" r="42" fill="none" stroke="var(--ai-outremer)" strokeWidth="1.6" />
            <line x1="110" y1="70" x2="110" y2="40" stroke="var(--ai-outremer)" strokeWidth="1.6" />
            <line x1="110" y1="70" x2="134" y2="70" stroke="var(--ai-outremer)" strokeWidth="1.6" />
            <circle cx="110" cy="70" r="3" fill="var(--ai-outremer)" />
            <g stroke="var(--ai-pencil)" strokeWidth="1">
              <line x1="110" y1="24" x2="110" y2="30" /><line x1="110" y1="110" x2="110" y2="116" />
              <line x1="64" y1="70" x2="70" y2="70" /><line x1="150" y1="70" x2="156" y2="70" />
            </g>
          </svg>
        </div>
        <div className="ai-proj-body">
          <div className="ai-idx">PL.04 / 03 — Application web</div>
          <h2>Application Pomodoro</h2>
          <p>
            Une application web soignée, avec un <b>espace personnel par utilisateur</b>, pensée pour un
            usage quotidien. C'est aussi la base technique sur laquelle ce site est construit.
          </p>
          <ul className="ai-points">
            <li>Interface moderne et responsive, du mobile au grand écran</li>
            <li>Planning personnalisé, accessible par un lien unique</li>
            <li>Front-end React / Vite / Tailwind</li>
          </ul>
          <div className="ai-stack"><span>React</span><span>Vite</span><span>Tailwind</span></div>
          <div className="ai-live">● <Link to="/pomodoro">Voir la page</Link></div>
        </div>
      </section>

      {/* Autres travaux */}
      <section className="ai-section ai-reveal">
        <div className="ai-sec-head">
          <span className="ai-sec-ref">PL.04 / R — En réserve</span>
          <h2 className="ai-sec-title">D'autres travaux, selon le besoin.</h2>
        </div>
        <p className="ai-sec-lead">
          Des projets plus courts, ou réalisés en formation, qui montrent l'étendue du terrain couvert —
          du calcul réglementaire à la petite application métier.
        </p>
        <div className="ai-grid-3">
          <div className="ai-card">
            <div className="ai-idx">Calcul · Conformité</div>
            <h3>CryptoTax</h3>
            <p>Un calculateur d'imposition sur les cryptomonnaies : des calculs complexes et une logique réglementaire, rendus fiables et automatiques.</p>
            <div className="ai-stack"><span>Python</span><span>Calcul</span></div>
          </div>
          <div className="ai-card">
            <div className="ai-idx">Mini-app · Métier</div>
            <h3>Suivi sportif</h3>
            <p>Une petite application de suivi d'entraînement : l'exemple type d'un outil métier simple, taillé pour un usage précis.</p>
            <div className="ai-stack"><span>Web</span><span>Suivi</span></div>
          </div>
          <div className="ai-card">
            <div className="ai-idx">Formation · Data &amp; IA</div>
            <h3>Projets data &amp; IA</h3>
            <p>Plusieurs projets réalisés en formation — science des données, modèles prédictifs, applications. Détails sur demande.</p>
            <div className="ai-stack"><span>Data</span><span>IA</span><span>Notebooks</span></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ai-section ai-reveal" style={{ paddingBottom: 8 }}>
        <div className="ai-cta-band">
          <h2>Un outil comme ça, pour votre commerce ?</h2>
          <div className="ai-cta-row">
            <a className="ai-btn ai-btn-primary" href="/#contact">Réserver un appel de 15 min →</a>
            <Link className="ai-btn ai-btn-ghost" to="/apropos">Qui je suis</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RealisationsPage;
