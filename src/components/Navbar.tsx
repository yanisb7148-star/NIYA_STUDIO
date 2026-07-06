import { motion, AnimatePresence } from "motion/react";
import { Globe, ArrowRight, Instagram, Linkedin, Twitter, MessageSquare, Anchor, Sun, Moon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOverProjects, setIsOverProjects] = useState(false);
  const { lang, t, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Track which purple sections are currently intersecting
    const activeSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSections.add(entry.target.id);
          } else {
            activeSections.delete(entry.target.id);
          }
        });
        setIsOverProjects(activeSections.size > 0);
      },
      {
        rootMargin: "-10px 0px -90% 0px"
      }
    );

    let retryCount = 0;
    const attachObserver = () => {
      const projectsSection = document.getElementById("projects");
      const techStackSection = document.getElementById("tech-stack");
      
      let found = false;
      if (projectsSection) {
        observer.observe(projectsSection);
        found = true;
      }
      if (techStackSection) {
        observer.observe(techStackSection);
        found = true;
      }
      
      if (!found && retryCount < 10) {
        retryCount++;
        setTimeout(attachObserver, 500);
      }
    };
    attachObserver();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  const menuItems = [
    { labelFr: "Accueil", labelEn: "Home", href: "#" },
    { labelFr: "Les expertises", labelEn: "Expertise", href: "#services-cards" },
    { labelFr: "Services", labelEn: "Services", href: "#detailed-services" },
    { labelFr: "Les réalisations", labelEn: "Selected Works", href: "#projects" },
    { labelFr: "Lab Niya Studio", labelEn: "Niya Studio Lab", href: "#demo" },
    { labelFr: "À Propos", labelEn: "About", href: "#about" },
    { labelFr: "FAQ", labelEn: "FAQ", href: "#faq" },
    { labelFr: "Contact", labelEn: "Contact", href: "#contact" },
    { labelFr: "Prendre RDV", labelEn: "Book a Call", href: "#booking" },
  ];

  const activeMenuItems = menuItems;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href === "#" ? "body" : href;
    const event = new CustomEvent("page-transition", {
      detail: { targetId }
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <nav className={cn(
        "fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled ? "top-2 md:top-4 w-[96%] md:w-[85%] max-w-4xl" : "top-4 md:top-8 w-[100%] md:px-8 max-w-[2000px]"
      )}>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled ? "glass border-white/20 shadow-2xl py-1.5 md:py-2" : "bg-transparent backdrop-blur-none border-transparent w-full"
          )}
        >
          <a href="/" className="flex items-center gap-1.5 md:gap-2 relative z-[70]">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-brand-purple animate-ping absolute duration-1000 opacity-75" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-brand-purple relative z-10" />
            <div className={cn(
              "flex items-baseline gap-1 text-base md:text-lg hover:opacity-80 transition-colors duration-300",
              theme === 'light' ? "text-[#050505]" : "text-white"
            )}>
              <span className="font-black uppercase tracking-tighter">NIYA</span>
              <span className="font-stylish italic normal-case">Studio</span>
            </div>
          </a>

          {/* Right Section: Toggle + Premium Hamburger Menu Trigger */}
          <div className="flex items-center gap-2 md:gap-4 relative z-[70]">
            
            {/* Minimalist Language Switcher directly inside Navbar for lightning-fast access */}
            <div className="flex items-center gap-0.5 md:gap-1 p-[2px] md:p-[3px] rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
              <button
                onClick={() => setLanguage("fr")}
                className={cn(
                  "px-2 md:px-3 py-1 text-[8px] md:text-[9px] font-black rounded-full uppercase tracking-wider transition-all duration-300",
                  lang === "fr" ? "bg-white text-black font-extrabold shadow-sm" : "text-white/40 hover:text-white"
                )}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "px-2 md:px-3 py-1 text-[8px] md:text-[9px] font-black rounded-full uppercase tracking-wider transition-all duration-300",
                  lang === "en" ? "bg-white text-black font-extrabold shadow-sm" : "text-white/40 hover:text-white"
                )}
              >
                EN
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 bg-black/40 hover:bg-white/10 text-white transition-all focus:outline-none ml-1 mr-1 md:ml-2 md:mr-2"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? <Moon className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Sun className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Premium Hamburger Menu Button with integrated magnetic feedback & morph */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full border border-white/10 bg-black/40 hover:bg-white/10 text-white transition-all overflow-hidden focus:outline-none group active:scale-95"
              aria-label="Toggle Menu"
            >
              <div className="flex flex-col gap-[3px] md:gap-[4px] items-center justify-center">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: isMobile ? 4.5 : 5.5 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="w-4 md:w-5 h-[1.5px] bg-white block"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-4 md:w-5 h-[1.5px] bg-white block"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: isMobile ? -4.5 : -5.5 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="w-4 md:w-5 h-[1.5px] bg-white block"
                />
              </div>
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Floating Side Drawer with elegant blur background without overlaying everything */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Soft transparent background blur without solid black blocks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-[6px] z-50 transition-all cursor-pointer"
            />

            {/* Premium Menu Floating Container */}
            <motion.div
              initial={{ x: "100%", opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.9 }}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
              className={cn(
                "fixed right-0 top-0 h-screen w-full max-w-[390px] backdrop-blur-[32px] border-l px-10 pt-32 pb-12 flex flex-col justify-between z-50 shadow-[-10px_0_40px_rgba(0,0,0,0.5)] select-none",
                "bg-brand-navy/95 border-white/10"
              )}
            >
              {/* Vertical link array with staggered animation */}
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-brand-purple font-mono text-[9px] uppercase tracking-[0.4em] font-extrabold block mb-6">
                    {lang === "fr" ? "NAVIGATION STUDIO" : "STUDIO DIRECTORY"}
                  </span>
                </div>

                <div className="flex flex-col gap-5">
                  {activeMenuItems.map((item, index) => {
                    const label = lang === "fr" ? item.labelFr : item.labelEn;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.1, duration: 0.4 }}
                      >
                        <a
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className={cn(
                            "group relative inline-flex items-center text-2xl font-black uppercase italic tracking-tighter transition-colors duration-300",
                            "text-white/70 hover:text-white"
                          )}
                        >
                          {/* Animated index prefix */}
                          <span className="text-[10px] font-mono non-italic font-bold text-brand-purple mr-3 w-5 opacity-40 group-hover:opacity-100 transition-opacity">
                            0{index + 1}
                          </span>
                          
                          <span>{label}</span>

                          {/* Elegant hover line tracking underline effect */}
                          <span className="absolute left-8 bottom-[-4px] w-0 h-[2px] bg-brand-purple group-hover:w-[calc(100%-32px)] transition-all duration-300 rounded-full" />
                        </a>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom footer block with Socials & Contact Switcher inside drawer */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className={cn(
                  "border-t pt-8",
                  "border-white/5"
                )}
              >
                {/* CTA call of Reservation directly */}
                <a
                  href="#booking"
                  onClick={(e) => handleLinkClick(e, "#booking")}
                  className={cn(
                    "group flex items-center justify-between px-5 py-4 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all mb-6 hover:bg-brand-purple hover:text-white hover:border-transparent",
                    "bg-white/[0.04] border-white/10 text-white"
                  )}
                >
                  <span>{t.nav.cta}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </a>

                {/* Micro details */}
                <div className={cn(
                  "flex items-center justify-between text-[9px] uppercase tracking-wider",
                  "text-white/30"
                )}>
                  <div className="flex items-baseline gap-1">
                    <span>© {new Date().getFullYear()}</span>
                    <span className="font-black">NIYA</span>
                    <span className="font-stylish italic normal-case">Studio</span>
                  </div>
                  <div className="flex gap-4">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                      INSTA
                    </a>
                    <span>•</span>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                      LINKEDIN
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
