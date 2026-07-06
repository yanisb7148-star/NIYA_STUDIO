# Architecture du Projet (Front-end & CMS)

## Structure des Dossiers

Le projet est divisé pour une séparation claire des responsabilités :

*   `/src` : Code source de l'application front-end (React, Tailwind CSS).
*   `/schemas` : Schémas JSON d'architecture des données (spécifiques à Strapi). Utilisés pour la migration ou la compréhension rapide du backend.
*   `/content-models` : Documentation Markdown des types de contenus pour faciliter la communication avec les développeurs backend et les éditeurs de contenu.
*   `/docs` : Documentation technique globale (Intégration, Déploiement, Architecture).

## Workflow de Développement avec Strapi

1.  **Développement Front-end (Local) :**
    Les développeurs front-end peuvent utiliser des données "mockées" ou un serveur Strapi de développement pour lier les composants à des données dynamiques.
2.  **Gestion de Contenu :**
    Le Content-Type Builder de Strapi permet de refléter exactement ce qui se trouve dans `/schemas`. Tout nouveau besoin métier (ex: un nouveau composant "Témoignages") doit suivre ce cycle :
    *   Créer/Mettre à jour le Markdown dans `/content-models`.
    *   Créer/Mettre à jour le JSON dans `/schemas`.
    *   Créer le type de contenu dans Strapi via l'interface d'administration.
    *   Mettre à jour l'API fetch sur le Front-end.

## Extensibilité et Maintenance
En ayant découplé la définition des données (`/schemas`, `/content-models`) du code lui-même, il est plus facile de :
- Transférer la configuration Strapi entre les environnements (Dev, Staging, Prod).
- Migrer vers un autre CMS Headless dans le futur si nécessaire (les modèles théoriques restent valides).
- Permettre à une équipe backend de construire le Strapi sans dépendre du code React (et inversement).
