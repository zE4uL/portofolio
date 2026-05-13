"use client";

import { useEffect, useRef } from "react";

const CONFIG = {
  step: 26,
  magnetR: 220,
  magnetForce: 28,
  pulsePeriodMs: 6200,
  pulseSpeed: 1.15,
  driftAmp: 0.55,
  driftFreq: 0.0009,
};

type Node = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  isCross: boolean;
};

export default function HeroMagneticGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    let nodes: Node[] = [];
    let mounted = true;
    let raf = 0;

    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, lx: -9999, ly: -9999, active: false };
    const pulses: Array<{ x: number; y: number; t: number }> = [];
    let lastPulseAt = 0;

    function readAccent() {
      const root = getComputedStyle(document.documentElement);
      const rgb = root.getPropertyValue("--accent-rgb").trim() || "111,165,127";
      return rgb;
    }

    let accentRGB = readAccent();

    function build() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.max(1, Math.round(w * dpr));
      canvas!.height = Math.max(1, Math.round(h * dpr));
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = [];
      const step = CONFIG.step;
      const cols = Math.ceil(w / step);
      const rows = Math.ceil(h / step);
      const offX = (w - (cols - 1) * step) / 2;
      const offY = (h - (rows - 1) * step) / 2;
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const x = offX + cx * step;
          const y = offY + cy * step;
          const isCross = cx % 5 === 0 && cy % 5 === 0;
          nodes.push({
            ox: x,
            oy: y,
            x,
            y,
            vx: 0,
            vy: 0,
            phase: (cx * 0.37 + cy * 0.51) % (Math.PI * 2),
            isCross,
          });
        }
      }
    }

    function onResize() {
      build();
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      mouse.vx = nx - mouse.x;
      mouse.vy = ny - mouse.y;
      mouse.x = nx;
      mouse.y = ny;
      mouse.lx = nx;
      mouse.ly = ny;
      mouse.active = true;
    }

    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.active = false;
    }

    function onClick(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      pulses.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        t: 0,
      });
      if (pulses.length > 4) pulses.shift();
    }

    function onAccentChange() {
      accentRGB = readAccent();
    }

    let frame = 0;
    let last = performance.now();

    function tick(now: number) {
      if (!mounted) return;
      const dt = Math.min(50, now - last);
      last = now;
      frame++;

      // Auto-pulse from last cursor location (or center) for ambient life
      if (now - lastPulseAt > CONFIG.pulsePeriodMs) {
        lastPulseAt = now;
        pulses.push({
          x: mouse.lx > -9000 ? mouse.lx : w / 2,
          y: mouse.ly > -9000 ? mouse.ly : h / 2,
          t: 0,
        });
        if (pulses.length > 4) pulses.shift();
      }

      ctx!.clearRect(0, 0, w, h);

      const baseR = accentRGB;
      const time = now * 0.001;

      // Update + draw nodes
      const magnetR = CONFIG.magnetR;
      const magnetR2 = magnetR * magnetR;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Idle drift — subtle sine wobble around origin
        const drift = reduced ? 0 : CONFIG.driftAmp;
        const dx0 = drift * Math.sin(time + n.phase);
        const dy0 = drift * Math.cos(time * 0.8 + n.phase);

        // Magnetic attraction toward cursor (within radius)
        let pull = 0;
        let dxToMouse = 0;
        let dyToMouse = 0;
        if (mouse.active) {
          const ddx = mouse.x - n.ox;
          const ddy = mouse.y - n.oy;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < magnetR2) {
            const d = Math.sqrt(d2) || 1;
            const t = 1 - d / magnetR; // 0..1
            pull = t * t; // ease
            dxToMouse = (ddx / d) * pull * CONFIG.magnetForce;
            dyToMouse = (ddy / d) * pull * CONFIG.magnetForce;
          }
        }

        // Pulse contribution — pushes nodes outward as ring passes through
        let pulseInfluence = 0;
        for (const p of pulses) {
          const ddx = n.ox - p.x;
          const ddy = n.oy - p.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          const radius = p.t * 280;
          const ring = Math.exp(-((d - radius) * (d - radius)) / 2400);
          if (ring > 0.02) {
            const fade = Math.max(0, 1 - p.t / 2.4);
            pulseInfluence += ring * fade;
          }
        }

        // Spring back to origin
        const targetX = n.ox + dx0 + dxToMouse;
        const targetY = n.oy + dy0 + dyToMouse;
        n.vx += (targetX - n.x) * 0.18;
        n.vy += (targetY - n.y) * 0.18;
        n.vx *= 0.78;
        n.vy *= 0.78;
        n.x += n.vx;
        n.y += n.vy;

        // Compute alpha + size
        const baseAlpha = n.isCross ? 0.16 : 0.08;
        const energy = Math.min(1.6, pull * 1.4 + pulseInfluence * 1.1);
        const alpha = Math.min(0.95, baseAlpha + energy * 0.65);
        const size = n.isCross ? 1.4 + energy * 2.6 : 0.9 + energy * 1.6;

        // Draw — crosshair vs dot
        if (n.isCross) {
          const arm = 3 + energy * 4.5;
          ctx!.strokeStyle = `rgba(${baseR}, ${alpha})`;
          ctx!.lineWidth = size * 0.5;
          ctx!.beginPath();
          ctx!.moveTo(n.x - arm, n.y);
          ctx!.lineTo(n.x + arm, n.y);
          ctx!.moveTo(n.x, n.y - arm);
          ctx!.lineTo(n.x, n.y + arm);
          ctx!.stroke();
        } else {
          ctx!.fillStyle = `rgba(${baseR}, ${alpha})`;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, size, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      // Magnetic ring at cursor (gives a tangible radius indicator)
      if (mouse.active) {
        ctx!.strokeStyle = `rgba(${baseR}, 0.18)`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.arc(mouse.x, mouse.y, CONFIG.magnetR * 0.42, 0, Math.PI * 2);
        ctx!.stroke();

        ctx!.strokeStyle = `rgba(${baseR}, 0.08)`;
        ctx!.beginPath();
        ctx!.arc(mouse.x, mouse.y, CONFIG.magnetR, 0, Math.PI * 2);
        ctx!.stroke();
      }

      // Advance pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].t += (dt / 1000) * CONFIG.pulseSpeed;
        if (pulses[i].t > 2.6) pulses.splice(i, 1);
      }

      raf = requestAnimationFrame(tick);
    }

    build();
    raf = requestAnimationFrame(tick);

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("click", onClick);
    window.addEventListener("themechange", onAccentChange);

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick);
      window.removeEventListener("themechange", onAccentChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-magnetic-grid" aria-hidden="true" />;
}
