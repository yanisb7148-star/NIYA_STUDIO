"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Maximize2, Play } from "lucide-react";

export interface MediaItem {
  id: number | string;
  type: "image" | "video";
  title: string;
  desc: string;
  url: string;
  span: string;
  icon?: React.ReactNode;
}

interface InteractiveBentoGalleryProps {
  mediaItems: MediaItem[];
  title: string;
  description: string;
  onItemClick?: (item: MediaItem) => void;
}

export default function InteractiveBentoGallery({
  mediaItems,
  title,
  description,
  onItemClick,
}: InteractiveBentoGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<MediaItem[]>(mediaItems);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    setItems(mediaItems);
  }, [mediaItems]);

  const handleDragStart = (index: number) => {
    setIsDragging(true);
    setDraggedIndex(index);
  };

  const handleDragEnd = (event: any, info: any, index: number) => {
    setDraggedIndex(null);
    setTimeout(() => setIsDragging(false), 100);

    const { point, offset, velocity } = info;
    const elements = document.elementsFromPoint(point.x, point.y);
    const dropTarget = elements.find((el) => {
      const idx = el.getAttribute("data-bento-index");
      return idx !== null && parseInt(idx, 10) !== index;
    });

    let targetIndex = -1;

    if (dropTarget) {
      targetIndex = parseInt(
        dropTarget.getAttribute("data-bento-index") || "-1",
        10
      );
    } else {
      // Touch-based swipe gesture fallback
      const swipeThreshold = 50;
      const velThreshold = 200;
      
      if (
        Math.abs(offset.x) > swipeThreshold || 
        Math.abs(offset.y) > swipeThreshold || 
        Math.abs(velocity.x) > velThreshold || 
        Math.abs(velocity.y) > velThreshold
      ) {
        if (Math.abs(offset.x) > Math.abs(offset.y)) {
          targetIndex = offset.x > 0 ? index + 1 : index - 1;
        } else {
          targetIndex = offset.y > 0 ? index + 1 : index - 1;
        }
      }
    }

    if (targetIndex >= 0 && targetIndex < items.length && targetIndex !== index) {
      setItems((prevItems) => {
        const newItems = [...prevItems];
        const spans = newItems.map((item) => item.span);

        const [movedItem] = newItems.splice(index, 1);
        newItems.splice(targetIndex, 0, movedItem);

        return newItems.map((item, i) => ({
          ...item,
          span: spans[i],
        }));
      });
    }
  };

  const rowHeightClass = mediaItems.length >= 5 
    ? "auto-rows-[100px] sm:auto-rows-[100px] md:auto-rows-[110px]" 
    : "auto-rows-[150px] sm:auto-rows-[120px] md:auto-rows-[160px]";

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold text-white mb-2 tracking-tight">
          {title}
        </h2>
        <p className="text-white/60 text-xs md:text-sm font-medium">
          {description}
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto px-2 md:px-8">
        <div 
          className={`grid grid-flow-dense grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 ${rowHeightClass}`}
          ref={containerRef}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              data-bento-index={index}
                className={`relative rounded-3xl overflow-hidden group cursor-grab active:cursor-grabbing border border-white/10 bg-black/20 shadow-2xl ${item.span}`}
                whileHover={{ scale: isDragging ? 1 : 0.98 }}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                drag
                dragSnapToOrigin
                dragElastic={1}
                onDragStart={() => handleDragStart(index)}
                onDragEnd={(e, info) => handleDragEnd(e, info, index)}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={() => {
                  if (!isDragging && onItemClick) {
                    onItemClick(item);
                  }
                }}
                style={{
                  zIndex: draggedIndex === index ? 50 : 1,
                  touchAction: "none"
                }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Click / Expand indicator */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white shadow-xl transform scale-75 group-hover:scale-100 transition-all duration-300">
                    {item.type === 'video' ? <Play className="w-5 h-5 ml-1" /> : <Maximize2 className="w-5 h-5" />}
                  </div>
                </div>

                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end pointer-events-none z-10">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.icon && (
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2 md:mb-3 shadow-lg border border-white/20">
                        {item.icon}
                      </div>
                    )}
                    <h3 className="text-white font-bold text-lg md:text-2xl mb-1 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-xs md:text-sm font-medium line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
