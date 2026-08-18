/* =============================================================================
   AERS CHAUVE — LES RÈGLES DU PARCOURS GUIDÉ
   =============================================================================

   ⚠️  CE FICHIER EST FAIT POUR ÊTRE MODIFIÉ SANS DÉVELOPPEUR.
       Tout le contenu (formations, documents, aides) est ici, en clair.
       Le moteur qui l'utilise est dans parcours.js — on n'y touche pas.

   Quand une règle change (ex. le CPF a changé au 1er janvier 2026), il suffit
   de modifier le texte ou le chiffre dans ce fichier. Rien d'autre.

   Tout le contenu ci-dessous est REPRIS DU SITE aers.fr — pages
   « Nos permis et formations », « Les financements », « Documents à fournir ».
   Rien n'a été inventé.
   ============================================================================= */

/* -----------------------------------------------------------------------------
   1. LES LISTES DE DOCUMENTS
   Reprises telles quelles de la page « Documents à fournir ».
   -------------------------------------------------------------------------- */
const DOCUMENTS = {

  B_AAC: {
    titre: "Permis B et conduite accompagnée",
    liste: [
      { t: "Carte d'identité recto/verso" },
      { t: "Dernier ASSR obtenu (ASSR 1 ou 2) ou ASR" },
      { t: "Attestation de Journée Défense et Citoyenneté",
        p: "pour les élèves de plus de 17 ans — ou attestation de recensement entre 16 et 17 ans" },
      { t: "Le permis AM ou A1 recto/verso", p: "seulement si vous en êtes titulaire" },
      { t: "Code E-photos avec signature numérique", p: "comprenant 2 photos" },
      { t: "Un justificatif de domicile de moins de 6 mois",
        p: "facture électricité, gaz, téléphone mobile ou avis d'imposition — hors échéancier" }
    ]
  },

  AM: {
    titre: "Permis AM (BSR) — 2 roues ou 4 roues",
    liste: [
      { t: "Carte d'identité recto/verso" },
      { t: "Dernier ASSR obtenu (ASSR 1 ou 2) ou ASR", p: "impératif pour valider la partie théorique" },
      { t: "Attestation de Journée Défense et Citoyenneté",
        p: "pour les plus de 17 ans — ou attestation de recensement entre 16 et 17 ans" },
      { t: "Code E-photos avec signature numérique", p: "comprenant 2 photos" },
      { t: "Un justificatif de domicile de moins de 6 mois", p: "hors échéancier" }
    ]
  },

  A1: {
    titre: "Permis A1 (125 cm³)",
    liste: [
      { t: "Carte d'identité recto/verso" },
      { t: "Dernier ASSR obtenu (ASSR 1 ou 2) ou ASR" },
      { t: "Attestation de Journée Défense et Citoyenneté",
        p: "pour les plus de 17 ans — ou attestation de recensement entre 16 et 17 ans" },
      { t: "Le permis AM recto/verso", p: "seulement si vous en êtes titulaire" },
      { t: "Code E-photos avec signature numérique", p: "comprenant 2 photos" },
      { t: "Un justificatif de domicile de moins de 6 mois", p: "hors échéancier" }
    ]
  },

  SEPT_H: {
    titre: "Formation de 7 h",
    liste: [
      { t: "Une photo d'identité" },
      { t: "Une photocopie du permis de conduire" }
    ]
  },

  A2_A: {
    titre: "Permis A2 et permis A",
    liste: [
      { t: "Carte d'identité recto/verso" },
      { t: "Permis de conduire recto/verso" },
      { t: "Code E-photos avec signature numérique", p: "comprenant 2 photos" },
      { t: "Un justificatif de domicile de moins de 6 mois", p: "hors échéancier" }
    ]
  },

  B96: {
    titre: "Formation B96",
    liste: [
      { t: "Carte d'identité recto/verso" },
      { t: "Permis de conduire recto/verso" },
      { t: "Code E-photos avec signature numérique", p: "comprenant 2 photos" },
      { t: "Un justificatif de domicile de moins de 6 mois", p: "hors échéancier" }
    ]
  },

  BE: {
    titre: "Permis BE",
    liste: [
      { t: "Carte d'identité recto/verso" },
      { t: "Permis de conduire recto/verso" },
      { t: "Code E-photos avec signature numérique", p: "comprenant 2 photos" },
      { t: "Un justificatif de domicile de moins de 6 mois", p: "hors échéancier" },
      { t: "Plus besoin de visite médicale", p: "depuis juin 2016, pour cette catégorie de permis" }
    ]
  },

  REGUL: {
    titre: "Régularisation",
    liste: [
      { t: "Carte d'identité recto/verso" },
      { t: "Permis de conduire recto/verso" },
      { t: "Code E-photos avec signature numérique", p: "comprenant 2 photos" }
    ]
  }
};

