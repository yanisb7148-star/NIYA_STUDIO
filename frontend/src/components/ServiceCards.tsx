import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { 
  Laptop, 
  ShoppingBag, 
  Palette, 
  Move, 
  Search, 
  Lightbulb, 
  Sparkles,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { GlowCard } from "./GlowCard";
import { cn } from "@/src/lib/utils";
import fetchAPI from "../lib/api";

export function ServiceCards() {
  const { t, lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const cardsData = [
    {
      id: 0,
      title: t.serviceCards.titleWebsite,
      desc: t.serviceCards.descWebsite,
      icon: Laptop,
      tools: ["Next.js", "React", "Tailwind", "Vercel"],
      color: "glow-purple",
      shadowColor: "rgba(139, 92, 246, 0.2)"
    },
    {
      id: 1,
      title: t.serviceCards.titleShopify,
      desc: t.serviceCards.descShopify,
      icon: ShoppingBag,
      tools: ["Shopify", "Liquid", "Stripe"],
      color: "glow-blue",
      shadowColor: "rgba(59, 130, 246, 0.2)"
    },
    {
      id: 2,
      title: t.serviceCards.titleBrand,
      desc: t.serviceCards.descBrand,
      icon: Palette,
      tools: ["Figma", "Branding", "UI/UX"],
      color: "glow-purple",
      shadowColor: "rgba(139, 92, 246, 0.2)"
    },
    {
      id: 3,
      title: t.serviceCards.titleMotion,
      desc: t.serviceCards.descMotion,
      icon: Move,
      tools: ["Three.js", "Framer", "GSAP", "Lenis"],
      color: "glow-blue",
      shadowColor: "rgba(59, 130, 246, 0.2)"
    },
    {
      id: 4,
      title: t.serviceCards.titleSeo,
      desc: t.serviceCards.descSeo,
      icon: Search,
      tools: ["Analytics", "Keywords", "Performance"],
      color: "glow-purple",
      shadowColor: "rgba(139, 92, 246, 0.2)"
    },
    {
      id: 5,
      title: t.serviceCards.titleStrategy,
      desc: t.serviceCards.descStrategy,
      icon: Lightbulb,
      tools: ["Strategy", "Growth", "Consulting"],
      color: "glow-blue",
      shadowColor: "rgba(59, 130, 246, 0.2)"
    }
  ];

  const [remoteServices, setRemoteServices] = useState<any[] | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadRemote() {
      try {
        const res = await fetchAPI('/services', { sort: ['order:asc'], populate: '*' });
        const items = Array.isArray(res?.data)
          ? res.data.map((d: any) => ({
              id: d.id,
              title: d.attributes?.title || d.attributes?.name || 'Untitled',
              desc: d.attributes?.shortDescription || d.attributes?.description || '',
              icon: Palette,
              tools: [],
              color: 'glow-purple',
              shadowColor: 'rgba(139, 92, 246, 0.2)'
            }))
          : null;
        if (mounted && items) setRemoteServices(items);
      } catch (e) {
        // Silent fallback to local data
        console.warn('Failed to load services from Strapi', e);
      }
    }
    loadRemote();
    return () => { mounted = false; };
  }, []);

  const displayCards = remoteServices ?? cardsData;

  // Coherent next/prev slider trigger
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cardsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);
  };

  // Inertial drag event handlers for Mobile Showcase carousel
  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
    setDragX(0);
  };

  const handleDrag = (event: any, info: PanInfo) => {
    setDragX(info.offset.x);
  };

  return (
    <section id="services-cards" className="py-24 relative overflow-hidden bg-brand-navy">
      {/* Dynamic ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-purple/10 to-transparent rounded-full pointer-events-none translate-z-0" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10" ref={containerRef}>
        
        {/* PREMIUM MOBILE-ONLY CAROUSEL SHOWCASE */}
        <div className="block md:hidden">
          <div className="text-center mb-12">
            <span className="text-brand-purple font-mono text-[10px] mb-2 block uppercase tracking-[0.5em] font-bold">
              {lang === "fr" ? "LES EXPERTISES" : "THE EXPERTISE"}
            </span>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">
              {lang === "fr" ? "DE " : "OF "}<span className="text-white/30">NIYA STUDIO.</span>
            </h2>
            <p className="text-white/40 text-xs mt-3 leading-relaxed max-w-xs mx-auto">
              {lang === "fr" 
                ? "Balayez vers la gauche ou la droite pour explorer les expertises avec profondeur 3D."
                : "Swipe to navigate or tap controls to delve into the core creative disciplines."}
            </p>
          </div>

          {/* Sensation of depth 3D carousel container */}
          <div className="relative h-[480px] w-full flex items-center justify-center overflow-visible select-none">
            
            {/* Horizontal sliding area */}
            <div className="relative w-[310px] h-[390px] overflow-visible flex items-center justify-center">
              
              <AnimatePresence initial={false}>
                {displayCards.map((card, idx) => {
                  // Calculate relational loop position index for smooth looping stack visibility
                  let offset = idx - activeIndex;
                  
                  // Keep offset within range [-3, 3] for correct rendering
                  if (offset < -3) offset += cardsData.length;
                  if (offset > 2) offset -= cardsData.length;

                  const isActive = offset === 0;
                  const isVisible = Math.abs(offset) <= 2;

                  if (!isVisible) return null;

                  // High fidelity 3D style parameters
                  const rotateY = offset * -22;
                  const rotateZ = offset * 2.5;
                  const rotateX = isActive ? 0 : 5;
                  const scale = isActive ? 1.02 : 1 - Math.abs(offset) * 0.12;
                  const zIndex = 20 - Math.abs(offset);
                  // Dynamic blur for passive slides to evoke true screen depth and progressive blurring
                  const blurAmount = isActive ? 0 : Math.abs(offset) * 3;
                  const xPosition = offset * 230 + dragX * 0.45;

                  return (
                    <motion.div
                      key={card.id}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDrag={handleDrag}
                      onDragEnd={handleDragEnd}
                      dragElastic={0.4}
                      style={{
                        zIndex,
                        transformOrigin: "center center",
                        perspective: 1200
                      }}
                      animate={{
                        x: xPosition,
                        scale: scale,
                        rotateY: rotateY,
                        rotateZ: rotateZ,
                        rotateX: rotateX,
                        opacity: isActive ? 1 : 0.45 - Math.abs(offset) * 0.1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 26,
                        mass: 0.9
                      }}
                      className="absolute w-[290px] h-[375px] cursor-grab active:cursor-grabbing translate-z-0 will-change-transform"
                    >
                      {/* Premium glass card design with high-end border light tracking */}
                      <div 
                        className={cn(
                          "w-full h-full glass rounded-[24px] border border-white/10 p-6 flex flex-col justify-between transition-shadow duration-300 relative overflow-hidden translate-z-0",
                          isActive ? "bg-white/[0.07] border-white/20" : "bg-white/[0.02]"
                        )}
                        style={{
                          boxShadow: isActive ? `0 20px 40px ${card.shadowColor}` : "none"
                        }}
                      >
                        {/* Dynamic edge color indicator */}
                        <div className={cn(
                          "absolute top-0 left-0 w-full h-[4px]",
                          card.color === "glow-purple" ? "bg-brand-purple" : "bg-brand-blue"
                        )} />

                        {/* Top: Icon + Title Group */}
                        <div>
                          <div className={cn(
                            "mb-4 flex items-center justify-between",
                            card.color === "glow-purple" ? "text-brand-purple" : "text-brand-blue"
                          )}>
                            <card.icon size={36} className="animate-pulse" />
                          </div>

                          <h3 className="text-xl font-black uppercase tracking-tight italic text-white mb-2 leading-none">
                            {card.title}
                          </h3>
                          
                          <p className="text-white/50 text-[12px] leading-relaxed font-medium mb-4">
                            {card.desc}
                          </p>
                        </div>

                        {/* Bottom: Tools badges + Action Button */}
                        <div>
                          <div className="flex flex-wrap gap-1.5 select-none">
                            {card.tools.map((tool) => (
                              <span 
                                key={tool} 
                                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-bold text-white/40 uppercase tracking-wider"
                              >
                                {tool}
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

          </div>

          {/* Dots Indicator & Swipe Arrows */}
          <div className="flex flex-col items-center justify-center gap-4 mt-2">
            {/* Interactive bullets */}
            <div className="flex gap-2">
              {displayCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i === activeIndex 
                      ? "bg-brand-purple w-6" 
                      : "bg-white/15 hover:bg-white/30"
                  )}
                  aria-label={`Go to slide ${i+1}`}
                />
              ))}
            </div>

            {/* Tap navigation buttons for accessibility */}
            <div className="flex gap-4">
              <button 
                onClick={handlePrev} 
                className="p-3 glass rounded-full text-white/60 hover:text-white active:scale-90 transition-all border border-white/5"
              >
                <ArrowLeft size={16} />
              </button>
              <button 
                onClick={handleNext} 
                className="p-3 glass rounded-full text-white/60 hover:text-white active:scale-90 transition-all border border-white/5"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* PREMIUM DESKTOP-ONLY MODERN BENTO GRID (The requested "only mobile version for carousel" adaptivity) */}
        <div className="hidden md:block">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-brand-purple font-mono text-xs mb-3 block uppercase tracking-[0.4em] font-bold">
              {lang === "fr" ? "SUR-REPRÉSENTATION TECHNIQUE" : "CORE SPECIALTIES"}
            </span>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-4">
              {lang === "fr" ? "LES EXPERTISES DE" : "THE SCOPE OF"}{" "}
              <span className="text-white/30">{lang === "fr" ? "NIYA STUDIO." : "SERVICES."}</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed">
              {lang === "fr" 
                ? "Élaboration d'infrastructures web de grande finesse basées sur les normes créatives les plus rigoureuses."
                : "Delivering masterfully styled online infrastructures based on pristine and rigorous digital standards."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayCards.map((card, i) => (
              <GlowCard key={i} glowClassName={card.color} className="group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
                <div className="flex flex-col gap-6 h-full p-2 md:p-0 relative overflow-hidden">
                  
                  {/* Decorative glowing background mesh subtle */}
                  <div className={cn(
                    "absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[40px] opacity-10 transition-opacity duration-300 group-hover:opacity-30",
                    card.color === "glow-purple" ? "bg-brand-purple" : "bg-brand-blue"
                  )} />

                  {/* Icon with scaling interaction */}
                  <div className={cn(
                    "transition-transform duration-500 group-hover:scale-110",
                    card.color === 'glow-purple' ? 'text-brand-purple' : 'text-brand-blue'
                  )}>
                    <card.icon size={32} />
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tight italic uppercase text-white transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60">
                      {card.title}
                    </h3>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed font-medium mb-6">
                      {card.desc}
                    </p>
                    
                    {/* Tech Badges Zone */}
                    <div className="flex flex-wrap gap-2 mb-2 select-none">
                      {card.tools.map((tool) => (
                        <span 
                          key={tool} 
                          className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest transition-colors duration-300 group-hover:text-white/70 group-hover:border-white/10"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </GlowCard>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
