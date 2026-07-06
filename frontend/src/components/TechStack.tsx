import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { 
  Zap, 
  Cpu, 
  Layers, 
  Layout, 
  Code2, 
  Globe, 
  Figma, 
  Github, 
  Database, 
  Box, 
  Infinity as InfinityIcon, 
  Sparkles,
  Command
} from "lucide-react";

export const TECH_ITEMS = [
  { name: "Next.js", icon: Code2, color: "#ffffff" },
  { name: "React", icon: Cpu, color: "#00F2FF" },
  { name: "Tailwind", icon: Layout, color: "#00D1FF" },
  { name: "Framer", icon: Zap, color: "#9333EA" },
  { name: "GSAP", icon: Sparkles, color: "#C1FF00" },
  { name: "Shopify", icon: Globe, color: "#2DF07D" },
  { name: "WordPress", icon: Layers, color: "#00A0FF" },
  { name: "Figma", icon: Figma, color: "#FF4B2B" },
  { name: "Vercel", icon: Globe, color: "#ffffff" },
  { name: "Stripe", icon: Command, color: "#7B61FF" },
  { name: "Claude", icon: Box, color: "#FF8C66" },
  { name: "ChatGPT", icon: Box, color: "#19C37D" },
  { name: "GitHub", icon: Github, color: "#ffffff" },
  { name: "Supabase", icon: Database, color: "#3ECF8E" },
  { name: "Three.js", icon: Box, color: "#ffffff" },
  { name: "Lenis", icon: InfinityIcon, color: "#FF3333" },
  { name: "Motion", icon: Zap, color: "#E933FF" },
  { name: "Shadcn", icon: Layout, color: "#ffffff" },
];

export const MarqueeRow = ({ items, direction = 1, speed = 35, theme = 'dark' }: { items: typeof TECH_ITEMS, direction?: 1 | -1, speed?: number, theme?: string }) => {
  return (
    <div className="flex overflow-hidden select-none relative py-6">
      <motion.div
        initial={{ x: direction === 1 ? "0%" : "-50%" }}
        animate={{
          x: direction === 1 ? "-50%" : "0%",
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-nowrap items-center gap-6 pr-6 w-max will-change-transform"
      >
        {/* Repeating items for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <TechCard key={i} item={item} theme={theme} />
        ))}
      </motion.div>
    </div>
  );
};

function TechCard({ item, theme = 'dark' }: { item: typeof TECH_ITEMS[0], key?: any, theme?: string }) {
  const itemColor = theme === 'light' && item.color === '#ffffff' ? '#000000' : item.color;
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 1.05, y: -8 }}
      onTouchStart={() => {}}
      className={cn(
        "flex items-center gap-4 md:gap-5 px-6 py-4 md:px-10 md:py-6 glass rounded-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden shrink-0 min-w-[170px] md:min-w-[220px]",
        theme === 'light' ? 'border-brand-navy/10 bg-white hover:bg-brand-navy/5 active:bg-brand-navy/5' : 'border-[#ffffff]/10 bg-[#ffffff]/[0.03] hover:shadow-[0_0_60px_rgba(147,51,234,0.3)] active:shadow-[0_0_60px_rgba(147,51,234,0.3)]'
      )}
    >
      {/* Dynamic Background Hover Effect */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 group-active:opacity-100",
        theme === 'light' ? "bg-gradient-to-br from-brand-purple/5 via-transparent to-brand-blue/5" : "bg-gradient-to-br from-brand-purple/20 via-transparent to-brand-blue/20"
      )} />
      
      <div 
        className={cn(
          "p-2 md:p-3 rounded-xl transition-all duration-500 z-10 group-hover:rotate-12 group-active:rotate-12 border",
          theme === 'light' ? 'bg-brand-navy/[0.04] border-brand-navy/10 group-hover:bg-brand-purple/5 group-active:bg-brand-purple/5' : 'bg-[#ffffff]/[0.07] border-[#ffffff]/10 group-hover:bg-brand-purple/20 group-active:bg-brand-purple/20'
        )}
        style={{ 
          boxShadow: theme === 'light' ? 'none' : `0 0 20px ${itemColor}30`,
          borderColor: theme === 'light' ? undefined : `${itemColor}40`
        }}
      >
        <item.icon 
          size={20} 
          className="md:w-[26px] md:h-[26px] transition-all duration-500" 
          style={{ 
            color: itemColor,
            filter: theme === 'light' ? 'none' : `drop-shadow(0 0 8px ${itemColor})`
          }} 
        />
      </div>
      
      <span 
        className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] transition-all duration-500 relative z-10 whitespace-nowrap"
        style={{ 
          color: itemColor,
          textShadow: theme === 'light' ? 'none' : `0 0 10px ${itemColor}40`
        }}
      >
        {item.name}
      </span>

      {/* Glossy Line Effect */}
      <div className={cn("absolute left-[-100%] top-0 w-full h-[1px] group-hover:animate-[shimmer_2s_infinite] group-active:animate-[shimmer_2s_infinite]", theme === 'light' ? 'bg-gradient-to-r from-transparent via-brand-navy/10 to-transparent' : 'bg-gradient-to-r from-transparent via-[#ffffff]/20 to-transparent')} />
    </motion.div>
  );
}

