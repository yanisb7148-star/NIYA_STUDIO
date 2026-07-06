import React, { useRef, useEffect, useState } from 'react';
import { Hands, Results, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const getBusinessArgs = (lang: string) => [
  {
    title: lang === 'en' ? "Unprecedented Engagement" : "Engagement Inédit",
    description: lang === 'en' ? "Capture attention in-store or at the storefront. Gesture control creates a playful interaction that keeps your customers engaged with your offers longer." : "Captez l'attention en magasin ou en vitrine. Le contrôle gestuel crée une interaction ludique qui retient vos clients plus longtemps face à vos offres.",
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>,
    lightColorClass: "bg-blue-100 text-blue-600",
    darkColorClass: "bg-blue-500/20 text-blue-400"
  },
  {
    title: lang === 'en' ? "Incentive Sales (AI)" : "Ventes Incitatives (IA)",
    description: lang === 'en' ? "Embedded AI analyzes choices in real-time to suggest highly relevant options (upsell/cross-sell), naturally maximizing your average basket." : "L'IA embarquée analyse les choix en temps réel pour suggérer des options (upsell/cross-sell) ultra-pertinentes, maximisant naturellement votre panier moyen.",
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    lightColorClass: "bg-purple-100 text-purple-600",
    darkColorClass: "bg-purple-500/20 text-purple-400"
  },
  {
    title: lang === 'en' ? "Strong Differentiation" : "Différenciation Forte",
    description: lang === 'en' ? "Stand out radically from the competition. Offer a premium, contactless experience that modernizes your business's image." : "Démarquez-vous radicalement de la concurrence. Offrez une expérience premium et sans contact qui modernise l'image de votre commerce.",
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    lightColorClass: "bg-emerald-100 text-emerald-600",
    darkColorClass: "bg-emerald-500/20 text-emerald-400"
  }
];

// Configuration des paliers de prix en fonction de l'écartement des mains (en pixels à l'écran)
const getPricingTiers = (lang: string) => [
  { price: 29, name: lang === 'en' ? 'Basic Access' : 'Accès Basique', features: lang === 'en' ? ['24/7 Gym Access', 'Standard Locker', 'Free Weights'] : ['Accès Salle H24', 'Casier Standard', 'Machines Libres'] },
  { price: 59, name: lang === 'en' ? 'Premium' : 'Premium', features: lang === 'en' ? ['Group Classes', 'Spa & Sauna Area', 'Monthly Assessment'] : ['Cours Collectifs', 'Espace Spa & Sauna', 'Bilan Mensuel'] },
  { price: 99, name: lang === 'en' ? 'Coaching' : 'Coaching', features: lang === 'en' ? ['Personal Trainer 1h/wk', 'Nutrition Program', 'Towels Included'] : ['Coach Personnel 1h/sem', 'Programme Nutrition', 'Serviettes Incluses'] },
  { price: 199, name: lang === 'en' ? 'Elite' : 'Elite', features: lang === 'en' ? ['Multi-Club Access', 'Unlimited Coaching', 'Cryo Recovery'] : ['Accès Multi-Clubs', 'Coaching Illimité', 'Récupération Cryo'] }
];

interface GeminiResponse {
  message: string;
  rationale: string;
  recommendedOptionId?: string;
}

export const SmartPricing: React.FC = () => {
  const { theme } = useTheme();
  const { lang } = useLanguage();
  const BUSINESS_ARGS = getBusinessArgs(lang);
  const PRICING_TIERS = getPricingTiers(lang);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // États de l'interface
  const [distance, setDistance] = useState<number>(320); // Position X en px
  const [currentTierIndex, setCurrentTierIndex] = useState<number>(0);
  const [aiResponse, setAiResponse] = useState<GeminiResponse | null>(null);
  // Set initial AI response based on language
  useEffect(() => {
    setAiResponse({
      message: lang === 'en' ? "Ready for analysis" : "Prêt pour l'analyse",
      rationale: lang === 'en' 
        ? "Move your hand left to right in front of the camera to adjust your budget and receive Gemini's advice." 
        : "Déplacez votre main de gauche à droite devant la caméra pour ajuster votre budget et recevoir les conseils de Gemini."
    });
  }, [lang]);

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [activeArgIndex, setActiveArgIndex] = useState<number>(0);

  // États pour la gestion de la caméra mobile / permission
  const [cameraLoading, setCameraLoading] = useState<boolean>(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [retryTrigger, setRetryTrigger] = useState<number>(0);
  const [cameraStarted, setCameraStarted] = useState<boolean>(false);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<number>(0);

  const handleCarouselScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const itemHeight = container.clientHeight;
    // adding a small offset or using math.round
    const activeIndex = Math.round(scrollPosition / itemHeight);
    setActiveCarouselIndex(activeIndex);
  };

  // Auto-play pour le carrousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveArgIndex((prev) => (prev + 1) % BUSINESS_ARGS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [BUSINESS_ARGS.length]);

  // 1. Logique de calcul du palier en fonction de la distance de la main à la caméra
  useEffect(() => {
    // On mappe la position de la main (X) entre 100px et 540px sur nos 4 paliers
    const minDistance = 100;
    const maxDistance = 540;
    const clampedDistance = Math.max(minDistance, Math.min(distance, maxDistance));

    const percentage = (clampedDistance - minDistance) / (maxDistance - minDistance);
    const tierIndex = Math.min(Math.floor(percentage * PRICING_TIERS.length), PRICING_TIERS.length - 1);

    if (tierIndex !== currentTierIndex) {
      setCurrentTierIndex(tierIndex);
      triggerGeminiAnalysis(PRICING_TIERS[tierIndex]);
    }
  }, [distance]);

  // 2. Simulation de l'envoi de la capture d'écran / config à Gemini-3-Flash
  const triggerGeminiAnalysis = async (tier: ReturnType<typeof getPricingTiers>[0]) => {
    setIsAnalyzing(true);

    // Ici, dans votre app finale, vous feriez : 
    // const imageBase64 = canvasRef.current.toDataURL('image/jpeg');
    // appelerVotreAPI(imageBase64, tier);

    setTimeout(() => {
      // Simulation de la réponse de Gemini
      let mockResponse: GeminiResponse = {
        message: lang === 'en' ? `Analyzing ${tier.name} plan` : `Analyse de l'abonnement ${tier.name}`,
        rationale: lang === 'en'
          ? `This ${tier.price}€ plan is a great start. However, to reach your goals faster, personalized tracking might be relevant.`
          : `Cet abonnement à ${tier.price}€ est excellent pour démarrer. Cependant, pour atteindre vos objectifs plus rapidement, un suivi personnalisé pourrait être pertinent.`
      };

      if (tier.price === 99) {
        mockResponse = {
          message: lang === 'en' ? "Balanced Plan detected!" : "Formule Équilibrée détectée !",
          rationale: lang === 'en'
            ? "This Coaching plan is ideal for getting concrete results. We advise adding the Drinks & Proteins option to maximize your sessions."
            : "Cette formule Coaching est idéale pour avoir des résultats concrets. Nous vous conseillons d'ajouter l'option Boissons & Protéines pour maximiser vos séances.",
          recommendedOptionId: "boissons"
        };
      }
      
      setAiResponse(mockResponse);
      setIsAnalyzing(false);
    }, 800); // Temps de réponse ultra-rapide de Flash
  };

  // 3. Activer la caméra et MediaPipe Hands
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current || !cameraStarted) return;

    setCameraLoading(true);
    setCameraError(null);

    let isActive = true;

    // S'assurer que le canvas a les bonnes dimensions internes
    canvasRef.current.width = 640;
    canvasRef.current.height = 480;

    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    hands.onResults((results: Results) => {
      if (!isActive) return;
      if (!canvasRef.current || !videoRef.current) return;
      const canvasCtx = canvasRef.current.getContext('2d');
      if (!canvasCtx) return;

      // Ajuster dynamiquement les dimensions du canvas s'il y a un décalage (essentiel sur mobile portrait/paysage)
      if (videoRef.current.videoWidth && canvasRef.current.width !== videoRef.current.videoWidth) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
      }

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (results.multiHandLandmarks) {
        // Optionnel : décommenter pour afficher le squelette de la main
        /*
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#3b82f6', lineWidth: 2 });
          drawLandmarks(canvasCtx, landmarks, { color: '#60a5fa', lineWidth: 1, radius: 2 });
        }
        */

        if (results.multiHandLandmarks.length >= 1) {
          // On prend le poignet (point 0) de la première main
          const hand = results.multiHandLandmarks[0];
          const wrist = hand[0]; 

          // Utilisation de la position X du poignet (0 à 1)
          const xPos = (1 - wrist.x) * canvasRef.current.width;

          // Lisser la valeur de distance (position X)
          setDistance((prev) => prev * 0.8 + xPos * 0.2);
        }
      }
      canvasCtx.restore();
    });

    const videoEl = videoRef.current;

    // Évènements pour suivre l'activation de l'image
    const handlePlaying = () => {
      setCameraLoading(false);
      setCameraError(null);
    };

    const handleVideoError = () => {
      setCameraError(
        lang === 'en'
          ? "Camera stream error. Please check your browser permissions."
          : "Erreur de flux de la caméra. Veuillez vérifier les permissions de votre navigateur."
      );
      setCameraLoading(false);
    };

    videoEl.addEventListener('playing', handlePlaying);
    videoEl.addEventListener('error', handleVideoError);

    const camera = new Camera(videoEl, {
      onFrame: async () => {
        if (!isActive) return;
        if (videoRef.current) {
          try {
            await hands.send({ image: videoRef.current });
          } catch(e) {
            console.error(e);
          }
        }
      },
      facingMode: 'user', // Indispensable pour forcer la caméra frontale sur téléphone
      width: 640,
      height: 480
    });

    camera.start()
      .then(() => {
        if (!isActive) return;
        setCameraLoading(false);
      })
      .catch((err) => {
        if (!isActive) return;
        console.error("Camera start failed:", err);
        // Solution de secours native si le wrapper MediaPipe échoue (fréquent sur certains navigateurs mobiles)
        navigator.mediaDevices?.getUserMedia?.({ video: { facingMode: 'user' } })
          .then((stream) => {
            if (!isActive) return;
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.play()
                .then(() => {
                  if (!isActive) return;
                  setCameraLoading(false);
                })
                .catch((e) => console.error("Play error:", e));
            }
          })
          .catch((nativeErr) => {
            if (!isActive) return;
            console.error("Native getUserMedia failed:", nativeErr);
            setCameraError(
              lang === 'en'
                ? "Unable to access the camera. Please check camera permissions in your settings."
                : "Impossible d'accéder à la caméra. Veuillez autoriser l'accès à la caméra dans vos réglages."
            );
            setCameraLoading(false);
          });
      });

    return () => {
      isActive = false;
      videoEl.removeEventListener('playing', handlePlaying);
      videoEl.removeEventListener('error', handleVideoError);
      try {
        camera.stop();
      } catch (e) {
        console.warn("Camera stop ignored:", e);
      }
      try {
        hands.close();
      } catch (e) {
        console.warn("Hands close ignored:", e);
      }
    };
  }, [retryTrigger, lang, cameraStarted]);

  const currentConfig = PRICING_TIERS[currentTierIndex];

  return (
    <div id="demo" className={`font-sans border-t py-24 flex flex-col items-center justify-center p-8 ${theme === 'light' ? 'bg-[#f8fafc] text-[#050505] border-[#050505]/[0.05]' : 'bg-[#050508] text-white border-white/5'}`}>
      
      <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-6xl font-black tracking-tighter mb-6 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            LAB NIYA STUDIO
          </h1>
          <p className={`mt-4 max-w-3xl mx-auto text-base md:text-lg leading-relaxed ${theme === 'light' ? 'text-[#050505]/80' : 'text-slate-300'}`}>
            {lang === 'en'
              ? "At LAB NIYA STUDIO, we push the boundaries of interaction by exploring next-generation technologies: from robotics to real-time vision and tracking with MediaPipe. Discover how computer vision transforms the user experience."
              : "Au LAB NIYA STUDIO, nous repoussons les limites de l'interaction en explorant les technologies de pointe : de la robotique à la Vision et le Tracking en Temps Réel avec MediaPipe. Découvrez comment la vision par ordinateur transforme l'expérience utilisateur."}
          </p>
      </div>

      <div className="relative max-w-6xl w-full mx-auto mb-24">
        <div 
          onScroll={handleCarouselScroll}
          className="w-full flex flex-col md:grid md:grid-cols-3 gap-6 max-md:overflow-y-auto max-md:snap-y max-md:snap-mandatory max-md:h-[280px] max-md:[scrollbar-width:none] max-md:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className={`p-6 rounded-2xl border max-md:snap-center max-md:shrink-0 max-md:h-full flex flex-col justify-center ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-500/20 text-blue-400'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className={`text-lg font-bold mb-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>MediaPipe Face Mesh</h3>
            <p className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
              {lang === 'en'
                ? "Estimates up to 468 3D landmarks on a face in real-time. Ideal for virtually trying on glasses, makeup, or analyzing expressions."
                : "Estime jusqu'à 468 points de repère 3D sur un visage en temps réel. Idéal pour essayer virtuellement des lunettes, du maquillage, ou analyser des expressions."}
            </p>
          </div>
          
          <div className={`p-6 rounded-2xl border max-md:snap-center max-md:shrink-0 max-md:h-full flex flex-col justify-center ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${theme === 'light' ? 'bg-purple-100 text-purple-600' : 'bg-purple-500/20 text-purple-400'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>
            </div>
            <h3 className={`text-lg font-bold mb-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>MediaPipe Hands</h3>
            <p className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
              {lang === 'en'
                ? "The core technology of our Slingshot project. It tracks 21 landmarks per hand, allowing pinch detection, spreading, or a closed fist."
                : "C'est la technologie au cœur de notre projet Slingshot. Elle traque 21 points repères par main, permet de détecter les pincements, l'écartement, ou le poing fermé."}
            </p>
          </div>

          <div className={`p-6 rounded-2xl border max-md:snap-center max-md:shrink-0 max-md:h-full flex flex-col justify-center ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${theme === 'light' ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-500/20 text-emerald-400'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <h3 className={`text-lg font-bold mb-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>MediaPipe Pose</h3>
            <p className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
              {lang === 'en'
                ? "Tracks 33 points of the human body (skeleton). Essential for sports applications (checking squat posture), fitness, or dance."
                : "Traque 33 points du corps humain (squelette). Indispensable pour des applications de sport (vérifier la posture d'un squat), de fitness ou de danse."}
            </p>
          </div>
        </div>
        
        {/* Pagination Dots (Mobile Only) */}
        <div className="md:hidden absolute right-[-16px] top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
          {[0, 1, 2].map((i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeCarouselIndex === i ? 'bg-purple-500 scale-125' : theme === 'light' ? 'bg-purple-200' : 'bg-purple-900'}`}
            />
          ))}
        </div>
      </div>

      <div className="text-center mb-16">
          <div className={`inline-flex items-center space-x-2 border px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 ${theme === 'light' ? 'bg-purple-500/5 border-purple-500/20 text-purple-600' : 'bg-purple-500/10 border-purple-500/30 text-purple-400'}`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${theme === 'light' ? 'bg-purple-500' : 'bg-purple-400'}`}></span>
            <span>{lang === 'en' ? "Niya Studio Lab Demo — Multimodal Interface" : "Démo Lab NIYA Studio — Interface Multimodale"}</span>
          </div>
          <h2 className={`text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r bg-clip-text text-transparent ${theme === 'light' ? 'from-white via-slate-700 to-purple-600' : 'from-white via-slate-200 to-purple-400'}`}>
            {lang === 'en' ? "Smart Pricing & AI Analysis" : "Tarification Intelligente et Analyse IA"}
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto text-sm md:text-base ${theme === 'light' ? 'text-[#050505]/70' : 'text-slate-400'}`}>
            {lang === 'en' 
              ? "Here is a concrete example of an interactive application we can design for your clients (gyms, stores, boutiques). It links camera vision (MediaPipe) and AI (Gemini 3 Flash) to maximize sales."
              : "Voici un exemple concret d'application interactive que nous pouvons concevoir pour vos clients (salles de sport, commerces, boutiques). Elle lie vision par caméra (MediaPipe) et IA (Gemini 3 Flash) pour maximiser les ventes."}
          </p>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

        {/* COLONNE 1 : Le flux caméra & Tracking */}
        <div className={`border rounded-2xl p-6 flex flex-col items-center justify-between min-h-[450px] ${theme === 'light' ? 'bg-slate-50 border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'}`}>
          <div className="w-full text-center mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${theme === 'light' ? 'bg-blue-500/5 text-blue-600 border-blue-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
              {lang === 'en' ? "Active Gesture Control" : "Contrôle Gestuel Actif"}
            </span>
            <p className={`text-xs mt-2 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
              {lang === 'en' ? "Move your hand from left to right to configure" : "Déplacez votre main de gauche à droite pour configurer"}
            </p>
          </div>
          
          <div className={`relative w-full flex-1 min-h-[280px] rounded-xl overflow-hidden border ${theme === 'light' ? 'bg-slate-100 border-slate-300' : 'bg-black border-slate-700'}`}>
            {/* Flux de la webcam et canvas de tracking */}
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover scale-x-[-1]" playsInline muted autoPlay />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full scale-x-[-1]" />
            
            {/* Overlay Start Camera */}
            {!cameraStarted && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-md z-20 text-center p-6">
                <svg className="w-16 h-16 text-purple-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <h4 className="text-xl font-bold text-white mb-2">
                  {lang === 'en' ? "Ready to try?" : "Prêt à essayer ?"}
                </h4>
                <p className="text-sm text-slate-300 mb-6">
                  {lang === 'en' ? "Activate your camera to test gesture control." : "Activez votre caméra pour tester le contrôle gestuel."}
                </p>
                <button 
                  onClick={() => setCameraStarted(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 active:scale-95"
                >
                  {lang === 'en' ? "Try it now" : "Essayer maintenant"}
                </button>
              </div>
            )}

            {/* Overlay de chargement */}
            {cameraStarted && cameraLoading && !cameraError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm z-10 text-center p-4">
                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm text-purple-300 font-semibold">{lang === 'en' ? "Initializing camera..." : "Initialisation de la caméra..."}</p>
                <p className="text-xs text-slate-400 mt-1">{lang === 'en' ? "Please allow access when prompted" : "Veuillez autoriser l'accès à la caméra"}</p>
              </div>
            )}

            {/* Overlay d'erreur de permission */}
            {cameraError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md z-10 text-center p-6">
                <svg className="w-12 h-12 text-purple-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm font-bold text-slate-200 px-4 leading-snug">{cameraError}</p>
                <button 
                  onClick={() => setRetryTrigger(prev => prev + 1)}
                  className="mt-5 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-500/20 active:scale-95"
                >
                  {lang === 'en' ? "Retry Connection" : "Réactiver la caméra"}
                </button>
              </div>
            )}

            {/* Feedback visuel de la distance pour la démo */}
            <div className={`absolute inset-x-4 bottom-4 backdrop-blur-md p-4 rounded-xl flex flex-col gap-4 text-xs border ${theme === 'light' ? 'bg-white/90 border-slate-200 shadow-sm' : 'bg-black/70 border-slate-700'}`}>
               <div className="flex items-center justify-between">
                <span className={`font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  {lang === 'en' ? "Price Slider (L-R Hand):" : "Curseur de prix (Main G-D) :"}
                </span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded ${theme === 'light' ? 'text-blue-600 bg-blue-50' : 'text-blue-400 bg-blue-950/50'}`}>{Math.round(distance)}</span>
              </div>
              <input
                type="range"
                min={100}
                max={540}
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className={`w-full h-3 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-800'}`}
              />
            </div>
          </div>
        </div>

        {/* COLONNE 2 : L'affichage dynamique du Tarif */}
        <div className={`border-2 border-blue-500 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl ${theme === 'light' ? 'bg-gradient-to-b from-[#ffffff] to-slate-50 shadow-blue-500/10' : 'bg-gradient-to-b from-slate-900 to-slate-950 shadow-blue-500/5'}`}>
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${theme === 'light' ? 'bg-blue-500/15' : 'bg-blue-500/10'}`} />
          
          <div>
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-1 ${theme === 'light' ? 'text-[#000000]' : 'text-blue-400'}`}>
              {lang === 'en' ? "Your Plan" : "Votre Formule"}
            </h3>
            <h2 className={`text-4xl font-extrabold tracking-tight mb-4 ${theme === 'light' ? 'text-[#0e3df5]' : 'text-white'}`}>{currentConfig.name}</h2>
            
            <div className="flex items-baseline my-6">
              <span className={`text-5xl font-extrabold tracking-tight ${theme === 'light' ? 'text-[#0c13eb]' : 'text-white'}`}>{currentConfig.price}€</span>
              <span className={`ml-1 font-medium ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                {lang === 'en' ? "/month" : "/mois"}
              </span>
            </div>

            <ul className={`space-y-3 border-t pt-6 ${theme === 'light' ? 'border-slate-200' : 'border-slate-800'}`}>
              {currentConfig.features.map((feat, idx) => (
                <li key={idx} className={`flex items-center text-sm font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  <svg className="w-4 h-4 text-blue-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          <button className={`w-full mt-8 font-medium py-3 px-4 rounded-xl transition duration-200 ${theme === 'light' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg shadow-blue-500/20' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
            {lang === 'en' ? "Choose this plan" : "Choisir cette offre"}
          </button>
        </div>

        {/* COLONNE 3 : Le Terminal Conseil de Gemini */}
        <div className={`border rounded-2xl p-6 flex flex-col justify-between ${theme === 'light' ? 'bg-slate-50 border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'}`}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isAnalyzing ? (theme === 'light' ? 'bg-amber-500 animate-ping' : 'bg-amber-400 animate-ping') : (theme === 'light' ? 'bg-emerald-500' : 'bg-emerald-400')}`} />
                <span className={`text-xs font-mono tracking-wider uppercase ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Gemini Rational Engine</span>
              </div>
              {isAnalyzing && <span className={`text-xs font-mono ${theme === 'light' ? 'text-amber-600' : 'text-amber-400'}`}>{lang === 'en' ? "Thinking..." : "Analyse..."}</span>}
            </div>

            {aiResponse && (
              <div className="space-y-4">
                <div className={`text-sm font-semibold p-3 rounded-lg border ${theme === 'light' ? 'bg-white text-[#0c65fa] border-slate-200 shadow-sm' : 'bg-slate-950 text-slate-100 border-slate-800'}`}>
                  ⚡ {aiResponse.message}
                </div>
                <div className={`text-xs leading-relaxed p-4 rounded-lg border italic font-medium ${theme === 'light' ? 'bg-slate-100/50 text-slate-600 border-slate-200' : 'bg-slate-950/40 text-slate-400 border-slate-800/60'}`}>
                  "{aiResponse.rationale}"
                </div>
              </div>
            )}
          </div>

          {/* Option recommandée intelligemment par l'IA */}
          {aiResponse?.recommendedOptionId && (
            <div className={`mt-4 border p-4 rounded-xl flex items-center justify-between ${theme === 'light' ? 'bg-blue-50/50 border-blue-200' : 'bg-blue-950/40 border-blue-800/50'}`}>
              <div className="text-xs">
                <p className={`font-bold ${theme === 'light' ? 'text-blue-700' : 'text-blue-300'}`}>
                  {lang === 'en' ? "Suggested option:" : "Option suggérée :"}
                </p>
                <p className={`mt-0.5 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  {lang === 'en' ? "Drinks & Proteins Pack" : "Pack Boissons & Protéines"}
                </p>
              </div>
              <button className={`text-white text-xs font-bold px-3 py-2 rounded-lg transition ml-2 shrink-0 ${theme === 'light' ? 'bg-blue-600 hover:bg-blue-700 shadow-sm' : 'bg-blue-600 hover:bg-blue-500'}`}>
                {lang === 'en' ? "+ Add" : "+ Ajouter"}
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Pourquoi cette technologie ? Argumentation Business */}
      <div className="max-w-6xl w-full mt-24">
        <div className="text-center mb-12">
          <h3 className={`text-2xl font-black ${theme === 'light' ? 'text-[#050505]' : 'text-white'}`}>
            {lang === 'en' ? "Why integrate this technology?" : "Pourquoi intégrer cette technologie ?"}
          </h3>
          <p className={`mt-3 text-sm md:text-base max-w-2xl mx-auto ${theme === 'light' ? 'text-[#050505]/70' : 'text-slate-400'}`}>
            {lang === 'en' 
              ? "These next-generation interfaces aren't just gadgets. They transform the shopping experience and generate measurable ROI for your business."
              : "Ces interfaces de nouvelle génération ne sont pas que des gadgets. Elles transforment l'expérience d'achat et génèrent un retour sur investissement mesurable pour votre entreprise."}
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="overflow-hidden relative h-[320px] md:h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeArgIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 p-8 rounded-2xl border flex flex-col md:flex-row items-center gap-8 ${theme === 'light' ? 'bg-slate-50 border-slate-200 shadow-lg' : 'bg-white/[0.02] border-white/10 shadow-[0_0_40px_rgba(147,51,234,0.1)]'}`}
              >
                <div className={`w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center ${theme === 'light' ? BUSINESS_ARGS[activeArgIndex].lightColorClass : BUSINESS_ARGS[activeArgIndex].darkColorClass}`}>
                  {BUSINESS_ARGS[activeArgIndex].icon}
                </div>
                <div className="text-center md:text-left">
                  <h4 className={`text-2xl font-bold mb-3 ${theme === 'light' ? 'text-[#000000]' : 'text-white'}`}>{BUSINESS_ARGS[activeArgIndex].title}</h4>
                  <p className={`text-base md:text-lg leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    {BUSINESS_ARGS[activeArgIndex].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden justify-center mt-10 gap-3">
            {BUSINESS_ARGS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveArgIndex(idx)}
                aria-label={`Aller à la diapositive ${idx + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeArgIndex === idx ? 'bg-[#9333ea] scale-125' : (theme === 'light' ? 'bg-purple-200 hover:bg-purple-300' : 'bg-white/20 hover:bg-white/40')}`}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
