import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { InteractiveBallpit } from "./InteractiveBallpit";
import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/utils";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[120vh] flex flex-col items-center justify-center overflow-hidden pt-24 px-10 text-center"
    >
      {/* Interactive 3D Ballpit Background */}
      <InteractiveBallpit className="opacity-40 lg:opacity-60" />

      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-purple/30 to-transparent rounded-full pointer-events-none translate-z-0" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue/20 to-transparent rounded-full pointer-events-none translate-z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] md:w-[800px] md:h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-purple/10 to-transparent rounded-full pointer-events-none translate-z-0" />
      
      {/* Smooth Transition Overlay with Blur */}
      <div className={cn(
        "absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t z-[5] translate-z-0",
        theme === 'light' ? "from-[#f8fafc] via-[#f8fafc]/80 to-transparent" : "from-brand-navy via-brand-navy/80 to-transparent"
      )} />

      <motion.div 
        className="relative z-10 container mx-auto -mt-[200px]"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-[100px] md:text-[131px] leading-[0.9] md:leading-[0.8] mb-[18px] md:mb-10 tracking-tighter uppercase max-md:mt-0 max-md:pt-0 max-md:ml-0"
        >
          <span className={cn("font-black md:text-[189px]", theme === 'light' ? 'text-[#050505]' : 'text-white')}>{t.hero.title1}</span> <br className="md:hidden" />
          <span className={cn("font-stylish italic normal-case md:text-[189px]", theme === 'light' ? 'text-[#050505]/90' : 'text-white/90')}>{t.hero.title2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={cn(
            "text-[12px] md:text-[17px] max-w-xl mx-auto mb-12 font-light leading-relaxed",
            theme === 'light' ? 'text-[#050505]/60' : 'text-white/60'
          )}
        >
          {t.hero.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a href="#projects" className={cn(
            "px-10 py-5 btn-gradient rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95 text-center",
            theme === 'light' ? 'text-white' : 'text-white'
          )}>
            {t.hero.btnWorks}
          </a>
          <a href="#detailed-services" className={cn(
            "group flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95 text-center border",
            theme === 'light' ? 'border-[#050505]/20 hover:border-[#050505]/40 text-[#050505]' : 'border-white/20 hover:border-white/40 text-white'
          )}>
            {t.hero.btnServices}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
