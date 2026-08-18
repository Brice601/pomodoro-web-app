/* =============================================================================
   AERS CHAUVE — page « M'inscrire »
   Filtre la liste de documents selon la formation choisie.
   Le contenu vient de regles.js — les mêmes listes que le parcours guidé.
   ============================================================================= */
(function () {
  "use strict";

  const $ = s => document.querySelector(s);
  const esc = t => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let courant = "B_AAC";

  /* --- les boutons de choix, construits depuis regles.js --- */
  function choix() {
    const box = $("#choix");
    box.innerHTML = CAS_INSCRIPTION.map(c =>
      '<button type="button" data-id="' + c.id + '" aria-pressed="' + (c.id === courant) + '">'
      + esc(c.label) + "<small>" + esc(c.detail) + "</small></button>"
    ).join("");
    box.querySelectorAll("button").forEach(b => {
      b.addEventListener("click", () => {
        courant = b.dataset.id;
        box.querySelectorAll("button").forEach(o =>
          o.setAttribute("aria-pressed", String(o === b)));
        liste();
        majFormulaire();
      });
    });
  }

  /* --- la liste de papiers correspondante --- */
  function liste() {
    const d = DOCUMENTS[courant];
    const jeune = courant === "B_AAC" || courant === "AM" || courant === "A1";

    let h = '<div class="haut"><h3>' + esc(d.titre) + "</h3>"
          + '<span class="cpt">' + d.liste.length + " documents</span></div>"
          + '<ul class="papiers">';
    d.liste.forEach(p => {
      h += "<li><div>" + esc(p.t) + (p.p ? "<em>" + esc(p.p) + "</em>" : "") + "</div></li>";
    });
    h += "</ul>";

    if (jeune) {
      h += '<div class="encart"><b>Si vous n\'avez pas de facture à votre nom</b> — le cas le plus fréquent '
         + "quand on habite chez ses parents : apportez " + esc(DOCUMENTS_HEBERGEMENT.join(", et "))
         + ". C'est tout.</div>";
    }
    h += '<div class="encart">' + esc(DOCUMENTS_NOTE) + "</div>"
       + '<div class="actions">'
       + '<button type="button" class="btn btn--sm" id="imprimer">Imprimer cette liste</button>'
       + '<a class="btn btn--ghost btn--sm" href="#demande">Demander un rendez-vous</a>'
       + "</div>";

    $("#liste").innerHTML = h;
    $("#imprimer").addEventListener("click", () => window.print());
  }

  /* --- le formulaire reprend la formation choisie --- */
  function majFormulaire() {
    const c = CAS_INSCRIPTION.find(x => x.id === courant);
    const r = $("#rappel-formation");
    if (r) r.textContent = c ? c.label : "—";
    const sel = $("#form-formation");
    if (sel) sel.value = courant;
  }

  document.addEventListener("DOMContentLoaded", function () {
    /* le choix peut être pré-sélectionné par l'URL : m-inscrire.html#A2_A */
    const h = decodeURIComponent(location.hash.replace("#", ""));
    if (h && DOCUMENTS[h]) courant = h;

    choix();
    liste();

    /* la liste déroulante du formulaire, remplie depuis les mêmes règles */
    const sel = $("#form-formation");
    if (sel) {
      sel.innerHTML = CAS_INSCRIPTION.map(c =>
        '<option value="' + c.id + '">' + esc(c.label) + "</option>").join("");
    }
    majFormulaire();

    const f = $("#form-inscription");
    if (f) f.addEventListener("submit", e => {
      e.preventDefault();
      const c = CAS_INSCRIPTION.find(x => x.id === courant);
      f.innerHTML = '<div class="rappel" style="border-color:var(--vert)">'
        + '<b>Demande envoyée</b>'
        + '<p style="margin:0;color:var(--craie)">Merci, nous vous rappelons pour fixer le rendez-vous. '
        + "Pensez à préparer les documents de la liste « " + esc(c ? c.label : "") + " ».</p>"
        + '<p style="margin:10px 0 0;font-family:var(--mono);font-size:11px;color:var(--gris)">'
        + "Maquette de démonstration — aucun message n'est réellement envoyé.</p></div>";
    });

    const b = document.querySelector(".burger");
    if (b) b.addEventListener("click", () =>
      document.querySelector("header").classList.toggle("open"));
  });
})();
