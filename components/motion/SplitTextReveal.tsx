"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  mode?: "words" | "chars";
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export default function SplitTextReveal({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  duration = 0.6,
  stagger = 0.035,
  as: Component = "div",
}: SplitTextRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = Component;
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");
  const MotionTag = motion[Component] as typeof motion.div;

  return (
    <MotionTag
      className={`inline-block ${className}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block ${wordClassName}`}
        >
          {word}
          {index < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </MotionTag>
  );
}
