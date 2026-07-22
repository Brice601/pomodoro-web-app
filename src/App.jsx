// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PomodoroDemo from './pages/PomodoroDemo';
import ThankYouPage from './pages/ThankYouPage';
import PomodoroApp from './components/PomodoroApp';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import PomodoroServicePage from './pages/PomodoroServicePage';
import GoogleAnalytics from './components/GoogleAnalytics';
import './App.css';

// Composant wrapper pour détecter le token dans l'URL
const AppContent = () => {
  const location = useLocation();
  const hasToken = new URLSearchParams(location.search).has('token');
  
  // Si un token est détecté dans l'URL, afficher directement PomodoroApp
  if (hasToken) {
    return <PomodoroApp />;
  }
  
  // La home (nouvelle vitrine) s'affiche pleine largeur ; les autres pages
  // conservent leur conteneur historique pour ne pas casser leur mise en page.
  const Contained = ({ children }) => (
    <main className="container mx-auto px-4 py-8">{children}</main>
  );

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<main><HomePage /></main>} />
        <Route path="/about" element={<Contained><AboutPage /></Contained>} />
        <Route path="/pomodoro-demo" element={<Contained><PomodoroDemo /></Contained>} />
        <Route path="/pomodoro" element={<Contained><PomodoroServicePage /></Contained>} />
        <Route path="/thank-you" element={<Contained><ThankYouPage /></Contained>} />
        <Route path="/terms" element={<Contained><TermsPage /></Contained>} />
        <Route path="/privacy" element={<Contained><PrivacyPage /></Contained>} />
        {/* Rediriger /services vers la page d'accueil */}
        <Route path="/services" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App min-h-screen">
        <GoogleAnalytics />
        <Routes>
          <Route path="*" element={<AppContent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;