# Modèle de Contenu : Pricing Plan (Tarifs)

**Type :** Collection Type
**Nom de l'API :** `api::pricing-plan.pricing-plan`

## Description
Les différents forfaits tarifaires proposés.

## Champs (Attributs)

| Nom du champ | Type Strapi | Requis | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Oui | Nom du forfait (ex: "Basique", "Pro"). |
| `price` | Decimal | Non | Prix du forfait. Laisser vide pour "Sur devis". |
| `currency` | String | Non | Devise (par défaut EUR ou €, $, etc.). |
| `isPopular` | Boolean | Non | Permet de mettre en avant un forfait spécifique. |
| `features` | JSON | Non | Liste des fonctionnalités (tableau de chaînes de caractères). |
| `order` | Integer | Non | Ordre d'affichage des cartes (gauche à droite). |
