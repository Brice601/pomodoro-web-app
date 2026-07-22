// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const close = () => setIsMenuOpen(false);

  return (
    <header className="ai-header">
      <div className="ai-wrap">
        <div className="ai-head-row">
          <Link to="/" className="ai-brandwrap" onClick={close}>
            <span className="ai-brand"><span className="ai-tick">⏗</span> ARCHITECTE&nbsp;IA</span>
            <span className="ai-tag ai-mono">Applications web · data · IA</span>
          </Link>

          {/* Desktop */}
          <nav className="ai-nav">
            <a href="/#outils">Ce que je construis</a>
            <a href="/#realisations">Réalisations</a>
            <Link to="/about">À propos</Link>
            <a className="ai-cta-link" href="/#contact">Contact →</a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="ai-burger"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {isMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`ai-mobile${isMenuOpen ? ' open' : ''}`}>
          <a href="/#outils" onClick={close}>Ce que je construis</a>
          <a href="/#realisations" onClick={close}>Réalisations</a>
          <Link to="/about" onClick={close}>À propos</Link>
          <a href="/#contact" onClick={close}>Contact →</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
