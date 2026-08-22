"use client";

import { Float, Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import NeonOrb from "./NeonOrb";

export default function HeroCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    setEnabled(true);

    const host = hostRef.current;
    if (!host) return;

    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    io.observe(host);

    const onVisibility = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden"
    >
      {enabled && (
        <Canvas
          frameloop={active ? "always" : "never"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6.8], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#22e1ff" />
          <pointLight position={[-4, -3, 3]} intensity={1.2} color="#8b5cf6" />

          <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
            <group position={[1.4, 0, 0]}>
              <NeonOrb />
            </group>
          </Float>

          <Sparkles
            count={45}
            scale={[12, 8, 6]}
            size={2.2}
            speed={0.4}
            color="#22e1ff"
          />

          <Sparkles
            count={25}
            scale={[10, 6, 5]}
            size={2.0}
            speed={0.5}
            color="#a78bfa"
          />
        </Canvas>
      )}
    </div>
  );
}
