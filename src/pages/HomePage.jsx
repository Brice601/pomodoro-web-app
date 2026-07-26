// src/pages/HomePage.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const rootRef = useRef(null);

  // Révélation au scroll (respecte prefers-reduced-motion)
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

  // Calendrier Cal.com (région EU) intégré en inline dans la section Contact.
  // Le loader est chargé dans index.html ; ici on déclenche l'affichage inline.
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.Cal !== 'function') return;
    window.Cal('inline', {
      elementOrSelector: '#cal-inline',
      calLink: 'brice-aia/15min',
      layout: 'month_view',
    });
    window.Cal('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view',
      cssVarsPerTheme: { light: { 'cal-brand': '#1F35C4' } },
    });
  }, []);

  return (
    <div ref={rootRef} className="ai-wrap">
      <h1 className="ai-sr-only">
        Architecte IA — mini-applications web sur mesure pour les commerces de la Loire et de toute la France.
      </h1>

      {/* PL.00 — HERO */}
      <section className="ai-hero">
        <div>
          <div className="ai-eyebrow ai-mono">
            <span>PL.00 — Vitrine</span><span className="ai-dot">◆</span><span>Loire (42) + France à distance</span>
            <span className="ai-rule" />
          </div>
          <p className="ai-h1">Votre commerce mérite mieux qu'une <span className="ai-u">page d'horaires.</span></p>
          <p className="ai-lede">
            Je conçois et je construis des <b>mini-applications web sur mesure</b> — réservation, prise de RDV,
            devis instantané, chatbot. Des outils simples, <b>sans commission</b>, qui travaillent pour vous.
          </p>
          <div className="ai-cta-row">
            <a className="ai-btn ai-btn-primary" href="#contact">Réserver un appel de 15 min →</a>
            <a className="ai-btn ai-btn-ghost" href="#realisations">Voir les réalisations</a>
          </div>
        </div>

        <div className="ai-plate">
          <span className="ai-cornermark tl" /><span className="ai-cornermark br" />
          <svg className="ai-draw" viewBox="0 0 440 400" role="img"
               aria-label="Plan technique d'une mini-application de réservation sur mobile, avec lignes de cote.">
            <line className="pl-dim" x1="150" y1="40" x2="150" y2="360" />
            <line className="pl-dim" x1="146" y1="40" x2="154" y2="40" />
            <line className="pl-dim" x1="146" y1="360" x2="154" y2="360" />
            <text className="pl-an" x="118" y="205" transform="rotate(-90 118 205)">1 écran · 0 friction</text>

            <rect className="pl-fl pl-lnk" x="176" y="40" width="150" height="320" rx="16" />
            <rect className="pl-ln" x="188" y="58" width="126" height="286" rx="6" />
            <rect className="pl-ln" x="188" y="58" width="126" height="34" rx="6" />
            <text className="pl-anb" x="198" y="79">RÉSERVER</text>

            <rect className="pl-ln" x="199" y="104" width="21" height="18" /><rect className="pl-ln" x="223" y="104" width="21" height="18" /><rect className="pl-ln" x="247" y="104" width="21" height="18" /><rect className="pl-ln" x="271" y="104" width="21" height="18" />
            <rect className="pl-ln" x="199" y="126" width="21" height="18" /><rect className="pl-ln" x="223" y="126" width="21" height="18" fill="var(--ai-outremer)" /><rect className="pl-ln" x="247" y="126" width="21" height="18" /><rect className="pl-ln" x="271" y="126" width="21" height="18" />
            <rect className="pl-ln" x="199" y="148" width="21" height="18" /><rect className="pl-ln" x="223" y="148" width="21" height="18" /><rect className="pl-ln" x="247" y="148" width="21" height="18" /><rect className="pl-ln" x="271" y="148" width="21" height="18" />

            <rect className="pl-ln" x="199" y="188" width="45" height="16" rx="3" /><rect className="pl-ln" x="247" y="188" width="45" height="16" rx="3" />
            <rect className="pl-ln" x="199" y="210" width="45" height="16" rx="3" fill="var(--ai-outremer)" /><rect className="pl-ln" x="247" y="210" width="45" height="16" rx="3" />

            <rect x="199" y="300" width="93" height="26" rx="4" fill="var(--ai-outremer)" />
            <text className="pl-an" x="216" y="317" fill="#fff">CONFIRMER</text>

            <line className="pl-dim" x1="326" y1="75" x2="392" y2="75" /><circle cx="326" cy="75" r="2.4" fill="var(--ai-outremer)" /><text className="pl-an" x="342" y="72">Sans</text><text className="pl-an" x="342" y="84">commission</text>
            <line className="pl-dim" x1="326" y1="135" x2="392" y2="135" /><circle cx="326" cy="135" r="2.4" fill="var(--ai-outremer)" /><text className="pl-an" x="356" y="132">Vos</text><text className="pl-an" x="342" y="144">couleurs</text>
            <line className="pl-dim" x1="326" y1="313" x2="392" y2="313" /><circle cx="326" cy="313" r="2.4" fill="var(--ai-outremer)" /><text className="pl-an" x="352" y="310">Livré</text><text className="pl-an" x="342" y="322">rapidement</text>

            <line className="pl-dim" x1="176" y1="378" x2="326" y2="378" /><line className="pl-dim" x1="176" y1="374" x2="176" y2="382" /><line className="pl-dim" x1="326" y1="374" x2="326" y2="382" />
            <text className="pl-an" x="214" y="394">échelle 1:1 — sur mesure</text>
          </svg>
          <p className="ai-plate-cap ai-mono">Aperçu — votre outil, <b>dessiné avant même de signer.</b></p>
        </div>
      </section>

      {/* Bandeau preuve */}
      <div className="ai-cartouche">
        <div className="ai-cell"><div className="ai-mono">Expérience</div><div className="ai-v">15 ans<br /><small>de commerce en ligne</small></div></div>
        <div className="ai-cell"><div className="ai-mono">Déjà en ligne</div><div className="ai-v">Logiciel complet<br /><small>conçu de A à Z</small></div></div>
        <div className="ai-cell"><div className="ai-mono">Sur mesure</div><div className="ai-v">100 %<br /><small>votre besoin</small></div></div>
        <div className="ai-cell"><div className="ai-mono">Commission</div><div className="ai-v">0 %<br /><small>c'est à vous</small></div></div>
      </div>

      {/* PL.01 — CONSTAT */}
      <section className="ai-section ai-reveal">
        <div className="ai-sec-head">
          <span className="ai-sec-ref">PL.01 — Constat</span>
          <h2 className="ai-sec-title">Votre site affiche vos horaires. Et après ?</h2>
        </div>
        <div className="ai-grid-3">
          <div className="ai-card">
            <div className="ai-idx">A —</div>
            <h3>Un site qui informe, mais ne travaille pas</h3>
            <p>Il affiche l'adresse et les horaires. Aucun outil pour réserver, prendre RDV ou demander un devis. Le visiteur repart sans rien faire.</p>
          </div>
          <div className="ai-card">
            <div className="ai-idx">B —</div>
            <h3>Le téléphone qui sonne pour tout</h3>
            <p>Chaque réservation, chaque question, c'est vous qui décrochez — souvent pendant le service. Du temps que vous ne passez pas sur votre métier.</p>
          </div>
          <div className="ai-card">
            <div className="ai-idx">C —</div>
            <h3>Les plateformes qui se servent au passage</h3>
            <p>Réservation, prise de RDV… les grandes plateformes prennent une commission sur ce qui devrait vous revenir entièrement.</p>
          </div>
        </div>
      </section>

      {/* PL.02 — OUVRAGE */}
      <section className="ai-section ai-reveal" id="outils">
        <div className="ai-sec-head">
          <span className="ai-sec-ref">PL.02 — Ouvrage</span>
          <h2 className="ai-sec-title">Je construis l'outil qui manque à votre site.</h2>
        </div>
        <p className="ai-sec-lead">Sur mesure, à vos couleurs, sans commission. Voici les plus demandés — le vôtre sera taillé pour votre métier.</p>
        <div className="ai-grid-4">
          <div className="ai-card">
            <svg className="ai-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /><rect x="7" y="13" width="3" height="3" fill="currentColor" stroke="none" /></svg>
            <h3>Réservation en ligne</h3>
            <p>Vos clients réservent une table, un créneau, 24h/24. Vous récupérez votre téléphone.</p>
          </div>
          <div className="ai-card">
            <svg className="ai-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
            <h3>Prise de RDV</h3>
            <p>Un agenda que vos clients remplissent seuls. Fini les allers-retours pour caler une heure.</p>
          </div>
          <div className="ai-card">
            <svg className="ai-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></svg>
            <h3>Devis instantané</h3>
            <p>Un configurateur qui calcule un prix en direct. Le client repart avec une réponse, pas une attente.</p>
          </div>
          <div className="ai-card">
            <svg className="ai-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 5h16v11H9l-4 4V5z" /><path d="M8 10h.01M12 10h.01M16 10h.01" /></svg>
            <h3>Assistant IA / FAQ</h3>
            <p>Un chatbot qui répond aux questions courantes, jour et nuit, dans le ton de votre maison.</p>
          </div>
        </div>
      </section>

      {/* PL.03 — SUIVI */}
      <section className="ai-section ai-reveal">
        <div className="ai-sec-head">
          <span className="ai-sec-ref">PL.03 — Suivi</span>
          <h2 className="ai-sec-title">Une fois en ligne, je ne disparais pas.</h2>
        </div>
        <p className="ai-sec-lead">Votre outil vit avec votre commerce. L'accompagnement mensuel le garde rapide, visible et à jour — vous n'y pensez plus.</p>
        <div className="ai-grid-3">
          <div className="ai-card">
            <div className="ai-idx">01 — Tenue</div>
            <h3>Hébergement &amp; mises à jour</h3>
            <p>Votre outil reste en ligne, rapide et sécurisé. Les mises à jour, c'est mon affaire, pas la vôtre.</p>
          </div>
          <div className="ai-card">
            <div className="ai-idx">02 — Visibilité</div>
            <h3>Référencement (SEO)</h3>
            <p>On travaille pour que vos clients vous trouvent sur Google quand ils cherchent près de chez vous.</p>
          </div>
          <div className="ai-card">
            <div className="ai-idx">03 — Évolutions</div>
            <h3>IA &amp; nouvelles fonctions</h3>
            <p>Relances automatiques, assistant IA, petites améliorations : votre outil grandit au fil de vos besoins.</p>
          </div>
        </div>
        <p className="ai-note">
          Pas de grille figée : chaque accompagnement est <b>calibré selon votre outil et votre besoin</b>.
          Le tarif se décide ensemble, après un premier échange — sans engagement de votre part.
        </p>
      </section>

      {/* PL.04 — RÉALISATIONS */}
      <section className="ai-section ai-reveal" id="realisations">
        <div className="ai-sec-head">
          <span className="ai-sec-ref">PL.04 — Réalisations</span>
          <h2 className="ai-sec-title">Des projets livrés, en ligne, qui tournent.</h2>
        </div>
        <p className="ai-sec-lead">Pas des maquettes de démonstration : des produits que j'ai conçus, développés et mis en ligne de bout en bout.</p>
        <div className="ai-work">
          <article className="ai-card">
            <div className="ai-thumb">
              <svg viewBox="0 0 200 125" preserveAspectRatio="xMidYMid meet">
                <g stroke="var(--ai-outremer)" strokeWidth="1.4" fill="none">
                  <polyline points="20,95 45,70 70,80 95,45 120,55 145,28 175,20" />
                  <line x1="20" y1="105" x2="180" y2="105" stroke="var(--ai-pencil)" />
                  <line x1="20" y1="20" x2="20" y2="105" stroke="var(--ai-pencil)" />
                </g>
                <circle cx="145" cy="28" r="3" fill="var(--ai-outremer)" />
              </svg>
            </div>
            <div className="ai-idx">Micro-SaaS · B2C</div>
            <h3>Screener Small Caps</h3>
            <p>Un logiciel d'analyse financière complet, avec abonnements et intelligence artificielle. Conçu et déployé de A à Z.</p>
            <div className="ai-stack"><span>Python</span><span>Machine Learning</span><span>Abonnements</span></div>
            <div className="ai-live">● <a href="https://screener-smallcaps.fr" target="_blank" rel="noopener noreferrer">En ligne — screener-smallcaps.fr</a></div>
          </article>

          <article className="ai-card">
            <div className="ai-thumb">
              <svg viewBox="0 0 200 125" preserveAspectRatio="xMidYMid meet">
                <g stroke="var(--ai-outremer)" strokeWidth="1.4" fill="none">
                  <rect x="24" y="60" width="18" height="40" /><rect x="52" y="40" width="18" height="60" /><rect x="80" y="72" width="18" height="28" /><rect x="108" y="30" width="18" height="70" /><rect x="136" y="52" width="18" height="48" />
                  <line x1="20" y1="100" x2="176" y2="100" stroke="var(--ai-pencil)" />
                </g>
              </svg>
            </div>
            <div className="ai-idx">Dashboard · Data</div>
            <h3>Analytics pour boutiques Etsy</h3>
            <p>Un tableau de bord qui transforme des données de vente brutes en décisions claires pour le vendeur.</p>
            <div className="ai-stack"><span>API</span><span>Data</span><span>Dashboard</span></div>
            <div className="ai-live">● Étude de cas</div>
          </article>

          <article className="ai-card">
            <div className="ai-thumb">
              <svg viewBox="0 0 200 125" preserveAspectRatio="xMidYMid meet">
                <g stroke="var(--ai-outremer)" strokeWidth="1.4" fill="none">
                  <circle cx="100" cy="62" r="34" /><path d="M100 62 L100 38" /><path d="M100 62 L118 62" />
                </g>
                <circle cx="100" cy="62" r="3" fill="var(--ai-outremer)" />
              </svg>
            </div>
            <div className="ai-idx">App web · B2C</div>
            <h3>Application Pomodoro</h3>
            <p>Une application web soignée, avec espace personnel par utilisateur et interface moderne.</p>
            <div className="ai-stack"><span>React</span><span>Vite</span><span>Tailwind</span></div>
            <div className="ai-live">● <Link to="/pomodoro">En ligne</Link></div>
          </article>
        </div>
        <div className="ai-cta-row" style={{ marginTop: 28 }}>
          <Link className="ai-btn ai-btn-ghost ai-btn-sm" to="/realisations">Voir toutes les réalisations →</Link>
        </div>
      </section>

      {/* PL.05 — À PROPOS */}
      <section className="ai-section ai-reveal" id="apropos">
        <div className="ai-sec-head">
          <span className="ai-sec-ref">PL.05 — À propos</span>
          <h2 className="ai-sec-title">Derrière Architecte IA.</h2>
        </div>
        <div className="ai-about">
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
          <div>
            <p style={{ marginTop: 0 }}>
              Je suis <b>Brice</b>. Je ne viens pas de l'informatique : j'ai fait tourner ma propre
              <b> boutique en ligne</b> pendant une quinzaine d'années. Le métier de commerçant, je le
              connais de l'intérieur.
            </p>
            <p>
              En cherchant à automatiser ma propre activité, je suis venu au développement puis à l'IA —
              aujourd'hui en <b>fin de formation d'architecte en intelligence artificielle</b>. Je vous parle
              donc en commerçant qui sait construire l'outil qui manque.
            </p>
            <div className="ai-cta-row" style={{ marginTop: 24 }}>
              <Link className="ai-btn ai-btn-ghost ai-btn-sm" to="/apropos">Mon parcours en détail →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* PL.06 — CONTACT */}
      <section className="ai-section ai-reveal" id="contact">
        <div className="ai-sec-head">
          <span className="ai-sec-ref">PL.06 — Contact</span>
        </div>
        <div className="ai-contact">
          <div>
            <p className="ai-title-x">On en parle 15&nbsp;minutes ?</p>
            <p className="ai-sub">
              Choisissez directement un créneau qui vous arrange. Deux ou trois questions rapides au
              moment de réserver me permettent de <b>préparer l'appel</b> — on ne perd pas de temps.
            </p>
            <div className="ai-coord">
              <div>✉︎ &nbsp;Vous préférez écrire ? <a href="mailto:brice@architecte-ia.fr">brice@architecte-ia.fr</a></div>
              <div>⏗ &nbsp;Andrézieux, Loire (42) — &amp; France à distance</div>
            </div>
          </div>

          <div className="ai-fiche">
            <div className="ai-fh"><span className="ai-mono">Réserver un créneau</span><span className="ai-mono">PL.06 / 01</span></div>
            <div className="ai-fb">
              <div id="cal-inline" className="ai-cal" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
