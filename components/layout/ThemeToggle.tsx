"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {}
  if (typeof window.matchMedia === "function") {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  return "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [sparkleKey, setSparkleKey] = useState(0);
  const reduce = useReducedMotion();
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const domTheme = document.documentElement.dataset.theme as Theme | undefined;
    const resolved: Theme = domTheme === "light" || domTheme === "dark" ? domTheme : getInitialTheme();
    setTheme(resolved);
    setMounted(true);
    // Do not re-write data-theme here — FOUC script already did.
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const spawnSparkles = useCallback(() => {
    if (reduce) return;
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    const count = 5;
    const next: Sparkle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 16 - 8,
      y: Math.random() * 16 - 8,
      angle: (360 / count) * i + Math.random() * 20 - 10,
      distance: 18 + Math.random() * 14,
    }));
    setSparkles(next);
    setSparkleKey((k) => k + 1);
    timeoutRef.current = window.setTimeout(() => setSparkles([]), 500);
  }, [reduce]);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {}
      return next;
    });
    spawnSparkles();
  }, [spawnSparkles]);

  const isDark = theme === "dark";

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Sparkle dots */}
      {mounted &&
        sparkles.map((s) => {
          const rad = (s.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * s.distance;
          const ty = Math.sin(rad) * s.distance;
          return (
            <motion.span
              key={`${sparkleKey}-${s.id}`}
              initial={{ opacity: 1, scale: 1, x: s.x, y: s.y }}
              animate={{ opacity: 0, scale: 0, x: s.x + tx, y: s.y + ty }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute"
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: isDark
                  ? "var(--accent-primary)"
                  : "var(--accent-warm, #FF7A3D)",
              }}
            />
          );
        })}

      <button
        type="button"
        onClick={toggle}
        data-cursor="link"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="relative flex items-center justify-center rounded-full cursor-pointer outline-none"
        style={{
          width: 40,
          height: 40,
          background: "var(--surface-raised)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
          transition: "background 180ms var(--ease-out), border-color 180ms var(--ease-out)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {mounted && (
            <motion.span
              key={theme}
              initial={reduce ? false : { opacity: 0, rotate: isDark ? -90 : 90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: isDark ? 90 : -90, scale: 0.6 }}
              transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center"
              style={{ color: "var(--text-primary)" }}
            >
              {isDark ? (
                <Moon size={16} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Sun size={16} strokeWidth={1.75} aria-hidden="true" />
              )}
            </motion.span>
          )}

          {/* SSR placeholder — prevents layout shift before mount */}
          {!mounted && (
            <motion.span
              key="placeholder"
              className="flex items-center justify-center opacity-0"
            >
              <Moon size={16} strokeWidth={1.75} aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
