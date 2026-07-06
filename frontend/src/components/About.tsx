import { useState, useRef, type UIEvent } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { cn } from "@/src/lib/utils";

export function About() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    const scrollPosition = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    const newIndex = Math.round(scrollPosition / width);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const content = {
    fr: {
      badge: "À Propos",
      title: "À propos",
      intro: "Découvrez l'approche et la philosophie qui animent Niya Studio, où chaque détail est pensé pour l'excellence.",
      section1: [
        {
          title: "Mon parcours",
          desc: <>Je suis <span className="font-black text-brand-purple hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] transition-all duration-500">Yanis BELAY</span>, web designer et développeur freelance, fondateur de Niya Studio. Issu d'un parcours en marketing, j'ai développé une vision du web où le design doit servir des objectifs concrets : <span className="font-black text-brand-purple hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] transition-all duration-500">attirer, convaincre et convertir.</span></>
        },
        {
          title: "Mon expérience",
          desc: <>Au fil de mes expériences, j'ai constaté que de nombreux sites souffrent des mêmes problèmes : <span className="underline decoration-brand-purple decoration-2 underline-offset-4">interfaces vieillissantes, manque de performance, navigation peu intuitive et identité de marque insuffisamment valorisée.</span></>
        },
        {
          title: "Mon approche",
          desc: <span className={theme === 'light' ? 'text-[#050505]' : ''}>J'ai créé <span className={cn("font-black uppercase", theme === 'light' ? 'text-[#050505]' : 'text-white')}>Niya</span> <span className={cn("font-stylish italic normal-case", theme === 'light' ? 'text-[#050505]' : 'text-white')}>Studio</span> pour répondre à ces problématiques. Chaque projet est pensé <span className={cn("font-stylish italic normal-case", theme === 'light' ? 'text-[#050505]' : 'text-white')}>sur mesure</span> afin d'offrir une expérience utilisateur fluide, un design moderne et un développement performant qui accompagne durablement la croissance de mes clients.</span>
        }
      ],
      section2: [
        {
          num: "01",
          title: "Mission",
          desc: "Créer des sites web élégants, rapides et stratégiques qui renforcent la présence digitale de chaque entreprise."
        },
        {
          num: "02",
          title: "Vision",
          desc: "Faire du web un véritable levier de croissance grâce à une combinaison de design, technologie et stratégie marketing."
        },
        {
          num: "03",
          title: "Valeurs",
          desc: "Exigence, transparence, créativité et sens du détail guident chacune de mes réalisations afin d'offrir un résultat durable et de qualité."
        }
      ]
    },
    en: {
      badge: "About Us",
      title: "About",
      intro: "Discover the approach and philosophy behind Niya Studio, where every detail is designed for excellence.",
      section1: [
        {
          title: "My Background",
          desc: <>I am <span className="font-black text-brand-purple hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] transition-all duration-500">Yanis BELAY</span>, freelance web designer and developer, founder of Niya Studio. Coming from a marketing background, I developed a vision of the web where design must serve concrete goals: <span className="font-black text-brand-purple hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] transition-all duration-500">attract, convince, and convert.</span></>
        },
        {
          title: "My Experience",
          desc: <>Throughout my experiences, I noticed that many websites suffer from the same issues: <span className="underline decoration-brand-purple decoration-2 underline-offset-4">aging interfaces, lack of performance, unintuitive navigation, and undervalued brand identity.</span></>
        },
        {
          title: "My Approach",
          desc: <span className={theme === 'light' ? 'text-[#050505]' : ''}>I created <span className={cn("font-black uppercase", theme === 'light' ? 'text-[#050505]' : 'text-white')}>Niya</span> <span className={cn("font-stylish italic normal-case", theme === 'light' ? 'text-[#050505]' : 'text-white')}>Studio</span> to solve these issues. Each project is <span className={cn("font-stylish italic normal-case", theme === 'light' ? 'text-[#050505]' : 'text-white')}>tailor-made</span> to provide a seamless user experience, modern design, and high-performance development that sustainably supports my clients' growth.</span>
        }
      ],
      section2: [
        {
          num: "01",
          title: "Mission",
          desc: "Create elegant, fast, and strategic websites that strengthen the digital presence of each company."
        },
        {
          num: "02",
          title: "Vision",
          desc: "Make the web a true growth driver through a combination of design, technology, and marketing strategy."
        },
        {
          num: "03",
          title: "Values",
          desc: "Excellence, transparency, creativity, and attention to detail guide each of my projects to deliver a durable and high-quality result."
        }
      ]
    }
  };

  const text = content[lang as keyof typeof content] || content.fr;

  return (
    <section ref={sectionRef} id="about" className={cn(
      "py-32 md:py-48 relative overflow-hidden transition-colors duration-500 -mt-[50px] md:-mt-[100px] -ml-[1px] md:ml-0",
      theme === 'light' ? 'bg-[#f8fafc] text-[#050505]' : 'bg-[#050508] text-white'
    )}>
      {/* Background glow effects */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-purple/5 to-transparent rounded-full translate-z-0" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue/5 to-transparent rounded-full translate-z-0" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section 1: Intro & Paragraphs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32 md:mb-48 md:-mt-[100px]">
          
          {/* Left: Title & Intro */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
               className="-mt-[61px] md:mt-0 ml-0 pt-0"
            >
              <h2 className={cn(
                "text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.9]",
                theme === 'light' ? 'text-[#050505]' : 'text-white'
              )}>
                {text.title}
              </h2>
              <p className={cn(
                "text-lg md:text-xl leading-relaxed font-light max-w-sm",
                theme === 'light' ? 'text-[#050505]' : 'text-white/60'
              )}>
                {text.intro}
              </p>
            </motion.div>
          </div>

          {/* Right: 3 Columns Text */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {text.section1.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col group cursor-pointer"
                onClick={() => {}}
              >
                <h3 className={cn(
                  "text-lg font-bold mb-4 flex items-center gap-3 transition-colors duration-300",
                  theme === 'light' ? 'text-[#050505]' : 'text-white'
                )}>
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    theme === 'light' 
                      ? "bg-brand-purple/40 group-hover:bg-brand-purple group-active:bg-brand-purple" 
                      : "bg-brand-purple/40 group-hover:bg-brand-purple group-active:bg-brand-purple",
                    "group-hover:scale-150 group-active:scale-150"
                  )} />
                  <span className="uppercase">{item.title}</span>
                </h3>
                <p className={cn(
                  "text-sm md:text-base leading-relaxed font-light text-center",
                  theme === 'light' ? 'text-[#050505]' : 'text-white/50'
                )}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Values Cards */}
        <div className="relative">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 md:pb-0 md:-mt-[75px]"
          >
            {text.section2.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "w-full flex-shrink-0 snap-center md:w-auto p-10 md:p-12 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 active:-translate-y-2 group relative overflow-hidden cursor-pointer",
                theme === 'light' 
                  ? 'bg-[#FAFAFA] border border-[#050505]/[0.03] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] active:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]' 
                  : 'bg-white/[0.02] border border-white/5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] hover:bg-white/[0.04] active:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] active:bg-white/[0.04]'
              )}
              onClick={() => {}}
            >
              {/* Subtle gradient hover */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500",
                theme === 'light'
                  ? 'bg-gradient-to-br from-brand-purple/5 via-transparent to-brand-blue/5'
                  : 'bg-gradient-to-br from-brand-purple/10 via-transparent to-brand-blue/10'
              )} />
              
              <div className="relative z-10">
                <div className={cn(
                  "font-mono text-6xl md:text-7xl mb-10 tracking-tighter font-black transition-all duration-500",
                  theme === 'light' 
                    ? 'text-[#050505] group-hover:text-brand-purple/60 group-active:text-brand-purple/60 group-hover:scale-105 group-active:scale-105 origin-left' 
                    : 'text-white/30 group-hover:text-brand-purple/60 group-active:text-brand-purple/60 group-hover:scale-105 group-active:scale-105 origin-left'
                )}>
                  {item.num}
                </div>
                <h4 className={cn(
                  "text-2xl md:text-3xl font-bold mb-4 tracking-tight group-hover:text-brand-purple group-active:text-brand-purple transition-colors duration-300 uppercase",
                  theme === 'light' ? 'text-[#050505]' : 'text-white'
                )}>
                  {item.title}
                </h4>
                <p className={cn(
                  "leading-relaxed font-light",
                  theme === 'light' ? 'text-[#050505]' : 'text-white/50'
                )}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
          </div>

          {/* Mobile Pagination Dots */}
          <div className="flex md:hidden justify-center gap-3 mt-4">
            {text.section2.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo({
                      left: scrollRef.current.clientWidth * idx,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  activeIndex === idx ? "w-8 bg-brand-purple" : theme === 'light' ? "w-2 bg-brand-navy/20" : "w-2 bg-white/20"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

