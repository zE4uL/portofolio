"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Band = { text: string; font: "mono" | "serif" | "display" };

type Props = {
  bands?: Band[];
  size?: number;
  innerLabel?: string;
  innerGlyph?: string;
  spinDuration?: number;
  hoverDuration?: number;
  className?: string;
};

const DEFAULT_BANDS: Band[] = [
  { text: "ZIAULISLAM", font: "mono" },
  { text: "ZIAULISLAM", font: "serif" },
  { text: "ZIAULISLAM", font: "display" },
];

const SEPARATOR = "✦";

export default function OrbitingSticker({
  bands = DEFAULT_BANDS,
  size = 200,
  innerLabel = "THE",
  innerGlyph = "✦",
  spinDuration = 20,
  hoverDuration = 5,
  className = "",
}: Props) {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const rotRef = useRef(0);
  const durRef = useRef(spinDuration);
  const lastTsRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [hover, setHover] = useState(false);

  const chars = useMemo(() => {
    const out: { ch: string; font: Band["font"]; key: string }[] = [];
    bands.forEach((band, bi) => {
      band.text.split("").forEach((ch, ci) => {
        out.push({ ch, font: band.font, key: `b${bi}-c${ci}` });
      });
      out.push({ ch: SEPARATOR, font: "display", key: `b${bi}-sep` });
    });
    return out;
  }, [bands]);

  const placed = useMemo(() => {
    const radius = size / 2 - 14;
    const total = chars.length;
    return chars.map((c, i) => {
      const angleDeg = (360 / total) * i;
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = Math.round(Math.sin(angleRad) * radius * 100) / 100;
      const y = Math.round(-Math.cos(angleRad) * radius * 100) / 100;
      return { ...c, x, y, angleDeg };
    });
  }, [chars, size]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      const degPerSec = 360 / durRef.current;
      rotRef.current = (rotRef.current + degPerSec * dt) % 360;
      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${rotRef.current}deg)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, []);

  useEffect(() => {
    const target = hover ? hoverDuration : spinDuration;
    const start = durRef.current;
    const startTime = performance.now();
    const dur = 350;
    let raf = 0;
    const tween = (now: number) => {
      const t = Math.min(1, (now - startTime) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      durRef.current = start + (target - start) * eased;
      if (t < 1) raf = requestAnimationFrame(tween);
    };
    raf = requestAnimationFrame(tween);
    return () => cancelAnimationFrame(raf);
  }, [hover, hoverDuration, spinDuration]);

  return (
    <div
      className={`orbit-sticker ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-hidden="true"
    >
      <div className="orbit-ring" ref={ringRef}>
        {placed.map(({ ch, font, key, x, y, angleDeg }) => (
          <span
            key={key}
            className={`orbit-ch orbit-ch--${font}`}
            style={{
              transform: `translate(${x}px, ${y}px) rotate(${angleDeg}deg)`,
            }}
          >
            {ch}
          </span>
        ))}
      </div>
      <div className="orbit-center">
        <span className="orbit-center-label">{innerLabel}</span>
        <span className="orbit-center-glyph">{innerGlyph}</span>
      </div>
    </div>
  );
}
