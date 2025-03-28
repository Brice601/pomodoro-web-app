// src/utils/csvUtils.js

/**
 * Utilitaires pour charger et traiter un fichier CSV de planning Pomodoro
 */

/**
 * Extrait le token depuis l'URL
 * @returns {string|null} - Le token extrait ou null si non trouvé
 */
export const getTokenFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('token');
};

/**
 * Charge un fichier CSV basé sur le token dans l'URL
 * Si aucun token n'est trouvé, charge un fichier par défaut
 * @returns {Promise<{schedule: Array, userInfo: Object}>} - Le planning et les infos utilisateur
 */
export const loadPomodoroCSVFromToken = async () => {
  try {
    // Extraire le token de l'URL
    const token = getTokenFromURL();
    
    // Déterminer le chemin du fichier
    let filePath;
    if (token) {
      // Si un token est présent, charger le fichier correspondant
      filePath = `./schedules/${token}.csv`;
    } else {
      // Fichier par défaut si aucun token n'est fourni
      filePath = './schedules/demo.csv';
      console.warn('Aucun token trouvé dans l\'URL, chargement du planning de démonstration');
    }
    
    // Charger le fichier
    return await loadPomodoroCSV(filePath);
  } catch (error) {
    console.error("Erreur lors du chargement du CSV:", error);
    throw error;
  }
};

/**
 * Charge un fichier CSV depuis un chemin local
 * @param {string} filePath - Le chemin du fichier CSV
 * @returns {Promise<{schedule: Array, userInfo: Object}>} - Le planning et les infos utilisateur
 */
export const loadPomodoroCSV = async (filePath) => {
  try {
    // Charger le contenu du fichier
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Erreur lors du chargement du fichier : ${response.status}`);
    }
    
    const csvText = await response.text();
    return parseCSVContent(csvText);
  } catch (error) {
    console.error(`Erreur lors du chargement du CSV depuis ${filePath}:`, error);
    throw error;
  }
};

/**
 * Traite le contenu CSV pour extraire le planning et les informations utilisateur
 * @param {string} csvContent - Le contenu du fichier CSV
 * @returns {{schedule: Array, userInfo: Object}} - Le planning et les infos utilisateur
 */
export const parseCSVContent = (csvContent) => {
  const lines = csvContent.split('\n');
  const userInfo = {
    civilite: '',
    nom: '',
    prenom: ''
  };
  
  // Extraire les informations utilisateur des commentaires
  const infoLines = lines.filter(line => line.startsWith('#'));
  infoLines.forEach(line => {
    if (line.includes('Civilite:')) {
      userInfo.civilite = line.split('Civilite:')[1].trim();
    } else if (line.includes('Nom:')) {
      userInfo.nom = line.split('Nom:')[1].trim();
    } else if (line.includes('Prenom:')) {
      userInfo.prenom = line.split('Prenom:')[1].trim();
    }
  });
  
  // Trouver l'index de l'en-tête (après les commentaires)
  let headerIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('start,end,activity,type,theme')) {
      headerIndex = i;
      break;
    }
  }
  
  // Extraire et traiter les données du planning
  const schedule = [];
  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue;
    
    // Gestion des virgules dans les champs entre guillemets
    const parsedLine = parseCSVLine(line);
    if (parsedLine.length >= 4) {
      const [start, end, activity, type, theme = ''] = parsedLine;
      
      // Calculer la durée en minutes
      const durationInMinutes = calculateDurationInMinutes(start, end);
      const duration = formatDuration(durationInMinutes);
      
      schedule.push({
        start,
        end,
        activity,
        type,
        theme,
        duration
      });
    }
  }
  
  return { schedule, userInfo };
};

/**
 * Analyse une ligne CSV en tenant compte des champs entre guillemets
 * @param {string} line - Une ligne du fichier CSV
 * @returns {Array} - Les valeurs extraites
 */
const parseCSVLine = (line) => {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"' && (i === 0 || line[i-1] !== '\\')) {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  // Ajouter le dernier champ
  if (current) {
    result.push(current);
  }
  
  // Nettoyer les guillemets des valeurs
  return result.map(val => {
    if (val.startsWith('"') && val.endsWith('"')) {
      return val.slice(1, -1);
    }
    return val;
  });
};

/**
 * Calcule la durée en minutes entre deux heures
 * @param {string} start - Heure de début au format HH:MM:SS
 * @param {string} end - Heure de fin au format HH:MM:SS
 * @returns {number} - Durée en minutes
 */
const calculateDurationInMinutes = (start, end) => {
  const [startHours, startMinutes] = start.split(':').map(Number);
  const [endHours, endMinutes] = end.split(':').map(Number);
  
  let totalMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
  
  // Gérer le passage au jour suivant
  if (totalMinutes < 0) {
    totalMinutes += 24 * 60;
  }
  
  return totalMinutes;
};

/**
 * Formate une durée en minutes en texte
 * @param {number} minutes - Durée en minutes
 * @returns {string} - Format "XX min"
 */
const formatDuration = (minutes) => {
  return `${minutes} min`;
};