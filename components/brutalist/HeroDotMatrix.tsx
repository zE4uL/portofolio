"use client";

import { useEffect, useRef } from "react";

const IMG_SRC = "/images/profile/NanoBanana-2026-04-28.png";

const CONFIG = {
  step: 8,
  magnetR: 290,
  force: 0.95,
  flow: 0.30,
  // mode: "repel"
};

type Particle = {
  ox: number; oy: number;
  x: number; y: number;
  vx: number; vy: number;
  lum: number;
  gx: number; gy: number;
  edge: number;
  rad: number;
  phase: number;
  freq: number;
};

export default function HeroDotMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const flowAmpScalar = reduced ? 0 : CONFIG.flow * 6;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    let particles: Particle[] = [];
    let imgData: ImageData | null = null;
    const imgSize = { w: 0, h: 0 };
    const bg = { r: 0, g: 0, b: 0 };
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let mounted = true;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (w === 0 || h === 0) return;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (imgData) buildParticles();
    }

    function loadImage(): Promise<HTMLImageElement> {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = IMG_SRC;
      });
    }

    function sampleImage(img: HTMLImageElement) {
      const targetW = 480;
      const ratio = img.height / img.width;
      const targetH = Math.round(targetW * ratio);
      const off = document.createElement("canvas");
      off.width = targetW;
      off.height = targetH;
      const octx = off.getContext("2d")!;
      octx.drawImage(img, 0, 0, targetW, targetH);
      imgData = octx.getImageData(0, 0, targetW, targetH);
      imgSize.w = targetW;
      imgSize.h = targetH;

      const sampleCorner = (cx: number, cy: number) => {
        let r = 0, g = 0, b = 0, n = 0;
        for (let yy = cy; yy < cy + 8; yy++) {
          for (let xx = cx; xx < cx + 8; xx++) {
            const i = (yy * targetW + xx) * 4;
            r += imgData!.data[i];
            g += imgData!.data[i + 1];
            b += imgData!.data[i + 2];
            n++;
          }
        }
        return [r / n, g / n, b / n];
      };
      const corners = [
        sampleCorner(0, 0),
        sampleCorner(targetW - 8, 0),
        sampleCorner(0, targetH - 8),
        sampleCorner(targetW - 8, targetH - 8),
      ];
      const avg = corners
        .reduce((a, c) => [a[0] + c[0], a[1] + c[1], a[2] + c[2]], [0, 0, 0])
        .map((v) => v / corners.length);
      bg.r = avg[0]; bg.g = avg[1]; bg.b = avg[2];
    }

    function buildParticles() {
      if (!imgData) return;
      const step = CONFIG.step;

      const margin = Math.min(w, h) * 0.04;
      const imgRatio = imgSize.w / imgSize.h;
      let drawH = (h - margin * 2) * 0.92;
      let drawW = drawH * imgRatio;
      const maxW = w * 0.46;
      if (drawW > maxW) {
        drawW = maxW;
        drawH = drawW / imgRatio;
      }
      const drawX = w - drawW - margin * 1.5;
      const drawY = (h - drawH) / 2;

      const next: Particle[] = [];
      const occupied = new Set<string>();
      const data = imgData.data;

      for (let py = 0; py < drawH; py += step) {
        for (let px = 0; px < drawW; px += step) {
          const sx = Math.floor((px / drawW) * imgSize.w);
          const sy = Math.floor((py / drawH) * imgSize.h);
          const idx = (sy * imgSize.w + sx) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];
          if (a < 64) continue;
          const dr = r - bg.r, dg = g - bg.g, db = b - bg.b;
          const dist2 = dr * dr + dg * dg + db * db;
          if (dist2 < 28 * 28 * 3) continue;
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          if (lum < 0.06) continue;

          const ox = drawX + px;
          const oy = drawY + py;
          occupied.add(px + "," + py);
          next.push({
            ox, oy,
            x: ox, y: oy,
            vx: 0, vy: 0,
            lum,
            gx: px, gy: py,
            edge: 0,
            rad: 0.5 + Math.pow(lum, 0.7) * 1.8,
            phase: Math.random() * Math.PI * 2,
            freq: 0.6 + Math.random() * 0.8,
          });
        }
      }

      const ringSteps: Array<[number, number]> = [];
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          if (dx === 0 && dy === 0) continue;
          ringSteps.push([dx * step, dy * step]);
        }
      }
      const total = ringSteps.length;
      for (const p of next) {
        let kept = 0;
        for (const [dx, dy] of ringSteps) {
          if (occupied.has((p.gx + dx) + "," + (p.gy + dy))) kept++;
        }
        p.edge = 1 - kept / total;
      }

      particles = next;
    }

    let last = performance.now();
    function frame(now: number) {
      if (!mounted) return;
      if (document.hidden) {
        last = now;
        raf = requestAnimationFrame(frame);
        return;
      }
      last = now;
      const time = now / 1000;

      ctx!.clearRect(0, 0, w, h);

      const r2 = CONFIG.magnetR * CONFIG.magnetR;
      const force = CONFIG.force;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const wx = Math.sin(time * p.freq + p.phase) * flowAmpScalar;
        const wy = Math.cos(time * (p.freq * 0.8) + p.phase * 1.3) * flowAmpScalar;
        let tx = p.ox + wx;
        let ty = p.oy + wy;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (mouse.active && d2 < r2) {
          const d = Math.sqrt(d2) || 1;
          const f = 1 - d / CONFIG.magnetR;
          const strength = f * f * 60 * force;
          // repel
          tx -= (dx / d) * strength;
          ty -= (dy / d) * strength;
        }

        const ax = (tx - p.x) * 0.18;
        const ay = (ty - p.y) * 0.18;
        p.vx = (p.vx + ax) * 0.78;
        p.vy = (p.vy + ay) * 0.78;
        p.x += p.vx;
        p.y += p.vy;

        const edgeMul = 1 - p.edge * 0.75;
        const radMul = 1 - p.edge * 0.45;
        const a = Math.min(1, 0.15 + Math.pow(p.lum, 0.6) * 0.95);
        ctx!.fillStyle = `rgba(245,241,232,${a * edgeMul})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.rad * radMul, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function onPointerLeave() { mouse.active = false; }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("resize", resize);

    (async () => {
      try {
        const img = await loadImage();
        if (!mounted) return;
        sampleImage(img);
      } catch {
        return;
      }
      resize();
      last = performance.now();
      raf = requestAnimationFrame(frame);
    })();

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-dot-matrix" aria-hidden="true" />;
}
