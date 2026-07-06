import { motion } from "motion/react";
import React, { useRef } from "react";
import { Calendar, Video, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Booking() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  return (
    <section id="booking" className="py-32 relative overflow-hidden bg-brand-navy">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-purple/20 to-transparent rounded-full translate-z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="glass rounded-[3rem] p-12 md:p-24 text-center border-white/10 relative overflow-hidden group translate-z-0"
        >
          {/* Static Particles Simulation for performance */}
          <div className="absolute inset-0 opacity-10 pointer-events-none translate-z-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 3 + 2}s`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.span 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="text-brand-purple font-mono text-xs uppercase tracking-[0.4em] mb-8 block font-bold"
            >
              {t.booking.badge}
            </motion.span>
            
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[0.85] tracking-tighter uppercase italic">
              {t.booking.title1} <br /> <span className="text-white/30">{t.booking.title2}</span>
            </h2>
            
            <p className="text-white/50 text-xl md:text-2xl font-medium mb-16 max-w-2xl mx-auto italic">
              {t.booking.quote}
            </p>

            <div className="flex flex-col items-center gap-8" ref={containerRef}>
              <div className="mt-16 w-full max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl h-[650px] relative border border-white/20">
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/50 z-0 text-brand-navy">
                  <Calendar size={48} className="text-brand-purple mb-4 opacity-50" />
                  <p className="font-medium text-lg mb-2">Calendrier de réservation</p>
                  <p className="text-sm opacity-60 max-w-md text-center">
                    Veuillez insérer votre lien de prise de rendez-vous Google Calendar (Appointment Scheduling) dans le code (src/components/Booking.tsx).
                  </p>
                </div>
                <iframe 
                  // Remplacez ce lien par votre propre lien de prise de rendez-vous Google Calendar
                  src={undefined}
                  style={{ border: 0 }}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="relative z-10 w-full h-full"
                  title="Google Calendar Appointment Scheduling"
                ></iframe>
              </div>

              <div className="flex flex-col md:flex-row gap-3 md:gap-8 items-center text-white/40 font-bold text-[12.6px] md:text-xs uppercase tracking-widest text-center w-full justify-center">
                <div className="flex items-center gap-2">
                  <Video size={14} className="text-brand-blue shrink-0 ml-4 md:ml-0" />
                  <span className="whitespace-normal break-words text-center -ml-8 md:ml-0">{t.booking.visio}</span>
                </div>
                <div className="hidden md:block w-[1px] h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-brand-purple shrink-0" />
                  <span className="whitespace-normal break-words text-center">{t.booking.consultation}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                    {t.booking.responds}
                  </span>
                </div>
                
                <div className="h-12 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
