"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Download, Menu, Sparkles, Terminal, X } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { soundFx } from "@/utils/soundEffects";

const links = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Journey", href: "#journey", id: "journey" },
  { label: "Contact", href: "#contact", id: "contact" },
];

interface NavbarProps {
  onOpenTerminal?: () => void;
  logoImageSrc?: string;
}

export default function Navbar({ onOpenTerminal, logoImageSrc }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  // Silky scroll-progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  /* Condense the bar once the user leaves the hero */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Track which section is in view for the active nav state */
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Lock body scroll while the mobile sheet is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-4">
      <motion.nav
        initial={{ y: -70, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`relative mx-auto flex max-w-6xl items-center justify-between overflow-hidden rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "border-white/15 bg-[#060a16]/90 px-4 py-2.5 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.95),0_0_36px_-20px_rgba(34,225,255,0.5)] backdrop-blur-2xl sm:px-5"
            : "border-white/10 bg-[#060a16]/75 px-4 py-3 shadow-[0_14px_40px_-22px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:px-5"
        }`}
      >
        {/* Top specular laser seam */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(34,225,255,0.7), rgba(245,158,11,0.6), transparent)",
          }}
        />

        <Logo compact imageSrc={logoImageSrc} />

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-active={active === link.id}
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="nav-link font-heading text-[0.85rem] font-medium tracking-wide"
            >
              {link.label}
            </a>
          ))}

          <span aria-hidden className="h-5 w-px bg-white/10" />

          {/* CMD terminal launcher */}
          {onOpenTerminal && (
            <button
              onClick={() => {
                soundFx.playConfirm();
                onOpenTerminal();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="flex items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 font-mono text-xs font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_15px_rgba(34,225,255,0.6)]"
              title="Open Developer CMD Terminal (Ctrl + `)"
            >
              <Terminal size={13} />
              <span>CMD</span>
            </button>
          )}

          <a
            href="/resume.pdf"
            download
            onClick={() => soundFx.playConfirm()}
            onMouseEnter={() => soundFx.playHover()}
            className="btn-ghost !px-4 !py-2 !text-[0.8rem]"
          >
            <Download size={14} />
            Resume
          </a>

          <a
            href="#contact"
            onClick={() => soundFx.playClick()}
            onMouseEnter={() => soundFx.playHover()}
            className="btn-primary !px-4 !py-2 !text-[0.8rem]"
          >
            <Sparkles size={14} />
            Let&apos;s Talk
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => {
            soundFx.playClick();
            setOpen((c) => !c);
          }}
          onMouseEnter={() => soundFx.playHover()}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/5 text-white transition-all duration-300 hover:border-[#22e1ff]/50 hover:text-[#22e1ff] active:scale-95 md:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "menu"}
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: 0.22 }}
              className="grid place-items-center"
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </motion.span>
          </AnimatePresence>
        </button>

        {/* Scroll progress */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
          style={{
            scaleX: progress,
            background:
              "linear-gradient(90deg, #22e1ff, #60a5fa 55%, #f59e0b)",
            boxShadow: "0 0 12px rgba(34,225,255,0.75)",
          }}
        />
      </motion.nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-slab mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl p-3 border border-white/15 md:hidden"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => {
                  soundFx.playClick();
                  setOpen(false);
                }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                className={`flex items-center justify-between rounded-xl px-3 py-3 font-heading text-[0.92rem] transition-all duration-300 ${
                  active === link.id
                    ? "bg-[#22e1ff]/10 text-[#8fe9ff]"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
                <span className="font-mono text-[10px] text-[#22e1ff]/50">
                  0{i + 1}
                </span>
              </motion.a>
            ))}

            <div className="divider-glow my-3" />

            <div className="flex flex-col gap-2">
              {onOpenTerminal && (
                <button
                  onClick={() => {
                    soundFx.playConfirm();
                    setOpen(false);
                    onOpenTerminal();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 py-2.5 font-mono text-xs font-bold text-cyan-300"
                >
                  <Terminal size={14} /> Open CMD Terminal
                </button>
              )}
              <a
                href="/resume.pdf"
                download
                onClick={() => soundFx.playConfirm()}
                className="btn-ghost w-full"
              >
                <Download size={15} />
                Download Resume
              </a>
              <a
                href="#contact"
                onClick={() => {
                  soundFx.playClick();
                  setOpen(false);
                }}
                className="btn-primary w-full"
              >
                <Sparkles size={15} />
                Let&apos;s Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
