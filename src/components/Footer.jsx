// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="ai-foot">
      <div className="ai-wrap">
        <div className="ai-titleblock">
          <div className="ai-tb">
            <div className="ai-mono">Projet</div>
            <div className="ai-v">ARCHITECTE IA — WEB · DATA · IA</div>
          </div>
          <div className="ai-tb">
            <div className="ai-mono">Échelle</div>
            <div className="ai-v">1:1</div>
          </div>
          <div className="ai-tb">
            <div className="ai-mono">Zone</div>
            <div className="ai-v">LOIRE (42) + FR</div>
          </div>
          <div className="ai-tb">
            <div className="ai-mono">Dessiné par</div>
            <div className="ai-v">BRICE · ANDRÉZIEUX</div>
          </div>
        </div>

        <div className="ai-foot-links">
          <a href="mailto:brice@architecte-ia.fr">Courriel</a>
          <a href="https://github.com/Brice601" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>

        <div className="ai-foot-legal ai-mono">
          <span>© {new Date().getFullYear()} Architecte IA</span>
          <span>
            <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Confidentialité</Link>
            {' · '}
            <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Mentions légales</Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
