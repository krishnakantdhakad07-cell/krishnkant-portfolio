"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  Download,
  Github,
  Instagram,
  Linkedin,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import TypewriterHeadline from "./motion/TypewriterHeadline";
import { soundFx } from "@/utils/soundEffects";

const InteractiveGlobe = dynamic(() => import("./three/InteractiveGlobe"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[380px] w-full max-w-[480px] items-center justify-center rounded-3xl border border-white/10 bg-[#060b18]/70 sm:h-[440px]">
      <div className="flex items-center gap-2 font-mono text-xs text-[#22e1ff]">
        <span className="h-2 w-2 rounded-full bg-[#22e1ff] animate-ping" />
        <span>Loading 3D Earth Globe...</span>
      </div>
    </div>
  ),
});

const ROLES = [
  "SOFTWARE DEVELOPER",
  "PYTHON & C++ ARCHITECT",
  "FULL-STACK WEB ENGINEER",
  "DCA & TALLY PRIME SPECIALIST",
  "AI SYSTEMS INTEGRATOR",
];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 lg:pt-32"
    >
      <div aria-hidden className="grid-bg absolute inset-0 -z-20 opacity-45" />

      {/* Ambient light pulses */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px] animate-pulse"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px]"
      />

      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ============================ LEFT: HERO COPY ============================ */}
        <div className="space-y-6">
          {/* Dynamic Rotating Role Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#22e1ff]/30 bg-[#22e1ff]/[0.08] px-4 py-1.5 font-mono text-xs font-semibold shadow-[0_0_20px_rgba(34,225,255,0.2)] backdrop-blur-md"
          >
            <span className="text-cyan-400 font-bold">[</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[currentRoleIndex]}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="bg-gradient-to-r from-[#22e1ff] via-[#60a5fa] to-[#fbbf24] bg-clip-text font-bold text-transparent"
              >
                {ROLES[currentRoleIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="text-cyan-400 font-bold">]</span>
          </motion.div>

          {/* Typewriter Letter-by-Letter Headline */}
          <TypewriterHeadline speed={38} startDelay={150} />

          {/* Description with "software developer" */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-body max-w-xl text-slate-300 font-sans leading-relaxed text-[1.05rem]"
          >
            I am <span className="text-white font-bold">Krishnkant Dhakar</span>, a software developer blending algorithmic logic in{" "}
            <span className="text-cyan-300 font-semibold">Python &amp; C++</span>, enterprise accounting in{" "}
            <span className="text-amber-300 font-semibold">Tally Prime</span>, and certified computing excellence with next-generation full-stack web architecture.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            <a
              href="#projects"
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="btn-primary group !px-6 !py-3.5 shadow-[0_0_25px_rgba(34,225,255,0.4)]"
            >
              Explore Projects
              <ArrowDownRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>

            <a
              href="/resume.pdf"
              download
              onClick={() => soundFx.playConfirm()}
              onMouseEnter={() => soundFx.playHover()}
              className="btn-ghost group !px-5 !py-3.5"
            >
              <Download
                size={17}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
              Download Resume
            </a>

            <a
              href="#contact"
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="btn-ghost !px-5 !py-3.5"
            >
              <Sparkles size={16} className="text-[#22e1ff]" />
              Let&apos;s Connect
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundFx.playHover()}
              className="icon-orb"
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundFx.playHover()}
              className="icon-orb"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundFx.playHover()}
              className="icon-orb hover:!border-pink-400/55 hover:!text-pink-300"
              aria-label="Instagram"
            >
              <Instagram size={17} />
            </a>

            <span aria-hidden className="mx-1 h-px w-8 bg-white/12" />

            <span className="font-mono text-[0.74rem] tracking-wider text-slate-300 font-semibold">
              Developer · Problem Solver · Innovator
            </span>
          </motion.div>
        </div>

        {/* ==================== RIGHT: REALISTIC 3D EARTH GLOBE ==================== */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full max-w-[480px]">
            {/* Cyber Corner Reticles */}
            <div className="pointer-events-none absolute -top-2 -left-2 z-20 font-mono text-[10px] text-cyan-400/80">
              [+]
            </div>
            <div className="pointer-events-none absolute -top-2 -right-2 z-20 font-mono text-[10px] text-cyan-400/80">
              [+]
            </div>
            <div className="pointer-events-none absolute -bottom-2 -left-2 z-20 font-mono text-[10px] text-amber-400/80">
              [+]
            </div>
            <div className="pointer-events-none absolute -bottom-2 -right-2 z-20 font-mono text-[10px] text-amber-400/80">
              [+]
            </div>

            <InteractiveGlobe />
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        onClick={() => soundFx.playClick()}
        className="group absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <span className="font-mono text-[0.62rem] tracking-[0.25em] text-slate-400 uppercase transition-colors duration-300 group-hover:text-[#22e1ff] font-bold">
          Scroll to explore
        </span>
        <span className="relative h-7 w-[1.5px] overflow-hidden rounded bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 rounded"
            style={{
              background: "linear-gradient(180deg, #22e1ff, transparent)",
            }}
            animate={{ y: [-12, 28] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
