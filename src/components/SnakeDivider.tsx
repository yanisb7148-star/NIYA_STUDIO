import React from 'react';

export function SnakeDivider() {
  return (
    <div className="w-full overflow-hidden py-16 relative flex items-center justify-center z-10 pointer-events-none">
      <svg 
        className="w-[200%] md:w-full h-12 md:h-20 opacity-80" 
        viewBox="0 0 1200 100" 
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 C100,100 200,0 300,50 C400,100 500,0 600,50 C700,100 800,0 900,50 C1000,100 1100,0 1200,50"
          fill="none"
          stroke="url(#snake-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="12 12"
          className="animate-[dash_3s_linear_infinite]"
        />
        <defs>
          <linearGradient id="snake-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="15%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="85%" stopColor="#d946ef" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -24;
          }
        }
      `}</style>
    </div>
  );
}
