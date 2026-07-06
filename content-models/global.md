# Modèle de Contenu : Global (Paramètres du site)

**Type :** Single Type
**Nom de l'API :** `api::global.global`

## Description
Données uniques et globales configurant le site web (Métadonnées, Footer, Contact centralisé).

## Champs (Attributs)

| Nom du champ | Type Strapi | Requis | Description |
| :--- | :--- | :--- | :--- |
| `siteName` | String | Oui | Nom global du site (ex: "Niya Studio"). |
| `seoDescription` | Text | Non | Meta description pour les moteurs de recherche. |
| `contactEmail` | String | Non | Adresse email de contact générique. |
| `heroHeadline` | String | Non | Titre principal de la page d'accueil. |
| `heroSubheadline` | Text | Non | Sous-titre de la page d'accueil. |
| `socialLinks` | JSON | Non | Liens vers les réseaux sociaux (ex: `{ "instagram": "...", "linkedin": "..." }`). |
