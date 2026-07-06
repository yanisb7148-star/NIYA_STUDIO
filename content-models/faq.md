# Modèle de Contenu : FAQ

**Type :** Collection Type
**Nom de l'API :** `api::faq.faq`

## Description
Questions fréquemment posées par les clients et visiteurs du site.

## Champs (Attributs)

| Nom du champ | Type Strapi | Requis | Description |
| :--- | :--- | :--- | :--- |
| `question` | String | Oui | La question (ex: "Combien coûte un site web ?"). |
| `answer` | Text | Oui | La réponse détaillée. |
| `order` | Integer | Non | Ordre d'affichage dans la liste (tri ascendant). |
