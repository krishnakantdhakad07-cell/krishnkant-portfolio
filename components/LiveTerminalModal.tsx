"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Minimize2, Terminal, X } from "lucide-react";
import { soundFx } from "@/utils/soundEffects";

interface LiveTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command: string;
  output: string | React.ReactNode;
  time: string;
}

const QUICK_COMMANDS = [
  "help",
  "skills",
  "projects",
  "about",
  "contact",
  "stats",
  "matrix",
  "sudo hire",
];

export default function LiveTerminalModal({ isOpen, onClose }: LiveTerminalModalProps) {
  const [inputVal, setInputVal] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: "init",
      output: (
        <div>
          <p className="text-cyan-400 font-bold">
            ⚡ KRISHNKANT_OS v2.6.4 (CMD Prompt Active)
          </p>
          <p className="text-slate-300 mt-1">
            Welcome to the developer CMD console. Type{" "}
            <span className="text-amber-300 font-bold">help</span> or click quick prompt buttons below.
          </p>
        </div>
      ),
      time: "00:00:01",
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommandRun = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const now = new Date().toLocaleTimeString("en-US", { hour12: false });

    soundFx.playKeystroke();

    let output: React.ReactNode = "";

    switch (cleanCmd) {
      case "help":
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-400 font-semibold">// AVAILABLE CMD COMMANDS:</p>
            <p><span className="text-amber-400 font-bold">about</span> - Summary profile &amp; certifications</p>
            <p><span className="text-amber-400 font-bold">skills</span> - Technical matrix &amp; languages</p>
            <p><span className="text-amber-400 font-bold">projects</span> - Production projects list &amp; URLs</p>
            <p><span className="text-amber-400 font-bold">contact</span> - Direct transmission channels</p>
            <p><span className="text-amber-400 font-bold">stats</span> - Live system &amp; developer metrics</p>
            <p><span className="text-amber-400 font-bold">resume</span> - Download official resume PDF</p>
            <p><span className="text-amber-400 font-bold">matrix</span> - Trigger matrix pulse</p>
            <p><span className="text-amber-400 font-bold">sudo hire</span> - Direct collaboration workflow</p>
            <p><span className="text-amber-400 font-bold">clear / cls</span> - Flush CMD screen</p>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-300 font-bold">Krishnkant Dhakar ⚡</p>
            <p>Role: Software Developer &amp; Tech Enthusiast</p>
            <p>Certifications: DCA (Diploma in Computer Applications) + Tally Prime Specialized</p>
            <p>Languages: Python, C++, JavaScript, TypeScript, Next.js, React, SQL</p>
            <p className="text-slate-400">Location: India (Available for Global Remote &amp; Hybrid)</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-400 font-bold">[ CORE PROGRAMMING &amp; ERP MATRIX ]</p>
            <p>⚡ Python (Core, Automation, REST APIs)</p>
            <p>⚡ C++ (OOP, Memory Management, DSA)</p>
            <p>⚡ DCA Diploma (IT Fundamentals, Systems, Automation)</p>
            <p>⚡ Tally Prime (Enterprise Accounting, GST, Ledgers)</p>
            <p>⚡ Web Stack (Next.js 14, React 18, TailwindCSS, Three.js, Framer Motion)</p>
            <p>⚡ AI Systems (LLM Integrations, Agentic Workflows, Automation Tools)</p>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2 text-slate-300">
            <div>
              <p className="text-cyan-300 font-bold">01. Neon Mart Full-Stack E-Commerce</p>
              <p className="text-xs text-slate-400">Next.js 14, Tailwind, TypeScript, REST API</p>
            </div>
            <div>
              <p className="text-cyan-300 font-bold">02. Neuralytics AI Analytics Dashboard</p>
              <p className="text-xs text-slate-400">Python Backend, React Charts, AI Insights</p>
            </div>
            <div>
              <p className="text-cyan-300 font-bold">03. TaskFlow Pro &amp; Automation Suite</p>
              <p className="text-xs text-slate-400">Full-Stack Kanban, Cloud Sync, TypeScript</p>
            </div>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="text-slate-300 space-y-1">
            <p className="text-cyan-300 font-bold">📡 Direct Transmission:</p>
            <p>Email: <a href="mailto:hello@krishnkant.dev" className="text-cyan-400 underline">hello@krishnkant.dev</a></p>
            <p>GitHub: <a href="https://github.com/" target="_blank" rel="noreferrer" className="text-violet-400 underline">github.com</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="text-blue-400 underline">linkedin.com</a></p>
          </div>
        );
        break;

      case "stats":
        output = (
          <div className="text-slate-300 space-y-1 font-mono">
            <p className="text-emerald-400 font-bold">✔ Telemetry &amp; Status:</p>
            <p>⚡ Uptime: 99.99%</p>
            <p>⚡ Code Quality: 100% Type-Safe</p>
            <p>⚡ Architecture: Modular Component Hierarchy</p>
            <p>⚡ Status: Ready for High-Impact Roles</p>
          </div>
        );
        break;

      case "resume":
        if (typeof window !== "undefined") {
          window.open("/resume.pdf", "_blank");
        }
        output = <p className="text-emerald-300 font-bold">✔ Resume download initialized!</p>;
        break;

      case "matrix":
        soundFx.playWarp();
        output = (
          <p className="text-emerald-400 animate-pulse font-bold">
            Wake up, Neo... The Matrix has you. Follow the white rabbit. 🐇
          </p>
        );
        break;

      case "sudo hire":
      case "hire":
        soundFx.playConfirm();
        output = (
          <div className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 p-3 text-cyan-200">
            <p className="font-bold text-white">🎉 INITIATING COLLABORATION PIPELINE</p>
            <p className="text-xs mt-1">
              Krishnkant is available for full-time roles, freelance architecture, and enterprise software engineering.
            </p>
            <a
              href="#contact"
              onClick={onClose}
              className="mt-2 inline-block rounded-lg bg-cyan-400 px-3 py-1 font-bold text-black text-xs"
            >
              Go to Contact Form →
            </a>
          </div>
        );
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInputVal("");
        return;

      default:
        output = (
          <p className="text-rose-400">
            command not recognized: <span className="font-mono">{cmd}</span>. Type <span className="text-cyan-300 font-bold underline">help</span> for command list.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output, time: now }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputVal.trim()) {
      handleCommandRun(inputVal);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-black/75">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex flex-col overflow-hidden rounded-2xl border border-[#22e1ff]/30 bg-[#040816]/95 shadow-[0_24px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(34,225,255,0.2)] ${
            isExpanded ? "h-[90vh] w-[95vw]" : "h-[540px] w-full max-w-2xl"
          }`}
        >
          {/* Top Titlebar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#070e24] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-xs font-bold text-[#8fe9ff] flex items-center gap-1.5">
                <Terminal size={14} className="text-cyan-400" />
                <span>krishnkant@cmd:~</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-slate-400 hover:text-white"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                }}
                className="text-slate-400 hover:text-rose-400"
                title="Close"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Quick command buttons */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-white/5 bg-[#030612]/60 px-4 py-2">
            <span className="font-mono text-[10px] text-slate-500 uppercase mr-1">Quick Run:</span>
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommandRun(cmd)}
                onMouseEnter={() => soundFx.playHover()}
                className="rounded border border-cyan-400/20 bg-cyan-400/5 px-2 py-0.5 font-mono text-[11px] text-cyan-300 transition-colors hover:border-cyan-400 hover:bg-cyan-400/20 hover:text-white"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal output area */}
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-4">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-[#22e1ff]">C:\Users\krishnkant&gt;</span>
                  <span className="text-white font-semibold">{item.command}</span>
                  <span className="ml-auto text-[10px] text-slate-600">{item.time}</span>
                </div>
                <div className="pl-4 text-slate-300">{item.output}</div>
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>

          {/* Input prompt line */}
          <div className="flex items-center gap-2 border-t border-white/10 bg-[#02050f] px-4 py-3">
            <span className="font-mono text-xs font-bold text-[#22e1ff]">C:\Users\krishnkant&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command ('help', 'skills', 'projects', 'sudo hire')..."
              className="flex-1 bg-transparent font-mono text-xs text-white placeholder:text-slate-600 outline-none"
            />
            <button
              onClick={() => inputVal.trim() && handleCommandRun(inputVal)}
              className="rounded bg-cyan-400/20 px-3 py-1 font-mono text-[11px] font-bold text-cyan-300 hover:bg-cyan-400 hover:text-black"
            >
              RUN ↵
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