export function TechStack() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section id="tech-stack" className="pt-16 md:pt-24 relative overflow-hidden transition-colors duration-500">
      {/* High-End Technical Background */}
      <div className={cn(
        "absolute inset-0 bg-[size:60px_60px]",
        theme === 'light' ? 'bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]'
      )} />
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b via-transparent",
        theme === 'light' ? 'from-[#f8fafc] to-[#f8fafc]' : 'from-[#050508] to-[#050508]'
      )} />
      
      {/* Animated Glitchy Glows */}
      <div className="absolute top-1/4 -left-1/4 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-purple/20 to-transparent rounded-full pointer-events-none md:animate-pulse-slow translate-z-0 will-change-opacity" />
      <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue/20 to-transparent rounded-full pointer-events-none md:animate-pulse translate-z-0 will-change-opacity" />

      <div className="container mx-auto px-6 mb-12 md:mb-24 relative z-10 flex flex-col items-center text-center max-w-2xl">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="w-full"
        >
          <span className="text-brand-purple font-mono text-[10px] mb-2 block uppercase tracking-[0.5em] font-bold">
            {t.techStack.badge}
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn(
              "text-3xl font-black italic uppercase tracking-tighter",
              theme === 'light' ? 'text-[#030303]' : 'text-white border-white'
            )}
          >
            {t.techStack.title1} <br className="md:hidden" /> <span className={cn(theme === 'light' ? 'text-[#050505]' : 'text-white')}>{t.techStack.title2}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn(
              "text-xs mt-3 leading-relaxed max-w-xs mx-auto",
              theme === 'light' ? 'text-[#000000]' : 'text-white'
            )}
          >
            {t.techStack.desc}
          </motion.p>
        </motion.div>
      </div>

      <div className={cn(
        "relative py-12 transition-colors duration-500",
        theme === 'light' ? 'border-t border-brand-navy/10 mt-6 sm:mt-12' : 'border-t border-[#ffffff]/10 mt-6 sm:mt-12'
      )}>
        {/* Cinematic Edge Fades */}
        <div className={cn("absolute inset-y-0 left-0 w-20 md:w-80 bg-gradient-to-r to-transparent z-10 pointer-events-none", theme === 'light' ? 'from-[#f8fafc] via-[#f8fafc]/90' : 'from-[#050508] via-[#050508]/90')} />
        <div className={cn("absolute inset-y-0 right-0 w-20 md:w-80 bg-gradient-to-l to-transparent z-10 pointer-events-none", theme === 'light' ? 'from-[#f8fafc] via-[#f8fafc]/90' : 'from-[#050508] via-[#050508]/90')} />

        {/* Laser Lines */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent blur-[1px]" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent blur-[1px]" />

        <div className="flex flex-col gap-4 md:gap-6">
          <MarqueeRow items={TECH_ITEMS.slice(0, 9)} direction={1} speed={isMobile ? 25 : 40} theme={theme} />
          <MarqueeRow items={TECH_ITEMS.slice(9)} direction={-1} speed={isMobile ? 30 : 45} theme={theme} />
        </div>
      </div>
      
    </section>
  );
}
