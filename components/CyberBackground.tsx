"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  a: number;
};

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const cv: HTMLCanvasElement = canvasRef.current;
    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let raf = 0;
    let running = true;
    let mouseX = -1000;
    let mouseY = -1000;

    cv.width = w;
    cv.height = h;

    const isMobile = w < 768;
    const nodeCount = isMobile ? 22 : 45;
    const linkDist = isMobile ? 90 : 140;
    const linkDistSq = linkDist * linkDist;

    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.6 + 0.7,
      hue: Math.random() > 0.5 ? 268 : 188,
      a: Math.random() * 0.45 + 0.25,
    }));

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w;
      cv.height = h;
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function draw() {
      if (!running) return;
      ctx!.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        p.x += p.vx;
        p.y += p.vy;

        // Subtle mouse repulsion field
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mDistSq = mdx * mdx + mdy * mdy;
        if (mDistSq < 18000 && mDistSq > 0) {
          const force = (18000 - mDistSq) / 18000;
          p.x += (mdx / Math.sqrt(mDistSq)) * force * 1.8;
          p.y += (mdy / Math.sqrt(mDistSq)) * force * 1.8;
        }

        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;

        for (let j = i + 1; j < nodes.length; j++) {
          const q = nodes[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;

          if (d2 < linkDistSq) {
            const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.18;
            ctx!.strokeStyle =
              p.hue === 268
                ? `rgba(168, 85, 247, ${alpha})`
                : `rgba(34, 225, 255, ${alpha})`;
            ctx!.lineWidth = 0.65;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.stroke();
          }
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle =
          p.hue === 268
            ? `rgba(168, 85, 247, ${p.a})`
            : `rgba(34, 225, 255, ${p.a})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden"
    >
      {/* Ambient aurora glowing orbs */}
      <div className="absolute -top-[12%] -left-[10%] h-[600px] w-[600px] rounded-full bg-[#22e1ff]/[0.07] blur-[140px] animate-pulse" />
      <div className="absolute top-[30%] -right-[15%] h-[650px] w-[650px] rounded-full bg-[#8b5cf6]/[0.08] blur-[150px]" />
      <div className="absolute -bottom-[20%] left-[25%] h-[600px] w-[600px] rounded-full bg-[#3b82f6]/[0.07] blur-[140px]" />

      {/* Cyber Grid pattern */}
      <div className="cyber-grid absolute inset-0 opacity-35" />

      {/* Cyber scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))",
          backgroundSize: "100% 3px, 6px 100%",
        }}
      />

      {/* Lightweight reactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
