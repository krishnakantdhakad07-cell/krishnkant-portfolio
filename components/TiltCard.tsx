"use client";

import React, { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "violet" | "emerald" | "amber";
  intensity?: number;
  depth?: number;
}

const GLOW_STYLES = {
  cyan: "hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.8),0_0_30px_-8px_rgba(34,225,255,0.25)] hover:border-[#22e1ff]/40",
  violet: "hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.8),0_0_30px_-8px_rgba(139,92,246,0.25)] hover:border-violet-500/40",
  emerald: "hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.8),0_0_30px_-8px_rgba(52,211,153,0.25)] hover:border-emerald-500/40",
  amber: "hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.8),0_0_30px_-8px_rgba(245,158,11,0.25)] hover:border-amber-500/40",
};

export default function TiltCard({
  children,
  className = "",
  glowColor = "cyan",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative h-full rounded-3xl transition-all duration-300 ease-out hover:-translate-y-1.5 ${GLOW_STYLES[glowColor]} ${className}`}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.06), transparent 80%)`
            : "none",
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
