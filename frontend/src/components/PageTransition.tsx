import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useLenis } from "./LenisProvider";

export function PageTransition() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"hidden" | "falling" | "revealing">("hidden");
  const lenis = useLenis();

  useEffect(() => {
    const handleTrigger = (e: CustomEvent) => {
      const { targetId } = e.detail;
      // Start transition
      setIsActive(true);
      setPhase("falling");
      
      setTimeout(() => {
        // Change page
        const element = document.querySelector(targetId);
        if (element) {
          if (lenis) {
            lenis.scrollTo(element, { immediate: true, offset: 0 });
          } else {
            const y = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: y, behavior: 'instant' });
          }
        } else if (targetId === "body") {
          if (lenis) lenis.scrollTo(0, { immediate: true });
          else window.scrollTo({ top: 0, behavior: 'instant' });
        }
        
        // Start revealing
        setPhase("revealing");
        
        setTimeout(() => {
          setIsActive(false);
          setPhase("hidden");
        }, 700); // Wait for balls to fall down
      }, 600); // 600ms to let balls fall and cover
    };

    window.addEventListener("page-transition" as any, handleTrigger);
    return () => window.removeEventListener("page-transition" as any, handleTrigger);
  }, [lenis]);

  // 20 balls to ensure the screen gets fully covered when they scale up
  const balls = Array.from({ length: 20 });

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
          {balls.map((_, i) => {
            const size = 300;
            // Distribute across a slight wider width to cover edges nicely
            const left = -10 + (i / (balls.length - 1)) * 120;
            
            // Waterfall delay
            const fallingDelay = Math.random() * 0.15;
            const revealingDelay = Math.random() * 0.1;
            const activeDelay = phase === "falling" ? fallingDelay : revealingDelay;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-brand-purple translate-z-0 will-change-[transform,top]"
                style={{
                  width: size,
                  height: size,
                  left: `${left}%`,
                  marginLeft: -size / 2,
                }}
                initial={{ top: "-50vh", scale: 0.5 }}
                animate={{
                  top: phase === "falling" ? "10vh" : "150vh",
                  scale: phase === "falling" ? 6 : 0.5,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.76, 0, 0.24, 1],
                  delay: activeDelay,
                }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}
