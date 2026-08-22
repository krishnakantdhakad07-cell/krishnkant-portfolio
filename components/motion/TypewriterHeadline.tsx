"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";

interface TypewriterHeadlineProps {
  speed?: number;
  pauseTime?: number;
  startDelay?: number;
}

export default function TypewriterHeadline({
  speed = 42,
  pauseTime = 3400,
  startDelay = 200,
}: TypewriterHeadlineProps) {
  const line1Full = "Building digital";
  const line2Full = "experiences beyond";
  const line3Full = "the ordinary";

  const totalLength = line1Full.length + line2Full.length + line3Full.length;
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && charCount === 0) {
      // Start typing after initial delay
      timer = setTimeout(() => {
        setCharCount(1);
      }, startDelay);
    } else if (!isDeleting && charCount < totalLength) {
      // Forward typing letter by letter
      timer = setTimeout(() => {
        setCharCount((prev) => prev + 1);
      }, speed);
    } else if (!isDeleting && charCount === totalLength) {
      // Completed full text, pause so visitor can read it comfortably
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && charCount > 0) {
      // Deleting letter by letter backward
      timer = setTimeout(() => {
        setCharCount((prev) => prev - 1);
      }, speed / 1.8);
    } else if (isDeleting && charCount === 0) {
      // Reset back to typing mode
      setIsDeleting(false);
    }

    return () => clearTimeout(timer);
  }, [charCount, isDeleting, totalLength, speed, pauseTime, startDelay]);

  // Compute text for each line based on current charCount
  let count = charCount;

  const line1Chars = Math.min(count, line1Full.length);
  const line1Text = line1Full.slice(0, line1Chars);
  count -= line1Chars;

  const line2Chars = Math.min(count, line2Full.length);
  const line2Text = line2Full.slice(0, line2Chars);
  count -= line2Chars;

  const line3Chars = Math.min(count, line3Full.length);
  const line3Text = line3Full.slice(0, line3Chars);

  const isComplete = charCount >= totalLength;

  return (
    <div className="text-display max-w-3xl space-y-1 select-none">
      {/* Line 1: Building digital */}
      <h1 className="block text-chrome font-black tracking-tight text-[2.6rem] sm:text-[3.8rem] lg:text-[4.6rem] leading-[1.05] min-h-[1.1em]">
        {line1Text}
        {charCount > 0 && charCount < line1Full.length && (
          <span className="inline-block w-[3px] h-[0.85em] align-middle bg-cyan-400 animate-pulse ml-1" />
        )}
      </h1>

      {/* Line 2: experiences beyond */}
      <span className="block text-aurora text-glow-cyan font-black tracking-tight text-[2.6rem] sm:text-[3.8rem] lg:text-[4.6rem] leading-[1.05] min-h-[1.1em]">
        {line2Text}
        {charCount >= line1Full.length && charCount < line1Full.length + line2Full.length && (
          <span className="inline-block w-[3px] h-[0.85em] align-middle bg-cyan-400 animate-pulse ml-1" />
        )}
      </span>

      {/* Line 3: the ordinary ⚡ */}
      <div className="flex flex-wrap items-center gap-3 min-h-[1.1em]">
        <span className="block text-chrome font-black tracking-tight text-[2.6rem] sm:text-[3.8rem] lg:text-[4.6rem] leading-[1.05]">
          {line3Text}
          {charCount >= line1Full.length + line2Full.length && !isComplete && (
            <span className="inline-block w-[3px] h-[0.85em] align-middle bg-amber-400 animate-pulse ml-1" />
          )}
        </span>

        {/* Golden Thunderbolt (Bijli) Sign appears when fully typed */}
        {isComplete && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.22, 1],
              opacity: 1,
              filter: [
                "drop-shadow(0 0 8px rgba(251,191,36,0.9))",
                "drop-shadow(0 0 20px rgba(251,191,36,1)) drop-shadow(0 0 30px rgba(245,158,11,0.85))",
                "drop-shadow(0 0 8px rgba(251,191,36,0.9))",
              ],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center pl-1"
          >
            <Zap
              size={40}
              className="text-amber-400 fill-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.95)]"
            />
          </motion.span>
        )}
      </div>
    </div>
  );
}
