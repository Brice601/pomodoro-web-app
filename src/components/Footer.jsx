// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Architecte IA</h3>
            <p className="text-gray-300">
              Solutions personnalisées pour vous aider à organiser votre temps et maximiser votre productivité.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Accueil</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">À propos</Link>
              </li>
              <li>
                <Link to="/pomodoro-demo" className="text-gray-300 hover:text-white">Démo Pomodoro</Link>
              </li>
              <li>
                <Link to="/pomodoro" className="text-gray-300 hover:text-white">Application Pomodoro</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:brice@architecte-ia.fr" className="text-gray-300 hover:text-white">Courriel</a>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <a href="https://github.com/Brice601" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">GitHub</a>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                </svg>
                <a href="https://linkedin.com/in/brice-de-la-parra-a60a22358/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">LinkedIn</a>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <a href="https://youtube.com/@LaReconversionIA" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">YouTube</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-300">&copy; {new Date().getFullYear()} Architecte IA. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;