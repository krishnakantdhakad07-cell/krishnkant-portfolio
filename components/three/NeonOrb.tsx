"use client";

import { Torus } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

export default function NeonOrb() {
  const mainGroup = useRef<Group>(null);
  const coreSphere = useRef<Mesh>(null);
  const wireframeSphere = useRef<Mesh>(null);
  const ring1 = useRef<Mesh>(null);
  const ring2 = useRef<Mesh>(null);
  const satellites = useRef<Group>(null);

  useFrame((state, delta) => {
    const mouseX = state.pointer.x * 0.3;
    const mouseY = state.pointer.y * 0.3;

    if (mainGroup.current) {
      mainGroup.current.rotation.y += delta * 0.25;
      mainGroup.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.12 + mouseY * 0.2;
      mainGroup.current.rotation.y += mouseX * 0.05;
    }

    if (wireframeSphere.current) {
      wireframeSphere.current.rotation.y -= delta * 0.35;
      wireframeSphere.current.rotation.x += delta * 0.15;
    }

    if (coreSphere.current) {
      coreSphere.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.05
      );
    }

    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.4;
      ring1.current.rotation.y += delta * 0.3;
    }

    if (ring2.current) {
      ring2.current.rotation.y -= delta * 0.45;
      ring2.current.rotation.z += delta * 0.35;
    }

    if (satellites.current) {
      satellites.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group ref={mainGroup}>
      {/* 3D Glowing Core Sphere */}
      <mesh ref={coreSphere} scale={1.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#061224"
          roughness={0.15}
          metalness={0.9}
          emissive="#00f0ff"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Internal High-Intensity Light Core */}
      <mesh scale={0.7}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Futuristic Hologram Icosahedron Wireframe */}
      <mesh ref={wireframeSphere} scale={1.8}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial
          color="#22e1ff"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Outer Dotted Orbit Sphere */}
      <mesh scale={2.3}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Neon Ring 1 (Cyan Orbit) */}
      <mesh ref={ring1} rotation={[0.8, 0.4, 0]}>
        <Torus args={[2.2, 0.025, 16, 80]}>
          <meshStandardMaterial
            color="#22e1ff"
            emissive="#22e1ff"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </Torus>
      </mesh>

      {/* Neon Ring 2 (Violet / Iris Orbit) */}
      <mesh ref={ring2} rotation={[-0.9, 0.7, 0.3]}>
        <Torus args={[2.6, 0.02, 16, 80]}>
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </Torus>
      </mesh>

      {/* Orbiting Satellite Data Nodes */}
      <group ref={satellites}>
        <mesh position={[2.5, 0.4, 0]} scale={0.12}>
          <octahedronGeometry />
          <meshBasicMaterial color="#22e1ff" />
        </mesh>
        <mesh position={[-2.3, -0.6, 0.8]} scale={0.1}>
          <dodecahedronGeometry />
          <meshBasicMaterial color="#c084fc" />
        </mesh>
        <mesh position={[0.5, 2.7, -0.6]} scale={0.11}>
          <boxGeometry />
          <meshBasicMaterial color="#34d399" />
        </mesh>
      </group>
    </group>
  );
}