/* Les cas d'inscription proposés au choix sur la page « M'inscrire ».
   Chacun pointe vers une des listes ci-dessus. */
const CAS_INSCRIPTION = [
  { id: "B_AAC", label: "Permis B", detail: "Classique, conduite accompagnée ou supervisée" },
  { id: "AM",    label: "Permis AM (BSR)", detail: "Scooter ou voiture sans permis, dès 14 ans" },
  { id: "A1",    label: "Permis A1", detail: "Moto 125 cm³, dès 16 ans" },
  { id: "A2_A",  label: "Permis A2 ou A", detail: "Moto, dès 18 ans" },
  { id: "SEPT_H",label: "Une formation de 7 h", detail: "125 avec le permis B, passerelle A2 vers A, post-permis" },
  { id: "B96",   label: "Formation B96", detail: "Remorque jusqu'à 4 250 kg" },
  { id: "BE",    label: "Permis BE", detail: "Remorque au-delà de 4 250 kg" },
  { id: "REGUL", label: "Une régularisation", detail: "Ajout d'un équipement adapté sur un permis existant" }
];

/* Ce mot vaut pour toutes les listes — il est affiché sous chacune. */
const DOCUMENTS_NOTE =
  "Pas besoin d'apporter des photocopies : nous numérisons vos documents directement à l'auto-école. " +
  "En revanche, les photos d'identité doivent impérativement être des E-photos avec signature numérique, " +
  "pour que la demande soit traitée sur le site de l'ANTS.";

/* Et si la personne n'a pas de facture à son nom (cas fréquent chez les jeunes) */
const DOCUMENTS_HEBERGEMENT = [
  "Une attestation d'hébergement",
  "La carte d'identité de l'hébergeur"
];


/* -----------------------------------------------------------------------------
   2. LES FORMATIONS
   « famille » sert au code couleur : auto · moto · remorque · perf
   -------------------------------------------------------------------------- */
