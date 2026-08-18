/* =============================================================================
   AERS CHAUVE — MOTEUR DU PARCOURS GUIDÉ
   Lit les règles de regles.js. Le contenu ne se modifie pas ici.
   ============================================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------------- questions */
  const QUESTIONS = [
    {
      id: "vehicule",
      titre: "Vous voulez conduire quoi ?",
      hint: "On part de là — c'est ce qui détermine tout le reste.",
      opts: [
        { v: "voiture",  l: "Une voiture",            s: "Permis B, conduite accompagnée, boîte automatique…" },
        { v: "moto",     l: "Un deux-roues",          s: "Scooter, 125, moto A2 ou gros cube" },
        { v: "remorque", l: "Une voiture + remorque", s: "Formation B96 ou permis BE" },
        { v: "sanspermis", l: "Une voiture sans permis", s: "Dès 14 ans, sans examen" }
      ]
    },
    {
      id: "age",
      titre: "Quel âge avez-vous ?",
      hint: "L'âge ouvre ou ferme certaines formations, et la plupart des aides.",
      opts: [
        { v: 14, l: "14 ou 15 ans" },
        { v: 16, l: "16 ans" },
        { v: 17, l: "17 ans" },
        { v: 20, l: "18 à 24 ans" },
        { v: 30, l: "25 ans ou plus" }
      ]
    },
    {
      id: "permis",
      titre: "Avez-vous déjà un permis ?",
      hint: "Certaines formations sont des passerelles : elles durent 7 h au lieu de 20.",
      opts: [
        { v: "aucun",  l: "Non, aucun",              s: "C'est un premier permis" },
        { v: "am",     l: "Le permis AM (BSR)" },
        { v: "a1",     l: "Le permis A1 (125)" },
        { v: "b_moins", l: "Le permis B, depuis moins de 2 ans" },
        { v: "b_plus", l: "Le permis B, depuis plus de 2 ans" },
        { v: "a2",     l: "Le permis A2, depuis plus de 2 ans" }
      ]
    },
    {
      id: "boite",
      titre: "Boîte manuelle ou boîte automatique ?",
      hint: "La boîte automatique demande 13 h au lieu de 20 — et reste extensible ensuite.",
      only: p => p.vehicule === "voiture",
      // « possible » sert au compteur : la question peut-elle ENCORE tomber ?
      possible: p => p.vehicule === undefined || p.vehicule === "voiture",
      opts: [
        { v: "manuelle", l: "Boîte manuelle",     s: "Le permis B classique, sans restriction" },
        { v: "auto",     l: "Boîte automatique",  s: "13 h minimum, +7 h plus tard pour la manuelle" },
        { v: "adapte",   l: "J'ai besoin d'un véhicule adapté", s: "Handicap, maladie, équipement spécifique" }
      ]
    },
    {
      id: "rythme",
      titre: "Vous êtes plutôt pressé, ou vous avez le temps ?",
      hint: "C'est la question qui départage le permis classique, la conduite accompagnée et la conduite supervisée.",
      only: p => p.vehicule === "voiture" && p.boite !== "adapte" &&
                 (p.permis === "aucun" || p.permis === "am" || p.permis === "a1"),
      possible: p => (p.vehicule === undefined || p.vehicule === "voiture") && p.boite !== "adapte" &&
                 (p.permis === undefined || p.permis === "aucun" || p.permis === "am" || p.permis === "a1"),
      opts: [
        { v: "vite",       l: "Je veux mon permis vite",              s: "Formation classique" },
        { v: "temps",      l: "J'ai le temps, je veux bien conduire", s: "Conduite accompagnée — 75 % de réussite" },
        { v: "supervisee", l: "J'ai 18 ans et peu d'assurance au volant", s: "Conduite supervisée" },
        { v: "sais-pas",   l: "Je ne sais pas encore",                s: "On vous montre les trois" }
      ]
    },
    {
      id: "situation",
      titre: "Et votre situation, pour les aides ?",
      hint: "Dernière étape. C'est ce qui permet de vous dire à quelles aides vous pouvez prétendre.",
      opts: [
        { v: "lyceen",    l: "Lycéen ou étudiant" },
        { v: "apprenti",  l: "Apprenti" },
        { v: "salarie",   l: "Salarié" },
        { v: "demandeur", l: "En recherche d'emploi" },
        { v: "autre",     l: "Autre situation" }
      ],
      checks: [
        { v: "aura",       l: "Je réside en Auvergne-Rhône-Alpes", s: "Ouvre l'aide régionale de 150 €", def: true },
        { v: "passRegion", l: "J'ai un pass'Région" },
        { v: "engagement", l: "Bénévolat, sapeur-pompier volontaire, JSP ou cadet de la gendarmerie",
          s: "De 200 € à 1 000 € selon le cas" },
        { v: "handicap",   l: "J'ai un handicap reconnu", s: "Ouvre le dossier AGEFIPH" }
      ]
    }
  ];

  /* -------------------------------------------------- choix de la formation */
  function choisir(p) {
    const alt = [];
    let id;

    if (p.vehicule === "sanspermis") {
      id = "AM4";
      if (p.age >= 15) alt.push("B", "AAC");

    } else if (p.vehicule === "moto") {
      if (p.permis === "b_plus")      { id = "SEPT_125"; alt.push("A1", "A2"); }
      else if (p.permis === "a2")     { id = "A";        alt.push("SEPT_125"); }
      else if (p.age >= 18)           { id = "A2";       alt.push(p.permis === "a1" ? "A" : "A1"); }
      else if (p.age >= 16)           { id = "A1";       alt.push("AM2"); }
      else                            { id = "AM2";      alt.push("A1"); }

    } else if (p.vehicule === "remorque") {
      id = "B96"; alt.push("BE");

    } else { /* voiture */
      if (p.boite === "adapte")                          { id = "PMR"; }
      else if (p.permis === "b_moins")                   { id = "POST";  alt.push("NIVEAU", "SEPT_125"); }
      else if (p.permis === "b_plus")                    { id = "NIVEAU"; alt.push("SEPT_125", "B96"); }
      else if (p.boite === "auto")                       { id = "B78";  alt.push("B", "AAC"); }
      else if (p.rythme === "temps" && p.age <= 17)      { id = "AAC";  alt.push("B"); }
      else if (p.rythme === "temps")                     { id = "CS";   alt.push("B", "AAC"); }
      else if (p.rythme === "supervisee" && p.age >= 18) { id = "CS";   alt.push("B"); }
      else if (p.rythme === "sais-pas" && p.age <= 17)   { id = "AAC";  alt.push("B", "CS"); }
      else                                               { id = "B";    alt.push(p.age <= 17 ? "AAC" : "CS", "B78"); }
    }

    return { id: id, alternatives: alt.filter(a => a !== id && FORMATIONS[a]) };
  }

  /* ------------------------------------------------------------------- état */
  const rep = {};
  let idx = 0;

  const $ = s => document.querySelector(s);
  const esc = t => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  function actives() { return QUESTIONS.filter(q => !q.only || q.only(rep)); }

  /* Le nombre de questions dépend du chemin : 6 pour la voiture, 4 pour le reste.
     On compte les questions qui peuvent ENCORE tomber (« possible »), pas seulement
     celles déjà déclenchées — sinon le compteur augmenterait en cours de route,
     ce qui donne l'impression d'un formulaire sans fin. Il ne peut que diminuer. */
  function total() {
    return QUESTIONS.filter(q => q.possible ? q.possible(rep) : (!q.only || q.only(rep))).length;
  }

  /* ------------------------------------------------------------- affichage */
  function rendre() {
    const liste = actives();
    if (idx >= liste.length) return resultat();

    const q = liste[idx];
    const t = total();
    $("#prog-bar").style.width = Math.round((idx / t) * 100) + "%";
    $("#prog-lbl").textContent = "Question " + (idx + 1) + " sur " + t;

    let h = '<div class="q">'
      + "<h2>" + esc(q.titre) + "</h2>"
      + '<p class="hint">' + esc(q.hint) + "</p>"
      + '<div class="opts' + (q.opts.length % 2 || q.opts.length > 4 ? " one" : "") + '" role="group">';

    q.opts.forEach(o => {
      const on = rep[q.id] === o.v;
      h += '<button type="button" class="opt" aria-pressed="' + on + '" data-v="' + esc(o.v) + '">'
         + esc(o.l) + (o.s ? "<small>" + esc(o.s) + "</small>" : "") + "</button>";
    });
    h += "</div>";

    if (q.checks) {
      h += '<div class="checks">';
      q.checks.forEach(c => {
        if (rep[c.v] === undefined && c.def) rep[c.v] = true;
        h += '<label class="check"><input type="checkbox" data-c="' + c.v + '"'
           + (rep[c.v] ? " checked" : "") + "><span>" + esc(c.l)
           + (c.s ? "<small>" + esc(c.s) + "</small>" : "") + "</span></label>";
      });
      h += "</div>";
    }

    h += '<div class="q-nav">'
      + '<button type="button" class="btn" id="next"' + (rep[q.id] === undefined ? " disabled" : "") + ">"
      + (idx === liste.length - 1 ? "Voir ma formation" : "Continuer") + "</button>"
      + (idx > 0 ? '<button type="button" class="back" id="back">Revenir en arrière</button>' : "")
      + "</div></div>";

    $("#etape").innerHTML = h;
    $("#etape").querySelectorAll(".opt").forEach(b => {
      b.addEventListener("click", () => {
        let v = b.dataset.v;
        if (/^\d+$/.test(v)) v = parseInt(v, 10);
        rep[q.id] = v;
        // un changement de véhicule invalide les réponses qui en dépendaient
        if (q.id === "vehicule") { delete rep.boite; delete rep.rythme; }
        rendre();
      });
    });
    $("#etape").querySelectorAll("[data-c]").forEach(c => {
      c.addEventListener("change", () => { rep[c.dataset.c] = c.checked; });
    });
    const nx = $("#next"); if (nx) nx.addEventListener("click", () => { idx++; rendre(); });
    const bk = $("#back"); if (bk) bk.addEventListener("click", () => { idx--; rendre(); });
  }

  /* ------------------------------------------------------------- résultat */
  function profil() {
    return {
      vehicule: rep.vehicule,
      age: rep.age,
      permis: rep.permis,
      boite: rep.boite,
      rythme: rep.rythme,
      situation: rep.situation,
      aura: !!rep.aura,
      passRegion: !!rep.passRegion,
      engagement: !!rep.engagement,
      handicap: !!rep.handicap,
      premierPermis: rep.permis === "aucun" || rep.permis === "am" || rep.permis === "a1"
    };
  }

  function resultat() {
    const p = profil();
    const choix = choisir(p);
    const f = FORMATIONS[choix.id];
    const fam = FAMILLES[f.famille];
    const docs = DOCUMENTS[f.docs];

    $("#prog-bar").style.width = "100%";
    $("#prog-lbl").textContent = "Terminé";
    $("#etape").innerHTML = "";

    /* --- en-tête : la formation --- */
    let h = '<div class="res-top">'
      + '<p class="fam"><i style="background:' + fam.couleur + '"></i>' + esc(fam.nom) + "</p>"
      + '<p class="eb">Votre formation</p>'
      + "<h2>" + esc(f.nom) + "</h2>"
      + '<div class="plaques">';
    f.plaques.forEach(pl => {
      h += '<div class="plaque"><b>' + esc(pl[0]) + "</b><span>" + esc(pl[1]) + "</span></div>";
    });
    h += "</div><p>" + esc(f.resume) + "</p>";
    if (f.points) {
      h += '<ul style="margin:16px 0 0;padding-left:20px;color:#C3C3CE;font-size:15.5px">';
      f.points.forEach(pt => { h += "<li>" + esc(pt) + "</li>"; });
      h += "</ul>";
    }
    if (f.note) h += '<p style="color:var(--vert);font-size:15.5px;margin-top:16px">' + esc(f.note) + "</p>";
    h += '<p style="margin-top:18px;font-family:var(--mono);font-size:12px;letter-spacing:.06em;color:#9A9AA6">'
       + "Formation dispensée sur " + esc(f.vehicule) + "</p></div>";

    h += '<div class="blocs">';

    /* --- alternatives --- */
    if (choix.alternatives.length) {
      h += '<div class="bloc"><h3><span class="num">·</span>Ça pourrait aussi être ceci</h3>'
        + '<p class="sub">Votre cas est proche de plusieurs formations — voici les autres pistes, à confirmer avec nous.</p>'
        + '<div class="alts">';
      choix.alternatives.forEach(a => {
        const g = FORMATIONS[a];
        h += '<div class="alt"><i style="background:' + FAMILLES[g.famille].couleur + '"></i><div>'
           + "<b>" + esc(g.nom) + "</b><span>" + esc(g.resume.split(". ")[0]) + ".</span></div></div>";
      });
      h += "</div></div>";
    }

    /* --- documents --- */
    h += '<div class="bloc"><h3><span class="num">1</span>Ce qu\'il faut apporter</h3>'
      + '<p class="sub">' + esc(docs.titre) + " — la liste correspondant à votre cas, pas celle de tout le monde.</p>"
      + '<ul class="docs">';
    docs.liste.forEach(d => {
      h += "<li><div>" + esc(d.t) + (d.p ? "<em>" + esc(d.p) + "</em>" : "") + "</div></li>";
    });
    h += "</ul>";
    if (p.age <= 24) {
      h += '<div class="docs-note"><b>Si vous n\'avez pas de facture à votre nom</b> — le cas le plus fréquent : '
         + esc(DOCUMENTS_HEBERGEMENT.join(", et ")) + ".</div>";
    }
    h += '<div class="docs-note">' + esc(DOCUMENTS_NOTE) + "</div></div>";

    /* --- aides --- */
    const ok = AIDES.filter(a => { try { return a.test(p); } catch (e) { return false; } });
    const ko = AIDES.filter(a => ok.indexOf(a) === -1);

    h += '<div class="bloc"><h3><span class="num">2</span>Les aides que vous pouvez demander</h3>'
      + '<p class="sub">' + (ok.length
          ? ok.length + (ok.length > 1 ? " dispositifs semblent" : " dispositif semble") + " correspondre à votre situation."
          : "Aucun dispositif ne ressort de vos réponses — mais parlons-en, votre cas mérite d'être regardé.")
      + "</p><div class=\"aides\">";

    ok.forEach(a => {
      h += '<div class="aide ok"><div class="aide-h"><h4>' + esc(a.nom) + "</h4>"
         + '<span class="badge">Vous semblez éligible</span></div>'
         + '<p class="montant">' + esc(a.montant) + "</p>"
         + "<p>" + esc(a.resume) + "</p><ol>";
      a.conditions.forEach(c => { h += "<li>" + esc(c) + "</li>"; });
      h += "</ol>";
      if (a.detail) {
        h += '<ol style="list-style:none;padding-left:0;margin-top:10px">';
        a.detail.forEach(d => { h += "<li>— " + esc(d) + "</li>"; });
        h += "</ol>";
      }
      if (a.demarche) h += '<p style="margin-top:10px"><b>La démarche :</b> ' + esc(a.demarche) + "</p>";
      h += "</div>";
    });

    if (ko.length) {
      h += '<details style="margin-top:6px"><summary style="cursor:pointer;font-family:var(--mono);'
         + 'font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--gris-t);padding:8px 0">'
         + "Voir les " + ko.length + " autres dispositifs existants</summary>"
         + '<div class="aides" style="margin-top:12px">';
      ko.forEach(a => {
        h += '<div class="aide"><div class="aide-h"><h4>' + esc(a.nom) + "</h4>"
           + '<span class="badge gris">Sous d\'autres conditions</span></div><ol>';
        a.conditions.forEach(c => { h += "<li>" + esc(c) + "</li>"; });
        h += "</ol></div>";
      });
      h += "</div></details>";
    }

    h += '<div class="disclaimer">' + esc(AIDES_DISCLAIMER)
       + ' <a href="' + AIDES_SOURCE + '" target="_blank" rel="noopener">Voir sur service-public.fr</a></div>'
       + "</div></div>";

    /* --- RDV --- */
    const lib = {
      voiture: "Une voiture", moto: "Un deux-roues", remorque: "Voiture + remorque", sanspermis: "Voiture sans permis"
    };
    const sit = {
      lyceen: "Lycéen ou étudiant", apprenti: "Apprenti", salarie: "Salarié",
      demandeur: "En recherche d'emploi", autre: "Autre situation"
    };
    h += '<div class="rdv"><p class="eb">Dernière étape</p>'
      + "<h3>Demander un rendez-vous d'inscription</h3>"
      + '<p class="sub">Tout ce que vous venez de renseigner part avec votre demande. Vous n\'avez rien à réexpliquer.</p>'
      + '<div class="recap"><dl>'
      + "<dt>Formation</dt><dd>" + esc(f.nom) + "</dd>"
      + "<dt>Projet</dt><dd>" + esc(lib[p.vehicule] || "—") + "</dd>"
      + "<dt>Âge</dt><dd>" + esc(rep.age === 14 ? "14 ou 15 ans" : rep.age === 20 ? "18 à 24 ans" : rep.age === 30 ? "25 ans ou plus" : rep.age + " ans") + "</dd>"
      + "<dt>Situation</dt><dd>" + esc(sit[p.situation] || "—") + "</dd>"
      + "<dt>Aides</dt><dd>" + (ok.length ? esc(ok.map(a => a.nom).join(" · ")) : "à étudier ensemble") + "</dd>"
      + "</dl></div>"
      + '<form id="form-rdv"><div class="champs">'
      + '<div class="champ"><label for="nom">Nom et prénom</label><input id="nom" name="nom" required></div>'
      + '<div class="champ"><label for="tel">Téléphone</label><input id="tel" name="tel" type="tel" required></div>'
      + '<div class="champ full"><label for="mail">Adresse e-mail</label><input id="mail" name="mail" type="email" required></div>'
      + '<div class="champ full"><label for="dispo">Vos disponibilités, ou une question</label>'
      + '<textarea id="dispo" name="dispo" rows="3" placeholder="Le bureau est ouvert du lundi au samedi, 10h-12h sauf mercredi et 16h-19h sauf samedi."></textarea></div>'
      + "</div>"
      + '<div class="rdv-foot"><button type="submit" class="btn">Envoyer ma demande</button>'
      + '<button type="button" class="btn btn--ghost" id="imprimer" style="border-color:#4A4D5A;color:var(--craie)">Imprimer ma fiche</button>'
      + '<a class="tel" href="tel:0477364880">ou appelez-nous au <b>04 77 36 48 80</b></a></div>'
      + '<p class="nocap">Pas de code à recopier, pas de captcha.</p>'
      + "</form></div>";

    h += '<div style="text-align:center;padding:8px 0 0">'
      + '<button type="button" class="btn btn--ghost btn--sm" id="recommencer">Recommencer le parcours</button></div>';

    h += "</div>";

    const box = $("#resultat");
    box.innerHTML = h;
    box.classList.add("on");
    box.scrollIntoView({ behavior: "smooth", block: "start" });

    $("#imprimer").addEventListener("click", () => window.print());
    $("#recommencer").addEventListener("click", () => {
      Object.keys(rep).forEach(k => delete rep[k]);
      idx = 0; box.classList.remove("on"); box.innerHTML = "";
      rendre();
      $("#parcours").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    $("#form-rdv").addEventListener("submit", e => {
      e.preventDefault();
      e.target.innerHTML = '<div class="recap" style="border-color:var(--vert)">'
        + '<p style="color:var(--vert);font-family:var(--mono);font-size:12px;letter-spacing:.1em;'
        + 'text-transform:uppercase;margin:0 0 8px">Demande envoyée</p>'
        + '<p style="margin:0;color:var(--craie)">Merci, nous vous rappelons sous 48 h ouvrées. '
        + "Votre fiche de formation est jointe à la demande.</p>"
        + '<p style="margin:10px 0 0;font-family:var(--mono);font-size:11px;color:var(--gris)">'
        + "Maquette de démonstration — aucun message n'est réellement envoyé.</p></div>";
    });
  }

  /* ------------------------------------------------------------------- init */
  document.addEventListener("DOMContentLoaded", function () {
    rendre();
    const b = document.querySelector(".burger");
    if (b) b.addEventListener("click", () => document.querySelector("header").classList.toggle("open"));
  });
})();
