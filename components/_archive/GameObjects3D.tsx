"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MousePos {
  x: number;
  y: number;
}

// ─── Icosahedron (D20 die) ────────────────────────────────────────────────────
function Icosahedron({ mouse }: { mouse: MousePos }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.003 + mouse.y * 0.08;
    meshRef.current.rotation.y += 0.004 + mouse.x * 0.08;
    meshRef.current.position.y =
      0.2 + Math.sin(clock.elapsedTime * 0.6) * 0.25;
  });

  return (
    <mesh ref={meshRef} position={[3.2, 0.2, -1]}>
      <icosahedronGeometry args={[1.4, 0]} />
      <meshBasicMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.14}
      />
    </mesh>
  );
}

// ─── Torus (ring / portal) ────────────────────────────────────────────────────
function Torus({ mouse }: { mouse: MousePos }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.005 + mouse.y * 0.06;
    meshRef.current.rotation.z += 0.002 + mouse.x * 0.04;
    meshRef.current.position.y =
      -0.3 + Math.sin(clock.elapsedTime * 0.5 + 1.2) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[-3.5, -0.3, -2]}>
      <torusGeometry args={[1.0, 0.03, 8, 40]} />
      <meshBasicMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.14}
      />
    </mesh>
  );
}

// ─── Octahedron (crystal / gem) ───────────────────────────────────────────────
function Octahedron({ mouse }: { mouse: MousePos }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.006 + mouse.x * 0.07;
    meshRef.current.rotation.z += 0.003 + mouse.y * 0.05;
    meshRef.current.position.y =
      2.2 + Math.sin(clock.elapsedTime * 0.7 + 2.5) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={[0.5, 2.2, -3]}>
      <octahedronGeometry args={[0.9, 0]} />
      <meshBasicMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.14}
      />
    </mesh>
  );
}

// ─── Scene (all three objects) ────────────────────────────────────────────────
function Scene({ mouse }: { mouse: MousePos }) {
  return (
    <>
      <Icosahedron mouse={mouse} />
      <Torus mouse={mouse} />
      <Octahedron mouse={mouse} />
    </>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function GameObjects3D() {
  const [mouse, setMouse] = useState<MousePos>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to [-0.5, 0.5] then scale down to max ±0.1 influence
      const nx = (e.clientX / window.innerWidth - 0.5) * 0.2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 0.2;
      setMouse({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
        gl={{ alpha: true, antialias: false }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
