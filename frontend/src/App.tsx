/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LenisProvider } from "./components/LenisProvider";
import { LanguageProvider } from "./context/LanguageContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ServiceCards } from "./components/ServiceCards";
import { DetailedServices } from "./components/DetailedServices";
import { TechStack } from "./components/TechStack";
import { Process } from "./components/Process";
import { WhyNiya } from "./components/WhyNiya";
import { About } from "./components/About";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Booking } from "./components/Booking";
import { Footer } from "./components/Footer";
import { InteractiveShowcase } from "./components/InteractiveShowcase";
import { SmartPricing } from "./components/SmartPricing";
import { ScrollProgress } from "./components/ScrollProgress";

import { PageTransition } from "./components/PageTransition";
import { Chatbot } from "./components/Chatbot";

import { SnakeDivider } from "./components/SnakeDivider";

import { ThemeProvider } from "./context/ThemeContext";
import { SEO } from "./components/SEO";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SEO />
        <LenisProvider>
        <div className="relative min-h-screen selection:bg-brand-purple/30">
          <div className="noise-bg" />
          
          <ScrollProgress />
          <PageTransition />
          <Navbar />
          
          <main>
            <Hero />
            <TechStack />
            <ServiceCards />
            <DetailedServices />
            <SnakeDivider />
            <InteractiveShowcase />
            <SmartPricing />
            <div className="hidden md:block">
              <Process />
              <WhyNiya />
            </div>
            <About />
            <FAQ />
            <Contact />
            <Booking />
          </main>
          
          <Chatbot />
          <Footer />
        </div>
      </LenisProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

