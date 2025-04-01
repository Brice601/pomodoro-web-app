import React, { useState } from 'react';

const VideoPlayer = ({ videoId = "YOUR_YOUTUBE_VIDEO_ID", title = "Comment créer et utiliser votre planning Pomodoro personnalisé" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  
  // Thumbnail générée à partir de l'ID YouTube
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  const handlePlayClick = () => {
    setConsentGiven(true);
    setIsPlaying(true);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto my-8 rounded-xl overflow-hidden shadow-lg">
      {!consentGiven ? (
        // Affichage de la vignette avec bouton de lecture
        <div className="relative">
          <img 
            src={thumbnailUrl} 
            alt={title}
            className="w-full h-auto object-cover"
            onError={(e) => {
              // Fallback vers une miniature de résolution inférieure si maxresdefault n'existe pas
              e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <button
              onClick={handlePlayClick}
              className="w-20 h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition duration-300 transform hover:scale-110"
              aria-label="Lire la vidéo"
            >
              <svg 
                className="w-8 h-8 ml-1" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-white text-lg md:text-xl font-bold">{title}</h3>
            <p className="text-gray-200 text-sm mt-1">Cliquez pour regarder la démonstration</p>
          </div>
        </div>
      ) : (
        // Iframe YouTube une fois le consentement donné
        <div className="relative pb-16:9">
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      
      {/* Légende et appel à l'action */}
      <div className="p-4 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm mb-2">
              Découvrez comment utiliser notre application Pomodoro et comment elle peut révolutionner votre productivité.
            </p>
          </div>
          <a 
            href="/pomodoro" 
            className="mt-3 sm:mt-0 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition duration-300 inline-flex items-center"
          >
            Obtenir mon planning
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;