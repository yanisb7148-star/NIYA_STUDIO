import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export function SEO() {
  const { lang } = useLanguage();

  const seoData = {
    fr: {
      title: 'Niya Studio | Développeur Web Freelance & Création de Sites sur Mesure',
      description: 'Créateur de sites web en freelance, expert en branding et expériences numériques haut de gamme. Conception de sites vitrines, e-commerce, applications web modernes et optimisation SEO.',
      keywords: 'développeur web freelance, création de site web sur mesure, branding, web design, développement front-end, expert SEO, Niya Studio, UI/UX, e-commerce',
    },
    en: {
      title: 'Niya Studio | Freelance Web Developer & Premium Digital Craft',
      description: 'Freelance web developer and branding expert crafting premium digital experiences, modern websites, immersive brand identities, and high-end digital products.',
      keywords: 'freelance web developer, custom web design, web development, branding expert, digital experiences, Niya Studio, UI/UX, e-commerce, SEO freelance',
    }
  };

  const { title, description, keywords } = seoData[lang];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Niya Studio" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Language */}
      <html lang={lang} />
    </Helmet>
  );
}
