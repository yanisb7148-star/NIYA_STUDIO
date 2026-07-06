import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" ref={containerRef} className="py-16 md:py-24 container mx-auto px-6 relative">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* Sticky Header */}
        <div className="md:sticky md:top-24 lg:top-32 xl:top-40 h-fit md:w-1/3 z-20 md:max-h-[calc(100vh-8rem)] md:overflow-y-auto scrollbar-none">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col select-none"
          >
            <span className="text-brand-purple font-mono text-xs md:text-sm mb-2 md:mb-4 block uppercase tracking-[0.3em]">
              {t.process.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-6xl font-black mb-4 md:mb-6 leading-[0.95] uppercase tracking-tighter italic">
              {t.process.title1} <br /> <span className="text-white/30">{t.process.title2}</span>
            </h2>
            <p className="text-white/40 text-sm md:text-base lg:text-lg font-medium leading-relaxed max-w-xs md:max-w-sm">
              {t.process.desc}
            </p>
          </motion.div>
        </div>

        {/* Parallax Steps */}
        <div className="md:w-2/3 relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-0 md:left-[-40px] top-4 bottom-4 w-[1px] bg-white/5">
            <motion.div 
              style={{ scaleY }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-purple to-brand-blue origin-top shadow-[0_0_15px_rgba(147,51,234,0.5)]" 
            />
          </div>

          <div className="flex flex-col gap-16 md:gap-24">
            {t.process.steps.map((step, i) => (
              <ProcessStep key={i} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProcessStepType {
  num: string;
  title: string;
  desc: string;
  tags: string[];
}

function ProcessStep({ step }: { step: ProcessStepType; key?: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className="relative pl-10 md:pl-0"
    >
      <motion.div style={{ y }} className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <motion.span 
            className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-br from-brand-purple to-brand-blue opacity-50 leading-none drop-shadow-sm cursor-default inline-block"
            whileHover={{ scale: 1.1, opacity: 1, filter: "drop-shadow(0px 0px 20px rgba(147,51,234,0.6))" }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {step.num}
          </motion.span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        <div className="max-w-xl">
          <h3 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter italic">
            {step.title}
          </h3>
          <p className="text-white/50 text-base md:text-xl font-medium leading-relaxed mb-8">
            {step.desc}
          </p>
          
          <div className="flex flex-wrap gap-3">
            {step.tags.map(tag => (
              <span key={tag} className="px-4 py-1.5 glass rounded-full text-[10px] uppercase tracking-widest font-bold text-brand-purple">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
