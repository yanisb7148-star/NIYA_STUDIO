import { motion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { cn } from "@/src/lib/utils";
import {
  Check,
  ShieldCheck,
  Zap,
  Server,
  Lock,
  MousePointerClick,
  CreditCard,
} from "lucide-react";
import { useRef, useState } from "react";

export function DetailedServices() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeAutonomyIndex, setActiveAutonomyIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const isLight = theme === "light";

  return (
    <section
      id="detailed-services"
      ref={sectionRef}
      className={cn(
        "py-32 relative overflow-hidden bg-brand-navy max-md:h-[2242px]"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="text-brand-purple font-mono text-xs mb-3 block uppercase tracking-[0.4em] font-bold">
            {t.detailedServices.badge}
          </span>
          <h2
            className={cn(
              "text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6",
              "text-white"
            )}
          >
            {t.detailedServices.title}
          </h2>
        </div>

        {/* Categories */}
        <div 
          className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-32 snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide"
          onScroll={(e) => {
            const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
            if (scrollWidth <= clientWidth) return;
            const progress = scrollLeft / (scrollWidth - clientWidth);
            setActiveCategoryIndex(Math.round(progress * (t.detailedServices.categories.length - 1)));
          }}
        >
          {t.detailedServices.categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={cn(
                "snap-center shrink-0 w-[85vw] max-w-[400px] md:w-auto group relative p-6 md:p-10 rounded-[2rem] border transition-all duration-500 overflow-hidden",
                "glass border-white/10 hover:border-brand-purple/50"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <span className="font-mono text-xs text-brand-purple font-bold tracking-widest block mb-4">
                  {cat.num}
                </span>
                <h3
                  className={cn(
                    "text-2xl font-black uppercase tracking-tight mb-8",
                    "text-white"
                  )}
                >
                  {cat.title}
                </h3>

                <ul className="space-y-4 mb-8">
                  {cat.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                      <span
                        className={cn(
                          "text-sm font-medium leading-relaxed",
                          "text-white/70"
                        )}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                <div
                  className={cn(
                    "pt-6 border-t",
                    "border-white/10"
                  )}
                >
                  <p
                    className={cn(
                      "text-xs font-mono font-medium",
                      "text-brand-purple/80"
                    )}
                  >
                    {cat.options}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center gap-2 mb-32 md:hidden">
          {t.detailedServices.categories.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeCategoryIndex === i ? "w-6 bg-brand-purple" : "w-1.5 bg-brand-purple/30"
              )}
            />
          ))}
        </div>

        {/* Payments Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={cn(
            "relative p-10 md:p-16 rounded-[3rem] border mb-32 overflow-hidden translate-z-0",
            "bg-white/[0.02] border-white/10"
          )}
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-purple/20 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none translate-z-0" />

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-brand-purple" />
              </div>
              <h3
                className={cn(
                  "text-3xl md:text-4xl font-black uppercase tracking-tight",
                  "text-white"
                )}
              >
                {t.detailedServices.payments.title}
              </h3>
            </div>
            <p
              className={cn(
                "text-lg mb-12 leading-relaxed max-w-xl",
                "text-white/60"
              )}
            >
              {t.detailedServices.payments.desc}
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              {t.detailedServices.payments.methods.map((method, i) => (
                <div
                  key={i}
                  className={cn(
                    "px-6 py-3 rounded-full text-sm font-bold border transition-colors",
                    "bg-white/5 border-white/10 text-white hover:border-brand-purple/50"
                  )}
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Autonomy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3
              className={cn(
                "text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-6 leading-tight",
                "text-white"
              )}
            >
              {t.detailedServices.autonomy.title}
            </h3>
            <p
              className={cn(
                "text-lg leading-relaxed mb-8",
                "text-white/70"
              )}
            >
              {t.detailedServices.autonomy.desc}
            </p>
          </motion.div>

          <div className="w-full">
            <div 
              className="flex overflow-x-auto sm:grid sm:grid-cols-2 gap-4 sm:gap-6 snap-x snap-mandatory pb-4 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0 scrollbar-hide mb-6 sm:mb-0"
              onScroll={(e) => {
                const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
                if (scrollWidth <= clientWidth) return;
                const progress = scrollLeft / (scrollWidth - clientWidth);
                setActiveAutonomyIndex(Math.round(progress * (t.detailedServices.autonomy.points.length - 1)));
              }}
            >
              {t.detailedServices.autonomy.points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "snap-center shrink-0 w-[85vw] sm:w-auto p-8 rounded-3xl border",
                  "bg-white/[0.02] border-white/10"
                )}
              >
                <div className="mb-4">
                  {i === 0 && <Server className="w-8 h-8 text-brand-purple" />}
                  {i === 1 && (
                    <MousePointerClick className="w-8 h-8 text-brand-purple" />
                  )}
                  {i === 2 && <Zap className="w-8 h-8 text-brand-purple" />}
                  {i === 3 && (
                    <ShieldCheck className="w-8 h-8 text-brand-purple" />
                  )}
                </div>
                <h4
                  className={cn(
                    "text-lg font-bold mb-3",
                    "text-white"
                  )}
                >
                  {point.title}
                </h4>
                <p
                  className={cn(
                    "text-sm leading-relaxed",
                    "text-white/50"
                  )}
                >
                  {point.desc}
                </p>
              </motion.div>
            ))}
            </div>
            
            {/* Mobile Navigation Dots */}
            <div className="flex justify-center gap-2 sm:hidden mt-4">
              {t.detailedServices.autonomy.points.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    activeAutonomyIndex === i ? "w-6 bg-brand-purple" : "w-1.5 bg-brand-purple/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

