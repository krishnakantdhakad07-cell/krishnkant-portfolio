"use client";

import Image from "next/image";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";

interface LogoProps {
  compact?: boolean;
  /** Custom image path for the logo (different for header/footer) */
  imageSrc?: string;
  imageAlt?: string;
}

export default function Logo({
  compact = false,
  imageSrc,
  imageAlt = "Krishnkant Dhakar Logo",
}: LogoProps) {
  return (
    <a
      href="#home"
      aria-label="Krishnkant Dhakar — home"
      className="group relative inline-flex items-center gap-3"
    >
      {/* Ambient aura behind the mark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-4 -inset-y-3 -z-10 rounded-2xl opacity-60 blur-xl transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 120% at 20% 50%, rgba(34,225,255,0.25), transparent 70%), radial-gradient(60% 120% at 85% 50%, rgba(245,158,11,0.22), transparent 70%)",
        }}
      />

      {/* Monogram tile or Custom Image */}
      <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_6px_18px_-8px_rgba(0,0,0,0.8)] backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="36px"
            className="object-cover"
          />
        ) : (
          <>
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl opacity-70 blur-[6px] transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34,225,255,0.4), transparent 55%, rgba(245,158,11,0.4))",
              }}
            />
            <span className="relative font-mono text-[13px] font-bold leading-none tracking-tighter">
              <span className="bg-gradient-to-br from-[#5eeaff] to-[#22e1ff] bg-clip-text text-transparent">
                K
              </span>
              <span className="bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent">
                D
              </span>
            </span>
          </>
        )}
      </span>

      {/* Wordmark + Golden Thunderbolt (Bijli) Sign */}
      <span
        className={`flex items-center gap-1.5 ${
          compact ? "hidden sm:flex" : "flex"
        }`}
      >
        <span className="font-heading text-[0.96rem] font-bold tracking-tight text-white transition-colors duration-300 sm:text-[1.04rem]">
          Krishnkant{" "}
          <span className="bg-gradient-to-r from-white via-[#d8f6ff] to-[#bfe4ff] bg-clip-text text-transparent">
            Dhakar
          </span>
        </span>

        {/* Golden Thunderbolt (Bijli) Sign with electric neon glow */}
        <motion.span
          className="relative inline-flex items-center justify-center pl-0.5"
          animate={{
            scale: [1, 1.15, 1],
            filter: [
              "drop-shadow(0 0 6px rgba(251,191,36,0.8))",
              "drop-shadow(0 0 14px rgba(251,191,36,1)) drop-shadow(0 0 22px rgba(245,158,11,0.6))",
              "drop-shadow(0 0 6px rgba(251,191,36,0.8))",
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap
            size={18}
            className="text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.9)] transition-transform duration-300 group-hover:scale-125"
          />
        </motion.span>
      </span>
    </a>
  );
}
