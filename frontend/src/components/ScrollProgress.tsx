import { motion, useScroll, useSpring } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{ 
        scaleX,
        background: theme === 'light' 
          ? 'linear-gradient(to right, #00F2FF, #9333EA)'
          : 'linear-gradient(to right, #00D1FF, #E933FF)'
      }}
    />
  );
}
