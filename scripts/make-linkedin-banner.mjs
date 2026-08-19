// scripts/make-linkedin-banner.mjs
//
// Génère la bannière de profil LinkedIn (1584x396) dans public/images/linkedin-banner.jpg.
// Palette « Encre & Plan », cohérente avec la carte Open Graph et le site.
//
//   node scripts/make-linkedin-banner.mjs
//
// Contraintes de cadrage LinkedIn :
//  - la photo de profil recouvre le coin BAS-GAUCHE sur desktop → cette zone reste vide ;
//  - le mobile rogne fortement les bords gauche et droit → le contenu utile est centré,
//    aucune information ne dépend des ~260 px de chaque extrémité.

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, '../public/images/linkedin-banner.jpg');

const PALETTE = {
  paper: '#ECEAE3',
  ink: '#17191E',
  inkSoft: '#55565b',
  outremer: '#1F35C4',
  pencil: '#C3BFB2',
};

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@800;900&family=Hanken+Grotesk:wght@400;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1584px; height: 396px;
    background: ${PALETTE.paper};
    background-image:
      linear-gradient(rgba(23,25,30,.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(23,25,30,.045) 1px, transparent 1px);
    background-size: 28px 28px;
    color: ${PALETTE.ink};
    font-family: "Hanken Grotesk", "Segoe UI", system-ui, sans-serif;
    position: relative; overflow: hidden;
  }
  .frame { position: absolute; inset: 26px; border: 1px solid ${PALETTE.pencil}; }
  .corner { position: absolute; width: 18px; height: 18px; border-color: ${PALETTE.ink}; }
  .corner.tl { top: -1px; left: -1px; border-top: 2px solid; border-left: 2px solid; }
  .corner.br { bottom: -1px; right: -1px; border-bottom: 2px solid; border-right: 2px solid; }

  /* Contenu centré : survit au rognage mobile, et laisse le coin bas-gauche à l'avatar. */
  .content {
    position: absolute; inset: 26px;
    padding: 46px 300px 40px;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    text-align: center;
  }

  .eyebrow {
    font-family: "Space Mono", ui-monospace, monospace;
    font-size: 13px; letter-spacing: .2em; text-transform: uppercase;
    color: ${PALETTE.inkSoft};
    display: flex; align-items: center; gap: 12px;
  }
  .eyebrow .tick { color: ${PALETTE.outremer}; }

  h1 {
    font-family: "Archivo", "Arial Black", Helvetica, sans-serif;
    font-weight: 900; letter-spacing: -.025em; line-height: 1.02;
    font-size: 52px; margin-top: 20px;
  }
  h1 .accent { color: ${PALETTE.outremer}; }

  .promises {
    margin-top: 24px;
    font-family: "Space Mono", ui-monospace, monospace;
    font-size: 13.5px; letter-spacing: .13em; text-transform: uppercase;
    color: ${PALETTE.inkSoft};
    display: flex; align-items: center; gap: 16px;
  }
  .promises .sep { color: ${PALETTE.outremer}; }
</style>
</head>
<body>
  <div class="frame">
    <span class="corner tl"></span>
    <span class="corner br"></span>
  </div>
  <div class="content">
    <div class="eyebrow">
      <span>Architecte IA</span>
      <span class="tick">&#9670;</span>
      <span>Loire (42) &middot; France à distance</span>
    </div>

    <h1>Je construis les outils<br />qui manquent aux <span class="accent">commerces</span>.</h1>

    <div class="promises">
      <span>Maquette avant engagement</span>
      <span class="sep">&#9670;</span>
      <span>Vous restez propriétaire</span>
      <span class="sep">&#9670;</span>
      <span>Sans commission</span>
    </div>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch({ headless: 'new' });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1584, height: 396, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  try {
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 600));
  } catch {
    /* fallbacks système */
  }
  await page.screenshot({ path: OUTPUT, type: 'jpeg', quality: 92 });
  console.log(`Bannière LinkedIn générée : ${OUTPUT}`);
} finally {
  await browser.close();
}
