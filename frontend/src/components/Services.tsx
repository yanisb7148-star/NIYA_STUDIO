import { RevealImageListItem } from "./RevealImageListItem";
import { useLanguage } from "../context/LanguageContext";

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 md:py-32 container mx-auto px-6 text-center">
      <div className="mb-24 md:mb-32">
        <span className="text-brand-purple font-mono text-xs mb-6 block uppercase tracking-[0.5em] font-bold">
          {t.services.badge}
        </span>
        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">
          {t.services.heading} <br /> <span className="text-white/20">{t.services.headingSparkle}</span>
        </h2>
      </div>

      <div className="flex flex-col items-center max-w-5xl mx-auto w-full">
        {t.services.list.map((service, index) => (
          <RevealImageListItem 
            key={index}
            index={index}
            text={service.text}
            images={service.images as any}
          />
        ))}
      </div>
    </section>
  );
}
