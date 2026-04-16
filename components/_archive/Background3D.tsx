"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Floating wireframe shapes for ambient background depth
const shapes = [
  {
    size: 280,
    top: "8%",
    right: "6%",
    rotateX: 20,
    rotateY: -15,
    rotateZ: 5,
    animDuration: 14,
    animDelay: 0,
    opacity: 0.045,
    type: "square",
  },
  {
    size: 160,
    top: "55%",
    right: "18%",
    rotateX: -10,
    rotateY: 25,
    rotateZ: -12,
    animDuration: 18,
    animDelay: 3,
    opacity: 0.035,
    type: "square",
  },
  {
    size: 420,
    top: "30%",
    right: "-5%",
    rotateX: 8,
    rotateY: -30,
    rotateZ: 20,
    animDuration: 22,
    animDelay: 1.5,
    opacity: 0.025,
    type: "square",
  },
  {
    size: 90,
    top: "70%",
    right: "32%",
    rotateX: 30,
    rotateY: 10,
    rotateZ: 45,
    animDuration: 12,
    animDelay: 5,
    opacity: 0.055,
    type: "square",
  },
  {
    size: 200,
    top: "15%",
    right: "35%",
    rotateX: -20,
    rotateY: 15,
    rotateZ: -30,
    animDuration: 16,
    animDelay: 7,
    opacity: 0.03,
    type: "diamond",
  },
  {
    size: 60,
    top: "42%",
    right: "8%",
    rotateX: 15,
    rotateY: -25,
    rotateZ: 15,
    animDuration: 10,
    animDelay: 2,
    opacity: 0.06,
    type: "square",
  },
];

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const els = containerRef.current?.querySelectorAll(".bg-shape");
      els?.forEach((el, i) => {
        const shape = shapes[i];
        // Animate in
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.8 },
          {
            opacity: shape.opacity,
            scale: 1,
            duration: 2,
            delay: 1 + shape.animDelay * 0.3,
            ease: "power2.out",
          }
        );
        // Continuous float
        gsap.to(el, {
          y: `random(-20, 20)`,
          rotateX: `random(-12, 12)`,
          rotateY: `random(-15, 15)`,
          duration: shape.animDuration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: shape.animDelay,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        perspective: "1000px",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {shapes.map((shape, i) => (
        <div
          key={i}
          className="bg-shape"
          style={{
            position: "absolute",
            top: shape.top,
            right: shape.right,
            width: shape.size,
            height: shape.size,
            opacity: 0, // GSAP animates in
            transform: `rotateX(${shape.rotateX}deg) rotateY(${shape.rotateY}deg) rotateZ(${shape.rotateZ}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {shape.type === "diamond" ? (
            // Diamond shape via border
            <div
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid rgba(255,255,255,0.8)",
                transform: "rotate(45deg)",
              }}
            />
          ) : (
            // Wireframe square with inner detail
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              {/* Outer border */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "1px solid rgba(255,255,255,0.8)",
                }}
              />
              {/* Inner border at 60% */}
              <div
                style={{
                  position: "absolute",
                  inset: "20%",
                  border: "1px solid rgba(255,255,255,0.4)",
                }}
              />
              {/* Corner dots */}
              {[
                { top: -2, left: -2 },
                { top: -2, right: -2 },
                { bottom: -2, left: -2 },
                { bottom: -2, right: -2 },
              ].map((pos, j) => (
                <div
                  key={j}
                  style={{
                    position: "absolute",
                    width: 3,
                    height: 3,
                    background: "rgba(255,255,255,0.6)",
                    borderRadius: "50%",
                    ...pos,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
