"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade" | "perspective";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Entrance direction */
  from?: Direction;
  /** Seconds before the animation starts */
  delay?: number;
  /** Animation length in seconds */
  duration?: number;
  /** Travel distance in px */
  distance?: number;
  /** Play every time it enters the viewport instead of just once */
  repeat?: boolean;
  /** How much of the element must be visible (0–1) */
  amount?: number;
  as?: "div" | "section" | "article" | "li" | "span";
}

const OFFSETS: Record<Direction, { x?: number; y?: number; scale?: number; rotateX?: number }> = {
  up: { y: 1 },
  down: { y: -1 },
  left: { x: 1 },
  right: { x: -1 },
  scale: { scale: 0.92 },
  perspective: { y: 1, rotateX: 20 },
  fade: {},
};

/**
 * Scroll-triggered reveal with GPU acceleration and silky cyber curves.
 */
export default function Reveal({
  children,
  className = "",
  from = "up",
  delay = 0,
  duration = 0.75,
  distance = 28,
  repeat = false,
  amount = 0.15,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const offset = OFFSETS[from];

  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MotionTag
      className={className}
      initial={{
        opacity: 0,
        x: (offset.x ?? 0) * distance,
        y: (offset.y ?? 0) * distance,
        scale: offset.scale ?? 1,
        rotateX: offset.rotateX ?? 0,
        filter: "blur(6px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: !repeat, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: "transform, opacity", perspective: from === "perspective" ? 1000 : undefined }}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------
   Stagger helpers — wrap a list in <RevealGroup> and each child in
   <RevealItem> to get a natural cascading entrance.
   ------------------------------------------------------------------ */
export const groupVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export function RevealGroup({
  children,
  className = "",
  amount = 0.15,
  repeat = false,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  repeat?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, amount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={itemVariants}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
