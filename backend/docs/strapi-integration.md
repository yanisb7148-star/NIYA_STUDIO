# Intégration de Strapi

Ce document explique comment intégrer le CMS Strapi avec l'application front-end (React/Vite) existante.

## 1. Pré-requis et Configuration Initiale

1.  **Créer un projet Strapi :**
    Dans un dossier séparé (ex: `backend`), initialisez Strapi :
    ```bash
    npx create-strapi-app@latest backend --quickstart
    ```
2.  **Importer les schémas :**
    Utilisez les fichiers JSON disponibles dans le dossier `/schemas` de ce dépôt pour créer vos content-types dans Strapi de manière programmatique, ou utilisez l'interface d'administration de Strapi (Content-Type Builder) en vous basant sur la documentation des modèles (`/content-models`).
3.  **Configurer les permissions :**
    Allez dans `Settings > Roles > Public` dans Strapi et cochez les actions `find` et `findOne` pour :
    - `Project`
    - `Service`
    - `Faq`
    - `Pricing-plan`
    - `Global`

## 2. Consommer l'API Strapi depuis React

L'application doit utiliser l'API REST de Strapi (ou GraphQL, si le plugin est installé).

### A. Variables d'Environnement
Ajoutez l'URL de l'API Strapi dans le fichier `.env` du front-end :
```env
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=votre_token_generé_depuis_strapi
```

### B. Créer un Client d'API (Helper)
Dans `src/lib/api.ts` (ou un emplacement similaire), créez un helper pour requêter Strapi de façon réutilisable.

```typescript
// Exemple de fonction utilitaire
export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  // Construire l'URL avec qs
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${import.meta.env.VITE_STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

  // Fusionner les headers par défaut et fournis
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
    },
    ...options,
  };

  // Exécuter la requête
  const response = await fetch(requestUrl, mergedOptions);

  // Gérer l'erreur
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`Erreur lors de la requête API Strapi`);
  }
  const data = await response.json();
  return data;
}
```

### C. Exemple d'utilisation dans un composant (ex: `Services.tsx`)

```typescript
import { useEffect, useState } from 'react';
import { fetchAPI } from '../lib/api';

export function ServiceCards() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function loadServices() {
      const res = await fetchAPI('/services', { sort: ['order:asc'], populate: '*' });
      setServices(res.data);
    }
    loadServices();
  }, []);

  return (
    // ... mapping sur `services`
  );
}
```

## 3. Gestion des Images (Media Library)
Assurez-vous de préfixer les URL des images provenant de Strapi avec `import.meta.env.VITE_STRAPI_URL` si le backend et le frontend ne sont pas sur le même domaine, et si vous n'utilisez pas de provider externe (comme Cloudinary ou AWS S3).
