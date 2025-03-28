// src/pages/TermsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Conditions Générales de Vente et d'Utilisation</h1>
            
            <div className="prose prose-blue max-w-none">
              <h2>Préambule</h2>
              <p>
                Les présentes Conditions Générales de Vente et d'Utilisation (ci-après dénommées "CGVU") régissent l'utilisation 
                du service d'application Pomodoro personnalisée (ci-après dénommé le "Service") proposé par Architecte IA 
                (ci-après dénommé le "Vendeur") sur le site web accessible à l'adresse suivante : [votre-domaine.com] 
                (ci-après dénommé le "Site").
              </p>
              <p>
                Les présentes CGVU constituent le contrat entre le Vendeur et toute personne physique ou morale 
                (ci-après dénommée "Client" ou "Utilisateur") souhaitant accéder au Site et/ou commander le Service proposé.
              </p>
              <p>
                Tout accès et/ou utilisation du Site suppose l'acceptation et le respect de l'ensemble des termes des présentes 
                CGVU et leur acceptation inconditionnelle. Elles constituent donc un contrat entre le Vendeur et l'Utilisateur.
              </p>

              <h2>Article 1 : Objet</h2>
              <p>
                Les présentes CGVU ont pour objet de définir les conditions d'accès au Site et les conditions d'utilisation et 
                de vente du Service.
              </p>
              <p>
                Le Service proposé consiste en la création et la mise à disposition d'une application Pomodoro personnalisée 
                selon les spécifications fournies par le Client via un fichier CSV.
              </p>

              <h2>Article 2 : Description du Service</h2>
              <p>
                Le Service consiste en la création d'une application web personnalisée basée sur la méthode Pomodoro, 
                permettant à l'Utilisateur de suivre un planning quotidien défini selon ses besoins spécifiques.
              </p>
              <p>L'application comprend les fonctionnalités suivantes :</p>
              <ul>
                <li>Un planning personnalisé selon les informations fournies par le Client</li>
                <li>Des notifications sonores et visuelles</li>
                <li>Une interface adaptée à tous les appareils (ordinateur, tablette, smartphone)</li>
                <li>Un accès via un lien unique et personnel</li>
              </ul>
              <p>
                Le Service est fourni en l'état et le Vendeur ne garantit pas qu'il soit exempt d'anomalies ou d'erreurs, ni 
                qu'il fonctionnera sans interruption.
              </p>

              <h2>Article 3 : Création d'un compte et processus de commande</h2>
              <h3>3.1 Commande</h3>
              <p>Pour commander le Service, le Client doit suivre le processus suivant :</p>
              <ol>
                <li>Télécharger et compléter le modèle HTML fourni sur le Site</li>
                <li>Exporter les données au format CSV</li>
                <li>Téléverser le fichier CSV sur le Site</li>
                <li>Renseigner son adresse e-mail</li>
                <li>Procéder au paiement du montant indiqué</li>
              </ol>
              <p>Toute commande vaut acceptation des prix et descriptions du Service proposé.</p>

              <h3>3.2 Confirmation de commande</h3>
              <p>
                Une fois le paiement effectué, le Client reçoit un e-mail de confirmation de sa commande à l'adresse 
                électronique qu'il a fournie.
              </p>
              <p>
                Le Vendeur se réserve le droit de refuser ou d'annuler toute commande d'un Client avec lequel il existerait 
                un litige antérieur.
              </p>

              <h2>Article 4 : Prix et modalités de paiement</h2>
              <h3>4.1 Prix</h3>
              <p>
                Le prix du Service est indiqué en euros et toutes taxes comprises. Le prix applicable est celui en vigueur 
                au jour de la commande.
              </p>
              <p>
                Le Vendeur se réserve le droit de modifier ses prix à tout moment, tout en garantissant au Client l'application 
                du prix en vigueur au jour de la commande.
              </p>

              <h3>4.2 Modalités de paiement</h3>
              <p>Le paiement s'effectue en ligne par carte bancaire ou via PayPal.</p>
              <p>Le débit de la carte bancaire est effectué au moment de la validation de la commande par le Client.</p>
              <p>
                En cas de difficultés concernant le paiement, le Client est invité à contacter le Vendeur à l'adresse 
                électronique suivante : [contact@architecte-ia.fr].
              </p>

              <h2>Article 5 : Livraison</h2>
              <p>
                La livraison du Service consiste en l'envoi d'un lien personnel et unique permettant d'accéder à l'application 
                Pomodoro personnalisée.
              </p>
              <p>
                Ce lien est envoyé à l'adresse électronique fournie par le Client lors de sa commande, dans un délai maximum 
                de 24 heures suivant la validation du paiement.
              </p>

              <h2>Article 6 : Droit de rétractation</h2>
              <p>
                Conformément aux dispositions légales en vigueur, le Client dispose d'un délai de quatorze (14) jours à compter 
                de la réception du lien d'accès à l'application pour exercer son droit de rétractation, sans avoir à justifier 
                de motifs ni à payer de pénalités.
              </p>
              <p>
                Cependant, conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne peut être 
                exercé pour les contrats de fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution 
                a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.
              </p>
              <p>
                Ainsi, en accédant à l'application via le lien personnel fourni, le Client reconnaît que l'exécution du Service 
                a commencé et renonce expressément à son droit de rétractation.
              </p>

              <h2>Article 7 : Garanties et responsabilités</h2>
              <h3>7.1 Garanties</h3>
              <p>
                Le Vendeur garantit la conformité du Service aux spécifications mentionnées dans la description du Service et 
                aux informations fournies par le Client dans le fichier CSV.
              </p>

              <h3>7.2 Limitations de responsabilité</h3>
              <p>
                Le Vendeur ne pourra être tenu responsable des dommages directs ou indirects causés au Client ou à des tiers 
                du fait de l'utilisation du Service, tels que notamment perte de données, perte de profits, perte d'exploitation, 
                perte de clientèle, perte de chance, ou tout autre dommage.
              </p>
              <p>
                Le Vendeur ne saurait être tenu pour responsable de l'inexécution du contrat conclu en cas de force majeure, 
                de perturbation ou de grève totale ou partielle notamment des services postaux et moyens de transport et/ou 
                communications, d'inondation, d'incendie, ou d'autres catastrophes naturelles.
              </p>

              <h2>Article 8 : Propriété intellectuelle</h2>
              <p>
                L'ensemble des éléments du Site et de l'application Pomodoro (textes, graphismes, logiciels, photographies, 
                images, vidéos, sons, plans, logos, marques, etc.) sont la propriété exclusive du Vendeur ou de ses partenaires.
              </p>
              <p>
                Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de 
                ces différents éléments est strictement interdite sans l'accord exprès par écrit du Vendeur.
              </p>

              <h2>Article 9 : Données personnelles</h2>
              <p>
                Les informations et données concernant le Client sont nécessaires à la gestion de sa commande et à ses relations 
                commerciales avec le Vendeur. Ces informations et données sont également conservées à des fins de sécurité et 
                pour respecter les obligations légales et réglementaires.
              </p>
              <p>
                Conformément à la loi informatique et libertés du 6 janvier 1978 modifiée, et au Règlement Général sur la 
                Protection des Données (RGPD), le Client dispose d'un droit d'accès, de rectification, d'effacement, de limitation, 
                de portabilité et d'opposition aux données personnelles le concernant. Pour exercer ces droits, le Client doit 
                adresser un e-mail à l'adresse suivante : [contact@architecte-ia.fr].
              </p>
              <p>
                Pour plus d'informations sur la manière dont nous traitons vos données, veuillez consulter notre 
                <Link to="/privacy" className="text-blue-600 hover:underline"> Politique de Confidentialité</Link>.
              </p>

              <h2>Article 10 : Modifications des CGVU</h2>
              <p>
                Le Vendeur se réserve le droit de modifier les CGVU à tout moment. Les CGVU applicables sont celles en vigueur 
                à la date de la commande du Client.
              </p>

              <h2>Article 11 : Loi applicable et juridiction compétente</h2>
              <p>Les présentes CGVU sont soumises à l'application du droit français.</p>
              <p>
                En cas de litige ou de réclamation, le Client s'adressera en priorité au Vendeur pour obtenir une solution amiable.
              </p>
              <p>
                À défaut d'accord amiable, tout litige relatif à l'existence, l'interprétation, l'exécution ou la rupture du 
                contrat conclu entre le Vendeur et le Client, sera soumis à la compétence exclusive des tribunaux français.
              </p>

              <h2>Article 12 : Contact</h2>
              <p>
                Pour toute question relative aux présentes CGVU ou au Service, vous pouvez nous contacter à l'adresse suivante : 
                [contact@architecte-ia.fr]
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

export default TermsPage;