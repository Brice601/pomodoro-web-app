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
  
  // Sinon, afficher le layout normal avec navbar, contenu et footer
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pomodoro-demo" element={<PomodoroDemo />} />
          <Route path="/pomodoro" element={<PomodoroServicePage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          {/* Rediriger /services vers la page d'accueil */}
          <Route path="/services" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App bg-gray-100 min-h-screen">
        <GoogleAnalytics />
        <Routes>
          <Route path="*" element={<AppContent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;