import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

export function WordReveal({ 
  text, 
  className,
  delay = 0,
  highlightWords = []
}: { 
  text: string; 
  className?: string;
  delay?: number;
  highlightWords?: string[];
}) {
  const words = text.split(' ');
  const { theme } = useTheme();

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: ['blur(10px) drop-shadow(0 0 0px rgba(139,92,246,0))', 'blur(0px) drop-shadow(0 0 15px rgba(139,92,246,0.8))', 'blur(0px) drop-shadow(0 0 0px rgba(139,92,246,0))'],
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 150,
        filter: { duration: 0.8, times: [0, 0.2, 1] }
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px) drop-shadow(0 0 0px rgba(139,92,246,0))',
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={cn("inline-flex flex-wrap justify-center gap-[0.25em]", className)}
    >
      {words.map((word, index) => {
        const isHighlighted = highlightWords.includes(word);
        return (
          <motion.span
            key={index}
            variants={child}
            className={cn(
              "inline-block transition-all duration-500 hover:text-brand-purple hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] active:text-brand-purple active:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] active:scale-110",
              isHighlighted ? "font-black text-brand-purple" : (theme === 'light' ? "text-[#050505]" : "")
            )}
            onTouchStart={() => {}}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
