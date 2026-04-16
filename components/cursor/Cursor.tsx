"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Mode = "default" | "link" | "card" | "throw";

/** Fallback labels when the element has no data-cursor-label */
const MODE_LABELS: Record<Mode, string> = {
  default: "",
  link: "",
  card: "drag to explore",
  throw: "drag & throw",
};

export function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");
  const reduce = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Spring config: responsive but not jittery
  const springX = useSpring(x, { stiffness: 400, damping: 30, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 400, damping: 30, mass: 0.4 });

  useEffect(() => {
    setMounted(true);

    // Only run on fine-pointer (non-touch) devices
    const coarse = matchMedia("(pointer: coarse)").matches;
    setIsTouch(coarse);
    if (coarse) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement | null;

      // Walk up the DOM to find the nearest [data-cursor] ancestor first
      const cursorEl = target?.closest<HTMLElement>("[data-cursor]");
      if (cursorEl) {
        const m = (cursorEl.dataset.cursor as Mode) || "default";
        setMode(m);
        // data-cursor-label overrides mode default; empty string also overrides
        const explicitLabel = cursorEl.dataset.cursorLabel;
        setLabel(explicitLabel !== undefined ? explicitLabel : MODE_LABELS[m]);
      } else if (target?.closest("a, button, [role='button']")) {
        // Native interactive elements default to link mode
        setMode("link");
        setLabel("");
      } else {
        setMode("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  // SSR guard + touch guard + reduced-motion passthrough
  // (reduced-motion: return null so browser's native cursor shows)
  if (!mounted || isTouch || reduce) return null;

  const size = mode === "default" ? 8 : 40;
  const offset = size / 2;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[60] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: -offset,
        translateY: -offset,
      }}
    >
      {/* Cursor dot / circle */}
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="rounded-full bg-white grid place-items-center overflow-visible"
        style={{ position: "relative" }}
      >
        {/* Label — floats to the right of the bubble, outside the circle */}
        {label && mode !== "default" && (
          <motion.span
            key={label}
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-full font-mono text-[10px] text-black whitespace-nowrap"
            style={{ marginLeft: 10, top: "50%", translateY: "-50%", mixBlendMode: "normal" }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
