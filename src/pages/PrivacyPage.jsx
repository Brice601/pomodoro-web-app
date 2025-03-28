// src/pages/PrivacyPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Politique de Confidentialité</h1>
            
            <div className="prose prose-blue max-w-none">
              <h2>Introduction</h2>
              <p>
                La présente Politique de Confidentialité définit la manière dont Architecte IA (ci-après dénommé "nous", 
                "notre" ou "nos") collecte, utilise, conserve et divulgue les informations recueillies auprès des utilisateurs 
                (ci-après dénommés "vous", "votre" ou "vos") du site web [votre-domaine.com] (ci-après dénommé le "Site") et 
                de l'application Pomodoro personnalisée (ci-après dénommée le "Service").
              </p>
              <p>
                Cette politique de confidentialité s'applique au Site et à tous les produits et services offerts par Architecte IA.
              </p>
              <p>
                Nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité 
                est conforme au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
              </p>

              <h2>1. Collecte de données personnelles</h2>
              <p>
                Nous collectons des informations personnelles lorsque vous vous inscrivez sur notre Site, passez une commande, 
                ou utilisez notre Service. Les informations que nous recueillons incluent :
              </p>

              <h3>1.1 Informations que vous nous fournissez directement :</h3>
              <ul>
                <li>Civilité, nom et prénom</li>
                <li>Adresse e-mail</li>
                <li>Informations de paiement (traitées par notre prestataire de paiement sécurisé)</li>
                <li>Contenu du fichier CSV que vous téléversez pour personnaliser votre application Pomodoro</li>
              </ul>

              <h3>1.2 Informations collectées automatiquement :</h3>
              <ul>
                <li>Adresse IP</li>
                <li>Type de navigateur et appareil utilisé</li>
                <li>Pages consultées et durée de visite</li>
                <li>Cookies et technologies similaires (voir notre section sur les cookies)</li>
              </ul>

              <h2>2. Utilisation des données</h2>
              <p>Les données personnelles que nous collectons sont utilisées pour :</p>
              <ul>
                <li>Créer et personnaliser votre application Pomodoro selon vos spécifications</li>
                <li>Traiter vos commandes et gérer votre compte</li>
                <li>
                  Vous envoyer des e-mails concernant votre commande, y compris la confirmation de commande et la livraison 
                  de votre lien d'accès personnel
                </li>
                <li>Améliorer notre Site et nos services</li>
                <li>Répondre à vos demandes, questions et préoccupations</li>
                <li>Assurer la sécurité de notre Site et de nos services</li>
              </ul>

              <h2>3. Protection de vos données personnelles</h2>
              <p>
                Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. 
                Nous utilisons un chiffrement à la pointe de la technologie pour protéger les informations sensibles transmises en ligne. 
                Nous protégeons également vos informations hors ligne. Seuls les employés qui ont besoin d'effectuer un travail 
                spécifique ont accès aux informations personnelles identifiables.
              </p>

              <h2>4. Partage de vos données personnelles</h2>
              <p>
                Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles identifiables à des tiers, sauf 
                dans les cas suivants :
              </p>

              <h3>4.1 Prestataires de services tiers :</h3>
              <p>
                Nous pouvons partager vos informations avec des prestataires de services tiers qui effectuent des fonctions pour 
                notre compte, tels que :
              </p>
              <ul>
                <li>Traitement des paiements</li>
                <li>Hébergement de notre Site et de notre Service</li>
                <li>Analyse de l'utilisation de notre Site</li>
              </ul>
              <p>
                Ces tiers ont accès aux informations personnelles nécessaires pour effectuer leurs fonctions, mais ne peuvent 
                pas les utiliser à d'autres fins.
              </p>

              <h3>4.2 Exigences légales :</h3>
              <p>
                Nous pouvons divulguer vos informations personnelles si la loi nous y oblige ou si nous croyons de bonne foi 
                que cette action est nécessaire pour :
              </p>
              <ul>
                <li>Se conformer à une procédure judiciaire</li>
                <li>Protéger et défendre nos droits ou notre propriété</li>
                <li>Agir dans des circonstances urgentes pour protéger la sécurité personnelle des utilisateurs de notre Site ou du public</li>
              </ul>

              <h2>5. Conservation des données</h2>
              <p>
                Nous conservons vos données personnelles aussi longtemps que nécessaire pour les finalités pour lesquelles 
                elles ont été collectées, notamment pour satisfaire aux exigences légales, comptables ou de déclaration.
              </p>
              <p>
                Les données liées à votre commande sont conservées pendant une durée de 5 ans à compter de la passation de la 
                commande, conformément aux obligations légales en matière de conservation des documents commerciaux.
              </p>

              <h2>6. Cookies et technologies similaires</h2>
              <h3>6.1 Qu'est-ce qu'un cookie ?</h3>
              <p>
                Un cookie est un petit fichier texte placé sur votre appareil lors de votre visite sur notre Site. Il nous permet 
                de vous reconnaître et de mémoriser vos préférences.
              </p>

              <h3>6.2 Comment utilisons-nous les cookies ?</h3>
              <p>Notre Site utilise des cookies pour :</p>
              <ul>
                <li>Assurer le bon fonctionnement du Site</li>
                <li>Mémoriser vos préférences</li>
                <li>Analyser votre utilisation du Site afin de l'améliorer</li>
                <li>Personnaliser votre expérience</li>
              </ul>

              <h3>6.3 Types de cookies que nous utilisons :</h3>
              <ul>
                <li>Cookies essentiels : nécessaires au fonctionnement du Site</li>
                <li>Cookies de performance : nous aident à comprendre comment vous utilisez notre Site</li>
                <li>Cookies de fonctionnalité : mémorisent vos préférences</li>
                <li>Cookies publicitaires : utilisés pour vous présenter des publicités pertinentes</li>
              </ul>

              <h3>6.4 Comment gérer les cookies ?</h3>
              <p>
                Vous pouvez contrôler et/ou supprimer les cookies à votre guise. Vous pouvez supprimer tous les cookies déjà présents 
                sur votre appareil et vous pouvez configurer la plupart des navigateurs pour les empêcher d'en placer. Toutefois, 
                si vous faites cela, vous devrez peut-être ajuster manuellement certaines préférences chaque fois que vous visiterez 
                un site, et certains services et fonctionnalités risquent de ne pas fonctionner.
              </p>

              <h3>6.5 Google Analytics :</h3>
              <p>
                Notre site utilise Google Analytics, un service d'analyse web fourni par Google LLC. Google Analytics utilise des cookies pour nous aider à analyser l'utilisation du site par les visiteurs.
              </p>
              <p>
                Les informations générées par ces cookies concernant votre utilisation de notre site (y compris votre adresse IP) seront transmises et stockées par Google sur des serveurs situés aux États-Unis. Google utilisera ces informations dans le but d'évaluer votre utilisation du site, de compiler des rapports sur l'activité du site à notre intention et de fournir d'autres services relatifs à l'activité du site et à l'utilisation d'Internet.
              </p>
              <p>
                En utilisant ce site, vous consentez au traitement de vos données par Google dans les conditions et pour les finalités décrites ci-dessus.
              </p>

              <h2>7. Vos droits concernant vos données personnelles</h2>
              <p>
                Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants concernant vos 
                données personnelles :
              </p>
              <ul>
                <li>
                  <strong>Droit d'accès</strong> : Vous avez le droit d'obtenir la confirmation que vos données personnelles sont 
                  traitées et d'y accéder.
                </li>
                <li>
                  <strong>Droit de rectification</strong> : Vous avez le droit de demander la correction des données personnelles inexactes.
                </li>
                <li>
                  <strong>Droit à l'effacement</strong> : Vous avez le droit de demander l'effacement de vos données personnelles 
                  dans certaines circonstances.
                </li>
                <li>
                  <strong>Droit à la limitation du traitement</strong> : Vous avez le droit de demander la limitation du traitement 
                  de vos données dans certaines circonstances.
                </li>
                <li>
                  <strong>Droit à la portabilité des données</strong> : Vous avez le droit de recevoir vos données personnelles 
                  dans un format structuré et couramment utilisé.
                </li>
                <li>
                  <strong>Droit d'opposition</strong> : Vous avez le droit de vous opposer au traitement de vos données personnelles 
                  dans certaines circonstances.
                </li>
                <li>
                  <strong>Droit de retirer votre consentement</strong> : Lorsque le traitement est basé sur votre consentement, 
                  vous avez le droit de le retirer à tout moment.
                </li>
              </ul>
              <p>
                Pour exercer l'un de ces droits, veuillez nous contacter à l'adresse suivante : [contact@architecte-ia.fr]
              </p>

              <h2>8. Protection des enfants</h2>
              <p>
                Notre Site et notre Service ne sont pas destinés aux enfants de moins de 16 ans. Nous ne collectons pas sciemment 
                d'informations personnelles auprès d'enfants de moins de 16 ans. Si vous êtes un parent ou un tuteur et que vous 
                pensez que votre enfant nous a fourni des informations personnelles, veuillez nous contacter et nous prendrons 
                des mesures pour supprimer ces informations de nos serveurs.
              </p>

              <h2>9. Transferts internationaux de données</h2>
              <p>
                Vos informations, y compris les données personnelles, peuvent être transférées et conservées sur des ordinateurs 
                situés en dehors de votre état, province, pays ou autre juridiction gouvernementale où les lois sur la protection 
                des données peuvent différer de celles de votre juridiction.
              </p>
              <p>
                Si vous êtes situé en dehors de la France et que vous choisissez de nous fournir des informations, veuillez noter 
                que nous transférons les données, y compris les données personnelles, en France et les traitons dans ce pays.
              </p>
              <p>
                Lorsque nous transférons des données à l'extérieur de l'Espace Économique Européen (EEE), nous nous assurons qu'un 
                niveau de protection adéquat est en place, conforme aux réglementations en vigueur sur la protection des données.
              </p>

              <h2>10. Modifications de notre politique de confidentialité</h2>
              <p>
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Lorsque nous le faisons, 
                nous réviserons la date de mise à jour au bas de cette page. Nous vous encourageons à consulter fréquemment cette 
                page pour rester informé de la manière dont nous protégeons vos informations personnelles.
              </p>

              <h2>11. Contact</h2>
              <p>
                Si vous avez des questions concernant cette politique de confidentialité, les pratiques de ce Site, ou vos 
                relations avec ce Site, veuillez nous contacter à :
              </p>
              <p>
                Architecte IA<br />
                Email : [contact@architecte-ia.fr]
              </p>

              <div className="mt-8 text-sm text-gray-600">
                Dernière mise à jour : 26 mars 2025
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;