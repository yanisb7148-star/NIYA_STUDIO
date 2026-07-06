import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

export function FAQ() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={cn("py-32 relative -mt-[150px] md:-mt-[160px]", theme === 'light' ? 'bg-[#f8fafc]' : 'bg-[#050505]')}>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-purple font-mono text-xs mb-3 block uppercase tracking-[0.4em] font-bold">
            {t.faq.badge}
          </span>
          <h2 className={cn("text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4", theme === 'light' ? 'text-[#050505]' : 'text-white')}>
            {t.faq.title}
          </h2>
        </div>

        <div className="space-y-4">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                key={index}
                className={cn(
                  "border rounded-2xl overflow-hidden transition-colors duration-300",
                  theme === 'light' 
                    ? "border-[#050505]/[0.05] bg-[#FAFAFA]" 
                    : "border-white/10 glass",
                  isOpen && (theme === 'light' ? "border-brand-purple/50 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]" : "border-brand-purple/50 bg-white/5")
                )}
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full px-6 py-6 flex justify-between items-center text-left focus:outline-none"
                >
                  <h3 className={cn(
                    "text-lg md:text-xl font-bold transition-colors duration-300 pr-8",
                    theme === 'light' ? "text-[#050505]" : "text-white",
                    isOpen && "text-brand-purple"
                  )}>
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300",
                      theme === 'light' ? "bg-[#050505]/5 text-[#050505]/50" : "bg-white/10 text-white/50",
                      isOpen && (theme === 'light' ? "bg-brand-purple text-white" : "bg-brand-purple text-white")
                    )}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className={cn(
                        "px-6 pb-6 pt-2 leading-relaxed text-sm md:text-base",
                        theme === 'light' ? "text-[#050505]/70" : "text-white/60"
                      )}>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
