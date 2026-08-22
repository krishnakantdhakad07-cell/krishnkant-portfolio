"use client";

import React, { useState } from "react";
import { soundFx } from "@/utils/soundEffects";

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchColor?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
}

export default function GlitchText({
  text,
  className = "",
  glitchColor = "#22e1ff",
  as: Component = "span",
}: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Component
      className={`relative inline-block cursor-default select-none ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        soundFx.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{text}</span>

      {isHovered && (
        <>
          <span
            aria-hidden
            className="absolute top-0 left-0 -z-10 text-cyan-400 opacity-80 animate-pulse"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              transform: "translate(-2px, -1px)",
              color: glitchColor,
            }}
          >
            {text}
          </span>
          <span
            aria-hidden
            className="absolute top-0 left-0 -z-10 text-violet-400 opacity-80 animate-pulse"
            style={{
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
              transform: "translate(2px, 1px)",
            }}
          >
            {text}
          </span>
        </>
      )}
    </Component>
  );
}
