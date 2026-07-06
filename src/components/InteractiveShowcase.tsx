import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { ArrowRight, ArrowLeft, Globe, Layers, Zap, Search, Key } from "lucide-react";
import { ProjectModal } from "./ProjectModal";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export const CATEGORIES_DATA: Record<string, any[]> = {
  fr: [
    {
      id: "website",
      title: "Développement Web",
      desc: "Sites modernes créés avec React & Next.js",
      icon: "💻",
      bgImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    },
    {
      id: "shopify",
      title: "Shopify / E-commerce",
      desc: "Des expériences e-commerce à forte conversion",
      icon: "🛍️",
      bgImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop",
    },
    {
      id: "branding",
      title: "Identité de Marque",
      desc: "Identités visuelles fortes pour des marques premium",
      icon: "🎨",
      bgImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    },
    {
      id: "motion",
      title: "Motion Design",
      desc: "Animations 2D/3D et expériences interactives",
      icon: "✨",
      bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    },
    {
      id: "seo",
      title: "SEO & Optimisation",
      desc: "Performances, structure et optimisation de la visibilité",
      icon: "🚀",
      bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    },
    {
      id: "strategy",
      title: "Stratégie Créative",
      desc: "Direction créative et stratégie digitale",
      icon: "🧠",
      bgImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop",
    },
  ],
  en: [
    {
      id: "website",
      title: "Website Development",
      desc: "Modern websites built with React & Next.js",
      icon: "💻",
      bgImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    },
    {
      id: "shopify",
      title: "Shopify / E-commerce",
      desc: "High-conversion e-commerce experiences",
      icon: "🛍️",
      bgImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop",
    },
    {
      id: "branding",
      title: "Brand Identity",
      desc: "Strong visual identities for premium brands",
      icon: "🎨",
      bgImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    },
    {
      id: "motion",
      title: "Motion Design",
      desc: "2D/3D animations and interactive motion experiences",
      icon: "✨",
      bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    },
    {
      id: "seo",
      title: "SEO & Optimization",
      desc: "Performance, structure and visibility optimization",
      icon: "🚀",
      bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    },
    {
      id: "strategy",
      title: "Creative Strategy",
      desc: "Digital strategy and creative direction",
      icon: "🧠",
      bgImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop",
    },
  ]
};

