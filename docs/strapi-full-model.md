# Modèle de Données Complet Strapi (Architecture Optimale)

Ce document décrit l'architecture complète recommandée pour le CMS Strapi, basée sur l'analyse de tous les composants de l'application Niya Studio. Cette structure garantit une maintenabilité totale sans avoir à modifier le code React à l'avenir.

## 1. Composants Réutilisables (Strapi Components)

Les composants Strapi permettent de structurer des blocs de données répétables au sein des Single Types et Collection Types.

*   **`shared.seo`**
    *   `metaTitle` (String)
    *   `metaDescription` (Text)
    *   `shareImage` (Media)
*   **`shared.button`**
    *   `label` (String)
    *   `url` (String)
    *   `variant` (Enumeration: primary, secondary, outline)
*   **`blocks.process_step`** (Utilisé dans la section Process)
    *   `stepNumber` (String) - ex: "01"
    *   `title` (String)
    *   `description` (Text)
    *   `tags` (JSON ou relation) - ex: ["UX", "UI"]
*   **`blocks.feature_item`** (Utilisé pour Why Niya, Autonomie)
    *   `title` (String)
    *   `description` (Text)
    *   `icon` (String) - Nom de l'icône Lucide
*   **`blocks.media_item`** (Utilisé dans les modales de projets)
    *   `title` (String)
    *   `description` (Text)
    *   `file` (Media) - Image ou Vidéo
    *   `type` (Enumeration: image, video)

## 2. Types Uniques (Single Types)

Utilisés pour les configurations globales et les pages uniques (comme la landing page).

### `api::global.global` (Paramètres Globaux)
*   `siteName` (String)
*   `seo` (Component: shared.seo)
*   `contactEmail` (Email)
*   `socialLinks` (JSON) - ex: { "instagram": "url", "linkedin": "url" }
*   `footerText` (String) - ex: "Made with passion in Paris"

### `api::homepage.homepage` (Contenu de la Page d'Accueil)
Regroupe tous les textes statiques de la page d'accueil.
*   **Hero Section**
    *   `heroTitle1` (String)
    *   `heroTitle2` (String)
    *   `heroDescription` (Text)
    *   `heroPrimaryButton` (Component: shared.button)
    *   `heroSecondaryButton` (Component: shared.button)
*   **Why Niya Section**
    *   `whyBadge` (String)
    *   `whyTitle1` (String)
    *   `whyTitle2` (String)
    *   `whyQuote` (Text)
    *   `whyItems` (Repeatable Component: blocks.feature_item)
*   **Process Section**
    *   `processBadge` (String)
    *   `processTitle1` (String)
    *   `processTitle2` (String)
    *   `processDescription` (Text)
    *   `processSteps` (Repeatable Component: blocks.process_step)
*   **Tech Stack Section**
    *   `techBadge` (String)
    *   `techTitle1` (String)
    *   `techTitle2` (String)
    *   `techDescription` (Text)

## 3. Types de Collection (Collection Types)

Entités indépendantes et répétables.

### `api::project.project` (Projets / Portfolio)
*   `title` (String)
*   `slug` (UID)
*   `description` (Rich Text)
*   `thumbnail` (Media)
*   `mediaGallery` (Repeatable Component: blocks.media_item) - Pour la modale détaillée
*   `liveUrl` (String)
*   `services` (Relation: Many-to-Many avec `api::service.service`)

### `api::service.service` (Services détaillés)
*   `title` (String)
*   `slug` (UID)
*   `shortDescription` (Text)
*   `fullDescription` (Rich Text)
*   `icon` (String)
*   `order` (Integer)
*   `features` (Repeatable Component: blocks.feature_item)
*   `tools` (Relation: Many-to-Many avec `api::technology.technology`)

### `api::technology.technology` (Outils / Tech Stack)
(Pour la bannière défilante Marquee)
*   `name` (String)
*   `icon` (Media ou String SVG)
*   `colorCode` (String) - Code Hex ex: "#3ECF8E"
*   `order` (Integer)

### `api::faq.faq` (Questions Fréquentes)
*   `question` (String)
*   `answer` (Text)
*   `order` (Integer)

### `api::pricing_plan.pricing_plan` (Forfaits)
*   `name` (String)
*   `price` (Decimal)
*   `currency` (String)
*   `isPopular` (Boolean)
*   `features` (JSON ou tableau de chaînes)
*   `callToAction` (Component: shared.button)
*   `order` (Integer)

### `api::testimonial.testimonial` (Témoignages)
*   `authorName` (String)
*   `role` (String)
*   `company` (String)
*   `content` (Text)
*   `avatar` (Media)
