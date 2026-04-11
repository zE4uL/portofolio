"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const isHiddenRef = useRef(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Show cursors after first mouse move
    const showCursor = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      // Dot follows exactly
      gsap.set(dot, {
        x: e.clientX - 3,
        y: e.clientY - 3,
      });

      showCursor();
    };

    const onMouseLeave = () => {
      isHiddenRef.current = true;
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    const onMouseEnter = () => {
      isHiddenRef.current = false;
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    // Ring follows with lag
    const animate = () => {
      const ease = 0.1;
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * ease;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * ease;

      gsap.set(ring, {
        x: ringPosRef.current.x - 20,
        y: ringPosRef.current.y - 20,
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Hover states
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const isInteractive = target.closest(
        'a, button, [data-cursor-hover], input, textarea, select, [role="button"]'
      );
      const isMagnetic = target.closest("[data-magnetic]");

      if (isMagnetic) {
        const el = isMagnetic as HTMLElement;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        gsap.to(ring, {
          x: cx - 30,
          y: cy - 30,
          width: 60,
          height: 60,
          duration: 0.4,
          ease: "power2.out",
        });
        return;
      }

      if (isInteractive) {
        gsap.to(ring, {
          width: 60,
          height: 60,
          x: posRef.current.x - 30,
          y: posRef.current.y - 30,
          opacity: 0.6,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      const isInteractive = target.closest(
        'a, button, [data-cursor-hover], input, textarea, select, [role="button"]'
      );
      const isMagnetic = target.closest("[data-magnetic]");

      if (isInteractive || isMagnetic) {
        gsap.to(ring, {
          width: 40,
          height: 40,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#ffffff",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.5)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0,
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