const FORMATIONS = {

  B: {
    nom: "Permis B — boîte manuelle", famille: "auto",
    plaques: [["15","ans à l'inscription"],["20","heures minimum"],["17","ans à l'examen"]],
    vehicule: "Citroën C3",
    resume: "Le permis B permet de conduire tous les véhicules de tourisme et les utilitaires jusqu'à 3,5 tonnes. " +
            "L'inscription est possible dès 15 ans, la formation pratique est de 20 h minimum, et lorsque vous êtes " +
            "prêt nous vous proposons une date d'examen dès vos 17 ans.",
    docs: "B_AAC"
  },

  B78: {
    nom: "Permis B — boîte automatique", famille: "auto",
    plaques: [["15","ans à l'inscription"],["13","heures minimum"],["+7h","pour passer en manuelle"]],
    vehicule: "Citroën C3",
    resume: "La formation initiale est de 13 h minimum. Le permis est alors restreint à la conduite d'un véhicule à " +
            "boîte automatique — et si vous en ressentez l'envie ou le besoin, une formation de 7 h suffit ensuite " +
            "pour l'étendre à la boîte mécanique.",
    docs: "B_AAC"
  },

  AAC: {
    nom: "Conduite accompagnée (AAC)", famille: "auto",
    plaques: [["15","ans au départ"],["17","ans à l'examen"],["75","% de réussite"]],
    vehicule: "Citroën C3",
    resume: "Vous apprenez les bases à l'auto-école, puis vous vous perfectionnez avec un accompagnateur — " +
            "généralement un parent. Son intérêt : un taux de réussite nettement supérieur (environ 75 % contre 57 %), " +
            "parce que vous conduisez beaucoup plus avant l'examen, sur toutes les saisons et toutes les météos.",
    points: [
      "Deux rendez-vous pédagogiques avec le moniteur, l'élève et l'accompagnateur : le premier vers 1 000 km, le second vers 3 000 km",
      "Assurance jeune conducteur moins chère qu'après une formation classique",
      "Permis probatoire de 2 ans au lieu de 3",
      "Le code à 15 ans et le permis à 17 ans : pas d'emploi du temps à jongler pendant les études"
    ],
    docs: "B_AAC"
  },

  CS: {
    nom: "Conduite supervisée", famille: "auto",
    plaques: [["18","ans minimum"],["20","heures d'abord"],["0","€ de plus"]],
    vehicule: "Citroën C3",
    resume: "C'est l'équivalent de la conduite accompagnée pour les plus de 18 ans. Possible après la formation " +
            "initiale de 20 h et l'obtention du code — ou après un échec à l'épreuve de conduite, pour améliorer " +
            "ses acquis avant de se présenter à nouveau.",
    points: [
      "Un apprentissage moins stressant : vous conduisez beaucoup plus d'heures, avec un proche",
      "Recommandée si vous manquez de confiance en vous",
      "Comme l'AAC, elle permet de conduire sur plusieurs saisons"
    ],
    docs: "B_AAC"
  },

  PMR: {
    nom: "Conduite sur véhicule adapté (PMR)", famille: "auto",
    plaques: [["4","équipements adaptés"],["1","visite médicale"],["20","heures minimum"]],
    vehicule: "Citroën C3 aménagée",
    resume: "Les examens sont les mêmes qu'en permis B. Une visite médicale détermine l'aptitude à la conduite et " +
            "le type d'équipements nécessaires. Nous adaptons la formation à chacun, sur une Citroën C3 équipée.",
    points: [
      "Accélérateur avec système de pédalier inversé (accélérateur à gauche)",
      "Accélérateur avec système gâchette (gauche ou droite)",
      "Freinage à la main par perche (gauche ou droite)",
      "Direction adaptée avec boule au volant et satellite (clignotants, feux, klaxon, essuie-glaces), main droite ou main gauche"
    ],
    note: "Deux de nos enseignants sont référents handicap et spécialistes des troubles DYS.",
    docs: "B_AAC"
  },

  AM4: {
    nom: "Voiture sans permis (AM 4 roues)", famille: "auto",
    plaques: [["14","ans minimum"],["8","heures de pratique"]],
    vehicule: "Quadricycle léger",
    resume: "Le permis AM (ex-BSR) n'est pas un examen mais une formation théorique et pratique obligatoire pour " +
            "conduire un quadricycle léger dès 14 ans. La formation pratique dure 8 heures.",
    note: "L'ASSR 1 ou 2, ou l'ASR, est impérative pour valider la partie théorique.",
    docs: "AM"
  },

  POST: {
    nom: "Stage post-permis", famille: "perf",
    plaques: [["1","journée"],["6-12","mois de permis"],["-1","an de probatoire"]],
    vehicule: "Citroën C3",
    resume: "Une journée de formation pour les titulaires du permis depuis plus de 6 mois et moins de 12 mois. " +
            "Objectif : une prise de conscience du risque, pour éviter le sentiment de sur-confiance au moment " +
            "où le jeune conducteur prend de l'assurance.",
    points: [
      "Période probatoire réduite à 2 ans au lieu de 3 après une formation traditionnelle",
      "Réduite à 1 an et demi au lieu de 2 après une conduite accompagnée",
      "Sous réserve de n'avoir commis aucune infraction entraînant une perte de points"
    ],
    docs: "SEPT_H"
  },

  AM2: {
    nom: "Scooter (AM 2 roues)", famille: "moto",
    plaques: [["14","ans minimum"],["8","heures de pratique"]],
    vehicule: "Cyclomoteur",
    resume: "Le permis AM (ex-BSR) est une formation théorique et pratique obligatoire pour conduire un cyclomoteur " +
            "dès 14 ans. La formation pratique dure 8 heures.",
    note: "L'ASSR 1 ou 2, ou l'ASR, est impérative pour valider la partie théorique.",
    docs: "AM"
  },

  A1: {
    nom: "Permis A1 — 125 cm³", famille: "moto",
    plaques: [["16","ans minimum"],["20","heures minimum"],["125","cm³ · 15 ch"]],
    vehicule: "Suzuki GSX-S125",
    resume: "Le permis A1 est accessible dès 16 ans et permet de conduire une cylindrée inférieure à 125 cm³ et " +
            "15 ch. Il demande l'examen du code et 20 h de conduite minimum. L'examen comprend une épreuve hors " +
            "circulation — un plateau lent, deux plateaux rapides et une interrogation orale — puis une épreuve " +
            "en circulation.",
    docs: "A1"
  },

  SEPT_125: {
    nom: "Formation 7 h pour conduire un 125 cm³", famille: "moto",
    plaques: [["7","heures"],["2","ans de permis B"],["0","examen"]],
    vehicule: "Suzuki GSX-S125",
    resume: "Si vous avez le permis B depuis au moins 2 ans, une formation de 7 h suffit pour conduire une 125 cm³ : " +
            "elle sert à vous sensibiliser à la conduite d'un deux-roues et à bien le prendre en main. Pas d'examen.",
    docs: "SEPT_H"
  },

  A2: {
    nom: "Permis A2", famille: "moto",
    plaques: [["18","ans minimum"],["20","heures minimum"],["47","chevaux max"]],
    vehicule: "BMW G310R",
    resume: "Le permis A2 est accessible dès 18 ans et permet de conduire une cylindrée intermédiaire de 47 ch " +
            "maximum, pendant 2 ans minimum — et cela quel que soit votre âge. 20 h de conduite minimum, " +
            "ramenées à 15 h pour les titulaires du permis A1.",
    docs: "A2_A"
  },

  A: {
    nom: "Permis A — passerelle depuis l'A2", famille: "moto",
    plaques: [["7","heures"],["2","ans d'A2"],["800","cm³ et plus"]],
    vehicule: "Suzuki GSX-800",
    resume: "Le permis A est accessible après 2 ans de permis A2 et permet de conduire une cylindrée « gros cube » " +
            "de plus de 35 kW, c'est-à-dire au-delà de 48 ch. Une formation de 7 h en auto-école suffit.",
    docs: "A2_A"
  },

  B96: {
    nom: "Formation B96 — remorque", famille: "remorque",
    plaques: [["7","heures"],["4250","kg maximum"],["0","examen"]],
    vehicule: "Volkswagen Tiguan",
    resume: "La formation B96 permet de tracter une remorque de plus de 750 kg, à condition que le poids total de " +
            "l'ensemble véhicule + attelage reste entre 3 500 et 4 250 kg. Sept heures pour la réglementation, " +
            "les manœuvres, l'attelage-dételage et la conduite en circulation. À l'issue, une attestation vous est " +
            "délivrée et un nouveau permis est produit avec la mention B96.",
    docs: "B96"
  },

  BE: {
    nom: "Permis BE — remorque lourde", famille: "remorque",
    plaques: [["4250","kg et plus"],["2","épreuves"],["0","visite médicale"]],
    vehicule: "Volkswagen Tiguan",
    resume: "Le permis BE est obligatoire pour tracter une remorque ou une caravane de plus de 750 kg lorsque " +
            "l'ensemble dépasse 4 250 kg. La formation se déroule en heures ou en demi-journées selon vos besoins. " +
            "L'examen comprend une épreuve hors circulation (vérifications, attelage et dételage, marche arrière, " +
            "interrogations orales) et une épreuve en circulation, en ville et sur route.",
    docs: "BE"
  },

  NIVEAU: {
    nom: "Remise à niveau", famille: "perf",
    plaques: [["∞","selon vos besoins"]],
    vehicule: "Citroën C3",
    resume: "Vous avez le permis mais vous n'avez pas conduit depuis longtemps, ou vous manquez de confiance ? " +
            "Nous construisons un programme d'heures adapté à ce que vous voulez retravailler.",
    docs: "SEPT_H"
  }
};

