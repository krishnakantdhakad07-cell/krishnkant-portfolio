"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      onDone();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 28);

    const timer = setTimeout(() => {
      setVisible(false);
      onDone();
    }, 850);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [reduce, onDone]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#02050f]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Cyber ambient radial flares */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 50% at 50% 45%, rgba(34,225,255,0.16), transparent 70%), radial-gradient(ellipse 55% 45% at 65% 60%, rgba(251,191,36,0.15), transparent 70%)",
            }}
          />

          {/* Cyber grid background */}
          <div className="cyber-grid absolute inset-0 opacity-40" />

          <div className="relative flex flex-col items-center px-6 text-center">
            {/* Logo mark with Golden Thunderbolt */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <span className="font-heading text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                Krishnkant Dhakar
              </span>
              <motion.span
                animate={{
                  scale: [1, 1.25, 1],
                  filter: [
                    "drop-shadow(0 0 6px rgba(251,191,36,0.9))",
                    "drop-shadow(0 0 16px rgba(251,191,36,1))",
                    "drop-shadow(0 0 6px rgba(251,191,36,0.9))",
                  ],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <Zap size={32} className="fill-amber-400 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
              </motion.span>
            </motion.div>

            {/* Sweeping laser light progress line */}
            <div className="mt-6 h-1.5 w-[min(320px,75vw)] overflow-hidden rounded-full bg-white/10 p-[1px]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#22e1ff] via-[#38bdf8] to-[#fbbf24] shadow-[0_0_15px_rgba(34,225,255,0.9)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Short Clean Welcome Message */}
            <div className="mt-4 flex items-center gap-2 font-mono text-xs tracking-[0.28em] text-[#22e1ff] uppercase font-bold">
              <span>WELCOME</span>
              <span className="text-amber-400 font-bold ml-2">[{progress}%]</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
