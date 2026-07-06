# Modèle de Contenu : Project (Projet)

**Type :** Collection Type
**Nom de l'API :** `api::project.project`

## Description
Représente les projets du portfolio réalisés par Niya Studio.

## Champs (Attributs)

| Nom du champ | Type Strapi | Requis | Description |
| :--- | :--- | :--- | :--- |
| `title` | String | Oui | Nom du projet / client. |
| `slug` | UID | Non | Identifiant unique généré depuis le titre. |
| `description` | Rich Text | Non | Détails du projet, défis rencontrés et solutions apportées. |
| `thumbnail` | Media | Non | Image de couverture (Screenshot, mockup). |
| `liveUrl` | String | Non | URL du projet en ligne. |
| `services` | Relation | Non | Relation Many-to-Many indiquant quels services ont été utilisés. |
