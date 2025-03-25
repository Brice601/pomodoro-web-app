import React, { useState, useEffect, useRef } from 'react';
import { loadPomodoroCSVFromToken } from '../utils/csvUtils';

const PomodoroApp = () => {
  // État pour stocker l'emploi du temps
  const [schedule, setSchedule] = useState([]);
  
  // État pour stocker les informations de l'utilisateur
  const [userInfo, setUserInfo] = useState({
    civilite: '',
    nom: '',
    prenom: ''
  });

  // Référence pour l'élément audio
  const audioRef = useRef(null);
  
  // État pour stocker l'activité courante
  const [currentActivity, setCurrentActivity] = useState(null);
  
  // État pour stocker le temps restant
  const [timeRemaining, setTimeRemaining] = useState('');
  
  // État pour les notifications sonores
  const [soundEnabled, setSoundEnabled] = useState(true);

  // État pour le volume du son
  const [volume, setVolume] = useState(0.5);
  
  // États pour le contrôle manuel du timer
  const [isRunning, setIsRunning] = useState(true);
  const [completed, setCompleted] = useState([]);

  // État pour suivre la dernière activité terminée
  const [lastCompletedActivity, setLastCompletedActivity] = useState(null);
  
  // État pour le statut du chargement
  const [loadingStatus, setLoadingStatus] = useState({
    isLoading: true,
    error: null
  });

  // Fonction pour charger les données depuis le CSV
  const loadScheduleFromCSV = async () => {
    try {
      setLoadingStatus({ isLoading: true, error: null });
      
      // Utiliser la fonction qui détecte le token dans l'URL
      const { schedule: loadedSchedule, userInfo: loadedUserInfo } = await loadPomodoroCSVFromToken();
      
      // Mettre à jour l'état
      setSchedule(loadedSchedule);
      setUserInfo(loadedUserInfo);
      setLoadingStatus({ isLoading: false, error: null });
      
      console.log('Planning chargé avec succès :', loadedSchedule);
      console.log('Informations utilisateur :', loadedUserInfo);
    } catch (error) {
      console.error('Erreur lors du chargement du planning :', error);
      setLoadingStatus({ 
        isLoading: false, 
        error: 'Impossible de charger le planning. Vérifiez que le fichier CSV associé à votre token est correctement formaté et existe.' 
      });
    }
  };

  // Charger le planning au démarrage de l'application
  useEffect(() => {
    loadScheduleFromCSV();
  }, []);

  // Fonction pour convertir l'heure au format HH:MM:SS en secondes
  const timeToSeconds = (time) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  // Fonction pour convertir des secondes en format HH:MM:SS
  const secondsToTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Fonction pour obtenir l'heure actuelle
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Fonction pour calculer le temps restant
  const calculateRemainingTime = (endTime) => {
    const endSeconds = timeToSeconds(endTime);
    const currentSeconds = timeToSeconds(getCurrentTime());
    return Math.max(0, endSeconds - currentSeconds);
  };

  // Fonction pour obtenir l'activité actuelle
  const getCurrentActivity = () => {
    if (schedule.length === 0) return null;
    
    const currentTime = getCurrentTime();
    const currentTimeInSeconds = timeToSeconds(currentTime);
    
    for (const item of schedule) {
      const startInSeconds = timeToSeconds(item.start);
      const endInSeconds = timeToSeconds(item.end);
      
      if (currentTimeInSeconds >= startInSeconds && currentTimeInSeconds < endInSeconds) {
        return item;
      }
    }
    
    return null;
  };

  // Fonction pour marquer une activité comme terminée
  const markAsCompleted = (index) => {
    if (!completed.includes(index)) {
      setCompleted([...completed, index]);
    }
  };

  // Fonction pour jouer le son
  const playSound = () => {
    if (!soundEnabled) return;
    
    try {
      // Si l'élément audio existe, réinitialisez-le et jouez-le
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = volume;
        
        // Utiliser une promesse pour gérer la lecture audio
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Son joué avec succès');
            })
            .catch(error => {
              console.error('Erreur lors de la lecture du son:', error);
              // Tentative alternative avec un nouvel objet Audio
              const alternativeAudio = new Audio('./sounds/beep-02.mp3');
              alternativeAudio.volume = volume;
              alternativeAudio.play().catch(e => 
                console.error('Échec de la tentative alternative:', e)
              );
            });
        }
      } else {
        console.warn("L'élément audio n'est pas disponible");
      }
    } catch (error) {
      console.error('Exception lors de la lecture du son:', error);
    }
  };

  // Effet pour charger le son lorsque le composant est monté
  useEffect(() => {
    // Tester le chargement du son
    const testAudio = new Audio('./sounds/beep-02.mp3');
    testAudio.addEventListener('canplaythrough', () => {
      console.log('Le son est chargé et prêt à être joué');
    });
    
    testAudio.addEventListener('error', (e) => {
      console.error('Erreur de chargement du son:', e);
    });
    
    return () => {
      testAudio.remove();
    };
  }, []);

  // Effet pour mettre à jour l'activité courante toutes les secondes
  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning && schedule.length > 0) {
        const activity = getCurrentActivity();
        
        // Si l'activité a changé et que l'ancienne s'est terminée
        if (currentActivity && 
            (!activity || activity.start !== currentActivity.start) && 
            lastCompletedActivity !== currentActivity.start) {
          
          // Marquer l'activité comme terminée
          setLastCompletedActivity(currentActivity.start);
          
          // Jouer le son
          playSound();
        }
        
        setCurrentActivity(activity);
        
        if (activity) {
          const remaining = calculateRemainingTime(activity.end);
          setTimeRemaining(secondsToTime(remaining));
          
          // Si l'activité vient de se terminer (juste à zéro)
          if (remaining === 0 && soundEnabled) {
            playSound();
          }
        } else {
          setTimeRemaining('00:00:00');
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRunning, soundEnabled, currentActivity, lastCompletedActivity, schedule]);

  // Calcule l'heure actuelle pour la ligne de progression
  const calculateProgressPosition = () => {
    const currentTime = getCurrentTime();
    const totalDaySeconds = 14 * 3600; // 14 heures de 5h à 19h
    const currentSeconds = timeToSeconds(currentTime) - timeToSeconds('05:00:00');
    return Math.min(100, Math.max(0, (currentSeconds / totalDaySeconds) * 100));
  };

  // Calcule la position de chaque élément dans la timeline
  const calculateItemPosition = (startTime) => {
    const totalDaySeconds = 14 * 3600; // 14 heures de 5h à 19h
    const startSeconds = timeToSeconds(startTime) - timeToSeconds('05:00:00');
    return Math.min(100, Math.max(0, (startSeconds / totalDaySeconds) * 100));
  };

  // Calcule la largeur de chaque élément dans la timeline
  const calculateItemWidth = (startTime, endTime) => {
    const totalDaySeconds = 14 * 3600; // 14 heures de 5h à 19h
    const startSeconds = timeToSeconds(startTime) - timeToSeconds('05:00:00');
    const endSeconds = timeToSeconds(endTime) - timeToSeconds('05:00:00');
    return Math.min(100, Math.max(0, ((endSeconds - startSeconds) / totalDaySeconds) * 100));
  };

  // Génère les marqueurs d'heure pour la timeline
  const generateTimeMarkers = () => {
    const markers = [];
    for (let hour = 5; hour <= 19; hour++) {
      const position = calculateItemPosition(`${hour.toString().padStart(2, '0')}:00:00`);
      markers.push(
        <div 
          key={hour} 
          className="absolute border-l border-gray-300" 
          style={{ left: `${position}%`, height: '100%' }}
        >
          <span className="text-xs text-gray-500 ml-1">{hour}h</span>
        </div>
      );
    }
    return markers;
  };

  // Fonction pour obtenir la couleur de fond en fonction du type d'activité
  const getBackgroundColor = (type, isActive, isCompleted, theme) => {
    if (isCompleted) return 'bg-gray-400';
    
    if (isActive) {
      switch (type) {
        case 'work': return 'bg-blue-500';
        case 'break-short': return 'bg-orange-500';
        case 'break-long': return 'bg-yellow-500';
        case 'break-meal': return 'bg-purple-500';
        case 'sport': return 'bg-green-500';
        default: return 'bg-gray-300';
      }
    } else {
      switch (type) {
        case 'work': return 'bg-blue-300';
        case 'break-short': return 'bg-orange-300';
        case 'break-long': return 'bg-yellow-300';
        case 'break-meal': return 'bg-purple-300';
        case 'sport': return 'bg-green-300';
        default: return 'bg-gray-200';
      }
    }
  };

  // Fonction pour tester le son manuellement
  const testSound = () => {
    playSound();
  };

  // Si le chargement est en cours, afficher un indicateur de chargement
  if (loadingStatus.isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 text-center w-full">
          <h2 className="text-xl font-semibold mb-4">Chargement de votre planning...</h2>
          <div className="animate-pulse flex space-x-4 justify-center">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Si une erreur s'est produite lors du chargement
  if (loadingStatus.error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Erreur de chargement</h2>
          <p>{loadingStatus.error}</p>
          <button 
            onClick={loadScheduleFromCSV}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Message de bienvenue personnalisé */}
      {userInfo.prenom && (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <h1 className="text-2xl font-bold">
            Bonjour {userInfo.civilite ? `${userInfo.civilite} ` : ''}{userInfo.prenom} {userInfo.nom}
          </h1>
          <p className="text-lg">Voici votre planning Pomodoro personnalisé pour aujourd'hui</p>
        </div>
      )}
      
      <h1 className="text-2xl font-bold mb-4">Mon Planning Pomodoro Personnalisé</h1>
      
      {/* Audio Element */}
      <audio ref={audioRef} src="./sounds/beep-02.mp3" preload="auto"></audio>
      
      {/* Légende */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Légende des couleurs</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-300 rounded mr-2"></div>
            <span>Sport</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-300 rounded mr-2"></div>
            <span>Travail</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-orange-300 rounded mr-2"></div>
            <span>Pause courte</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-300 rounded mr-2"></div>
            <span>Pause longue</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-300 rounded mr-2"></div>
            <span>Repas</span>
          </div>
        </div>
        
        {/* Afficher les thèmes de travail uniques */}
        <h3 className="text-lg font-semibold mb-2 mt-4">Thèmes de travail</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {Array.from(new Set(schedule.filter(item => item.theme).map(item => item.theme))).map((theme, index) => {
            const themeItems = schedule.filter(item => item.theme === theme);
            const timeRanges = themeItems.map(item => `${item.start.substring(0, 5)}-${item.end.substring(0, 5)}`).join(', ');
            
            return (
              <div key={index} className="p-2 bg-gray-100 rounded">
                <div className="font-medium">{theme}</div>
                <div className="text-xs">{timeRanges}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Panneau d'activité courante */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Activité en cours</h2>
          <div className="flex items-center">
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`mr-2 p-2 rounded ${soundEnabled ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              title={soundEnabled ? "Désactiver le son" : "Activer le son"}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`p-2 rounded ${isRunning ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
            >
              {isRunning ? '⏸️ Pause' : '▶️ Reprendre'}
            </button>
            <button 
              onClick={testSound} 
              className="ml-2 p-2 rounded bg-gray-200"
              title="Tester le son"
            >
              🔔
            </button>
          </div>
        </div>
        
        {/* Contrôle de volume */}
        <div className="mb-4 flex items-center">
          <span className="mr-2">Volume:</span>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            value={volume} 
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-32"
          />
        </div>
        
        {currentActivity ? (
          <div className={`p-4 rounded-lg ${getBackgroundColor(currentActivity.type, true, false, currentActivity.theme)}`}>
            <div className="text-2xl font-bold mb-2">{currentActivity.activity}</div>
            <div className="text-lg">
              {currentActivity.start.substring(0, 5)} - {currentActivity.end.substring(0, 5)} ({currentActivity.duration})
            </div>
            {currentActivity.theme && (
              <div className="text-lg font-medium mt-1">
                Thème: {currentActivity.theme}
              </div>
            )}
            <div className="text-xl font-semibold mt-2">
              Temps restant: {timeRemaining}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-gray-200">
            <div className="text-xl">Aucune activité programmée en ce moment</div>
          </div>
        )}
      </div>
      
      {/* Timeline */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Timeline de la journée</h2>
        <div className="relative h-16 mb-8">
          {generateTimeMarkers()}
          
          {schedule.map((item, index) => (
            <div
              key={index}
              className={`absolute h-12 rounded-md ${getBackgroundColor(item.type, currentActivity && currentActivity.start === item.start, completed.includes(index), item.theme)}`}
              style={{
                left: `${calculateItemPosition(item.start)}%`,
                width: `${calculateItemWidth(item.start, item.end)}%`
              }}
              title={`${item.activity}${item.theme ? ` - ${item.theme}` : ''} (${item.start.substring(0, 5)} - ${item.end.substring(0, 5)})`}
            >
              {calculateItemWidth(item.start, item.end) > 5 && (
                <span className="text-xs px-1 truncate block">{item.activity}</span>
              )}
            </div>
          ))}
          
          {/* Ligne de progression du temps actuel */}
          <div 
            className="absolute h-16 border-l-2 border-red-600 z-10" 
            style={{ left: `${calculateProgressPosition()}%` }}
          >
            <div className="bg-red-600 text-white text-xs px-1 rounded">
              {getCurrentTime().substring(0, 5)}
            </div>
          </div>
        </div>
      </div>
      
      {/* Liste des activités */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Planning détaillé</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {schedule.map((item, index) => {
            const isActive = currentActivity && currentActivity.start === item.start;
            const isCompleted = completed.includes(index) || (currentActivity && timeToSeconds(item.end) < timeToSeconds(getCurrentTime()));
            
            return (
              <div 
                key={index}
                className={`p-2 rounded flex justify-between items-center ${getBackgroundColor(item.type, isActive, isCompleted, item.theme)}`}
                onClick={() => isCompleted ? null : markAsCompleted(index)}
              >
                <div>
                  <div className="font-semibold">{item.activity}</div>
                  <div className="text-sm">{item.start.substring(0, 5)} - {item.end.substring(0, 5)} ({item.duration})</div>
                  {item.theme && <div className="text-xs font-medium mt-1">Thème: {item.theme}</div>}
                </div>
                {isCompleted && <span>✓</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PomodoroApp;