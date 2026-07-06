import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "fr" | "en";

interface TranslationType {
  nav: {
    services: string;
    projects: string;
    process: string;
    faq: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    desc: string;
    btnWorks: string;
    btnServices: string;
  };
  scrollShowcase: {
    caseStudy: string;
    items: {
      title: string;
      subtitle: string;
    }[];
  };
  services: {
    heading: string;
    headingSparkle: string;
    badge: string;
    list: {
      text: string;
      images: { src: string; alt: string; }[];
    }[];
  };
  techStack: {
    badge: string;
    title1: string;
    title2: string;
    desc: string;
  };
  serviceCards: {
    titleWebsite: string;
    descWebsite: string;
    titleShopify: string;
    descShopify: string;
    titleBrand: string;
    descBrand: string;
    titleMotion: string;
    descMotion: string;
    titleSeo: string;
    descSeo: string;
    titleStrategy: string;
    descStrategy: string;
    learnMore: string;
  };
  detailedServices: {
    badge: string;
    title: string;
    categories: {
      num: string;
      title: string;
      features: string[];
      options: string;
    }[];
    payments: {
      title: string;
      desc: string;
      methods: string[];
    };
    autonomy: {
      title: string;
      desc: string;
      points: { title: string; desc: string; }[];
    };
  };
  projects: {
    badge: string;
    title: string;
    works: string;
    viewProject: string;
    viewCaseStudy: string;
    items: {
      id: number;
      type: string;
      title: string;
      desc: string;
      url: string;
      tags: string[];
      span: string;
    }[];
  };
  process: {
    badge: string;
    title1: string;
    title2: string;
    desc: string;
    steps: {
      num: string;
      title: string;
      desc: string;
      tags: string[];
    }[];
  };
  whyNiya: {
    badge: string;
    title1: string;
    title2: string;
    items: {
      label: string;
      value: string;
    }[];
    quote: string;
  };
  faq: {
    badge: string;
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  contact: {
    badge: string;
    title1: string;
    title2: string;
    quote: string;
    sendInquiry: string;
    schedule: string;
  };
  booking: {
    badge: string;
    title1: string;
    title2: string;
    quote: string;
    cta: string;
    visio: string;
    consultation: string;
    responds: string;
  };
  footer: {
    madeIn: string;
  };
}

const translations: Record<Language, TranslationType> = {
  fr: {
    nav: {
      services: "Services",
      projects: "Projets",
      process: "Processus",
      faq: "FAQ",
      contact: "Contact",
      cta: "Lancer un Projet"
    },
    hero: {
      badge: "L'excellence digitale redéfinie",
      title1: "Niya",
      title2: "Studio",
      desc: "Créateur de sites web en freelance et expert en branding. Conception d'expériences numériques d'exception, sites vitrines, e-commerce sur mesure, et optimisation SEO pour propulser votre marque.",
      btnWorks: "Explorer les projets",
      btnServices: "Services"
    },
    scrollShowcase: {
      caseStudy: "Étude de Cas 0",
      items: [
        {
          title: "Branding Cinématique",
          subtitle: "Récit immersif et identité narrative pour marques de luxe."
        },
        {
          title: "UI Futuriste",
          subtitle: "Interfaces numériques de pointe conçues avec une précision chirurgicale."
        },
        {
          title: "Motion Abstrait",
          subtitle: "Mouvements fluides et dynamiques qui captivent instantanément l'attention."
        },
        {
          title: "Web de Demain",
          subtitle: "Développement créatif à haute performance et architectures web novatrices."
        }
      ]
    },
    services: {
      badge: "L'expertise",
      heading: "Spécialisés dans les",
      headingSparkle: "solutions de haut standing.",
      list: [
        {
          text: "Design Web",
          images: [
            { src: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800", alt: "Design Web 1" },
            { src: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800", alt: "Design Web 2" }
          ]
        },
        {
          text: "Branding",
          images: [
            { src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800", alt: "Branding 1" },
            { src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800", alt: "Branding 2" }
          ]
        },
        {
          text: "E-Commerce",
          images: [
            { src: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800", alt: "E-Commerce 1" },
            { src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800", alt: "E-Commerce 2" }
          ]
        },
        {
          text: "Motion Design",
          images: [
            { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800", alt: "Motion 1" },
            { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800", alt: "Motion 2" }
          ]
        },
        {
          text: "UI/UX",
          images: [
            { src: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800", alt: "UI/UX 1" },
            { src: "https://images.unsplash.com/photo-1613909209432-0b0a8eaf2834?q=80&w=800", alt: "UI/UX 2" }
          ]
        },
        {
          text: "Développement",
          images: [
            { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800", alt: "Development 1" },
            { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800", alt: "Development 2" }
          ]
        }
      ]
    },
    techStack: {
      badge: "[ STACK CRÉATIVE v2.0 ]",
      title1: "Conçue avec une",
      title2: "Précision Absolue.",
      desc: "« La combinaison des frameworks créatifs les plus avancés et des architectures haut de gamme pour bâtir les héritages numériques de demain. »"
    },
    serviceCards: {
      titleWebsite: "CRÉATION DE SITES WEB",
      descWebsite: "Des sites web d'avant-garde développés avec des technologies de pointe comme React et Next.js.",
      titleShopify: "DÉVELOPPEMENT SHOPIFY",
      descShopify: "Des expériences e-commerce d'exception parfaitement optimisées pour des taux de conversion premium.",
      titleBrand: "IDENTITÉ DE MARQUE",
      descBrand: "Des chartes graphiques mémorables et des écosystèmes visuels qui définissent les leaders du marché.",
      titleMotion: "MOTION DESIGN",
      descMotion: "Donner vie au digital par le biais d'animations 2D/3D enveloppantes et interactives.",
      titleSeo: "OPTIMISATION SÉCURISÉE & SEO",
      descSeo: "Positionnement stratégique et optimisation structurelle pour une visibilité et un impact maximaux.",
      titleStrategy: "STRATÉGIE CRÉATIVE",
      descStrategy: "Analyse approfondie de votre secteur et planification stratégique pour guider votre expansion numérique.",
      learnMore: "En savoir plus"
    },
    detailedServices: {
      badge: "[ Expertise Détaillée ]",
      title: "Nos Services",
      categories: [
        {
          num: "01",
          title: "Site Vitrine",
          features: [
            "Site clé en main",
            "CMS (Sanity ou équivalent)",
            "Hébergement (Vercel, OVH, etc.)",
            "SEO, performance, responsive",
            "Animations, composants réutilisables"
          ],
          options: "Options : 3D, WebGL, animations avancées"
        },
        {
          num: "02",
          title: "Site E-commerce",
          features: [
            "Shopify OU WordPress (WooCommerce) OU Next.js + Vercel",
            "Design sur mesure",
            "Paiement sécurisé",
            "Gestion produits / commandes",
            "SEO & performance"
          ],
          options: "Options : configurateur produit, 3D, CRM, automatisation"
        },
        {
          num: "03",
          title: "Plateforme sur mesure",
          features: [
            "SaaS, marketplace, dashboards, outils métier",
            "Authentification, API, back-office",
            "CRM personnalisé",
            "Systèmes complexes",
            "Temps réel, multi-langue"
          ],
          options: "UX avancée + animations + 3D + WebGL"
        }
      ],
      payments: {
        title: "Solutions de paiement",
        desc: "Une intégration fluide et sécurisée pour garantir la meilleure expérience transactionnelle à vos utilisateurs.",
        methods: ["Stripe", "PayPal", "Apple Pay", "Google Pay", "Paiement CB", "Paiement en plusieurs fois"]
      },
      autonomy: {
        title: "Autonomie & gestion du site",
        desc: "Prenez le contrôle total de votre écosystème numérique, sans dépendance technique.",
        points: [
          { title: "CMS Modernes", desc: "Intégration de solutions comme Sanity, WordPress, Payload ou Strapi." },
          { title: "Mise à jour Facile", desc: "Modification intuitive du contenu (textes, images, pages, produits)." },
          { title: "Formation", desc: "Formation complète fournie à la livraison de chaque projet." },
          { title: "Maintenance", desc: "Option de maintenance disponible si besoin, mais non obligatoire." }
        ]
      }
    },
    projects: {
      badge: "[ Projets Sélectionnés ]",
      title: "Œuvres",
      works: "Sélectionnées.",
      viewProject: "Voir le Projet",
      viewCaseStudy: "Consulter l'Étude",
      items: [
        {
          id: 1,
          type: 'image',
          title: 'Aura Luxury',
          desc: 'Expérience web et branding haut de gamme pour l\'élite mondiale.',
          url: 'https://images.unsplash.com/photo-1600607687940-4e524cb35097?q=80&w=1200',
          tags: ['Branding', 'Design Web'],
          span: 'md:col-span-2 md:row-span-4'
        },
        {
          id: 2,
          type: 'image',
          title: 'Vortex Tech',
          desc: 'Interface produit interactive futuriste pour des technologies pionnières.',
          url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200',
          tags: ['UI/UX', 'Produit'],
          span: 'md:col-span-1 md:row-span-2'
        },
        {
          id: 3,
          type: 'image',
          title: 'Niya Streetwear',
          desc: 'Identité de marque streetwear brisant les conventions visuelles.',
          url: 'https://images.unsplash.com/photo-1552061332-ca0dbada46a1?q=80&w=1200',
          tags: ['Identité', 'Motion'],
          span: 'md:col-span-1 md:row-span-4'
        },
        {
          id: 4,
          type: 'image',
          title: 'Lumière Fashion',
          desc: 'Design éditorial hautement minimaliste pour maisons de haute couture.',
          url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200',
          tags: ['Éditorial', 'Luxe'],
          span: 'md:col-span-1 md:row-span-2'
        },
        {
          id: 5,
          type: 'image',
          title: 'Echo Music',
          desc: 'Plateforme interactive d\'expériences audiovisuelles immersives.',
          url: 'https://images.unsplash.com/photo-1514525253361-bee8a1874a13?q=80&w=1200',
          tags: ['Expérience', 'Interactif'],
          span: 'md:col-span-2 md:row-span-2'
        },
        {
          id: 6,
          type: 'image',
          title: 'Zen Restaurant',
          desc: 'Branding culturel et sensoriel de prestige pour la haute gastronomie.',
          url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200',
          tags: ['Branding', 'Gastronomie'],
          span: 'md:col-span-1 md:row-span-2'
        }
      ]
    },
    process: {
      badge: "Méthodologie",
      title1: "Le Processus",
      title2: "Créatif.",
      desc: "Une démarche méthodique pour concevoir des expériences numériques de renommée mondiale.",
      steps: [
        {
          num: "01",
          title: "Découverte",
          desc: "Analyse en profondeur de votre marque, de votre audience et de vos objectifs pour bâtir un socle stratégique solide.",
          tags: ["Analyse de Marché", "Recherche Utilisateur", "Audit de Marque"]
        },
        {
          num: "02",
          title: "Stratégie",
          desc: "Définition du positionnement singulier et du cadre conceptuel qui distingueront votre nom au milieu du bruit numérique.",
          tags: ["Positionnement", "Stratégie UX", "Récit de Marque"]
        },
        {
          num: "03",
          title: "Design",
          desc: "Création d'une identité graphique mémorable et d'interfaces utilisateur immersives suscitant une réelle résonance émotionnelle.",
          tags: ["Identité", "Design UI", "3D & Motion"]
        },
        {
          num: "04",
          title: "Développement",
          desc: "Concrétisation technique de la vision par le biais d'un code optimisé, d'animations fluides et d'architectures résilientes.",
          tags: ["Next.js", "Dév Créatif", "Performance"]
        },
        {
          num: "05",
          title: "Lancement",
          desc: "Transition soignée vers le marché, suivie d'optimisations continues et ciblées pour nourrir une croissance pérenne.",
          tags: ["Déploiement", "SEO", "Expansion"]
        }
      ]
    },
    whyNiya: {
      badge: "L'Avantage",
      title1: "Performance",
      title2: "Inégalée.",
      items: [
        { label: "Focus Design", value: "Ultra Moderne" },
        { label: "Vitesse", value: "99/100" },
        { label: "Développement", value: "Sur Mesure" },
        { label: "Philosophie", value: "Centré Humain" },
        { label: "Accompagnement", value: "Stratégique 24/7" },
        { label: "Optimisation", value: "SEO Premium" }
      ],
      quote: "« Bien plus que de simples sites internet : la création de véritables actifs numériques performants qui propulsent votre croissance et matérialisent votre histoire. »"
    },
    faq: {
      badge: "Questions Fréquentes",
      title: "FAQ",
      items: [
        {
          question: "Quels services de création de sites proposez-vous ?",
          answer: "Je conçois des sites vitrines, des plateformes e-commerce sur mesure, ainsi que des applications web complexes. Le design est centré sur vos objectifs (conversion, visibilité, image de marque) et chaque site est optimisé pour les performances et le SEO."
        },
        {
          question: "Comment se déroule le processus de collaboration ?",
          answer: "Tout commence par un appel de découverte pour bien comprendre votre projet. Ensuite, je propose un cahier des charges, une phase de maquettage (UI/UX) pour validation, suivie du développement et enfin, du déploiement avec un accompagnement post-lancement."
        },
        {
          question: "Combien coûte la création d'un site web ?",
          answer: "Le tarif dépend de la complexité du projet, des fonctionnalités demandées et du niveau de design souhaité. Chaque projet fait l'objet d'un devis personnalisé et transparent après notre premier échange."
        },
        {
          question: "Combien de temps faut-il pour créer un site ?",
          answer: "La création d'un site web prend environ 2 semaines pour un site classique et 3 à 4 semaines si c'est un site complexe. Un calendrier détaillé vous est fourni lors du devis."
        },
        {
          question: "Proposez-vous la maintenance après le lancement ?",
          answer: "Oui, je propose des forfaits de maintenance incluant les mises à jour de sécurité, la sauvegarde de vos données, et un accompagnement continu pour faire évoluer votre projet (SEO, ajouts de pages, etc.)."
        }
      ]
    },
    contact: {
      badge: "Prêt à démarrer ?",
      title1: "Chaque Projet",
      title2: "est unique.",
      quote: "« Façonnons ensemble quelque chose d'absolument exceptionnel. »",
      sendInquiry: "Envoyez votre brief à tout moment.",
      schedule: "Lun - Ven, 9h00 - 18h00 EST"
    },
    booking: {
      badge: "Prise de rendez-vous",
      title1: "Discutons",
      title2: "de votre projet.",
      quote: "« Planifiez un entretien de découverte gratuit et commençons à dessiner vos ambitions futures. »",
      cta: "Prendre un RDV",
      visio: "Planifier une visioconférence",
      consultation: "Prise de rendez-vous",
      responds: "Réponse habituelle sous 24h"
    },
    footer: {
      madeIn: "CRÉÉ PAR NIYA STUDIO"
    }
  },
  en: {
    nav: {
      services: "Services",
      projects: "Projects",
      process: "Process",
      faq: "FAQ",
      contact: "Contact",
      cta: "Start a Project"
    },
    hero: {
      badge: "Redefining Digital Craft",
      title1: "Niya",
      title2: "Studio",
      desc: "Freelance web developer and branding expert. Crafting premium digital experiences, showcase websites, bespoke e-commerce, and high-end SEO optimization for the next generation of brands.",
      btnWorks: "Explore Work",
      btnServices: "Services"
    },
    scrollShowcase: {
      caseStudy: "Case Study 0",
      items: [
        {
          title: "Cinematic Branding",
          subtitle: "Immersive narrative for luxury brands."
        },
        {
          title: "Futuristic UI",
          subtitle: "Precision-engineered digital interfaces."
        },
        {
          title: "Abstract Motion",
          subtitle: "Fluid movement that captures attention."
        },
        {
          title: "Next-Gen Web",
          subtitle: "High-performance creative development."
        }
      ]
    },
    services: {
      badge: "Expertise",
      heading: "Specialized in",
      headingSparkle: "high-end solutions.",
      list: [
        {
          text: "Web Design",
          images: [
            { src: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800", alt: "Web Design 1" },
            { src: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800", alt: "Web Design 2" }
          ]
        },
        {
          text: "Branding",
          images: [
            { src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800", alt: "Branding 1" },
            { src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800", alt: "Branding 2" }
          ]
        },
        {
          text: "E-Commerce",
          images: [
            { src: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800", alt: "E-Commerce 1" },
            { src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800", alt: "E-Commerce 2" }
          ]
        },
        {
          text: "Motion Design",
          images: [
            { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800", alt: "Motion 1" },
            { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800", alt: "Motion 2" }
          ]
        },
        {
          text: "UI/UX",
          images: [
            { src: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800", alt: "UI/UX 1" },
            { src: "https://images.unsplash.com/photo-1613909209432-0b0a8eaf2834?q=80&w=800", alt: "UI/UX 2" }
          ]
        },
        {
          text: "Development",
          images: [
            { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800", alt: "Development 1" },
            { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800", alt: "Development 2" }
          ]
        }
      ]
    },
    techStack: {
      badge: "[ CREATIVE STACK v2.0 ]",
      title1: "Engineered with",
      title2: "Precision.",
      desc: "« Harnessing the most advanced creative frameworks and premium architectures to build the next generation of digital legacies. »"
    },
    serviceCards: {
      titleWebsite: "WEBSITE CREATION",
      descWebsite: "Next-gen websites built with modern technologies like React and Next.js.",
      titleShopify: "SHOPIFY DEVELOPMENT",
      descShopify: "Premium e-commerce experiences tailored for high-end conversion.",
      titleBrand: "BRAND IDENTITY",
      descBrand: "Memorable visual languages that define market leaders.",
      titleMotion: "MOTION DESIGN",
      descMotion: "Bringing your digital presence to life with immersive 3D and 2D animations.",
      titleSeo: "SEO OPTIMIZATION",
      descSeo: "Strategic search engine positioning for maximum visibility and impact.",
      titleStrategy: "CREATIVE STRATEGY",
      descStrategy: "In-depth market analysis and strategic planning for your digital growth.",
      learnMore: "Learn more"
    },
    detailedServices: {
      badge: "[ Detailed Expertise ]",
      title: "Our Services",
      categories: [
        {
          num: "01",
          title: "Showcase Website",
          features: [
            "Turnkey website",
            "CMS (Sanity or equivalent)",
            "Hosting (Vercel, AWS, etc.)",
            "SEO, performance, responsive",
            "Animations, reusable components"
          ],
          options: "Options: 3D, WebGL, advanced animations"
        },
        {
          num: "02",
          title: "E-commerce Website",
          features: [
            "Shopify OR WordPress (WooCommerce) OR Next.js + Vercel",
            "Custom design",
            "Secure payment",
            "Product / order management",
            "SEO & performance"
          ],
          options: "Options: product configurator, 3D, CRM, automation"
        },
        {
          num: "03",
          title: "Custom Platform",
          features: [
            "SaaS, marketplace, dashboards, business tools",
            "Authentication, API, back-office",
            "Custom CRM",
            "Complex systems",
            "Real-time, multi-language"
          ],
          options: "Advanced UX + animations + 3D + WebGL"
        }
      ],
      payments: {
        title: "Payment Solutions",
        desc: "A seamless and secure integration to ensure the best transactional experience for your users.",
        methods: ["Stripe", "PayPal", "Apple Pay", "Google Pay", "Credit Card", "Installments"]
      },
      autonomy: {
        title: "Autonomy & Site Management",
        desc: "Take full control of your digital ecosystem, without technical dependence.",
        points: [
          { title: "Modern CMS", desc: "Integration of solutions like Sanity, WordPress, Payload, or Strapi." },
          { title: "Easy Updates", desc: "Intuitive modification of content (texts, images, pages, products)." },
          { title: "Training", desc: "Comprehensive training provided upon delivery of each project." },
          { title: "Maintenance", desc: "Maintenance option available if needed, but not mandatory." }
        ]
      }
    },
    projects: {
      badge: "[ Selected Projects ]",
      title: "Selected",
      works: "Works.",
      viewProject: "View Project",
      viewCaseStudy: "View Case Study",
      items: [
        {
          id: 1,
          type: 'image',
          title: 'Aura Luxury',
          desc: 'Premium high-end branding and web experience for global elite.',
          url: 'https://images.unsplash.com/photo-1600607687940-4e524cb35097?q=80&w=1200',
          tags: ['Branding', 'Web Design'],
          span: 'md:col-span-2 md:row-span-4'
        },
        {
          id: 2,
          type: 'image',
          title: 'Vortex Tech',
          desc: 'Futuristic product interface for cutting-edge technologies.',
          url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200',
          tags: ['UI/UX', 'Product'],
          span: 'md:col-span-1 md:row-span-2'
        },
        {
          id: 3,
          type: 'image',
          title: 'Niya Streetwear',
          desc: 'Streetwear brand identity that breaks visual boundaries.',
          url: 'https://images.unsplash.com/photo-1552061332-ca0dbada46a1?q=80&w=1200',
          tags: ['Identity', 'Motion'],
          span: 'md:col-span-1 md:row-span-4'
        },
        {
          id: 4,
          type: 'image',
          title: 'Lumiere Fashion',
          desc: 'Minimalist editorial design for luxury fashion house.',
          url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200',
          tags: ['Editorial', 'Luxury'],
          span: 'md:col-span-1 md:row-span-2'
        },
        {
          id: 5,
          type: 'image',
          title: 'Echo Music',
          desc: 'Immersive auditory and visual experience platform.',
          url: 'https://images.unsplash.com/photo-1514525253361-bee8a1874a13?q=80&w=1200',
          tags: ['Experience', 'Interactive'],
          span: 'md:col-span-2 md:row-span-2'
        },
        {
          id: 6,
          type: 'image',
          title: 'Zen Restaurant',
          desc: 'Cultural and sensory branding for high-end dining.',
          url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200',
          tags: ['Branding', 'Gastronomy'],
          span: 'md:col-span-1 md:row-span-2'
        }
      ]
    },
    process: {
      badge: "Methodology",
      title1: "The creative",
      title2: "Process.",
      desc: "A systematic approach to creating distinctive, high-end digital experiences.",
      steps: [
        {
          num: "01",
          title: "Discovery",
          desc: "Diving deep into your brand, audience, and goals to build a strategic foundation that informs every subsequent decision.",
          tags: ["Market Analysis", "User Research", "Brand Audit"]
        },
        {
          num: "02",
          title: "Strategy",
          desc: "Defining the unique positioning and conceptual framework that will differentiate your brand in a crowded digital landscape.",
          tags: ["Positioning", "UX Strategy", "Narrative"]
        },
        {
          num: "03",
          title: "Design",
          desc: "Crafting a distinctive visual identity and immersive user experiences that resonate emotionally with your target audience.",
          tags: ["Identity", "UI Design", "3D/Motion"]
        },
        {
          num: "04",
          title: "Development",
          desc: "Bringing the vision to life with clean, high-performance code, buttery smooth animations, and robust architecture.",
          tags: ["Next.js", "Creative Dev", "Performance"]
        },
        {
          num: "05",
          title: "Launch",
          desc: "Ensuring a flawless transition to the market followed by ongoing strategic optimization to drive sustainable growth.",
          tags: ["Deployment", "SEO", "Growth"]
        }
      ]
    },
    whyNiya: {
      badge: "The Advantage",
      title1: "Unmatched",
      title2: "Performance.",
      items: [
        { label: "Design Focus", value: "Ultra Modern" },
        { label: "Site Speed", value: "99/100" },
        { label: "Development", value: "Custom Built" },
        { label: "Philosophy", value: "Human Centered" },
        { label: "Support", value: "24/7 Strategic" },
        { label: "Optimization", value: "SEO Gold" }
      ],
      quote: "« Not just building websites, but creating digital assets that drive growth and tell your story. »"
    },
    faq: {
      badge: "Frequently Asked Questions",
      title: "FAQ",
      items: [
        {
          question: "What web design services do you offer?",
          answer: "I design and develop portfolio websites, custom e-commerce platforms, and complex web applications. The design is centered around your goals (conversion, visibility, brand image) and optimized for performance and SEO."
        },
        {
          question: "How does the collaboration process work?",
          answer: "Everything starts with a discovery call to understand your project. Then, I propose a scope of work, an UI/UX design phase for validation, followed by the development and finally the launch with post-launch support."
        },
        {
          question: "How much does it cost to build a website?",
          answer: "The price depends on the complexity of the project, required features, and the desired level of design. Every project receives a custom, transparent quote after our first discussion."
        },
        {
          question: "How long does it take to create a website?",
          answer: "Creating a website takes about 2 weeks for a classic site and 3 to 4 weeks if it is a complex site. A detailed timeline is provided in your proposal."
        },
        {
          question: "Do you offer post-launch maintenance?",
          answer: "Yes, I offer maintenance packages that include security updates, data backups, and continuous support to evolve your project over time (SEO, page additions, etc.)."
        }
      ]
    },
    contact: {
      badge: "Ready to start?",
      title1: "Every project",
      title2: "is unique.",
      quote: "« Let’s build something exceptional together. »",
      sendInquiry: "Send an inquiry anytime.",
      schedule: "Mon - Fri, 9am - 6pm EST"
    },
    booking: {
      badge: "Consultation",
      title1: "Let’s talk",
      title2: "about your project.",
      quote: "« Book a free discovery call and let’s build something exceptional together. »",
      cta: "Book a Call",
      visio: "Schedule a Visio",
      consultation: "Free Consultation",
      responds: "Usually responds within 24h"
    },
    footer: {
      madeIn: "CREATED BY NIYA STUDIO"
    }
  }
};

interface LanguageContextType {
  lang: Language;
  t: TranslationType;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Set French ('fr') as default language as requested
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("niya-lang") as Language;
      return saved === "en" || saved === "fr" ? saved : "fr";
    }
    return "fr";
  });

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("niya-lang", newLang);
    }
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
