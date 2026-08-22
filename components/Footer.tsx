"use client";

import { ArrowUp, Github, Heart, Instagram, Linkedin, Mail, Terminal } from "lucide-react";
import Logo from "./Logo";
import { soundFx } from "@/utils/soundEffects";

const socials = [
  { href: "https://github.com/", label: "GitHub", Icon: Github, glow: "34,225,255" },
  { href: "https://linkedin.com/", label: "LinkedIn", Icon: Linkedin, glow: "79,157,255" },
  { href: "https://instagram.com/", label: "Instagram", Icon: Instagram, glow: "236,72,153" },
  { href: "mailto:hello@krishnkant.dev", label: "Email", Icon: Mail, glow: "245,158,11" },
];

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

interface FooterProps {
  logoImageSrc?: string;
}

export default function Footer({ logoImageSrc }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#03060f]/85 pt-14 pb-8 backdrop-blur-xl">
      {/* Top light seam */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34,225,255,0.6), rgba(245,158,11,0.5), transparent)",
        }}
      />
      {/* Ambient floor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 left-1/2 h-64 w-[min(760px,92vw)] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(34,225,255,0.12), rgba(245,158,11,0.08) 55%, transparent 75%)",
        }}
      />

      <div className="section-shell relative">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          {/* Brand */}
          <div>
            <Logo imageSrc={logoImageSrc} />
            <p className="mt-4 max-w-sm text-[0.88rem] leading-[1.8] text-slate-400 font-sans">
              Engineering high-performance software, AI-assisted workflows and
              cinematic 3D web experiences — where deep logic meets futuristic design.
            </p>

            <div className="mt-5 flex items-center gap-2.5">
              {socials.map(({ href, label, Icon, glow }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onMouseEnter={() => soundFx.playHover()}
                  onClick={() => soundFx.playClick()}
                  className="group grid h-10 w-10 place-items-center rounded-xl border border-white/[0.09] bg-white/[0.03] text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] transition-all duration-300 hover:-translate-y-1 hover:text-white"
                  style={
                    {
                      ["--g" as string]: glow,
                    } as React.CSSProperties
                  }
                  onMouseEnterCapture={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${glow},0.6)`;
                    e.currentTarget.style.boxShadow = `0 12px 26px -12px rgba(0,0,0,0.9), 0 0 22px -6px rgba(${glow},0.7)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <Icon
                    size={17}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <p className="font-mono text-[0.72rem] font-bold tracking-[0.2em] text-[#8fe9ff] uppercase">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => soundFx.playClick()}
                    onMouseEnter={() => soundFx.playHover()}
                    className="group inline-flex items-center gap-2 text-[0.88rem] text-slate-400 transition-colors duration-300 hover:text-white font-sans"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#22e1ff]/60 transition-all duration-300 group-hover:w-3 group-hover:bg-[#22e1ff] group-hover:shadow-[0_0_8px_rgba(34,225,255,0.9)]" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CMD signature */}
          <div>
            <p className="font-mono text-[0.72rem] font-bold tracking-[0.2em] text-[#8fe9ff] uppercase">
              System Telemetry
            </p>
            <div className="mt-4 rounded-2xl border border-white/[0.08] bg-[#02040c]/80 p-4 font-mono text-[0.72rem] leading-relaxed shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-2 text-slate-500">
                <Terminal size={13} className="text-[#22e1ff]" />
                <span>~/krishnkant/cmd</span>
              </div>
              <p className="mt-2 text-slate-300">
                <span className="text-[#22e1ff]">$</span> status --availability
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                open to opportunities
                <span className="animate-caret">_</span>
              </p>
            </div>
          </div>
        </div>

        <div className="divider-glow my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-[0.72rem] text-slate-400">
            © {new Date().getFullYear()} Krishnkant Dhakar — built with{" "}
            <Heart size={11} className="inline text-amber-400 fill-amber-400" /> code, precision &amp;
            golden energy.
          </p>

          <a
            href="#home"
            onClick={() => soundFx.playWarp()}
            onMouseEnter={() => soundFx.playHover()}
            className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-2 font-mono text-[0.72rem] font-semibold text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#22e1ff]/45 hover:text-white hover:shadow-[0_0_22px_-8px_rgba(34,225,255,0.8)]"
          >
            Back to top
            <ArrowUp
              size={13}
              className="text-[#22e1ff] transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
