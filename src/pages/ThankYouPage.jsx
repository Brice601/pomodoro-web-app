// src/pages/ThankYouPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
  const [csvContent, setCsvContent] = useState(null);
  const [csvFilename, setCsvFilename] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  
  // Générer un numéro de commande fictif
  const orderNumber = `POM-${Math.floor(100000 + Math.random() * 900000)}`;
  
  useEffect(() => {
    // Récupérer les données stockées
    const storedCsvContent = sessionStorage.getItem('pomodoro_csv_content');
    const storedCsvFilename = sessionStorage.getItem('pomodoro_csv_filename');
    const storedEmail = sessionStorage.getItem('pomodoro_user_email');
    
    if (storedCsvContent) setCsvContent(storedCsvContent);
    if (storedCsvFilename) setCsvFilename(storedCsvFilename);
    if (storedEmail) setUserEmail(storedEmail);
    
    // Nettoyer le sessionStorage après utilisation
    return () => {
      sessionStorage.removeItem('pomodoro_csv_content');
      sessionStorage.removeItem('pomodoro_csv_filename');
      sessionStorage.removeItem('pomodoro_user_email');
    };
  }, []);
  
  // Fonction pour envoyer l'email avec le fichier CSV
  const sendEmailWithCSV = () => {
    // Créer l'URL mailto avec toutes les informations
    const subject = `Commande Pomodoro - ${orderNumber}`;
    const body = `Bonjour,\n\nVoici mon fichier CSV pour la création de mon application Pomodoro personnalisée.\n\nNuméro de commande: ${orderNumber}\nEmail: ${userEmail}\n\nCordialement`;
    
    // Créer un élément <a> pour le téléchargement du CSV
    const element = document.createElement('a');
    const file = new Blob([csvContent], {type: 'text/csv'});
    element.href = URL.createObjectURL(file);
    element.download = csvFilename || 'pomodoro_planning.csv';
    document.body.appendChild(element);
    element.click();
    
    // Ouvrir le client email
    window.location.href = `mailto:brice@architecte-ia.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setEmailSent(true);
  };
  
  // Fonction pour copier les instructions dans le presse-papier
  const copyInstructions = () => {
    const instructions = `
Objet: Commande Pomodoro - ${orderNumber}

Bonjour,

Voici mon fichier CSV pour la création de mon application Pomodoro personnalisée.

Numéro de commande: ${orderNumber}
Email: ${userEmail}

Cordialement
`;
    
    navigator.clipboard.writeText(instructions).then(() => {
      alert("Instructions copiées dans le presse-papier!");
    }).catch(err => {
      console.error('Impossible de copier dans le presse-papier: ', err);
    });
  };
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-2 text-gray-800">Merci pour votre commande !</h1>
              <p className="text-gray-600">
                Votre commande a été enregistrée avec succès.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Numéro de commande:</span> {orderNumber}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Montant:</span> 5,00 €
              </p>
            </div>
            
            {/* Section pour l'envoi du fichier CSV */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 text-left">
              <div className="flex items-center mb-3">
                <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-lg font-semibold text-blue-800">
                  Dernière étape : envoi de votre fichier
                </h2>
              </div>
              <p className="text-blue-700 mb-4">
                Pour finaliser votre commande, veuillez envoyer votre fichier CSV par email afin que nous puissions créer votre application Pomodoro personnalisée.
              </p>
              
              {csvContent && !emailSent ? (
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <button
                    onClick={sendEmailWithCSV}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Télécharger et envoyer mon fichier
                  </button>
                  <span className="text-sm text-blue-600">
                    Cela téléchargera votre fichier et ouvrira votre client email
                  </span>
                </div>
              ) : emailSent ? (
                <div className="flex items-center bg-green-50 p-3 rounded-lg border border-green-200 mb-4">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-700">
                    Fichier téléchargé avec succès. N'oubliez pas d'envoyer l'email avec votre fichier joint !
                  </p>
                </div>
              ) : null}
              
              <div className="border-t border-blue-200 pt-4">
                <p className="text-blue-700 font-medium mb-2">
                  Veuillez suivre ces étapes pour nous envoyer votre fichier :
                </p>
                <ol className="text-blue-700 list-decimal pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Envoyez un email</span> à <span className="font-medium">brice@architecte-ia.fr</span>
                  </li>
                  <li>
                    <span className="font-medium">Indiquez comme objet</span> : "Commande Pomodoro - {orderNumber}"
                  </li>
                  {csvContent ? (
                    <li>
                      <span className="font-medium">Joignez le fichier CSV</span> que vous venez de télécharger (stocké habituellement dans le dossier "Téléchargements")
                    </li>
                  ) : (
                    <li>
                      <span className="font-medium">Joignez votre fichier CSV</span> avec votre planning personnalisé
                    </li>
                  )}
                  <li>
                    <span className="font-medium">Précisez votre email</span> : {userEmail || "votre adresse email"}
                  </li>
                </ol>
                
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <button
                    onClick={copyInstructions}
                    className="text-sm text-blue-600 hover:text-blue-800 underline flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copier ces instructions
                  </button>
                  
                  <span className="text-sm text-blue-600">ou</span>
                  
                  <a 
                    href={`mailto:brice@architecte-ia.fr?subject=${encodeURIComponent(`Commande Pomodoro - ${orderNumber}`)}&body=${encodeURIComponent(`Bonjour,\n\nVoici mon fichier CSV pour la création de mon application Pomodoro personnalisée.\n\nNuméro de commande: ${orderNumber}\nEmail: ${userEmail || "votre adresse email"}\n\nN'oubliez pas de joindre votre fichier CSV.\n\nCordialement`)}`}
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Ouvrir votre client email
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mb-8 mt-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Voici ce qui va se passer maintenant</h2>
              <div className="text-left space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3 text-blue-800 font-bold">
                    1
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Un email de confirmation vient d'être envoyé par PayPal à l'adresse que vous avez fournie. 
                      Cet email contient votre reçu d'achat.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3 text-blue-800 font-bold">
                    2
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Notre équipe va maintenant traiter votre fichier CSV et générer une URL unique 
                      pour accéder à votre application Pomodoro personnalisée.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3 text-blue-800 font-bold">
                    3
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Vous recevrez dans un délai maximum de 24 heures un second email 
                      contenant votre lien personnel pour accéder à votre application Pomodoro.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-sm text-blue-700 text-left">
              <div className="flex">
                <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold mb-1">Conseils pour utiliser votre application :</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Conservez votre lien d'accès personnel dans vos favoris</li>
                    <li>L'application fonctionne sur tous les appareils (ordinateur, tablette, smartphone)</li>
                    <li>Activez les notifications sonores pour une meilleure expérience</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Retour à l'accueil
              </Link>
              <a
                href="mailto:contact@architecte-ia.fr"
                className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Contacter le support
              </a>
            </div>
          </div>
          
          {/* Section d'évaluation facultative */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Comment avez-vous trouvé votre expérience d'achat ?</h2>
            <div className="flex justify-center space-x-4 mb-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-yellow-400 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {rating}
                </button>
              ))}
            </div>
            <p className="text-gray-600 text-sm">
              Votre feedback nous aide à améliorer notre service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;