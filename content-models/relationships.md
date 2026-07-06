# Relations entre les Modèles de Contenu (Strapi)

Ce document décrit les relations entre les différents types de contenu (collections et single types) dans l'architecture Strapi du projet Niya Studio.

## Architecture Générale

Le projet est structuré autour de types de contenus indépendants mais interconnectés. La relation principale concerne les **Services** et les **Projets**.

### 1. Projets (Project) ↔ Services (Service)
*   **Type de relation :** Many-to-Many (Plusieurs à Plusieurs)
*   **Description :** Un projet peut utiliser/illustrer plusieurs services (ex: Développement Web + SEO). Un service peut être associé à plusieurs projets réalisés.
*   **Implémentation Strapi :**
    *   Dans `Project` : Champ `services` pointant vers `api::service.service`.
    *   Dans `Service` : Champ `projects` pointant vers `api::project.project` (relation inversée).

### 2. Modèles Indépendants
Les modèles suivants n'ont pas de relation directe avec d'autres collections, afin de garder une structure modulaire et facilement requêtable par le front-end React.

*   **FAQ :** Collection simple. Ordonnée manuellement via un champ `order`.
*   **Pricing Plan (Tarifs) :** Collection simple. Ordonnée via un champ `order`.
*   **Global (Paramètres globaux) :** Single Type. Contient les métadonnées SEO, les informations de contact, et le texte du Hero.

## Bonnes Pratiques de Fetching (Front-end)

Lorsque vous requêtez l'API Strapi (via REST ou GraphQL) dans le front-end React :
1.  **Peuplement (Population) :** Pensez à "peupler" les relations. Par exemple, lorsque vous requêtez les projets, ajoutez le paramètre `?populate=services,thumbnail` pour récupérer les images et les services associés au projet.
2.  **Filtrage :** Pour afficher les projets liés à un service spécifique sur la page d'un service, filtrez par ID du service : `/api/projects?filters[services][id][$eq]=1`.
