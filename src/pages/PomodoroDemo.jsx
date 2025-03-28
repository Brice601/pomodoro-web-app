// src/pages/PomodoroDemo.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PomodoroDemo = () => {
  // État pour le timer
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [currentMode, setCurrentMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  
  // État pour le cycle Pomodoro
  const [pomodoroCount, setPomodoroCount] = useState(0);
  
  // Configuration des temps pour chaque mode
  const timeConfig = {
    work: 25,
    shortBreak: 5,
    longBreak: 15
  };
  
  // Réinitialiser le timer lors du changement de mode
  useEffect(() => {
    setMinutes(timeConfig[currentMode]);
    setSeconds(0);
    setIsActive(false);
  }, [currentMode]);
  
  // Gestion du timer
  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer terminé, passer au mode suivant
            clearInterval(interval);
            handleTimerComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);
  
  // Gestion de la fin du timer
  const handleTimerComplete = () => {
    // Jouer un son de notification
    const audio = new Audio('/sounds/beep-02.mp3');
    audio.play().catch(err => console.error('Erreur lors de la lecture du son:', err));
    
    // Mettre à jour le cycle Pomodoro
    if (currentMode === 'work') {
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);
      
      // Après 4 Pomodoros, prendre une pause longue
      if (newCount % 4 === 0) {
        setCurrentMode('longBreak');
      } else {
        setCurrentMode('shortBreak');
      }
    } else {
      // Revenir au mode travail après une pause
      setCurrentMode('work');
    }
  };
  
  // Démarrer ou mettre en pause le timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  // Réinitialiser le timer
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(timeConfig[currentMode]);
    setSeconds(0);
  };
  
  // Changer de mode manuellement
  const changeMode = (mode) => {
    setCurrentMode(mode);
  };
  
  // Formater le temps pour l'affichage (MM:SS)
  const formatTime = () => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Obtenir les infos du mode actuel
  const getModeInfo = () => {
    switch (currentMode) {
      case 'work':
        return {
          name: 'Travail',
          description: 'Concentrez-vous sur votre tâche',
          color: 'bg-blue-500'
        };
      case 'shortBreak':
        return {
          name: 'Pause courte',
          description: 'Prenez une courte pause',
          color: 'bg-green-500'
        };
      case 'longBreak':
        return {
          name: 'Pause longue',
          description: 'Détendez-vous plus longuement',
          color: 'bg-purple-500'
        };
      default:
        return {
          name: 'Travail',
          description: 'Concentrez-vous sur votre tâche',
          color: 'bg-blue-500'
        };
    }
  };

  const modeInfo = getModeInfo();

  // Liste des tâches de démonstration
  const demoTasks = [
    { name: 'Répondre aux emails', completed: pomodoroCount > 0 },
    { name: 'Travailler sur le projet A', completed: pomodoroCount > 1 },
    { name: 'Préparer la présentation', completed: pomodoroCount > 2 },
    { name: 'Réviser le document', completed: false }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Démo de l'Application Pomodoro
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className={`p-6 text-white ${modeInfo.color}`}>
              <h2 className="text-xl font-bold mb-2">{modeInfo.name}</h2>
              <p>{modeInfo.description}</p>
            </div>
            
            <div className="p-8 flex flex-col items-center">
              {/* Timer Display */}
              <div className="text-6xl font-bold mb-8 text-gray-800">
                {formatTime()}
              </div>
              
              {/* Controls */}
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={toggleTimer}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    isActive
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isActive ? 'Pause' : 'Démarrer'}
                </button>
                <button
                  onClick={resetTimer}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                >
                  Réinitialiser
                </button>
              </div>
              
              {/* Mode Selector */}
              <div className="flex space-x-2">
                <button
                  onClick={() => changeMode('work')}
                  className={`px-4 py-2 rounded ${
                    currentMode === 'work'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Travail
                </button>
                <button
                  onClick={() => changeMode('shortBreak')}
                  className={`px-4 py-2 rounded ${
                    currentMode === 'shortBreak'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Pause courte
                </button>
                <button
                  onClick={() => changeMode('longBreak')}
                  className={`px-4 py-2 rounded ${
                    currentMode === 'longBreak'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Pause longue
                </button>
              </div>
            </div>
          </div>
          
          {/* Task List */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Tâches de démonstration</h3>
            <div className="space-y-2">
              {demoTasks.map((task, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="mr-3 h-5 w-5 text-blue-600"
                  />
                  <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-2 text-blue-800">Ceci est une version de démonstration</h3>
            <p className="text-blue-700 mb-4">
              Cette démonstration vous donne un aperçu des fonctionnalités de base de notre application Pomodoro.
              La version complète offre un planning entièrement personnalisé, des statistiques détaillées,
              et bien plus encore.
            </p>
            <Link
              to="/pomodoro"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg inline-block hover:bg-blue-700"
            >
              Obtenir la version complète pour 5€
            </Link>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Planifiez votre journée</h3>
              <p className="text-gray-600">
                La version complète vous permet de planifier votre journée entière avec des blocs de travail
                et des pauses, adaptés à votre rythme personnel.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Organisez par thèmes</h3>
              <p className="text-gray-600">
                Regroupez vos tâches par thèmes ou projets pour mieux visualiser l'allocation de votre temps
                et rester concentré sur vos priorités.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Notifications intelligentes</h3>
              <p className="text-gray-600">
                Recevez des alertes pour chaque changement d'activité. La version complète inclut des sons
                personnalisables et des notifications visuelles.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Accessible partout</h3>
              <p className="text-gray-600">
                Accédez à votre planning personnalisé depuis n'importe quel appareil avec un navigateur web,
                sans installation ni synchronisation nécessaire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroDemo;