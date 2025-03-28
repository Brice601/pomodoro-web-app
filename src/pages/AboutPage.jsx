// src/pages/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import FAQItem from '../components/FAQItem';

const AboutPage = () => {
  const faqs = [
    {
      question: "Comment fonctionne l'application Pomodoro ?",
      answer: "Notre application Pomodoro vous permet de créer un planning personnalisé basé sur la méthode Pomodoro. Une fois votre planning configuré, vous recevez un lien unique pour y accéder depuis n'importe quel appareil. L'application vous guide tout au long de votre journée, en vous indiquant quand travailler et quand prendre une pause, avec des notifications sonores et visuelles."
    },
    {
      question: "Comment puis-je personnaliser mon planning ?",
      answer: "Après votre achat, nous vous envoyons un formulaire à remplir avec vos préférences (heures de travail, durée des pauses, thèmes d'activité). Nous configurons ensuite votre planning selon vos besoins et vous envoyons un lien d'accès unique."
    },
    {
      question: "L'application fonctionne-t-elle sur mobile ?",
      answer: "Oui, notre application Pomodoro est développée en web responsive. Elle fonctionne sur tous les appareils : ordinateurs, tablettes et smartphones, avec n'importe quel navigateur moderne."
    },
    {
      question: "Que se passe-t-il après mon achat ?",
      answer: "Après votre paiement, vous recevrez un email de confirmation avec un formulaire à remplir pour personnaliser votre planning. Une fois vos préférences reçues, nous créerons votre application personnalisée sous 24-48h et vous enverrons un lien d'accès unique."
    },
    {
      question: "Puis-je avoir plusieurs plannings différents selon les jours de la semaine ?",
      answer: "Oui, c'est tout à fait possible ! Vous pouvez commander plusieurs plannings personnalisés, par exemple un pour le lundi/jeudi/vendredi et un autre pour mardi/mercredi, selon vos disponibilités et besoins spécifiques. Chaque planning sera accessible via un lien unique. Cette solution est idéale pour les personnes ayant des emplois du temps variables dans la semaine."
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* About Section */}
          <section className="mb-16">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">À propos</h1>
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <div className="md:flex items-center">
                <div className="md:w-1/3 mb-6 md:mb-0 md:mr-8">
                  <img 
                    src="/images/profile-picture.jpg" 
                    alt="Photo de profil" 
                    className="rounded-lg w-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x300?text=Photo+de+profil';
                    }}
                  />
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Mon parcours</h2>
                  <p className="text-gray-600 mb-4">
                    Bonjour, je suis passionné par l'optimisation des processus et la gestion du temps. 
                    J'ai développé cette application Pomodoro pour aider les personnes à mieux structurer leur journée 
                    et maximiser leur productivité.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Actuellement en formation pour devenir architecte en intelligence artificielle, je propose des services 
                    accessibles et de qualité pour répondre aux besoins des particuliers et des petites entreprises. 
                    Je crois fermement que les outils technologiques doivent être simples, efficaces et accessibles à tous.
                  </p>
                  <p className="text-gray-600">
                    Ma démarche est basée sur l'écoute et la personnalisation. Chaque service que je propose est adapté 
                    aux besoins spécifiques de mes clients, avec un souci constant de qualité et d'efficacité.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16" id="faq">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Questions fréquentes</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {faqs.map((faq, index) => (
                <FAQItem 
                  key={index} 
                  question={faq.question} 
                  answer={faq.answer} 
                  isOpen={index === 0} // Premier élément ouvert par défaut
                />
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact</h2>
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <p className="text-gray-600 mb-6">
                Vous avez des questions, des suggestions ou des besoins spécifiques ? N'hésitez pas à me contacter
                en m'envoyant un email. Je vous répondrai dans les plus brefs délais.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-800">Envoyez-moi un message</h3>
                  <p className="text-blue-700 mb-4 md:mb-0">
                    Cliquez sur le bouton ci-dessous pour m'envoyer un email directement.
                  </p>
                </div>
                <a
                  href="mailto:brice@architecte-ia.fr?subject=Contact depuis le site web"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  M'envoyer un email
                </a>
              </div>
              
              {/* Informations de contact supplémentaires */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Email</h3>
                  <a href="mailto:brice@architecte-ia.fr" className="text-blue-600 hover:underline flex items-center">
                    <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    brice@architecte-ia.fr
                  </a>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Réseaux sociaux</h3>
                  <div className="space-y-2">
                    <a href="https://linkedin.com/in/brice-de-la-parra-a60a22358/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                      <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                      </svg>
                      LinkedIn
                    </a>
                    <a href="https://github.com/Brice601" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                      <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      GitHub
                    </a>
                    <a href="https://youtube.com/@LaReconversionIA" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                      <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      YouTube
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;