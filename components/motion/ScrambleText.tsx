"use client";

import { useEffect, useRef, useState } from "react";
import { soundFx } from "@/utils/soundEffects";

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  onScrollReveal?: boolean;
  triggerOnHover?: boolean;
  glyphs?: string;
  sound?: boolean;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
}

const CYBER_GLYPHS = "01#@$%*+~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function ScrambleText({
  text,
  className = "",
  speed = 22,
  delay = 0,
  onScrollReveal = true,
  triggerOnHover = false, // Keep false by default so text stays crisp and readable
  glyphs = CYBER_GLYPHS,
  sound = false,
  as: Component = "span",
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimating = useRef(false);
  const elementRef = useRef<HTMLElement>(null);
  const hasRevealed = useRef(false);

  const startScramble = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join("")
      );

      if (sound && iteration % 3 === 0) {
        soundFx.playKeystroke();
      }

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        isAnimating.current = false;
      }

      iteration += 1 / 1.8;
    }, speed);
  };

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (!onScrollReveal) {
      const timer = setTimeout(startScramble, delay);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRevealed.current) {
            hasRevealed.current = true;
            setTimeout(startScramble, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [text, delay, onScrollReveal]);

  const handleMouseEnter = () => {
    if (triggerOnHover && !isAnimating.current) {
      startScramble();
      if (sound) soundFx.playHover();
    }
  };

  return (
    <Component
      ref={elementRef as unknown as React.Ref<never>}
      className={className}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </Component>
  );
}
