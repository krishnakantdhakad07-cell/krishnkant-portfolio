"use client";

import { motion } from "framer-motion";
import Reveal from "./motion/Reveal";
import TypewriterText from "./motion/TypewriterText";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  /** Center the block */
  centered?: boolean;
  /** Enable repeating typewriter loop on title */
  typewriter?: boolean;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  centered = false,
  typewriter = false,
}: Props) {
  return (
    <div
      className={`mb-14 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}
    >
      {/* Eyebrow with cyber accents */}
      <Reveal from="up" distance={12} duration={0.5}>
        <div
          className={`mb-3.5 flex items-center gap-2 font-mono text-[0.74rem] font-bold tracking-[0.2em] uppercase ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="text-[#22e1ff] font-bold">[</span>
          <span className="bg-gradient-to-r from-[#5eeaff] via-[#a78bfa] to-[#fbbf24] bg-clip-text font-bold text-transparent">
            {eyebrow}
          </span>
          <span className="text-[#fbbf24] font-bold">]</span>

          <motion.span
            aria-hidden
            className="h-px flex-1 max-w-[100px] origin-left"
            style={{
              background:
                "linear-gradient(90deg, rgba(34,225,255,0.7), rgba(251,191,36,0.5), transparent)",
              boxShadow: "0 0 10px rgba(34,225,255,0.5)",
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </Reveal>

      {/* Clear, Sharp & Readable Headline (Typewriter repeating if enabled) */}
      <Reveal from="up" delay={0.08} distance={16} duration={0.6}>
        <h2 className="text-section text-chrome font-black tracking-tight text-[1.9rem] sm:text-[2.6rem] min-h-[1.2em]">
          {typewriter ? (
            <TypewriterText text={title} speed={42} pauseTime={3200} loop={true} />
          ) : (
            title
          )}
        </h2>
      </Reveal>

      {/* Description */}
      <Reveal from="up" delay={0.14} distance={16} duration={0.6}>
        <p className="text-body mt-4 max-w-2xl leading-relaxed text-slate-300 font-sans text-base">
          {description}
        </p>
      </Reveal>
    </div>
  );
}