export const PROJECTS_DATA: Record<string, any[]> = {
  fr: [
    {
      id: "web-1",
      categoryId: "website",
      title: "Cosmétiques de Luxe (Site Web)",
      desc: "Une expérience e-commerce headless premium pour une marque de cosmétiques de luxe avec des révélations de produits WebGL.",
      image: "https://images.unsplash.com/photo-1615397323288-6681285223c7?q=80&w=800&auto=format&fit=crop",
      features: [
        { title: "Page d'Accueil", description: "Révélation cosmétique immersive WebGL", image: "https://images.unsplash.com/photo-1615397323288-6681285223c7?q=80&w=800&auto=format&fit=crop", icon: <Globe size={24} className="text-white" /> },
        { title: "Grille de Produits", description: "Mises en page esthétiques raffinées", image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?q=80&w=800&auto=format&fit=crop", icon: <Layers size={24} className="text-white" /> },
        { title: "Routine Interactive", description: "Guide de soins de la peau étape par étape", image: "https://images.unsplash.com/photo-1571781526291-c477eb31f8d4?q=80&w=800&auto=format&fit=crop", icon: <Zap size={24} className="text-white" /> },
        { title: "Paiement Sans Friction", description: "Tunnel de conversion optimisé", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop", icon: <Key size={24} className="text-white" /> }
      ]
    },
    {
      id: "web-2",
      categoryId: "website",
      title: "Plateforme Tableau de Bord SaaS",
      desc: "Une interface analytique et unifiée conçue pour des logiciels SaaS d'entreprise à forte densité de données.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      features: [
        { title: "Vue d'Ensemble Analytique", description: "Tableau de bord de métriques de haut niveau", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", icon: <Search size={24} className="text-white" /> },
        { title: "Rapports Personnalisés", description: "Génération de graphiques dynamiques", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", icon: <Layers size={24} className="text-white" /> },
        { title: "Data Visualisation", description: "Schémas complexes visualisés", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop", icon: <Zap size={24} className="text-white" /> }
      ]
    },
    {
      id: "shop-1",
      categoryId: "shopify",
      title: "E-commerce Streetwear",
      desc: "Boutique Shopify Plus haute énergie conçue pour des pics de trafic massifs.",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop",
      features: [
        { title: "Compte à Rebours", description: "Ventes limitées à forte adrénaline", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop", icon: <Zap size={24} className="text-white" /> },
        { title: "Focus Produit", description: "Lookbook de style urbain", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop", icon: <Layers size={24} className="text-white" /> },
        { title: "Lookbook", description: "Stylisme streetwear immersif", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", icon: <Globe size={24} className="text-white" /> }
      ]
    },
    {
      id: "shop-2",
      categoryId: "shopify",
      title: "Boutique de Poterie",
      desc: "Une expérience de magasinage authentique et élégamment composée pour des céramiques artisanales.",
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
      features: [
        { title: "Vitrine", description: "Sélections de poteries uniques", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop", video: "/pottery-1.mov", icon: <Globe size={24} className="text-white" /> },
        { title: "Héritage", description: "Savoir-faire artisanal", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=800&auto=format&fit=crop", video: "/pottery-2.mov", icon: <Key size={24} className="text-white" /> },
        { title: "Guide d'Entretien", description: "Entretien des céramiques", image: "https://images.unsplash.com/photo-1565193566173-7a0cb3d161a0?q=80&w=800&auto=format&fit=crop", icon: <Search size={24} className="text-white" /> }
      ]
    },
    {
      id: "brand-1",
      categoryId: "branding",
      title: "Identité Niya Studio",
      desc: "Le langage visuel interne et les directives de conception de marque pour Niya Studio lui-même.",
      image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop",
      features: [
        { title: "Guidelines Marque", description: "Systèmes de design & ton de voix", image: "https://images.unsplash.com/photo-1627843563095-f6e94676ceff?q=80&w=800&auto=format&fit=crop", icon: <Layers size={24} className="text-white" /> },
        { title: "Typographie", description: "Combinaisons de polices personnalisées", image: "https://images.unsplash.com/photo-1555580399-5ee4dcb27163?q=80&w=800&auto=format&fit=crop", icon: <Globe size={24} className="text-white" /> },
        { title: "Papeterie", description: "Matériaux imprimés premium", image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop", icon: <Key size={24} className="text-white" /> }
      ]
    },
    {
      id: "brand-2",
      categoryId: "branding",
      title: "Identité de Montres de Luxe",
      desc: "Logotypes intemporels, emballages et identité numérique pour un horloger patrimonial.",
      image: "https://images.unsplash.com/photo-1542496658-e320499be449?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "motion-1",
      categoryId: "motion",
      title: "Animations Interactives",
      desc: "Séquences de pages d'atterrissage animées par WebGL avec des interactions basées sur la physique.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "motion-2",
      categoryId: "motion",
      title: "Rendus de Produits 3D",
      desc: "Rendu hyper-réaliste et animations graphiques pour des produits techniques physiques.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "seo-1",
      categoryId: "seo",
      title: "Stratégie SEO Entreprise",
      desc: "Un audit et une restructuration SEO technique complète entraînant une croissance organique de 300%.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "seo-2",
      categoryId: "seo",
      title: "Projet de Performance",
      desc: "Optimisation de Core Web Vitals pour atteindre des scores de 100/100 sur Lighthouse.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "strat-1",
      categoryId: "strategy",
      title: "Transformation Digitale",
      desc: "Une feuille de route numérique sur plusieurs années conçue pour moderniser un géant du détail traditionnel.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "strat-2",
      categoryId: "strategy",
      title: "Stratégie de Positionnement de Marque",
      desc: "Recherche de marché et positionnement stratégique pour une nouvelle startup de mode durable.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    },
  ],
  en: [
    {
      id: "web-1",
      categoryId: "website",
      title: "Luxury Cosmetics Website",
      desc: "A premium, headless e-commerce experience for a luxury cosmetics brand with WebGL product reveals.",
      image: "https://images.unsplash.com/photo-1615397323288-6681285223c7?q=80&w=800&auto=format&fit=crop",
      features: [
        { title: "Landing Page", description: "Immersive WebGL cosmetics reveal", image: "https://images.unsplash.com/photo-1615397323288-6681285223c7?q=80&w=800&auto=format&fit=crop", icon: <Globe size={24} className="text-white" /> },
        { title: "Product Grid", description: "Refined aesthetic layouts", image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?q=80&w=800&auto=format&fit=crop", icon: <Layers size={24} className="text-white" /> },
        { title: "Interactive Routine", description: "Step-by-step skincare guide", image: "https://images.unsplash.com/photo-1571781526291-c477eb31f8d4?q=80&w=800&auto=format&fit=crop", icon: <Zap size={24} className="text-white" /> },
        { title: "Frictionless Checkout", description: "Optimized conversion funnel", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop", icon: <Key size={24} className="text-white" /> }
      ]
    },
    {
      id: "web-2",
      categoryId: "website",
      title: "SaaS Dashboard Platform",
      desc: "An analytical, unified interface designed for data-heavy enterprise SaaS.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      features: [
        { title: "Analytics Overview", description: "High-level metrics dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", icon: <Search size={24} className="text-white" /> },
        { title: "Custom Reports", description: "Dynamic graph generations", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", icon: <Layers size={24} className="text-white" /> },
        { title: "Data Visualization", description: "Complex schemas visualized", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop", icon: <Zap size={24} className="text-white" /> }
      ]
    },
    {
      id: "shop-1",
      categoryId: "shopify",
      title: "Streetwear E-commerce",
      desc: "High-energy Shopify Plus store designed for massive drop-based traffic spikes.",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop",
      features: [
        { title: "Drop Countdown", description: "High-adrenaline limited sales", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop", icon: <Zap size={24} className="text-white" /> },
        { title: "Product Focus", description: "Urban styled lookbook", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop", icon: <Layers size={24} className="text-white" /> },
        { title: "Lookbook", description: "Immersive streetwear styling", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", icon: <Globe size={24} className="text-white" /> }
      ]
    },
    {
      id: "shop-2",
      categoryId: "shopify",
      title: "Premium Pottery Shop",
      desc: "An authentic and elegantly composed shopping experience for artisanal ceramics.",
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
      features: [
        { title: "Storefront", description: "Unique pottery selections", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop", video: "/pottery-1.mov", icon: <Globe size={24} className="text-white" /> },
        { title: "Heritage", description: "Artisanal craftsmanship", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=800&auto=format&fit=crop", video: "/pottery-2.mov", icon: <Key size={24} className="text-white" /> },
        { title: "Care Guide", description: "Ceramic care guide", image: "https://images.unsplash.com/photo-1565193566173-7a0cb3d161a0?q=80&w=800&auto=format&fit=crop", icon: <Search size={24} className="text-white" /> }
      ]
    },
    {
      id: "brand-1",
      categoryId: "branding",
      title: "Niya Studio Branding",
      desc: "The internal visual language and brand design guidelines for Niya Studio itself.",
      image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop",
      features: [
        { title: "Brand Guidelines", description: "Design systems & tone of voice", image: "https://images.unsplash.com/photo-1627843563095-f6e94676ceff?q=80&w=800&auto=format&fit=crop", icon: <Layers size={24} className="text-white" /> },
        { title: "Typography", description: "Custom font combinations", image: "https://images.unsplash.com/photo-1555580399-5ee4dcb27163?q=80&w=800&auto=format&fit=crop", icon: <Globe size={24} className="text-white" /> },
        { title: "Stationery", description: "Premium print materials", image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop", icon: <Key size={24} className="text-white" /> }
      ]
    },
    {
      id: "brand-2",
      categoryId: "branding",
      title: "Luxury Watch Identity",
      desc: "Timeless logotypes, packaging, and digital identity for a heritage watchmaker.",
      image: "https://images.unsplash.com/photo-1542496658-e320499be449?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "motion-1",
      categoryId: "motion",
      title: "Interactive Animations",
      desc: "WebGL-driven landing page sequences with physics-based interactions.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "motion-2",
      categoryId: "motion",
      title: "3D Product Renderings",
      desc: "Hyper-realistic rendering and motion graphics for physical tech products.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "seo-1",
      categoryId: "seo",
      title: "Corporate SEO Strategy",
      desc: "A complete technical SEO audit and restructuring resulting in 300% organic growth.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "seo-2",
      categoryId: "seo",
      title: "Performance Project",
      desc: "Core Web Vitals optimization to achieve perfect 100/100 Lighthouse scores.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "strat-1",
      categoryId: "strategy",
      title: "Digital Transformation",
      desc: "A multi-year digital roadmap designed to modernize a legacy retail giant.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "strat-2",
      categoryId: "strategy",
      title: "Brand Positioning Strategy",
      desc: "Market research and strategic positioning for a new sustainable fashion start-up.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    },
  ]
};

export function InteractiveShowcase() {
  const { lang, t } = useLanguage();
  const { theme } = useTheme();
  
  const CATEGORIES = CATEGORIES_DATA[lang] || CATEGORIES_DATA['fr'];
  const PROJECTS = PROJECTS_DATA[lang] || PROJECTS_DATA['fr'];
  
  const [activeCategoryId, setActiveCategoryId] = useState(CATEGORIES[0].id);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const activeCategory = CATEGORIES.find((c: any) => c.id === activeCategoryId) || CATEGORIES[0];
  const filteredProjects = PROJECTS.filter((p: any) => p.categoryId === activeCategoryId);

  return (
    <>
      <ProjectModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />
      <section id="projects" className="py-24 relative overflow-hidden bg-brand-navy text-white min-h-screen scroll-mt-[100px] md:scroll-mt-0">
      {/* Dynamic ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-purple/5 to-transparent rounded-full pointer-events-none translate-z-0" />

      <div className="container mx-auto px-6 relative z-10 -mt-[130px] md:mt-0 min-h-[1055px] md:min-h-0">
        {/* HERO */}
        <div className="mb-10 md:mb-24 flex flex-col items-center text-center px-4 mt-[30px] md:mt-0 max-w-2xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-brand-purple font-mono text-[10px] md:text-xs mb-3 block uppercase tracking-[0.4em] font-bold"
          >
            {lang === 'fr' ? 'PROJETS SÉLECTIONNÉS' : 'FEATURED SHOWCASE'}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-4"
          >
            {lang === 'fr' ? 'LES ' : 'SELECTED '}
            <span className="text-white/30">{lang === 'fr' ? 'RÉALISATIONS.' : 'WORKS.'}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-sm leading-relaxed"
          >
            {lang === 'fr' ? 'Explorez les expériences digitales immersives créées par Niya Studio.' : 'Explore immersive digital experiences crafted by Niya Studio.'}
          </motion.p>
        </div>

        {/* SELECTOR */}
        <div className="relative mb-8 md:mb-12">
          {/* Mobile swipe hints */}
          <AnimatePresence>
            {canScrollRight && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mt-3 pr-2 lg:hidden flex items-center justify-center z-10 pointer-events-none"
              >
                <motion.div 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="flex items-center justify-center opacity-60 text-white"
                >
                  <ArrowRight size={20} strokeWidth={2.5} />
                </motion.div>
              </motion.div>
            )}
            
            {canScrollLeft && !canScrollRight && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -mt-3 pl-2 lg:hidden flex items-center justify-center z-10 pointer-events-none"
              >
                <motion.div 
                  animate={{ x: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="flex items-center justify-center opacity-60 text-white"
                >
                  <ArrowLeft size={20} strokeWidth={2.5} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div 
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex lg:justify-center overflow-x-auto scrollbar-hide pb-6 -mx-6 px-6 lg:mx-0 lg:px-0 snap-x snap-mandatory"
          >
            <div className="flex gap-3 md:gap-4 min-w-max pr-12 lg:pr-0">
              {CATEGORIES.map((category) => {
                const isActive = category.id === activeCategoryId;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategoryId(category.id)}
                    className={cn(
                      "snap-start relative flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-2xl glass transition-all overflow-hidden text-left border-white/5",
                    isActive 
                      ? "w-[260px] md:w-[320px] bg-white/10 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]" 
                      : "w-[60px] md:w-[80px] hover:bg-white/5 hover:border-white/10"
                  )}
                  animate={{
                    width: isActive ? (typeof window !== 'undefined' && window.innerWidth >= 768 ? 320 : 260) : (typeof window !== 'undefined' && window.innerWidth >= 768 ? 80 : 60),
                  }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex-shrink-0 text-xl md:text-3xl filter drop-shadow-md flex items-center justify-center w-6 md:w-8">
                    {category.icon}
                  </div>
                  
                  <motion.div 
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    className="flex flex-col flex-shrink-0 w-[180px] md:w-[200px]"
                  >
                    <span className="font-bold text-sm md:text-base whitespace-nowrap mb-0.5 md:mb-1 text-white">
                      {category.title}
                    </span>
                    <span className="text-[10px] md:text-xs whitespace-normal leading-tight text-white/60">
                      {category.desc}
                    </span>
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </div>
        
        {/* Mobile Navigation Dots for Selector */}
        <div className="flex lg:hidden justify-center gap-2 mb-8">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.id}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeCategoryId === cat.id ? "w-6 bg-brand-purple" : "w-1.5 bg-brand-purple/30"
              )}
            />
          ))}
        </div>
        </div>

        {/* PROJECTS GRID */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategoryId}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1], staggerChildren: 0.1 }}
              className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-6xl mx-auto"
            >
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative flex flex-col gap-4 w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-24px)] max-w-[420px]"
                >
                  <div className="relative aspect-video rounded-[2rem] overflow-hidden glass cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border-white/10" onClick={() => setSelectedProject(project)}>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 transition-colors duration-500 group-hover:bg-transparent bg-black/20" />
                    
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-md border text-[10px] font-bold uppercase tracking-wider bg-white/10 border-white/20 text-white">
                      {activeCategory.title}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 px-1">
                    <h3 className="text-base sm:text-xl font-bold tracking-tight transition-colors cursor-pointer text-white group-hover:text-white/80" onClick={() => setSelectedProject(project)}>
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm line-clamp-2 leading-relaxed text-white/60">
                      {project.desc}
                    </p>
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-2 mt-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors text-[#9d8bffff] hover:text-white"
                    >
                      {lang === 'fr' ? 'Voir L\'Étude de Cas' : 'View Case Study'} <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
    </>
  );
}
