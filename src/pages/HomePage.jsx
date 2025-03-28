// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import ServiceCard from '../components/ServiceCard';

const HomePage = () => {
  const features = [
    {
      title: "Planning personnalisé",
      description: "Créez un planning sur mesure adapté à votre rythme et à vos activités quotidiennes.",
      icon: "calendar",
    },
    {
      title: "Suivi en temps réel",
      description: "Visualisez votre progression et recevez des notifications à chaque changement d'activité.",
      icon: "clock",
    },
    {
      title: "Configuration unique",
      description: "Configurez une seule fois votre journée et évitez de régler manuellement chaque session Pomodoro.",
      icon: "lightning",
    },
  ];

  const testimonials = [
    {
      name: "Marie D.",
      role: "Développeuse web",
      content: "Cette application Pomodoro m'a permis de mieux structurer mes journées de travail. Je suis plus productive et moins stressée !",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Thomas M.",
      role: "Étudiant en médecine",
      content: "L'application est parfaite pour mes sessions de révision. J'aime particulièrement pouvoir définir différents thèmes pour chaque bloc de travail.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ];
  
  // Services disponibles
  const currentServices = [
    {
      id: 'pomodoro',
      title: 'Application Pomodoro Personnalisée',
      description: 'Un planning quotidien adapté à vos besoins avec la méthode Pomodoro.',
      features: [
        'Planning personnalisé selon vos besoins',
        'Interface intuitive et facile à utiliser',
        'Notifications sonores et visuelles',
        'Suivi de votre progression quotidienne',
        'Compatible avec tous les appareils',
      ],
      price: '5€',
      isAvailable: true,
      image: "/images/CapturePomodoro1-600.PNG",
      link: '/pomodoro',
    }
  ];

  // Services à venir
  const upcomingServices = [
    {
      id: 'python-config',
      title: 'Configuration d\'environnement Python',
      description: 'Installation et configuration de l\'environnement Python, Jupyter et bibliothèques essentielles pour l\'analyse de données.',
      features: [
        'Installation de Python et des bibliothèques nécessaires',
        'Configuration de Jupyter Notebook',
        'Guide personnalisé',
        'Vérification fonctionnelle',
      ],
      price: '50-80€',
      isAvailable: false,
      releaseDate: 'Mai 2025',
      image: '/images/soon.jpg',
    },
    {
      id: 'excel-cleaning',
      title: 'Nettoyage de données Excel/CSV',
      description: 'Nettoyage, restructuration et préparation de fichiers de données pour vos analyses.',
      features: [
        'Nettoyage des données brutes',
        'Restructuration selon vos besoins',
        'Documentation des transformations',
        'Version avant/après pour comparaison',
      ],
      price: '40-70€',
      isAvailable: false,
      releaseDate: 'Juin 2025',
      image: '/images/soon.jpg',
    },
    {
      id: 'excel-automation',
      title: 'Automatisation de tâches Excel',
      description: 'Création de macros ou scripts pour automatiser vos tâches Excel récurrentes.',
      features: [
        'Automatisation de rapports',
        'Macros personnalisées',
        'Fichier Excel fonctionnel',
        'Documentation d\'utilisation',
      ],
      price: '60-100€',
      isAvailable: false,
      releaseDate: 'Août 2025',
      image: '/images/soon.jpg',
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Maximisez votre productivité avec un planning Pomodoro personnalisé
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Une application simple et efficace pour organiser votre journée selon la méthode Pomodoro, 
              adaptée à vos besoins spécifiques.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/pomodoro-demo"
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
              >
                Essayer gratuitement
              </Link>
              <Link
                to="/pomodoro"
                className="px-6 py-3 bg-transparent border-2 border-white font-medium rounded-lg hover:bg-white hover:text-blue-600 transition duration-300"
              >
                Obtenir pour 5€
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <img 
                  src="/images/CapturePomodoro1-600.PNG"
                  alt="Aperçu de l'application Pomodoro" 
                  className="w-full h-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x400?text=Aperçu+Application+Pomodoro';
                  }}
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Une application Pomodoro conçue pour tous vos besoins
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Notre application Pomodoro web vous permet de créer un planning quotidien personnalisé, 
                avec des périodes de travail et de pause adaptées à votre rythme. Plus besoin de régler 
                manuellement chaque session : configurez une fois et suivez votre planning toute la journée.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Planifiez votre journée avec précision</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Gagnez du temps en évitant de reconfigurer chaque session</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Organisez vos tâches par thèmes et priorités</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Visualisez votre progression quotidienne</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Recevez des notifications pour chaque changement d'activité</span>
                </li>
              </ul>
              <Link
                to="/pomodoro"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 inline-block"
              >
                Obtenir mon application
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Fonctionnalités clés
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Notre application Pomodoro dispose de nombreuses fonctionnalités pour vous aider 
              à maximiser votre productivité et mieux gérer votre temps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Une offre simple et accessible
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Profitez d'une application Pomodoro personnalisée à un prix abordable.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-6 text-center">
              <h3 className="text-2xl font-bold">Application Pomodoro Personnalisée</h3>
              <div className="text-5xl font-bold my-6">5€</div>
              <p className="opacity-90">Paiement unique, sans abonnement</p>
            </div>
            <div className="p-6">
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Planning personnalisé selon vos besoins</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Accès illimité à votre planning</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Alertes sonores et visuelles</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Visualisation de votre progression</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Compatible avec tous les appareils</span>
                </li>
              </ul>
              <Link
                to="/pomodoro"
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 text-center block"
              >
                Obtenir mon application
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Ce que nos clients disent
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les témoignages de personnes qui utilisent notre application Pomodoro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Upcoming Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Services à venir</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les nouveaux services que nous développons actuellement. Restez informé en vous inscrivant à notre newsletter.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Custom Service Request */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Besoin d'un service personnalisé ?</h2>
            <p className="text-gray-600 mb-6">
              Vous ne trouvez pas ce que vous cherchez ? Contactez-nous pour discuter de vos besoins spécifiques.
              Nous pouvons développer des solutions sur mesure pour répondre à vos exigences.
            </p>
            <Link 
              to="/about#contact" 
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 inline-block"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à améliorer votre productivité ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Obtenez votre application Pomodoro personnalisée dès aujourd'hui et commencez à mieux gérer votre temps.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/pomodoro"
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
              Obtenir mon application à 5€
            </Link>
            <Link
              to="/pomodoro-demo"
              className="px-6 py-3 bg-transparent border-2 border-white font-medium rounded-lg hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Essayer la démo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;