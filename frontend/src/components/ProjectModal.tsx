import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Home, ShoppingBag, CreditCard, Info, Star } from 'lucide-react';
import InteractiveBentoGallery, { type MediaItem } from './ui/interactive-bento-gallery';

interface Feature {
  title: string;
  description: string;
  image: string;
  video?: string;
  icon: React.ReactNode;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    desc: string;
    features?: Feature[];
  } | null;
}

const DEFAULT_FEATURES: Feature[] = [
  {
    title: "Homepage",
    description: "Immersive landing experience",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    icon: <Home size={24} className="text-white" />
  },
  {
    title: "Product Showcase",
    description: "High-end product reveals",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    icon: <ShoppingBag size={24} className="text-white" />
  },
  {
    title: "Seamless Checkout",
    description: "Frictionless payment flow",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    icon: <CreditCard size={24} className="text-white" />
  },
  {
    title: "Brand Story",
    description: "Engaging about section",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
    icon: <Info size={24} className="text-white" />
  },
  {
    title: "Reviews",
    description: "Customer testimonials",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
    icon: <Star size={24} className="text-white" />
  }
];

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [fullscreenMedia, setFullscreenMedia] = useState<{url: string, type: 'image'|'video'} | null>(null);
  
  const options = project && project.features && project.features.length > 0 
    ? project.features 
    : DEFAULT_FEATURES;

  useEffect(() => {
    if (!isOpen) {
      setFullscreenMedia(null);
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const mediaItems: MediaItem[] = React.useMemo(() => {
    return options.map((opt, i) => {
      let span = "";
      if (i % 5 === 0) span = "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2";
      else if (i % 5 === 1) span = "col-span-2 row-span-1 sm:col-span-1 sm:row-span-1 md:col-span-1 md:row-span-2";
      else if (i % 5 === 2) span = "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-1";
      else if (i % 5 === 3) span = "col-span-1 row-span-2 sm:col-span-2 sm:row-span-1 md:col-span-1 md:row-span-2";
      else if (i % 5 === 4) span = "col-span-2 row-span-1 sm:col-span-1 sm:row-span-1 md:col-span-2 md:row-span-1";
      else span = "col-span-2 row-span-1 sm:col-span-1 sm:row-span-1 md:col-span-1 md:row-span-1";

      return {
        id: `${project?.title || "feat"}-${i}`,
        type: opt.video ? "video" : "image",
        title: opt.title,
        desc: opt.description,
        url: opt.video || opt.image,
        span: span,
        icon: opt.icon
      };
    });
  }, [options]);

  const handleCardClick = (item: MediaItem) => {
    setFullscreenMedia({ 
      url: item.url, 
      type: item.type 
    });
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-brand-navy overflow-y-auto font-sans text-white"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="fixed top-4 right-4 md:top-8 md:right-8 z-[160] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md"
          >
            <X size={24} />
          </button>

          <div className="min-h-[100dvh] w-full flex flex-col items-center justify-start py-8 md:py-12 px-2 md:px-6">
            <InteractiveBentoGallery
              mediaItems={mediaItems}
              title={project.title}
              description={project.desc}
              onItemClick={handleCardClick}
            />
          </div>
        </motion.div>
      )}
      
      {/* Fullscreen Lightbox */}
      {fullscreenMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setFullscreenMedia(null)}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setFullscreenMedia(null);
            }}
            className="absolute top-8 right-8 z-[210] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md text-white"
          >
            <X size={24} />
          </button>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-[95vw] max-h-[95vh] rounded-lg shadow-2xl overflow-hidden flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {fullscreenMedia.type === 'video' ? (
              <video 
                src={fullscreenMedia.url} 
                autoPlay 
                muted
                loop
                playsInline
                className="w-full h-full max-h-[95vh] object-contain"
              />
            ) : (
              <img
                src={fullscreenMedia.url}
                alt="Fullscreen View"
                className="max-w-full max-h-[95vh] object-contain"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
