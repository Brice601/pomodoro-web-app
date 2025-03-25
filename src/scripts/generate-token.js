/**
 * Script de génération de tokens uniques pour l'application Pomodoro
 * 
 * Ce script :
 * 1. Génère un UUID unique pour chaque client
 * 2. Copie le fichier CSV du client dans le dossier public/schedules/
 * 3. Renomme le fichier avec l'UUID généré
 * 4. Génère un URL unique pour le client
 * 5. Enregistre le suivi des tokens générés dans un fichier JSON
 * 
 * Usage: node generate-token.js <chemin-du-csv> <nom-du-client>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

// Obtenir le répertoire actuel en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Vérifier les arguments
if (process.argv.length < 4) {
  console.error('Usage: node generate-token.js <chemin-du-csv> <nom-du-client>');
  process.exit(1);
}

// Récupérer les arguments
const csvPath = process.argv[2];
const clientName = process.argv[3];

// Vérifier que le fichier CSV existe
if (!fs.existsSync(csvPath)) {
  console.error(`Erreur: Le fichier ${csvPath} n'existe pas.`);
  process.exit(1);
}

// Créer le dossier de destination s'il n'existe pas
const destinationDir = path.join('public', 'schedules');
if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, { recursive: true });
  console.log(`Dossier ${destinationDir} créé.`);
}

// Générer un token unique (UUID)
const token = uuidv4();

// Chemin du fichier de destination
const destinationPath = path.join(destinationDir, `${token}.csv`);

// Copier le fichier
fs.copyFileSync(csvPath, destinationPath);
console.log(`Fichier ${csvPath} copié vers ${destinationPath}`);

// Générer l'URL
const baseURL = 'https://votre-domaine.github.io/pomodoro/';
const clientURL = `${baseURL}?token=${token}`;

// Charger le fichier de suivi s'il existe
let tokenRegistry = {};
const registryPath = 'token-registry.json';
if (fs.existsSync(registryPath)) {
  const registryContent = fs.readFileSync(registryPath, 'utf8');
  tokenRegistry = JSON.parse(registryContent);
}

// Ajouter le nouveau token au registre
const now = new Date();
tokenRegistry[token] = {
  client: clientName,
  originalFile: csvPath,
  generatedAt: now.toISOString(),
  url: clientURL
};

// Sauvegarder le registre
fs.writeFileSync(registryPath, JSON.stringify(tokenRegistry, null, 2), 'utf8');
console.log(`Informations du token enregistrées dans ${registryPath}`);

// Sortie du résultat
console.log('\n========== Lien client généré ==========');
console.log(`Client: ${clientName}`);
console.log(`Token: ${token}`);
console.log(`URL: ${clientURL}`);
console.log('========================================\n');

// Générer un e-mail prêt à envoyer
const emailTemplate = `Bonjour,

Voici votre lien personnalisé pour accéder à votre application Pomodoro :
${clientURL}

Ce lien est unique et vous permet d'accéder à votre planning personnalisé.
Il vous suffit de cliquer sur ce lien pour lancer l'application dans votre navigateur.

Bonne utilisation !

Cordialement,
[Votre nom]`;

console.log('Modèle d\'e-mail à envoyer au client :');
console.log('----------------------------------------');
console.log(emailTemplate);
console.log('----------------------------------------');