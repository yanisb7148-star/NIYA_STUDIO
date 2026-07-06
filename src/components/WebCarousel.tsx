import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Laptop, 
  ExternalLink,
  Shield, 
  Lock, 
  RefreshCw, 
  Sparkles,
  Info,
  Maximize2,
  Utensils,
  Calendar,
  Award,
  Clock,
  Wine,
  Cpu,
  Bot,
  Terminal,
  Send
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { cn } from "@/src/lib/utils";

// Types for our web projects
interface WebProject {
  id: number;
  slug: string;
  url: string;
  title: { fr: string; en: string };
  desc: { fr: string; en: string };
  techs: { name: string; color: string; bg: string }[];
  accentColor: string;
  // Deep mock content for live preview scrolling
  mockType: "luxury" | "saas" | "bistro" | "aistudio";
}

export function WebCarousel() {
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [customUrl, setCustomUrl] = useState<string>("");
  const [useIframeMap, setUseIframeMap] = useState<Record<number, boolean>>({
    0: true,
    1: true
  });
  
  // High fidelity project data
  const projects: WebProject[] = [
    {
      id: 0,
      slug: "lyon-bistro-elite",
      url: "https://lyonbistro-elite-15152124054.europe-west2.run.app",
      title: {
        fr: "Lyon Bistro Élite",
        en: "Lyon Bistro Elite"
      },
      desc: {
        fr: "Site d'expérience culinaire immersive de haute voltée conçu à la façon d'une vitrine gastronomique étoilée.",
        en: "High-end digital culinary bespoke catalog made for a Michelin-standard contemporary luxury restaurant."
      },
      accentColor: "from-amber-600/30 to-amber-900/40",
      techs: [
        { name: "React 19", color: "text-amber-400", bg: "border-amber-500/20 bg-amber-500/10" },
        { name: "Tailwind CSS", color: "text-sky-400", bg: "border-sky-500/20 bg-sky-500/10" },
        { name: "GSAP Creative", color: "text-green-400", bg: "border-green-500/20 bg-green-500/10" },
        { name: "Framer 3D", color: "text-rose-400", bg: "border-rose-500/20 bg-rose-500/10" }
      ],
      mockType: "bistro"
    },
    {
      id: 1,
      slug: "kr-protein",
      url: "https://k-r-protein-15152124054.europe-west2.run.app",
      title: {
        fr: "K&R Protein",
        en: "K&R Protein"
      },
      desc: {
        fr: "Plateforme e-commerce de haute performance spécialisée dans la nutrition sportive et les compléments protéinés.",
        en: "High-performance e-commerce platform specializing in advanced sports nutrition and protein supplements."
      },
      accentColor: "from-blue-600/30 to-blue-900/40",
      techs: [
        { name: "React 19", color: "text-blue-400", bg: "border-blue-500/20 bg-blue-500/10" },
        { name: "Tailwind CSS", color: "text-sky-400", bg: "border-sky-500/20 bg-sky-500/10" },
        { name: "TypeScript", color: "text-indigo-400", bg: "border-indigo-500/20 bg-indigo-500/10" },
        { name: "Motion", color: "text-purple-400", bg: "border-purple-500/20 bg-purple-500/10" }
      ],
      mockType: "saas"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Switch to custom user input URL
  const applyCustomIframe = (index: number) => {
    if (!customUrl) return;
    setUseIframeMap(prev => ({ ...prev, [index]: true }));
  };

  const resetCustomIframe = (index: number) => {
    setUseIframeMap(prev => ({ ...prev, [index]: false }));
    setCustomUrl("");
  };

  // Section titles in bilingual format
  const sectionTitle = lang === "fr" ? "Les Réalisations" : "Featured Work";
  const sectionSubtitle = lang === "fr" ? "Carrousel Interactif" : "Interactive Showcase";
  const sectionDescription = lang === "fr" 
    ? "Explorez les projets directement ci-dessous. Faites défiler verticalement à l'intérieur de chaque fenêtre de navigateur pour naviguer en temps réel comme si vous y étiez."
    : "Interact directly with the signature projects. Feel free to scroll vertically inside the precision mock browser screens to preview live responsiveness.";

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden bg-brand-navy">
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-purple/20 to-transparent rounded-full pointer-events-none translate-z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 to-transparent rounded-full pointer-events-none translate-z-0" />

      {/* Main Container */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-purple/30 bg-brand-purple/5 text-xs text-brand-purple uppercase tracking-[0.2em] font-black mb-4">
              <Sparkles size={12} className="animate-pulse" />
              {sectionSubtitle}
            </div>
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-6">
              {sectionTitle}
            </h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed font-light">
              {sectionDescription}
            </p>
          </motion.div>
        </div>

        {/* Carousel View Container */}
        <div className="relative">
          <div className="flex items-center justify-center min-h-[500px] md:min-h-[640px]">
            <AnimatePresence mode="wait">
              {projects.map((project, index) => {
                if (index !== activeIndex) return null;

                const isIframeMode = useIframeMap[index];
                const activeProjectUrl = isIframeMode ? (customUrl || project.url) : project.url;

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: 100, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -100, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full max-w-5xl"
                  >
                    {/* The Browser Window Container */}
                    <div className={cn(
                      "relative rounded-[1.5rem] border border-white/10 bg-[#0d0d12]/90 backdrop-blur-xl transition-all duration-500 shadow-2xl p-0 overflow-hidden",
                      `shadow-[0_0_50px_rgba(139,92,246,0.05)]`
                    )}>
                      {/* Top Bar (Browser header style Mac) */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-b border-white/5 bg-black/40 gap-4">
                        <div className="flex items-center gap-3">
                          {/* 3 Mac Dots */}
                          <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                          </div>
                          
                          <div className="hidden lg:flex items-center gap-2 ml-4 px-3 py-1 rounded bg-white/5 text-xs text-white/50 font-mono">
                            <Laptop size={12} />
                            <span>DESKTOP VIEW</span>
                          </div>
                        </div>

                        {/* Faux Router / URL Bar */}
                        <div className="flex-1 max-w-xl mx-auto w-full relative">
                          <div className="flex items-center gap-2 w-full bg-white/[0.05] border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/70 font-mono">
                            <Lock size={12} className="text-emerald-500" />
                            <span className="truncate flex-1 text-white/60 select-all">
                              {activeProjectUrl}
                            </span>
                            <RefreshCw 
                              size={12} 
                              className="text-white/30 cursor-pointer hover:text-white transition-colors"
                              onClick={() => {
                                // Reset simulated frame content
                                const element = document.getElementById(`viewport-${project.slug}`);
                                if (element) element.scrollTop = 0;
                              }}
                            />
                          </div>
                        </div>

                        {/* Top right - link or visual badge */}
                        <div className="flex items-center gap-2 md:gap-3 self-end md:self-auto flex-wrap">
                          {/* Toggle between live iframe and offline simulated high-fidelity site */}
                          <button
                            onClick={() => setUseIframeMap(prev => ({ ...prev, [index]: !prev[index] }))}
                            className={cn(
                              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border",
                              isIframeMode 
                                ? "bg-brand-purple/10 border-brand-purple/30 text-brand-purple hover:bg-brand-purple hover:text-white" 
                                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                            )}
                          >
                            <Sparkles size={11} className={cn(!isIframeMode && "animate-pulse text-brand-purple")} />
                            <span>{isIframeMode ? (lang === "fr" ? "Aperçu interactif" : "Bespoke Mockup") : (lang === "fr" ? "Site Réel (Iframe)" : "Live Iframe")}</span>
                          </button>

                          <a 
                            href={activeProjectUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-brand-purple text-white/80 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-all"
                          >
                            <span>LIVE</span>
                            <ExternalLink size={11} />
                          </a>
                        </div>
                      </div>

                      {/* Display URL Modifier (Allows user/clients to easily embed their own links for testing) */}
                      <div className="bg-black/30 border-b border-white/5 px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                          <Info size={11} className="text-brand-purple" />
                          {lang === "fr" ? "Tester un lien client :" : "Test custom owner URL:"}
                        </span>
                        <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-md">
                          <input 
                            type="text"
                            placeholder="https://example.com"
                            value={customUrl}
                            onChange={(e) => setCustomUrl(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs font-mono text-white flex-1 focus:outline-none focus:border-brand-purple transition-all"
                          />
                          <button
                            onClick={() => applyCustomIframe(index)}
                            className="px-3 py-1 bg-brand-purple text-xs font-bold uppercase rounded-lg text-white hover:bg-opacity-80 transition-colors"
                          >
                            {lang === "fr" ? "Appliquer" : "Apply"}
                          </button>
                          {isIframeMode && (
                            <button
                              onClick={() => resetCustomIframe(index)}
                              className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-bold uppercase rounded-lg hover:bg-opacity-80 transition-colors"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Middle: Zone d'affichage (The scrolling page) */}
                      <div className="relative aspect-[16/10] md:max-h-[500px] w-full overflow-hidden bg-[#0d0d12]">
                        {isIframeMode ? (
                          <div className="relative w-full h-full" data-lenis-prevent>
                            <iframe 
                              src={activeProjectUrl}
                              title={project.title[lang]}
                              loading="lazy"
                              sandbox="allow-scripts allow-same-origin allow-popups"
                              className="w-full h-full border-0 bg-white"
                            />
                            {/* Small instruction helper overlay */}
                            <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 pointer-events-none">
                              <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">
                                {lang === "fr" ? "Iframe Actif (Suivant X-Frame-Options)" : "Iframe active (Depends on CSP)"}
                              </p>
                            </div>
                          </div>
                        ) : (
                          /* Interactive CSS-designed simulated website that scrolls vertically with supreme fidelity */
                          <div 
                            id={`viewport-${project.slug}`}
                            data-lenis-prevent
                            className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scroll-smooth relative"
                          >
                            {/* Embedded high fidelity mock web design */}
                            {project.mockType === "luxury" && (
                              <LuxuryMockWebsite lang={lang} />
                            )}
                            {project.mockType === "saas" && (
                              <SaasMockWebsite lang={lang} />
                            )}
                            {project.mockType === "bistro" && (
                              <BistroMockWebsite lang={lang} />
                            )}
                            {project.mockType === "aistudio" && (
                              <StudioMockWebsite lang={lang} />
                            )}
                          </div>
                        )}
                        
                        {/* Scroll hint visual indicator inside frame */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/60 backdrop-blur border border-white/10 rounded-full px-3 py-1 animate-bounce pointer-events-none">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple"></span>
                          </span>
                          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/80">
                            {lang === "fr" ? "Défiler Verticalement" : "Scroll Vertically"}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Info Bar Section */}
                      <div className="p-6 md:p-8 bg-black/60 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                          <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight italic mb-2">
                            {project.title[lang]}
                          </h3>
                          <p className="text-white/60 text-xs md:text-sm max-w-xl font-light">
                            {project.desc[lang]}
                          </p>
                        </div>

                        {/* Tech Badges Zone */}
                        <div className="flex flex-wrap items-center gap-2">
                          {project.techs.map((tech, i) => (
                            <span 
                              key={i} 
                              className={cn(
                                "px-3.5 py-1.5 rounded-md border text-[10px] font-black uppercase tracking-wider transition-colors",
                                tech.color,
                                tech.bg
                              )}
                            >
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          {projects.length > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8">
              
              {/* Slider count & progress bar */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono font-bold text-white">
                  0{activeIndex + 1}
                </span>
                <div className="w-32 md:w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-brand-purple"
                    initial={{ width: "33.33%" }}
                    animate={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-sm font-mono text-white/40">
                  0{projects.length}
                </span>
              </div>

              {/* Magnetic next/prev arrows with subtle indicator */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#0d0d12] text-white hover:border-brand-purple hover:bg-brand-purple/10 active:scale-95 transition-all outline-none"
                  aria-label="Previous Project"
                >
                  <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                </button>
                
                <button
                  onClick={handleNext}
                  className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-brand-purple text-white hover:bg-brand-purple/80 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] active:scale-95 transition-all outline-none"
                  aria-label="Next Project"
                >
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HIGH-FIDELITY SIMULATED LUXURY COSMETICS WEBSITE (AETHERIA)
// ─────────────────────────────────────────────────────────────────────────────
function LuxuryMockWebsite({ lang }: { lang: "fr" | "en" }) {
  return (
    <div className="w-full bg-brand-navy text-[#e5dcd3] font-serif p-0">
      
      {/* Mock Site Navbar */}
      <div className="w-full h-16 border-b border-white/5 bg-brand-navy/80 backdrop-blur sticky top-0 flex items-center justify-between px-8 z-20 font-sans tracking-[0.2em] text-[9px] uppercase">
        <span className="font-extrabold text-white text-xs tracking-[0.3em]">AETHERIA PARIS</span>
        <div className="hidden sm:flex gap-6 text-white/60">
          <span>{lang === "fr" ? "Collections" : "Collections"}</span>
          <span>{lang === "fr" ? "L'Exposition" : "Exhibitions"}</span>
          <span>{lang === "fr" ? "L'Histoire" : "Our Heritage"}</span>
        </div>
        <span className="border border-white/20 px-3 py-1 rounded bg-white/5 font-black">
          {lang === "fr" ? "PANIER (0)" : "BAG (0)"}
        </span>
      </div>

      {/* Mock Page Content: Hero */}
      <div className="relative py-24 px-8 text-center bg-gradient-to-b from-brand-navy to-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,163,89,0.06),transparent_70%)]" />
        <div className="text-3xl md:text-5xl font-extralight tracking-[0.25em] text-[#d4a359] uppercase mb-4 leading-normal">
          {lang === "fr" ? "ÉLIXIR D'AURA SUPRÊME" : "ELIXIR OF RADIANCE"}
        </div>
        <p className="text-white/40 font-sans text-xs uppercase tracking-[0.3em] mb-8">
          {lang === "fr" ? "LE PREMIER SOIN BIOPHYSIOLOGIQUE CINÉMATIQUE" : "THE SUPREME BIOPHYSIOLOGICAL ESSENCE"}
        </p>
        <div className="w-24 h-[1px] bg-[#d4a359]/40 mx-auto mb-8" />
        <p className="max-w-md mx-auto text-sm md:text-base font-light text-white/70 leading-relaxed font-sans mb-10">
          {lang === "fr" 
            ? "Une fusion intemporelle d'ingrédients marins régénérants et d'oligo-éléments purifiés pour une peau d'un raffinement inédit."
            : "An ageless fusion of restorative marine bio-elements and cellular refining compounds for an elegant, pristine complexion."}
        </p>
        <button className="px-6 py-3 ml-1 border border-[#d4a359]/30 hover:border-[#d4a359] text-[#d4a359] hover:bg-[#d4a359]/5 transition-all text-[10px] font-sans font-black tracking-widest uppercase">
          {lang === "fr" ? "DÉCOUVRIR LE FLACON • 185€" : "ACQUIRE FLACON • $195"}
        </button>
      </div>

      {/* Grid of luxury items */}
      <div className="py-16 px-8 bg-[#0d0d11]">
        <h2 className="text-center text-[#d4a359] uppercase tracking-[0.2em] text-xs font-sans mb-12">
          {lang === "fr" ? "LES RITUELS DE SAISON" : "THE SEASONAL RITUALS"}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: lang === "fr" ? "Élixir Botanique d'Orient" : "Oriental Botanical Elixir",
              price: "160 € / $175",
              desc: lang === "fr" ? "Effet lissant immédiat et hydratation nocturne." : "Immediate smoothing and night hydration essence.",
              img: "https://images.unsplash.com/photo-1608248597481-496100c8c836?q=80&w=400"
            },
            {
              title: lang === "fr" ? "Sérum Anti-Gravité Absolu" : "Absolute Anti-Gravity Serum",
              price: "210 € / $230",
              desc: lang === "fr" ? "Renforce la fermeté des contours du visage." : "Re-defines modern structural facial contours.",
              img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400"
            },
            {
              title: lang === "fr" ? "Crème Caviar Signature" : "Caviar Complexion Cream",
              price: "290 € / $315",
              desc: lang === "fr" ? "Régénération cellulaire intense par extrait de caviar." : "Deep lipid cell regeneration utilizing caviar amino extracts.",
              img: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=400"
            }
          ].map((item, i) => (
            <div key={i} className="border border-white/5 bg-brand-navy p-6 rounded hover:border-[#d4a359]/30 transition-all duration-300 group">
              <div className="relative aspect-square overflow-hidden mb-6 bg-black/40">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 transition-transform duration-700" 
                />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-extralight text-white text-base tracking-wider uppercase">{item.title}</h3>
                <span className="font-sans text-[11px] text-[#d4a359] font-bold">{item.price}</span>
              </div>
              <p className="text-white/40 font-sans text-xs font-light leading-relaxed mb-4">{item.desc}</p>
              <button className="w-full py-2 bg-[#d4a359] text-black hover:bg-[#c3914a] transition-all text-[9px] font-sans font-black tracking-widest uppercase">
                {lang === "fr" ? "AJOUTER AU PANIER" : "ADD TO BASKET"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Elegant Footer */}
      <div className="py-12 px-8 bg-[#09090b] text-center text-xs text-white/30 font-sans tracking-[0.15em] border-t border-white/5">
        <p>© {new Date().getFullYear()} AETHERIA DESIGN HOUSE. TOURS - PARIS - GENÈVE.</p>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HIGH-FIDELITY SIMULATED SAAS DASHBOARD WEBSITE (KRYPTON AI)
// ─────────────────────────────────────────────────────────────────────────────
function SaasMockWebsite({ lang }: { lang: "fr" | "en" }) {
  const [latency, setLatency] = useState(14);
  const [threatCount, setThreatCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(10 + Math.random() * 8));
      if (Math.random() > 0.7) {
        setThreatCount(prev => prev + 1);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#07070a] text-white font-mono p-0">
      
      {/* Mock SaaS Navbar */}
      <div className="h-14 border-b border-white/5 bg-[#07070a]/80 backdrop-blur sticky top-0 flex items-center justify-between px-6 z-20 text-[10px] tracking-wider uppercase font-bold text-white/60">
        <span className="text-white font-black flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse" />
          KRYPTON//AI
        </span>
        <div className="hidden sm:flex gap-6">
          <span className="text-brand-blue font-black">SYSTEM_DASH</span>
          <span>NEURAL_FLOW</span>
          <span>KEY_METRICS</span>
        </div>
        <span className="text-green-400 border border-green-500/20 bg-green-500/5 px-2 py-0.5 rounded text-[9px]">
          ● ONLINE
        </span>
      </div>

      {/* Quick metrics header */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 bg-black/40">
        {[
          { label: lang === "fr" ? "LATENCE SYSTÈME" : "SYSTEM LATENCY", value: `${latency}ms`, color: "text-brand-blue" },
          { label: lang === "fr" ? "CRÉATION ANALYTICS" : "ANALYTICS BUILT", value: "99.98%", color: "text-emerald-400" },
          { label: lang === "fr" ? "CYBER-MENACES" : "THREATS BLOCKED", value: `72,1${threatCount}`, color: "text-rose-500 animate-pulse" },
          { label: lang === "fr" ? "CORES IA ACTIFS" : "ACTIVE AI CORES", value: "32/32", color: "text-purple-400" }
        ].map((met, i) => (
          <div key={i} className="border border-white/5 bg-white/[0.02] p-4 rounded-xl">
            <span className="block text-[8px] text-white/40 tracking-widest mb-1">{met.label}</span>
            <span className={cn("text-xl font-extrabold font-sans", met.color)}>{met.value}</span>
          </div>
        ))}
      </div>

      {/* Cybernetic Simulated Chart Area */}
      <div className="p-6 bg-gradient-to-b from-[#0c0c11] to-[#07070a]">
        <div className="border border-white/5 bg-[#0d0d12] p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-brand-blue" />
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white font-bold mb-1">
                {lang === "fr" ? "FLUX NEURAL RÉEL" : "NEURAL TRAFFIC MATRIX"}
              </h4>
              <p className="text-[10px] text-white/40 uppercase">{lang === "fr" ? "Évolution des requêtes IA / sec" : "AI inferences per millisecond"}</p>
            </div>
            <span className="text-[10px] text-white/40 select-none">v4.83a_STABLE</span>
          </div>

          {/* Visual Bar representation */}
          <div className="h-28 flex items-end gap-1 px-4 border-b border-white/5 pb-2">
            {[45, 60, 52, 70, 85, 95, 62, 58, 67, 80, 92, 110, 75, 45, 63, 72, 85, 100, 115, 85, 95, 120, 105, 80, 99].map((height, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height / 1.3}%` }}
                transition={{ delay: i * 0.015, duration: 0.5 }}
                className={cn(
                  "flex-1 min-w-[3px] rounded-t-sm",
                  i === 11 || i === 18 || i === 21 
                    ? "bg-brand-purple" 
                    : i > 15 ? "bg-brand-blue" : "bg-white/15"
                )}
              />
            ))}
          </div>
          <div className="flex justify-between text-[8px] text-white/30 pt-2 px-1">
            <span>00:00:00</span>
            <span>01:14:02 PREDICTIVE_GAP</span>
            <span>02:30:15 LIVE_SYNC</span>
          </div>
        </div>
      </div>

      {/* System prompt simulation */}
      <div className="p-6 bg-black/60 border-t border-white/5 font-sans leading-relaxed">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-blue" />
          {lang === "fr" ? "Console d'Exploration IA" : "AI Terminal Agent"}
        </h3>
        <div className="bg-black border border-white/5 rounded-xl p-4 font-mono text-[11px] text-white/70 leading-relaxed text-left">
          <p className="text-white/40">&gt; npm run train:neural-matrix-v2</p>
          <p className="text-emerald-400">&gt; [OK] Initializing model matrices...</p>
          <p className="text-white/70">&gt; Training on 48GB of parameters... Epoch 48/50 Complete.</p>
          <p className="text-brand-purple font-black">&gt; Loss rate: 0.0028 - Accuracy score: 99.98%</p>
          <p className="text-white/30 font-blink mt-2">&gt; System awaiting instructions_</p>
        </div>
      </div>
      
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HIGH-FIDELITY SIMULATED PREMIUM LYONNAIS RESTAURANT (LYON BISTRO ÉLITE)
// ─────────────────────────────────────────────────────────────────────────────
function BistroMockWebsite({ lang }: { lang: "fr" | "en" }) {
  const [activeCategory, setActiveCategory] = useState<"starters" | "mains" | "desserts">("starters");
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState("20:00");
  const [isReserved, setIsReserved] = useState(false);
  const [liveAvailability, setLiveAvailability] = useState(3);

  // Staggered countdown to simulate active reservations on the site
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveAvailability((prev) => (prev > 1 && Math.random() > 0.65 ? prev - 1 : prev));
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = {
    starters: [
      {
        name: lang === "fr" ? "Œuf Parfait aux Morilles" : "64°C Morel Sensation Egg",
        desc: lang === "fr" ? "Œuf de ferme cuit basse température, velouté de morilles sylvestres, émulsion au Crémant de Bourgogne." : "Low-temperature farm egg, wild woodland morels emulsion, Burgundy sparkler nectar.",
        price: "24 €",
        badge: "Chef Signature",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"
      },
      {
        name: lang === "fr" ? "Pâté en Croûte d'Exception" : "Chef's Artisanal Pâté en Croûte",
        desc: lang === "fr" ? "Veau fermier, canard challandais, foie gras de canard IGP, éclats de pistaches de Sicile, gelée au Porto noble." : "Bespoke farm veal, Challandais duck, luxury core foie gras, Sicilian pistachio, noble Port reduction jelly.",
        price: "28 €",
        badge: "Tradition Lyon",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600"
      }
    ],
    mains: [
      {
        name: lang === "fr" ? "Quenelle Impériale Lyonnaise" : "Imperial Lyonnais Pike Quenelle",
        desc: lang === "fr" ? "Quenelle de brochet soufflée tradition, sauce Nantua onctueuse aux écrevisses sauvages, herbes fraîches du potager." : "Legendary souffléd wild pike quenelle, voluptuous crayfish Nantua reduction, organic potager herbs.",
        price: "38 €",
        badge: "Incontournable",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600"
      },
      {
        name: lang === "fr" ? "Filet de Bœuf Rossini Moderne" : "Modern Charolais Beef Rossini",
        desc: lang === "fr" ? "Bœuf Charolais d'excellence, escalope de foie gras d'Aquitaine poêlée, truffe noire râpée, jus corsé de Madère." : "Prestige Charolais tenderloin, pan-seared Aquitaine foie gras, shaved winter black truffle, Madeira glaze.",
        price: "49 €",
        badge: "Haute Gastronomie",
        image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=600"
      }
    ],
    desserts: [
      {
        name: lang === "fr" ? "Tarte déstructurée Limoncello" : "Deconstructed Limoncello Tart",
        desc: lang === "fr" ? "Crémeux citron de Menton infusé au Limoncello, sablé croustillant fleur de sel, meringue aérienne flambée." : "Menton citrus curd infused with organic Italian Limoncello, sea salt breton shortbread, hand-torched cloud meringue.",
        price: "16 €",
        badge: "Création Visuelle",
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600"
      },
      {
        name: lang === "fr" ? "Le Grand Soufflé Cacao & Grand-Marnier" : "Ultimate Grand-Marnier Cacao Soufflé",
        desc: lang === "fr" ? "Soufflé majestueux au chocolat noir Pure Origine, suprêmes d'orange flambés, sorbet rafraîchissant Grand-Marnier." : "Majestic single-origin dark chocolate hot soufflé, citrus flambé reduction, refreshing blood orange Grand-Marnier ice.",
        price: "18 €",
        badge: "Prestige",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600"
      }
    ]
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReserved(true);
  };

  return (
    <div className="w-full bg-[#110e0b] text-[#efece6] font-serif p-0">
      
      {/* Premium Luxury Bistro Header inside the Browser Frame */}
      <div className="w-full h-16 border-b border-[#ffd8a8]/10 bg-[#110e0b]/90 backdrop-blur-md sticky top-0 flex items-center justify-between px-6 z-30 font-sans tracking-[0.25em] text-[9px] uppercase">
        <div className="flex items-center gap-2">
          <Wine size={12} className="text-[#c69a50]" />
          <span className="font-extrabold text-[#efece6] text-[11px] tracking-[0.3em]">LYON BISTRO ÉLITE</span>
        </div>
        <div className="hidden sm:flex gap-5 text-white/50 font-bold">
          <span className="text-[#c69a50]">{lang === "fr" ? "LA CARTE" : "THE MENU"}</span>
          <span>{lang === "fr" ? "L'ADRESSE" : "LOCATION"}</span>
          <span>{lang === "fr" ? "LE CHEF" : "CHEF STORY"}</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-90">
          <Award size={13} className="text-[#c69a50] animate-pulse" />
          <span className="font-bold text-[8px] text-[#c69a50] tracking-widest bg-[#c69a50]/10 border border-[#c69a50]/20 px-2 py-0.5 rounded-full">
            {lang === "fr" ? "1 ÉTOILE MICHELIN" : "1 MICHELIN STAR"}
          </span>
        </div>
      </div>

      {/* Cinematic Hero Area of the Bistro and Gastronomy */}
      <div className="relative py-20 px-6 text-center bg-gradient-to-b from-[#1c1712] to-[#110e0b] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,154,80,0.08),transparent_70%)]" />
        
        {/* Minimal luxury badge */}
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#c69a50]/10 border border-[#c69a50]/20 rounded-full text-[8px] text-[#c69a50] font-sans font-black tracking-[0.3em] uppercase mb-4 animate-pulse">
          <Utensils size={8} />
          {lang === "fr" ? "QUINTESSENCE LYONNAISE" : "LYONNAISE TRADITION & AVANT-GARDE"}
        </span>

        <div className="text-3xl md:text-5xl font-extralight tracking-[0.2em] text-[#efece6] uppercase mb-3 leading-tight font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-stone-100 via-[#e0b875] to-stone-100">
          LYON BISTRO ÉLITE
        </div>
        <p className="text-white/40 font-sans text-[10px] uppercase tracking-[0.35em] mb-6">
          {lang === "fr" ? "RESTAURANT GASTRONOMIQUE D'AUTEUR" : "MICHELIN STAR CONTEMPORARY CUISINE"}
        </p>
        <div className="w-16 h-[1px] bg-[#c69a50]/30 mx-auto mb-6" />
        
        <p className="max-w-md mx-auto text-xs md:text-sm font-light text-stone-300/80 leading-relaxed font-sans mb-8">
          {lang === "fr" 
            ? "Au cœur du Vieux Lyon, une escapade d'exception qui sublime les recettes ancestrales dans une atmosphère de design brutaliste et feutrée."
            : "Nested in historic Vieux Lyon, experiencing culinary poetry that sublimates ancestral recipes with brutalist interior design aesthetics."}
        </p>

        {/* Live seat available metric for gamified interactive feedback inside the mock website */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 font-sans text-[9px] font-bold rounded-full mb-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
          <span>
            {lang === "fr" 
              ? `PLUS QUE ${liveAvailability} TABLES DISPONIBLES CE SOIR` 
              : `ONLY ${liveAvailability} TABLES REMAINING FOR TONIGHT`}
          </span>
        </div>
      </div>

      {/* Culinary Category switching tabs */}
      <div className="py-12 px-6 bg-[#0c0a08] border-t border-[#ffd8a8]/5">
        <h2 className="text-center text-[#c69a50] uppercase tracking-[0.25em] text-[10px] font-sans mb-10">
          {lang === "fr" ? "— LA CARTE DU CHEF MARC-ANTOINE VOISIN —" : "— SIGNATURE CULINARY MAP —"}
        </h2>

        {/* Categories toggler */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-12 font-sans text-[10px] font-bold uppercase tracking-widest select-none">
          {[
            { id: "starters", label: lang === "fr" ? "ENTRÉES D'EXCEPTION" : "STARTERS" },
            { id: "mains", label: lang === "fr" ? "PLATS SIGNATURE" : "SIGNATURE MAINS" },
            { id: "desserts", label: lang === "fr" ? "DÉLICES SUCRÉS" : "PRESTIGE DESSERTS" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                activeCategory === cat.id 
                  ? "bg-[#c69a50] text-[#110e0b] border-[#c69a50] font-black" 
                  : "bg-white/[0.02] text-white/50 border-white/5 hover:text-white hover:border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Display dishes listing with beautiful photography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {menuItems[activeCategory].map((dish, i) => (
              <motion.div 
                key={dish.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="border border-white/5 bg-[#14110e] rounded-xl overflow-hidden shadow-lg hover:border-[#c69a50]/30 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                    <img 
                      src={dish.image} 
                      alt={dish.name} 
                      className="w-full h-full object-cover brightness-95 contrast-[1.05] saturate-[1.15] group-hover:scale-105 group-hover:brightness-105 transition-all duration-700" 
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#c69a50] text-[#110e0b] font-sans text-[8px] font-extrabold uppercase tracking-widest rounded shadow-sm">
                      {dish.badge}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-extrabold text-[#efece6] text-sm md:text-base tracking-wide uppercase leading-tight group-hover:text-[#e0b875] transition-colors">{dish.name}</h3>
                      <span className="font-sans text-xs text-[#c69a50] font-extrabold ml-2 shrink-0">{dish.price}</span>
                    </div>
                    <p className="text-stone-400 font-sans text-[11px] leading-relaxed font-light">{dish.desc}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2">
                  <div className="w-full flex justify-between items-center text-[8px] font-sans font-black tracking-widest uppercase text-[#efece6]/40 border-t border-white/5 pt-3 group-hover:text-white transition-colors">
                    <span>{lang === "fr" ? "PRODUIT LOCAL ET RESPONSABLE" : "ORGANIC & LOCALLY SOURCED"}</span>
                    <span>✨</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Online table simulation area (Provides fully functional real interactivity inside our simulation) */}
      <div className="py-16 px-6 bg-gradient-to-t from-[#0a0806] to-[#0c0a08] border-t border-[#ffd8a8]/5">
        <div className="max-w-xl mx-auto bg-[#14110f]/85 border border-[#c69a50]/20 rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#c69a50]/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-4 text-[#c69a50]">
            <Calendar size={16} />
            <h4 className="text-xs uppercase font-sans font-black tracking-widest">
              {lang === "fr" ? "RÉSERVATION INSTANTANÉE" : "LIVE INSTANT RESERVATION"}
            </h4>
          </div>

          <p className="text-white/60 text-xs font-sans leading-relaxed mb-6">
            {lang === "fr" 
              ? "Vivez une odyssée culinaire mémorable. Utilisez le module en direct pour réserver instantanément votre table pour ce soir."
              : "Experience unparalleled gourmet craftsmanship. Secure your exquisite dining table directly inside the real-time portal."}
          </p>

          <AnimatePresence mode="wait">
            {!isReserved ? (
              <motion.form 
                onSubmit={handleBookingSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 gap-4 font-sans text-xs"
              >
                <div className="col-span-1">
                  <label className="block text-[8px] font-extrabold text-stone-400 uppercase tracking-widest mb-1">
                    {lang === "fr" ? "CONVIVES" : "GUESTS"}
                  </label>
                  <select 
                    value={guests} 
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#c69a50]"
                  >
                    <option value={1} className="bg-[#110e0b]">1 {lang === "fr" ? "Personne" : "Person"}</option>
                    <option value={2} className="bg-[#110e0b]">2 {lang === "fr" ? "Personnes" : "People"}</option>
                    <option value={4} className="bg-[#110e0b]">4 {lang === "fr" ? "Personnes" : "People"}</option>
                    <option value={6} className="bg-[#110e0b]">6 {lang === "fr" ? "Personnes" : "People"}</option>
                  </select>
                </div>

                <div className="col-span-1">
                  <label className="block text-[8px] font-extrabold text-stone-400 uppercase tracking-widest mb-1">
                    {lang === "fr" ? "HEURE DE TABLE" : "HOUR"}
                  </label>
                  <select 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#c69a50]"
                  >
                    <option value="12:00" className="bg-[#110e0b]">12:00</option>
                    <option value="19:30" className="bg-[#110e0b]">19:30</option>
                    <option value="20:00" className="bg-[#110e0b]">20:00</option>
                    <option value="21:30" className="bg-[#110e0b]">21:30</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="col-span-2 py-3 bg-[#c69a50] hover:bg-[#b0853f] text-[#110e0b] font-black uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 duration-200"
                >
                  {lang === "fr" ? "RÉSERVER MA TABLE PRIVÉE" : "BOOK SIGNATURE TABLE"}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 bg-gradient-to-r from-amber-500/10 to-amber-900/10 border border-[#c69a50]/40 rounded-xl text-center font-sans"
              >
                <Award size={28} className="text-[#c69a50] mx-auto mb-3 animate-bounce" />
                <h5 className="text-[#c69a50] font-black text-sm uppercase tracking-wider mb-2">
                  {lang === "fr" ? "RÉSERVATION BIEN ENREGISTRÉE !" : "TABLE RESERVED SUCCESSFUL!"}
                </h5>
                <p className="text-[10px] text-stone-300 font-light leading-relaxed max-w-xs mx-auto mb-4">
                  {lang === "fr" 
                    ? `Votre table d'exception pour ${guests} convives à ${time} a été validée d'office. Le Maître d'Hôtel vous attend avec impatience.`
                    : `Your exclusive table for ${guests} guests at ${time} is secured. The Maitre d’Hotel is eager to greet you tonight.`}
                </p>
                <button 
                  onClick={() => setIsReserved(false)}
                  className="px-4 py-1.5 border border-[#c69a50]/30 hover:border-[#c69a50] rounded-full text-[8px] font-bold text-[#c69a50]/90 hover:text-white transition-all uppercase tracking-widest"
                >
                  {lang === "fr" ? "Nouvelle demande" : "Reservations Panel"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HIGH-FIDELITY SIMULATED GOOGLE AI STUDIO DEVELOPMENT PORTAL (STUDIO AGENT LABS)
// ─────────────────────────────────────────────────────────────────────────────
function StudioMockWebsite({ lang }: { lang: "fr" | "en" }) {
  const [model, setModel] = useState<"pro" | "flash" | "thinking">("pro");
  const [promptInput, setPromptInput] = useState("");
  const [currentResponse, setCurrentResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tokensCount, setTokensCount] = useState(0);
  const [generationTime, setGenerationTime] = useState(0);
  const [history, setHistory] = useState<Array<{ prompt: string; response: string }>>([]);

  const presets = {
    fr: [
      { text: "Architecture d'agents distribués", prompt: "Crée une architecture d'agents décentralisés avec inter-communication en temps réel pour optimiser le calcul distribué." },
      { text: "Site vitrine WebGL immersif", prompt: "Rédige le cahier des charges créatif et le code d'animation GSAP/Three.js pour un site de cosmétique de luxe en WebGL." }
    ],
    en: [
      { text: "Distributed agent architecture", prompt: "Design a decentralized, multi-agent real-time framework to optimize high-performance distributed cluster computing." },
      { text: "Immersive WebGL showcase site", prompt: "Draft the creative spec and GSAP/ThreeJS interaction blueprint for an ultra-luxury luxury skincare WebGL showroom." }
    ]
  };

  const simulatedAnswers = {
    "Crée une architecture d'agents décentralisés avec inter-communication en temps réel pour optimiser le calcul distribué.": {
      info: `MODEL: GEMINI_2.5_PRO // COGNITIVE_ROUTE
--------------------------------------------------
[✓] NODE_A initialisé avec succès (Cluster Antigravité)
[✓] NODE_B actif (File d'attente feedback dynamique)

> SYNTHÈSE DE L'ARCHITECTURE :
1. Topologie de réseau Maillé / Workers : Élimine les goulots d'étranglement de point de défaillance unique.
2. Routage adaptatif à la latence : Table de routage auto-cicatrisante optimisée pour des transferts de paquets <10ms.
3. Pipelines de cognition découplés pour parallélisation en temps réel.

\`\`\`typescript
interface AutonomousAgentNode {
  id: string;
  cognitionRate: number; // Inférences / sec
  meshPeers: string[];
  dispatch(task: TaskPacket): Promise<ExecutionState>;
}
\`\`\` 
Succès : Structures de télémesure neuronale déployées. En attente de paramètres utilisateur...`,
      tokens: 432
    },
    "Rédige le cahier des charges créatif et le code d'animation GSAP/Three.js pour un site de cosmétique de luxe en WebGL.": {
      info: `MODEL: GEMINI_2.5_PRO // CREATIVE_ROUTE
--------------------------------------------------
[✓] Shaders de sommets GLSL compilés
[✓] Courbes de scroll GSAP mémorisées

> IDENTITÉ DU LUXE DESIGN :
- Esthétique : Grille cinétique avec tons bronze profonds, typographie Serif élégante.
- Courbes de transition : Lenis Scroll + ease cubique-bezier personnalisée.

\`\`\`javascript
// Courbe d'entrée cinématique GSAP
gsap.timeline()
  .from(".perfume-bottle-canvas", { scale: 0.85, duration: 2.2, ease: "expo.out" })
  .from(".display-heading", { y: 100, opacity: 0, stagger: 0.1, duration: 1.5 }, "-=1.8");
\`\`\`
Indicateurs affinés : Espacement négatif organique, fluidité du drag, fluidité visuelle totale.`,
      tokens: 612
    },
    "Design a decentralized, multi-agent real-time framework to optimize high-performance distributed cluster computing.": {
      info: `MODEL: GEMINI_2.5_PRO // COGNITIVE_ROUTE
--------------------------------------------------
[✓] NODE_A initialized (Antigravity router)
[✓] NODE_B integrated (State synchronization loop)

> CORE FRAMEWORK DETAILS:
1. Multi-Agent Mesh: Workers negotiate resource allocation autonomously.
2. Event-Driven Messaging: Reactive task queuing using low-latency messaging patterns.
3. Fault-Tolerant Redundancy: Dynamic replication of high-priority execution contexts.

\`\`\`typescript
type AgentState = "idle" | "inferencing" | "recalibrating";

class IntelligentAgentCore {
  private neuralWeighs: ArrayBuffer;
  public async balanceLoad(networkLoad: number): Promise<void> {
    // Dynamic cognitive resource reallocations
  }
}
\`\`\`
Status: Cognitive engine operational. Cluster node state synchronized.`,
      tokens: 524
    },
    "Draft the creative spec and GSAP/ThreeJS interaction blueprint for an ultra-luxury luxury skincare WebGL showroom.": {
      info: `MODEL: GEMINI_2.5_PRO // CREATIVE_ROUTE
--------------------------------------------------
[✓] Three.js WebGL rendering pipeline created
[✓] Lenis smooth scroll initialized

> CREATIVE DIRECTIONS:
- Absolute minimalism: Warm marble tones, crisp serifs, delicate interactions.
- Micro-animations: Smooth canvas interactions with precise friction damping.

\`\`\`javascript
// Custom GLSL Fragment Shader for organic fluid distortion
const liquidShader = {
  vertexShader: \`void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }\`,
  fragmentShader: \`uniform float time; void main() { gl_FragColor = vec4(0.85, 0.73, 0.51, 1.0); }\`
};
\`\`\`
Production ready. Design aligns fully with premium luxury brand aesthetics.`,
      tokens: 588
    }
  };

  const handleRun = (selectedPrompt: string) => {
    if (isGenerating || !selectedPrompt.trim()) return;
    setIsGenerating(true);
    setCurrentResponse("");
    setTokensCount(0);
    setGenerationTime(0);

    const match = simulatedAnswers[selectedPrompt as keyof typeof simulatedAnswers];
    const targetText = match 
      ? match.info 
      : (lang === "fr" 
        ? `MODEL: GEMINI_2.5_PRO // AGENT_PERSONNALISÉ
--------------------------------------------------
[✓] Compilation de la requête personnalisée
[✓] Analyse sémantique effectuée

> ANALYSE DU SOUFFLE PROMPT :
- Contexte utilisateur : "${selectedPrompt.slice(0, 45)}..."
- Statut de l'infrastructure : Optimisé avec succès

\`\`\`typescript
const agentWorkspace = {
  customPrompt: "${selectedPrompt.replace(/["`]/g, "'")}",
  status: "synthesized",
  activeCores: 32,
  completedAt: "${new Date().toLocaleTimeString()}"
};
\`\`\`
Succès : Flux cognitif simulé généré avec succès pour Niya Studio.`
        : `MODEL: GEMINI_2.5_PRO // CUSTOM_AGENT
--------------------------------------------------
[✓] Compiling custom pipeline query
[✓] Executing semantic parsing algorithm

> DETECTED PROMPT CONTEXT:
- Custom objective: "${selectedPrompt.slice(0, 45)}..."
- Agent pipeline state: Tailored and compiled

\`\`\`typescript
const agentWorkspace = {
  customPrompt: "${selectedPrompt.replace(/["`]/g, "'")}",
  status: "synthesized",
  activeCores: 32,
  completedAt: "${new Date().toLocaleTimeString()}"
};
\`\`\`
Success: Multi-agent pipeline generated and synchronized with Niya workspace.`);

    const targetTokens = match ? match.tokens : 210;
    
    let currentIndex = 0;
    // Fast typewriter streaming
    const charTimer = setInterval(() => {
      if (currentIndex < targetText.length) {
        const chunk = targetText.slice(currentIndex, currentIndex + 8);
        setCurrentResponse(prev => prev + chunk);
        currentIndex += 8;
        setTokensCount(prev => Math.min(targetTokens, prev + Math.floor(Math.random() * 12) + 4));
        setGenerationTime(prev => Number((prev + 0.05).toFixed(2)));
      } else {
        clearInterval(charTimer);
        setIsGenerating(false);
        setHistory(prev => [{ prompt: selectedPrompt, response: targetText }, ...prev].slice(0, 5));
      }
    }, 15);
  };

  const currentPresets = lang === "fr" ? presets.fr : presets.en;

  return (
    <div className="w-full bg-[#0a070f] text-[#ebdcf7] font-mono p-0">
      
      {/* Visual Google AI Studio Simulated Header */}
      <div className="w-full h-16 border-b border-violet-500/10 bg-[#0a070f]/90 backdrop-blur sticky top-0 flex items-center justify-between px-6 z-30 text-[10px] tracking-widest uppercase font-bold text-violet-300">
        <div className="flex items-center gap-2">
          <Bot size={13} className="text-violet-400 animate-pulse" />
          <span className="font-black text-white text-xs tracking-wider font-sans">AI STUDIO // LABS</span>
        </div>
        
        {/* Model Selection Pills */}
        <div className="hidden md:flex gap-2">
          {[
            { id: "pro", name: "GEMINI 2.5 PRO" },
            { id: "flash", name: "GEMINI 2.5 FLASH" },
            { id: "thinking", name: "FLASH THINKING" }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setModel(m.id as any)}
              className={`px-3 py-1 text-[8px] border rounded transition-all ${
                model === m.id 
                  ? "bg-violet-500/20 border-violet-400 text-white font-black" 
                  : "bg-white/[0.02] border-white/5 text-stone-500 hover:text-stone-300"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 font-sans">
          <Cpu size={12} className="text-fuchsia-400 animate-spin" style={{ animationDuration: "12s" }} />
          <span className="text-[8px] font-black text-fuchsia-400 border border-fuchsia-500/20 bg-fuchsia-500/10 px-2 py-0.5 rounded-full">
            {lang === "fr" ? "COGNITION ACTIVE" : "CORE COGNITION LIVE"}
          </span>
        </div>
      </div>

      {/* Hero Intro Banner */}
      <div className="relative py-12 px-6 text-center bg-gradient-to-b from-purple-950/20 to-[#0a070f] overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.1),transparent_75%)]" />
        
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-[8px] text-violet-400 font-sans font-black tracking-widest uppercase mb-3">
          <Terminal size={10} />
          {lang === "fr" ? "PROTOTYPAGE RAPIDE" : "RAPID MODEL SYNCHRONY"}
        </span>

        <div className="text-2xl md:text-3xl font-extralight tracking-widest text-[#ebdcf7] uppercase mb-2 font-sans">
          STUDIO APP LABS
        </div>
        <p className="text-white/40 text-[9px] uppercase tracking-[0.25em] mb-4">
          APP RETRIEVAL: eda147b8-09f7-4ad9-9af1-8f96c833b446
        </p>
        <div className="w-12 h-[1px] bg-violet-500/30 mx-auto" />
      </div>

      {/* Two Column Workspace Grid */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
        
        {/* Left Column: Console Inputs */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="border border-white/5 bg-[#0e0a15] rounded-xl p-5">
            <h3 className="text-xs uppercase font-extrabold text-violet-300 mb-4 flex items-center gap-1.5">
              <span>01.</span>
              {lang === "fr" ? "SÉLECTIONNER UN SOUFFLE PROMPT" : "CHOOSE AGENT OBJECTIVE"}
            </h3>

            {/* Presets Grid */}
            <div className="flex flex-col gap-3">
              {currentPresets.map((p, idx) => (
                <button
                  key={idx}
                  disabled={isGenerating}
                  onClick={() => {
                    setPromptInput(p.prompt);
                    handleRun(p.prompt);
                  }}
                  className="p-3 text-left border border-white/5 bg-[#140f21]/60 hover:border-violet-500/30 rounded-lg text-[10px] leading-normal transition-all duration-200 group flex items-start justify-between gap-3 disabled:opacity-50"
                >
                  <span className="group-hover:text-white">{p.text}</span>
                  <span className="text-violet-500 shrink-0 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              ))}
            </div>

            {/* Manual user typing entry box */}
            <div className="mt-6 border-t border-white/5 pt-5">
              <label className="block text-[8px] font-black text-stone-400 uppercase tracking-widest mb-2">
                {lang === "fr" ? "SAISIE DE PROMPT MANUEL" : "CUSTOM PROMPT COMMAND"}
              </label>
              
              <div className="relative">
                <textarea
                  value={promptInput}
                  disabled={isGenerating}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder={lang === "fr" ? "Entrez vos consignes pour l'agent..." : "Enter workspace instructions for model..."}
                  className="w-full h-20 bg-black/40 border border-white/10 rounded-lg p-3 text-[10px] text-white focus:outline-none focus:border-violet-500 transition-all font-mono resize-none disabled:opacity-50"
                />
                
                <button
                  onClick={() => handleRun(promptInput)}
                  disabled={isGenerating || !promptInput.trim()}
                  className="absolute bottom-2.5 right-2.5 p-2 bg-violet-600 hover:bg-violet-500 disabled:bg-stone-800 disabled:text-stone-500 text-white rounded-md transition-all duration-200"
                  aria-label="Send prompt"
                >
                  <Send size={11} className={isGenerating ? "animate-pulse" : ""} />
                </button>
              </div>
            </div>
          </div>

          {/* Core Hardware metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-white/5 bg-[#0e0a15] p-3 rounded-xl flex flex-col justify-between">
              <span className="block text-[8px] text-stone-400 uppercase tracking-widest">{lang === "fr" ? "JETONS INCORPORÉS" : "TOKENS CONSUMED"}</span>
              <span className="text-sm font-extrabold text-violet-400 mt-2 font-mono">{tokensCount} tokens</span>
            </div>
            <div className="border border-white/5 bg-[#0e0a15] p-3 rounded-xl flex flex-col justify-between">
              <span className="block text-[8px] text-stone-400 uppercase tracking-widest">{lang === "fr" ? "LATENCE APPLET" : "INFERENCE TIME"}</span>
              <span className="text-sm font-extrabold text-fuchsia-400 mt-2 font-mono">{generationTime}s</span>
            </div>
          </div>
        </div>

        {/* Right Column: Code Terminal Output */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="border border-violet-500/10 bg-[#06040a] rounded-xl overflow-hidden flex-1 flex flex-col min-h-[300px] shadow-2xl">
            {/* Terminal Tab header */}
            <div className="h-9 border-b border-white/5 bg-[#0d0915] flex items-center justify-between px-4">
              <div className="flex items-center gap-1.5 text-[8px] font-bold text-violet-400">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                <span>TERMINAL://OUTPUT_STREAM</span>
              </div>
              <span className="text-[7px] text-stone-500 font-mono tracking-widest uppercase">STDOUT_STREAM</span>
            </div>

            {/* Terminal Body */}
            <div className="p-4 flex-1 font-mono text-[9px] text-[#ebdcf7]/80 leading-relaxed overflow-y-auto text-left h-72">
              {currentResponse ? (
                <pre className="whitespace-pre-wrap font-mono break-all font-light">
                  {currentResponse}
                  {isGenerating && <span className="inline-block w-1.5 h-3 bg-violet-400 ml-1 animate-pulse" />}
                </pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-stone-600 font-mono gap-2 p-4">
                  <Terminal size={24} className="text-stone-700 animate-pulse" />
                  <div>
                    <p className="uppercase tracking-widest font-bold text-[8px]">
                      {lang === "fr" ? "CONSOLE PRÊTE À EXÉCUTER" : "COMPILER READY FOR SESSION"}
                    </p>
                    <p className="text-[8px] font-light mt-1 text-stone-500/80">
                      {lang === "fr" ? "Sélectionnez une option de gauche ou saisissez une commande." : "Trigger a cognitive objective to begin streaming inferences."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Futuristic Multi-Agent Neural Mesh Visualization Map */}
      <div className="py-12 px-6 border-t border-white/5 bg-[#08050c]">
        <div className="max-w-xl mx-auto border border-violet-500/10 rounded-2xl p-6 bg-[#0e0a15]/50 relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
          
          {/* Animated custom CSS radar coordinate vector */}
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center border border-violet-500/10 rounded-full bg-black/40">
            <div className="absolute inset-2 border border-dashed border-violet-500/20 rounded-full animate-spin" style={{ animationDuration: "14s" }} />
            <div className="absolute inset-5 border border-purple-500/10 rounded-full animate-reverse-spin" style={{ animationDuration: "8s" }} />
            <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(168,85,247,0.5)] animate-ping" />
            <div className="absolute w-2 h-2 rounded-full bg-violet-400" />
            
            {/* Pulsing satellite node points */}
            <div className="absolute top-3 left-4 w-1.5 h-1.5 bg-fuchsia-400 rounded-full animate-bounce" />
            <div className="absolute bottom-5 right-2 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>

          <div className="flex-1 text-center md:text-left select-none">
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#ebdcf7] mb-2 flex items-center justify-center md:justify-start gap-1.5">
              <span>{lang === "fr" ? "COGNITION GÉOMÉTRIQUE DISTRIBUÉE" : "DISTRIBUTED COGNITION GRID"}</span>
            </h4>
            <p className="text-white/40 text-[9px] leading-relaxed font-light">
              {lang === "fr" 
                ? "L'architecture s'auto-ajuste pour équilibrer la latence sur les clusters d'inférence GPU mondiaux, garantissant une réactivité fluide."
                : "Dynamic hardware mesh self-balances compute requirements dynamically across physical nodes, maintaining seamless load distribution."}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
