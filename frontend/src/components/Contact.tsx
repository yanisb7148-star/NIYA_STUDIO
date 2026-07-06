import { motion } from "motion/react";
import { Instagram, Linkedin, Twitter, MessageCircle, Mail, Phone, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden -mt-[60px] md:-mt-[100px]">
      {/* Massive Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-purple/20 to-transparent rounded-full pointer-events-none translate-z-0" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-brand-purple font-mono text-sm mb-6 block uppercase tracking-[0.3em]">
            {t.contact.badge}
          </span>
          <h2 className="text-6xl md:text-9xl font-black mb-8 leading-[0.8] tracking-tighter uppercase">
            {t.contact.title1} <br />
            <span className="text-white/30 tracking-normal inline-block mr-2 md:mr-6">{t.contact.title2.split(" ")[0]}</span>
            <span className="text-white/30">{t.contact.title2.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-2xl md:text-4xl font-medium text-white/50 mb-10 italic">
            {t.contact.quote}
          </p>

          {/* Social Icons */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {[
              { icon: Instagram, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: MessageCircle, href: "#", text: "WhatsApp" },
              { icon: Mail, href: "mailto:hello@niyastudio.com", text: "Email" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                whileHover={{ scale: 1.1, y: -5 }}
                className="group flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:bg-brand-purple group-hover:text-black transition-all">
                  <item.icon size={24} />
                </div>
                {item.text && (
                  <span className="text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                    {item.text}
                  </span>
                )}
              </motion.a>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
            <div className="p-8 glass rounded-3xl group cursor-pointer hover:bg-white/10 transition-colors">
              <Mail className="text-brand-purple mb-4" />
              <h4 className="text-xl font-bold mb-2">hello@niyastudio.com</h4>
              <p className="text-white/40 text-sm">{t.contact.sendInquiry}</p>
            </div>
            <div className="p-8 glass rounded-3xl group cursor-pointer hover:bg-white/10 transition-colors">
              <Phone className="text-brand-blue mb-4" />
              <h4 className="text-xl font-bold mb-2">+33 7 45 08 72 72</h4>
              <p className="text-white/40 text-sm">{t.contact.schedule}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