const FAMILLES = {
  auto:     { nom: "Auto",             couleur: "var(--f-auto)" },
  moto:     { nom: "Moto",             couleur: "var(--f-moto)" },
  remorque: { nom: "Remorque",         couleur: "var(--f-remorque)" },
  perf:     { nom: "Se perfectionner", couleur: "var(--f-perf)" }
};


/* -----------------------------------------------------------------------------
   3. LES AIDES AU FINANCEMENT
   Reprises de la page « Les financements ». Les conditions sont exactement
   celles qu'elles y sont écrites — c'est ce qui rend le test fiable.

   « test » répond : cette personne coche-t-elle les conditions ?
   Elle reçoit le profil (p) construit par les réponses au parcours.
   -------------------------------------------------------------------------- */
const AIDES = [

  {
    id: "1euro",
    nom: "Le permis à 1 € par jour",
    montant: "800 à 1 200 €",
    resume: "C'est une facilité de paiement mise en place par l'État, plus qu'une aide : vous empruntez 800, " +
            "1 000 ou 1 200 € auprès de votre banque et vous remboursez 30 € par mois. Sans frais, et à taux zéro.",
    conditions: [
      "Être inscrit dans une auto-école labellisée",
      "Avoir moins de 24 ans",
      "Être sur un premier permis"
    ],
    test: p => p.age <= 24 && p.premierPermis
  },

  {
    id: "cpf",
    nom: "Le CPF",
    montant: "900 € maximum",
    resume: "La loi de finances 2026 a changé les règles : le CPF est désormais réservé aux demandeurs d'emploi " +
            "et aux salariés bénéficiant d'un co-financement. Cela concerne tous les permis éligibles, notamment " +
            "le permis B et le permis BE.",
    conditions: [
      "Le permis doit être nécessaire dans le cadre professionnel",
      "Être demandeur d'emploi, ou salarié avec un co-financement",
      "Plafond de 900 €"
    ],
    demarche: "Consultez votre montant disponible, demandez-nous un devis, puis créez votre dossier de formation " +
              "sur moncompteformation.gouv.fr",
    test: p => p.situation === "demandeur" || p.situation === "salarie"
  },

  {
    id: "region",
    nom: "L'aide de la Région Auvergne-Rhône-Alpes",
    montant: "150 €",
    resume: "La Région accorde une aide au permis de conduire aux élèves de 17 à 18 ans résidant en " +
            "Auvergne-Rhône-Alpes.",
    conditions: [
      "Résider en région Auvergne-Rhône-Alpes",
      "Avoir entre 17 et 18 ans",
      "Être inscrit en auto-école",
      "Ne pas être titulaire du permis B"
    ],
    demarche: "Quatre justificatifs à fournir : pièce d'identité, justificatif de domicile de moins de 3 mois, " +
              "facture d'inscription et relevé d'identité bancaire.",
    test: p => p.aura && p.age >= 17 && p.age <= 18 && p.premierPermis
  },

  {
    id: "passregion",
    nom: "L'aide avec le pass'Région",
    montant: "200 à 1 000 €",
    resume: "Nous sommes partenaires pass'Région : nous pouvons encaisser directement les aides au permis " +
            "attribuées par ce dispositif.",
    conditions: [
      "Bénéficier d'un pass'Région",
      "Avoir réalisé les heures de bénévolat nécessaires, ou être sapeur-pompier volontaire, jeune sapeur-pompier, ou cadet de la gendarmerie"
    ],
    detail: [
      "200 € après une mission d'engagement volontaire de 35 heures",
      "500 € après une mission de 80 heures, dans une association identifiée par la Région",
      "500 € pour les sapeurs-pompiers volontaires et les brevetés cadets de la gendarmerie",
      "1 000 € pour les brevetés jeunes sapeurs-pompiers"
    ],
    test: p => p.passRegion || p.engagement
  },

  {
    id: "mission",
    nom: "La mission locale",
    montant: "Variable",
    resume: "Si vous avez entre 16 et 25 ans, la mission locale peut, selon votre situation, financer une partie " +
            "de votre permis. N'hésitez pas à vous rapprocher de l'agence la plus proche de chez vous.",
    conditions: [
      "Avoir entre 16 et 25 ans",
      "Contacter votre mission locale pour l'étude de votre dossier"
    ],
    test: p => p.age >= 16 && p.age <= 25
  },

  {
    id: "francetravail",
    nom: "France Travail",
    montant: "1 200 € maximum",
    resume: "France Travail peut financer une partie de votre permis sous certaines conditions. L'aide ne peut " +
            "être attribuée qu'une seule fois.",
    conditions: [
      "Être inscrit depuis 6 mois",
      "Avoir 18 ans",
      "Une allocation inférieure à l'ARE",
      "L'absence de permis bloque votre recherche d'emploi",
      "L'aide est dite « subsidiaire »"
    ],
    test: p => p.situation === "demandeur" && p.age >= 18
  },

  {
    id: "agefiph",
    nom: "L'AGEFIPH",
    montant: "Variable",
    resume: "Si vous avez un handicap reconnu, vous pouvez demander un dossier d'aide au financement du permis " +
            "à l'AGEFIPH. Les prises en charge varient selon la situation.",
    conditions: [
      "Avoir un handicap reconnu",
      "Contacter votre conseiller AGEFIPH"
    ],
    test: p => p.handicap
  }
];

/* La mention légale affichée sous les aides. À ne pas retirer :
   les barèmes changent, et un chiffre erroné engagerait l'auto-école. */
const AIDES_DISCLAIMER =
  "Information indicative, donnée à titre d'orientation et à confirmer avec l'auto-école : les barèmes et les " +
  "conditions évoluent. Le détail officiel de toutes les aides au permis de conduire est publié sur " +
  "service-public.fr.";
const AIDES_SOURCE = "https://www.service-public.gouv.fr/particuliers/vosdroits/F13609";
