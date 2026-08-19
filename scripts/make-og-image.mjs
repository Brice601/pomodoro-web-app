// scripts/make-og-image.mjs
//
// Génère la carte de partage Open Graph (1200x630) dans public/images/og-architecte-ia.jpg.
// Palette « Encre & Plan » reprise de src/index.css.
//
//   node scripts/make-og-image.mjs
//
// À relancer si le titre, la baseline ou la palette changent.

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, '../public/images/og-architecte-ia.jpg');

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
    width: 1200px; height: 630px;
    background: ${PALETTE.paper};
    background-image:
      linear-gradient(rgba(23,25,30,.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(23,25,30,.045) 1px, transparent 1px);
    background-size: 32px 32px;
    color: ${PALETTE.ink};
    font-family: "Hanken Grotesk", "Segoe UI", system-ui, sans-serif;
    position: relative;
    overflow: hidden;
  }
  /* Cadre de planche */
  .frame {
    position: absolute; inset: 40px;
    border: 1px solid ${PALETTE.pencil};
  }
  /* Repères d'angle */
  .corner { position: absolute; width: 22px; height: 22px; border-color: ${PALETTE.ink}; }
  .corner.tl { top: -1px; left: -1px; border-top: 2px solid; border-left: 2px solid; }
  .corner.br { bottom: -1px; right: -1px; border-bottom: 2px solid; border-right: 2px solid; }

  .content { position: absolute; inset: 40px; padding: 52px 62px; display: flex; flex-direction: column; }

  .eyebrow {
    font-family: "Space Mono", ui-monospace, monospace;
    font-size: 15px; letter-spacing: .18em; text-transform: uppercase;
    color: ${PALETTE.inkSoft};
    display: flex; align-items: center; gap: 14px;
  }
  .eyebrow .tick { color: ${PALETTE.outremer}; }
  .eyebrow .rule { flex: 1; height: 1px; background: ${PALETTE.pencil}; }

  h1 {
    font-family: "Archivo", "Arial Black", Helvetica, sans-serif;
    font-weight: 900; letter-spacing: -.025em; line-height: .98;
    font-size: 64px; margin-top: 38px; max-width: 960px;
  }
  h1 .accent { color: ${PALETTE.outremer}; }

  p.baseline {
    margin-top: 26px; font-size: 24px; line-height: 1.45;
    color: ${PALETTE.inkSoft}; max-width: 800px;
  }

  .footer {
    margin-top: auto; display: flex; align-items: flex-end; justify-content: space-between;
    font-family: "Space Mono", ui-monospace, monospace;
    font-size: 16px; letter-spacing: .12em; text-transform: uppercase;
    color: ${PALETTE.inkSoft};
  }
  .brand { font-family: "Archivo", sans-serif; font-weight: 800; font-size: 25px; letter-spacing: -.01em; color: ${PALETTE.ink}; text-transform: none; }
  .brand .tick { color: ${PALETTE.outremer}; }
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
      <span class="rule"></span>
    </div>

    <h1>Des outils web <span class="accent">sur mesure</span><br />pour les commerces.</h1>

    <p class="baseline">
      Prise de rendez-vous, réservation, devis, assistants IA.
      Maquette avant tout engagement — vous restez propriétaire de votre outil.
    </p>

    <div class="footer">
      <span class="brand">architecte-ia<span class="tick">.</span>fr</span>
      <span>Sans commission</span>
    </div>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch({ headless: 'new' });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  // Les polices Google sont un plus, pas une condition : si le réseau est coupé,
  // on tombe sur les fallbacks déclarés et on génère quand même la carte.
  try {
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 600));
  } catch {
    /* fallbacks système */
  }

  await page.screenshot({ path: OUTPUT, type: 'jpeg', quality: 92 });
  console.log(`Carte Open Graph générée : ${OUTPUT}`);
} finally {
  await browser.close();
}
