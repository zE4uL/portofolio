"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { SHADER_VARIANTS, ShaderVariant, VERTEX_SHADER } from "./shaders";

type ShaderBackgroundProps = {
  variant: ShaderVariant;
  opacity?: number;
  speed?: number;
  className?: string;
};

function ShaderPlane({ variant, speed }: { variant: ShaderVariant; speed: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state) => {
    if (!matRef.current) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      matRef.current.uniforms.uTime.value = 0;
      return;
    }
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed;
    matRef.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={SHADER_VARIANTS[variant]}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function ShaderBackground({
  variant,
  opacity = 0.45,
  speed = 1,
  className = "",
}: ShaderBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{ opacity }}
    >
      <Canvas
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 1], fov: 50 }}
        dpr={[1, 2]}
      >
        <ShaderPlane variant={variant} speed={speed} />
      </Canvas>
    </div>
  );
}
