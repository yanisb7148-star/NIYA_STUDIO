import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="z-50 px-10 py-10 border-t border-white/5 bg-brand-navy">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8 text-[10px] uppercase tracking-widest text-white/40">
        <div className="flex flex-col gap-2 items-center md:items-start md:justify-self-start">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-brand-purple" />
            <span className="font-bold tracking-tighter text-sm uppercase text-white">Niya Studio</span>
          </div>
          <div>Niya Studio &copy; 2026</div>
        </div>

        <div className="flex gap-8 justify-center md:justify-self-center">
          <a href="#" className="hover:text-white transition-colors duration-300">Instagram</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Behance</a>
          <a href="#" className="hover:text-white transition-colors duration-300">LinkedIn</a>
        </div>

        <div className="text-center md:text-right md:justify-self-end">
          {t.footer.madeIn}
        </div>
      </div>
    </footer>
  );
}
