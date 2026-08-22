"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Clock, Terminal, Volume2, VolumeX, Wifi, Zap } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { soundFx } from "@/utils/soundEffects";

interface CyberActionDockProps {
  onOpenTerminal: () => void;
}

export default function CyberActionDock({ onOpenTerminal }: CyberActionDockProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [time, setTime] = useState("");

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setIsMuted(soundFx.getIsMuted());

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(Math.round(latest * 100));
      setShowTopBtn(latest > 0.06);
    });

    // Update live IST clock
    const updateTime = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(istString);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => {
      unsubscribe();
      clearInterval(timer);
    };
  }, [scrollYProgress]);

  const handleSoundToggle = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const scrollToTop = () => {
    soundFx.playWarp();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Scroll to Top button with progress ring */}
      {showTopBtn && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          onMouseEnter={() => soundFx.playHover()}
          className="group relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-[#050a1a]/90 text-slate-300 shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300 hover:scale-105"
          title="Scroll to Top"
        >
          {/* Circular SVG progress ring */}
          <svg className="absolute inset-0 h-full w-full -rotate-90 p-1" viewBox="0 0 36 36">
            <path
              className="text-white/10"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-cyan-400"
              strokeDasharray={`${scrollProgress}, 100`}
              strokeWidth="2.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <ArrowUp size={15} className="transition-transform group-hover:-translate-y-0.5" />
        </motion.button>
      )}

      {/* Futuristic Floating Pill Dock with Live Telemetry + CMD */}
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[#050a1a]/90 px-3 py-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(34,225,255,0.2)] backdrop-blur-2xl">
        {/* Live IST Status indicator */}
        <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-slate-300 pr-1.5 border-r border-white/10">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <Clock size={11} className="text-cyan-400" />
          <span className="font-semibold text-cyan-300">{time || "IST"}</span>
        </div>

        {/* CMD Terminal Button */}
        <button
          onClick={() => {
            soundFx.playConfirm();
            onOpenTerminal();
          }}
          onMouseEnter={() => soundFx.playHover()}
          className="flex items-center gap-1.5 rounded-full bg-cyan-400/15 px-3 py-1 font-mono text-xs font-bold text-cyan-300 transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_15px_rgba(34,225,255,0.8)]"
          title="Open CMD Terminal (Ctrl + `)"
        >
          <Terminal size={13} />
          <span>CMD</span>
        </button>

        {/* Audio FX Toggle Button */}
        <button
          onClick={handleSoundToggle}
          onMouseEnter={() => soundFx.playHover()}
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
            isMuted
              ? "text-slate-500 hover:bg-white/10 hover:text-slate-300"
              : "bg-violet-500/15 text-violet-300 hover:bg-violet-500 hover:text-black hover:shadow-[0_0_15px_rgba(139,92,246,0.7)]"
          }`}
          title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        {/* Direct Contact Button */}
        <a
          href="#contact"
          onMouseEnter={() => soundFx.playHover()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/15 text-amber-400 transition-all duration-300 hover:bg-amber-400 hover:text-black hover:shadow-[0_0_15px_rgba(251,191,36,0.7)]"
          title="Direct Contact"
        >
          <Zap size={14} className="fill-amber-400 text-amber-400" />
        </a>
      </div>
    </div>
  );
}
