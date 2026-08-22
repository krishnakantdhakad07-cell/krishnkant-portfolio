"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient cursor-follow light.
 *
 * Pure transform-based (GPU composited), pointer-events-none, and completely
 * disabled on touch devices / reduced-motion so mobile performance is untouched.
 */
export default function CursorGlow() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fine = window.matchMedia("(pointer: fine)").matches;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!fine || reduce) return;

        const el = ref.current;
        if (!el) return;

        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;
        let x = targetX;
        let y = targetY;
        let raf = 0;

        const onMove = (e: PointerEvent) => {
            targetX = e.clientX;
            targetY = e.clientY;
            if (el.style.opacity !== "1") el.style.opacity = "1";
        };

        const onLeave = () => {
            el.style.opacity = "0";
        };

        const loop = () => {
            // critically-damped easing → silky trail without jitter
            x += (targetX - x) * 0.12;
            y += (targetY - y) * 0.12;
            el.style.transform = `translate3d(${x - 180}px, ${y - 180}px, 0)`;
            raf = requestAnimationFrame(loop);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerleave", onLeave);
        raf = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerleave", onLeave);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div
            ref={ref}
            aria-hidden
            className="pointer-events-none fixed top-0 left-0 z-[5] hidden h-[360px] w-[360px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-500 will-change-transform md:block"
            style={{
                background:
                    "radial-gradient(circle, rgba(34,225,255,0.09), rgba(139,92,246,0.06) 45%, transparent 68%)",
                filter: "blur(18px)",
            }}
        />
    );
}
