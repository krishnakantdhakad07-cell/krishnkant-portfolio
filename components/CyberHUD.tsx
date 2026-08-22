"use client";

import { useEffect, useState } from "react";
import { Activity, Clock, Globe, Terminal, Volume2, VolumeX, Wifi } from "lucide-react";
import { soundFx } from "@/utils/soundEffects";

interface CyberHUDProps {
  onOpenTerminal?: () => void;
}

export default function CyberHUD({ onOpenTerminal }: CyberHUDProps) {
  const [time, setTime] = useState("");
  const [fps, setFps] = useState(60);
  const [isMuted, setIsMuted] = useState(false);
  const [ping, setPing] = useState(14);

  useEffect(() => {
    setIsMuted(soundFx.getIsMuted());

    // Update live IST clock
    const updateTime = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(istString);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    // FPS / ping subtle variance for live cyber simulation
    const pingInterval = setInterval(() => {
      setPing(Math.floor(12 + Math.random() * 6));
      setFps(Math.floor(59 + Math.random() * 2));
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(pingInterval);
    };
  }, []);

  const handleSoundToggle = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-40 hidden w-full px-4 pt-1 lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between font-mono text-[10.5px] text-slate-400">
        {/* Left Telemetry Cluster */}
        <div className="pointer-events-auto flex items-center gap-3.5 rounded-b-lg border border-t-0 border-white/10 bg-[#040816]/90 px-3.5 py-1 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,225,255,0.9)]" />
            </span>
            <span className="font-bold tracking-widest text-[#8fe9ff]">SYS.CORE: ONLINE</span>
          </div>

          <span className="h-3 w-px bg-white/10" />

          <div className="flex items-center gap-1 text-slate-300">
            <Activity size={12} className="text-emerald-400" />
            <span>{fps} FPS</span>
          </div>

          <span className="h-3 w-px bg-white/10" />

          <div className="flex items-center gap-1 text-slate-300">
            <Wifi size={12} className="text-cyan-400" />
            <span>{ping}ms</span>
          </div>
        </div>

        {/* Right Telemetry Cluster */}
        <div className="pointer-events-auto flex items-center gap-3.5 rounded-b-lg border border-t-0 border-white/10 bg-[#040816]/90 px-3.5 py-1 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md">
          <div className="flex items-center gap-1 text-slate-300">
            <Globe size={12} className="text-violet-400" />
            <span>IN / IST</span>
          </div>

          <span className="h-3 w-px bg-white/10" />

          <div className="flex items-center gap-1 text-slate-300">
            <Clock size={12} className="text-cyan-400" />
            <span>{time || "19:00:00"}</span>
          </div>

          <span className="h-3 w-px bg-white/10" />

          {/* Terminal Launcher */}
          {onOpenTerminal && (
            <button
              onClick={() => {
                soundFx.playConfirm();
                onOpenTerminal();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="flex items-center gap-1 text-cyan-300 transition-colors hover:text-white"
              title="Open Developer Terminal (Ctrl + `)"
            >
              <Terminal size={12} />
              <span>CLI</span>
            </button>
          )}

          <span className="h-3 w-px bg-white/10" />

          {/* Sound FX Toggle */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={() => soundFx.playHover()}
            className="flex items-center gap-1 text-slate-300 transition-colors hover:text-cyan-300"
            title={isMuted ? "Unmute Cyber SFX" : "Mute Cyber SFX"}
          >
            {isMuted ? (
              <>
                <VolumeX size={12} className="text-slate-500" />
                <span className="text-slate-500">SFX OFF</span>
              </>
            ) : (
              <>
                <Volume2 size={12} className="text-cyan-400" />
                <span className="text-cyan-300">SFX ON</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
