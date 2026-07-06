"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export type CardStackItem = {
  id: number | string;
  title: string;
  description: string;
  imageSrc?: string;
  videoSrc?: string;
  href?: string;
  icon?: React.ReactNode;
};

export const CardStack = ({
  items,
  initialIndex = 0,
  autoAdvance = false,
  intervalMs = 5000,
  pauseOnHover = true,
  showDots = true,
  onCardClick,
}: {
  items: CardStackItem[];
  initialIndex?: number;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  showDots?: boolean;
  onCardClick?: (item: CardStackItem) => void;
}) => {
  const [cards, setCards] = useState<CardStackItem[]>(items);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Reset cards when items prop changes
    setCards(items);
  }, [items]);

  useEffect(() => {
    if (!autoAdvance) return;
    if (pauseOnHover && isHovered) return;
    const interval = setInterval(() => {
      setCards((prevCards: CardStackItem[]) => {
        const newArray = [...prevCards];
        const first = newArray.shift();
        if (first) newArray.push(first); // move the first element to the end
        return newArray;
      });
    }, intervalMs);
    return () => clearInterval(interval);
  }, [autoAdvance, intervalMs, pauseOnHover, isHovered, cards.length]);

  const handleCardClick = (item: CardStackItem, index: number) => {
    if (index === 0) {
      if (onCardClick) onCardClick(item);
    } else {
      setCards((prevCards: CardStackItem[]) => {
        const newArray = [...prevCards];
        const clickedCard = newArray.splice(index, 1)[0];
        newArray.unshift(clickedCard);
        return newArray;
      });
    }
  };

  return (
    <div 
      className="relative w-full h-[50vh] md:h-[60vh] max-h-[600px] flex justify-center items-center perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full w-full max-w-3xl">
        {cards.map((card, index) => {
          return (
            <motion.div
              key={card.id}
              className="absolute h-full w-full rounded-3xl p-0 shadow-2xl border border-white/10 bg-black overflow-hidden flex flex-col cursor-pointer"
              style={{ transformOrigin: "top center" }}
              animate={{
                top: index * -15, 
                scale: 1 - index * 0.04,
                zIndex: cards.length - index,
                opacity: 1 - index * 0.15,
                y: index * 20
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleCardClick(card, index)}
            >
              {card.videoSrc ? (
                <video src={card.videoSrc} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0" />
              ) : (
                <img src={card.imageSrc} alt={card.title} className="absolute inset-0 w-full h-full object-cover z-0" />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-[1]" />
              
              <div className="relative z-10 p-6 lg:p-10 flex flex-col items-center justify-end h-full text-center">
                {card.icon && (
                  <div className="w-14 h-14 rounded-full mb-4 flex items-center justify-center text-white bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                    {card.icon}
                  </div>
                )}
                <h3 className="text-white font-bold mb-2 text-xl lg:text-3xl tracking-tight">{card.title}</h3>
                <p className="text-white/80 text-sm md:text-base font-medium max-w-[400px] mx-auto leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {showDots && (
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-50">
          {items.map((item, i) => {
            const currentPosition = cards.findIndex(c => c.id === item.id);
            const isActive = currentPosition === 0;
            return (
              <button
                key={item.id}
                className={`h-2 rounded-full transition-all duration-300 ${isActive ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                onClick={() => {
                  setCards((prev) => {
                     const newArray = [...prev];
                     const targetIndex = newArray.findIndex(c => c.id === item.id);
                     if (targetIndex > 0) {
                        const targetCard = newArray.splice(targetIndex, 1)[0];
                        newArray.unshift(targetCard);
                     }
                     return newArray;
                  });
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
