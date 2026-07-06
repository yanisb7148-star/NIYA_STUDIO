# Modèle de Contenu : Service

**Type :** Collection Type
**Nom de l'API :** `api::service.service`

## Description
Représente les services proposés par Niya Studio (ex: Développement Web, Marketing Digital, SEO).

## Champs (Attributs)

| Nom du champ | Type Strapi | Requis | Description |
| :--- | :--- | :--- | :--- |
| `title` | String | Oui | Nom du service (ex: "Développement React"). |
| `slug` | UID | Non | Identifiant unique généré depuis le titre pour l'URL. |
| `shortDescription` | Text | Oui | Brève description affichée dans les cartes de service sur la page d'accueil. |
| `fullDescription` | Rich Text | Non | Description détaillée affichée sur la page dédiée du service. |
| `icon` | String | Non | Nom de l'icône Lucide à afficher (ex: "code", "smartphone"). |
| `order` | Integer | Non | Ordre d'affichage (pour trier manuellement). |
| `projects` | Relation | Non | Relation Many-to-Many vers les Projets illustrant ce service. |
