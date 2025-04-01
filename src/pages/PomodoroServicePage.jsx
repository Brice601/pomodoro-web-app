// src/pages/PomodoroServicePage.jsx
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FAQItem from '../components/FAQItem';
import VideoPlayer from '../components/VideoPlayer';
import CouponCode from '../components/CouponCode';
import { trackDownloadTemplate, trackPurchaseAttempt, trackFileUpload, trackCouponUsage } from '../utils/analyticsUtils';

const PomodoroServicePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // États pour le formulaire
  const [csvFile, setCsvFile] = useState(null);
  const [email, setEmail] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // État pour le système de coupon
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  
  // Fonction pour gérer l'upload du fichier CSV
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.endsWith('.csv')) {
        setCsvFile(file);
        setFormErrors(prev => ({ ...prev, file: '' }));
        
        // Suivi de l'événement
        trackFileUpload();
      } else {
        setCsvFile(null);
        setFormErrors(prev => ({ ...prev, file: 'Veuillez sélectionner un fichier CSV valide' }));
      }
    }
  };
  
  // Fonction pour télécharger le modèle
  const downloadTemplate = () => {
    // Suivi de l'événement
    trackDownloadTemplate();

    const link = document.createElement('a');
    link.href = '/modele-HTML-pomodoro.html';
    link.download = 'modele-pomodoro.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Fonction pour valider le formulaire
  const validateForm = () => {
    const errors = {};
    
    if (!csvFile) {
      errors.file = 'Veuillez téléverser votre fichier CSV';
    }
    
    if (!email.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'L\'email est invalide';
    }
    
    if (!agreeTerms) {
      errors.agreeTerms = 'Vous devez accepter les conditions générales';
    }
    
    return errors;
  };
  // Fonction pour gérer l'application d'un coupon
  const handleCouponApplied = (couponInfo) => {
    setAppliedCoupon(couponInfo);
    // Suivi de l'événement d'application de coupon
    trackCouponUsage(couponInfo.code);
  };
  // Comparaison avec d'autres solutions
  const comparisons = [
    {
      feature: "Configuration",
      pomodoro: "Une seule fois pour toute la journée",
      others: "Réglage manuel à chaque session"
    },
    {
      feature: "Planning personnalisé",
      pomodoro: "Adapté à votre rythme personnel",
      others: "Durées fixes et standardisées"
    },
    {
      feature: "Suivi en temps réel",
      pomodoro: "Visualisation de toute votre journée",
      others: "Uniquement la session en cours"
    },
    {
      feature: "Thèmes d'activités",
      pomodoro: "Regroupement par projets/thèmes",
      others: "Pas de catégorisation par projet"
    },
    {
      feature: "Compatibilité",
      pomodoro: "Tous appareils via navigateur",
      others: "Souvent limité à un seul appareil"
    }
  ];

  // Témoignages clients
  const testimonials = [
    {
      name: "Thomas P.",
      role: "Développeur freelance",
      quote: "Cette application a révolutionné ma façon de travailler. Je programme ma journée le matin et je n'ai plus à penser à régler des minuteurs toute la journée.",
      image: "/images/testimonials/Thomas P..jpg"
    },
    {
      name: "Sophie R.",
      role: "Étudiante en master",
      quote: "J'utilise un planning pour mes journées de révision, et un autre pour mes jours de cours. Le fait de pouvoir personnaliser les durées selon les matières est vraiment pratique.",
      image: "/images/testimonials/Sophie R..jpg"
    },
    {
      name: "Marc T.",
      role: "Chef de projet",
      quote: "Je peux enfin organiser mes journées par thèmes de projets. La visualisation globale de mon emploi du temps m'aide à mieux équilibrer mon temps entre différentes responsabilités.",
      image: "/images/testimonials/Marc T..jpg"
    }
  ];

  // Questions fréquentes
  const faqs = [
    {
      question: "Comment fonctionne l'application Pomodoro personnalisée ?",
      answer: "Notre application vous permet de créer un planning complet pour votre journée selon la méthode Pomodoro. Vous définissez à l'avance vos périodes de travail, vos pauses courtes et longues, ainsi que vos activités. Une fois configurée, l'application vous guide tout au long de la journée avec des notifications sonores et visuelles."
    },
    {
      question: "Puis-je avoir plusieurs plannings différents ?",
      answer: "Oui, vous pouvez commander plusieurs plannings personnalisés pour différents types de journées (par exemple un pour les lundis/mercredis et un autre pour les mardis/jeudis). Chaque planning est accessible via un lien unique que vous pouvez enregistrer dans vos favoris."
    },
    {
      question: "Comment personnaliser mon planning ?",
      answer: "Après votre achat, vous recevrez un modèle HTML à compléter avec vos préférences. Vous pourrez définir les heures de début et de fin de chaque activité, le type (travail, pause courte, pause longue, repas), et les thèmes. Une fois complété, vous exporterez un fichier CSV que vous nous enverrez pour la création de votre application personnalisée."
    },
    {
      question: "L'application fonctionne-t-elle hors ligne ?",
      answer: "L'application nécessite une connexion internet pour le chargement initial, mais peut fonctionner temporairement sans connexion une fois chargée. Nous recommandons cependant une connexion internet pour une expérience optimale."
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Application Pomodoro Personnalisée</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Programmez une fois, suivez toute la journée. Une solution unique pour optimiser votre temps et votre concentration sans interruptions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/pomodoro-demo"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Essayer la démo
            </Link>
            <a
              href="#commander"
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300"
            >
              Commander pour 5€
            </a>
          </div>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <img 
              src="/images/CapturePomodoro1-1200.PNG" 
              alt="Aperçu de l'application Pomodoro" 
              className="rounded-lg shadow-lg w-full h-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/600x400?text=Aperçu+Application+Pomodoro';
              }}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Pourquoi choisir notre application ?</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg">Planifiez une fois, suivez toute la journée</h3>
                  <p className="text-gray-600">Fini les réglages constants de minuteur. Configurez votre journée entière et concentrez-vous sur votre travail.</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg">Plannings multiples pour différentes journées</h3>
                  <p className="text-gray-600">Créez différents plannings selon vos activités (jours de travail, d'étude, de projets personnels).</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg">Organisation par thèmes</h3>
                  <p className="text-gray-600">Regroupez vos activités par projets ou thèmes pour mieux visualiser l'allocation de votre temps.</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg">Accessible sur tous vos appareils</h3>
                  <p className="text-gray-600">Utilisez l'application sur votre ordinateur, tablette ou smartphone via un simple lien.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Comment ça fonctionne</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 text-blue-600 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Commandez votre application</h3>
              <p className="text-gray-600">Achetez votre application personnalisée pour seulement 5€ et téléchargez le modèle HTML.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 text-blue-600 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">Personnalisez votre planning</h3>
              <p className="text-gray-600">Remplissez le modèle HTML avec vos activités, pauses et préférences personnelles.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 text-blue-600 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Recevez votre lien unique</h3>
              <p className="text-gray-600">Sous 24h, recevez par email votre lien d'accès personnel à votre application.</p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Notre solution vs les applications classiques</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-blue-600 text-white text-left">
                  <th className="py-4 px-6 rounded-tl-lg">Fonctionnalité</th>
                  <th className="py-4 px-6">Notre Application Pomodoro</th>
                  <th className="py-4 px-6 rounded-tr-lg">Applications classiques</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-4 px-6 font-medium">{item.feature}</td>
                    <td className="py-4 px-6 text-green-600 flex items-center">
                      <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item.pomodoro}
                    </td>
                    <td className="py-4 px-6 text-gray-500">{item.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Ce que disent nos utilisateurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/48?text=${testimonial.name.charAt(0)}`;
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Questions fréquentes</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer} 
                isOpen={index === 0}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à optimiser votre productivité ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Obtenez votre application Pomodoro personnalisée dès aujourd'hui et commencez à mieux gérer votre temps.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href="#commander"
              className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 text-lg"
            >
              Commander pour 5€
            </a>
            <Link
              to="/pomodoro-demo"
              className="px-8 py-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition duration-300 text-lg"
            >
              Essayer d'abord la démo
            </Link>
          </div>
        </div>

        {/* Video Section */}
        <VideoPlayer />
        
        {/* Checkout Section */}
        <div id="commander" className="py-12 bg-gray-50 rounded-xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Commander votre application Pomodoro</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Instructions et upload section - 3 columns */}
              <div className="lg:col-span-3 space-y-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Comment ça marche</h3>
                  <ol className="space-y-6">
                    <li className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3 text-blue-800 font-bold">1</div>
                      <div>
                        <h4 className="font-medium text-gray-800">Téléchargez et personnalisez le modèle</h4>
                        <p className="text-gray-600 mb-2">Commencez par télécharger notre modèle HTML. Ouvrez-le dans votre navigateur et suivez les instructions pour créer votre planning personnalisé.</p>
                        <button 
                          onClick={downloadTemplate}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                        >
                          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Télécharger le modèle
                        </button>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3 text-blue-800 font-bold">2</div>
                      <div>
                        <h4 className="font-medium text-gray-800">Exportez et téléversez votre fichier CSV</h4>
                        <p className="text-gray-600 mb-2">Une fois votre planning personnalisé, exportez-le en CSV depuis le modèle et téléversez-le ici.</p>
                        <div className="flex items-center">
                          <input
                            type="file"
                            accept=".csv"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            id="csv-upload"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition duration-300 flex items-center"
                          >
                            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            Sélectionner un fichier
                          </button>
                          <span className="ml-4 text-gray-600">
                            {csvFile ? csvFile.name : 'Aucun fichier sélectionné'}
                          </span>
                          {formErrors.file && (
                            <p className="text-red-500 text-sm mt-2">{formErrors.file}</p>
                          )}
                        </div>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3 text-blue-800 font-bold">3</div>
                      <div>
                        <h4 className="font-medium text-gray-800">Renseignez votre email</h4>
                        <p className="text-gray-600 mb-2">Pour recevoir votre lien personnalisé</p>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            formErrors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="votre.email@exemple.com"
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                        )}
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3 text-blue-800 font-bold">4</div>
                      <div>
                        <h4 className="font-medium text-gray-800">Procédez au paiement</h4>
                        <p className="text-gray-600 mb-2">Paiement sécurisé via PayPal (carte bancaire acceptée)</p>
                        <div className="mt-2 p-4 bg-gray-100 rounded-lg flex justify-center">
                          {/* Bouton PayPal intégré */}
                          <div className="paypal-button-container" id="paypal-button">
                            {!appliedCoupon ? (
                              // Bouton PayPal prix normal - existant
                              <form 
                                action="https://www.paypal.com/ncp/payment/VPG26JKQ252CS" 
                                method="post" 
                                target="_blank" 
                                style={{ display: 'inline-grid', justifyItems: 'center', alignContent: 'start', gap: '0.5rem' }}
                                onSubmit={(e) => {
                                  const errors = validateForm();
                                  setFormErrors(errors);
                                  
                                  if (Object.keys(errors).length > 0) {
                                    e.preventDefault();
                                    return false;
                                  }

                                  // Suivi de l'événement d'achat sans coupon
                                  trackPurchaseAttempt({
                                    hasCoupon: false,
                                    finalPrice: 5.00
                                  });
                                  
                                  // Si le formulaire est valide, stocker les informations
                                  sessionStorage.setItem('pomodoro_csv_filename', csvFile ? csvFile.name : '');
                                  sessionStorage.setItem('pomodoro_user_email', email);
                                  
                                  // On stocke aussi le contenu du fichier CSV si disponible
                                  if (csvFile) {
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                      const csvContent = e.target.result;
                                      sessionStorage.setItem('pomodoro_csv_content', csvContent);
                                    };
                                    reader.readAsText(csvFile);
                                  }
                                  
                                  return true;
                                }}
                              >
                                <input 
                                  style={{ 
                                    textAlign: 'center', 
                                    border: 'none', 
                                    borderRadius: '0.25rem', 
                                    minWidth: '11.625rem', 
                                    padding: '0 2rem', 
                                    height: '2.625rem', 
                                    fontWeight: 'bold', 
                                    backgroundColor: '#FFD140', 
                                    color: '#000000', 
                                    fontFamily: '"Helvetica Neue",Arial,sans-serif', 
                                    fontSize: '1rem', 
                                    lineHeight: '1.25rem', 
                                    cursor: 'pointer',
                                    width: '100%'
                                  }} 
                                  type="submit" 
                                  value="Acheter 5,00 €" 
                                  disabled={isSubmitting}
                                />
                                <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="cards" />
                                <section>
                                  Optimisé par <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" alt="paypal" style={{ height: '0.875rem', verticalAlign: 'middle' }}/>
                                </section>
                              </form>
                            ) : (
                              // Bouton PayPal prix réduit
                              <form 
                                action="https://www.paypal.com/ncp/payment/M56RGEQS8U4WJ" 
                                method="post" 
                                target="_blank" 
                                style={{ display: 'inline-grid', justifyItems: 'center', alignContent: 'start', gap: '0.5rem' }}
                                onSubmit={(e) => {
                                  const errors = validateForm();
                                  setFormErrors(errors);
                                  
                                  if (Object.keys(errors).length > 0) {
                                    e.preventDefault();
                                    return false;
                                  }

                                  // Suivi de l'événement d'achat avec coupon
                                  trackPurchaseAttempt({
                                    hasCoupon: true,
                                    couponCode: appliedCoupon.code,
                                    discount: appliedCoupon.discount,
                                    finalPrice: 5 - (5 * appliedCoupon.discount) / 100
                                  });
                                  
                                  // Si le formulaire est valide, stocker les informations
                                  sessionStorage.setItem('pomodoro_csv_filename', csvFile ? csvFile.name : '');
                                  sessionStorage.setItem('pomodoro_user_email', email);
                                  sessionStorage.setItem('pomodoro_coupon_code', appliedCoupon.code);
                                  sessionStorage.setItem('pomodoro_coupon_discount', appliedCoupon.discount.toString());
                                  
                                  // On stocke aussi le contenu du fichier CSV si disponible
                                  if (csvFile) {
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                      const csvContent = e.target.result;
                                      sessionStorage.setItem('pomodoro_csv_content', csvContent);
                                    };
                                    reader.readAsText(csvFile);
                                  }
                                  
                                  return true;
                                }}
                              >
                                <input 
                                  style={{ 
                                    textAlign: 'center', 
                                    border: 'none', 
                                    borderRadius: '0.25rem', 
                                    minWidth: '11.625rem', 
                                    padding: '0 2rem', 
                                    height: '2.625rem', 
                                    fontWeight: 'bold', 
                                    backgroundColor: '#FFD140', 
                                    color: '#000000', 
                                    fontFamily: '"Helvetica Neue",Arial,sans-serif', 
                                    fontSize: '1rem', 
                                    lineHeight: '1.25rem', 
                                    cursor: 'pointer',
                                    width: '100%'
                                  }} 
                                  type="submit" 
                                  value={`Acheter ${(5 - (5 * appliedCoupon.discount) / 100).toFixed(2).replace('.', ',')} €`}
                                  disabled={isSubmitting}
                                />
                                <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="cards" />
                                <section>
                                  Optimisé par <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" alt="paypal" style={{ height: '0.875rem', verticalAlign: 'middle' }}/>
                                </section>
                              </form>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
              
              {/* Summary section - 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">Récapitulatif</h3>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-2">Application Pomodoro Personnalisée</h4>
                    <ul className="text-gray-600 space-y-1 mb-4">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Planning personnalisé</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Notifications sonores</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Compatible tous appareils</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Accès illimité</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Insérer le composant de code de réduction juste avant la bordure */}
                  <CouponCode onApplyCoupon={handleCouponApplied} />

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Prix</span>
                      <span className="text-gray-800">5,00 €</span>
                    </div>
                    
                    {/* Afficher la réduction si un coupon est appliqué */}
                    {appliedCoupon && (
                      <div className="flex justify-between mb-2 text-green-600">
                        <span>Réduction ({appliedCoupon.discount}%)</span>
                        <span>-{((5 * appliedCoupon.discount) / 100).toFixed(2).replace('.', ',')} €</span>
                      </div>
                    )}
                    
                    {/* <div className="flex justify-between mb-2">
                      <span className="text-gray-600">TVA</span>
                      <span className="text-gray-800">0,00 €</span>
                    </div> */}
                    
                    <div className="flex justify-between font-bold text-lg mt-4">
                      <span>Total</span>
                      <span>
                        {appliedCoupon 
                          ? (5 - (5 * appliedCoupon.discount) / 100).toFixed(2).replace('.', ',')
                          : '5,00'} €
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-sm text-yellow-700">
                    <div className="flex">
                      <svg className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p>
                        <strong>Important:</strong> Après votre paiement, vous recevrez votre lien d'accès personnel par email dans un délai maximum de 24 heures.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      checked={agreeTerms}
                      onChange={(e) => {
                        setAgreeTerms(e.target.checked);
                        if (formErrors.agreeTerms) {
                          setFormErrors(prev => ({ ...prev, agreeTerms: '' }));
                        }
                      }}
                      className={`h-5 w-5 mr-2 ${
                        formErrors.agreeTerms ? 'border-red-500' : ''
                      }`}
                    />
                    <label htmlFor="agreeTerms" className="text-gray-700">
                      J'accepte les <Link to="/terms" className="text-blue-600 hover:underline">conditions générales</Link>
                    </label>
                    {formErrors.agreeTerms && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.agreeTerms}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroServicePage;