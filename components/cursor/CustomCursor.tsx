"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("has-custom-cursor");

    const dot = document.getElementById("cursorDot") as HTMLDivElement | null;
    const ring = document.getElementById("cursorRing") as HTMLDivElement | null;
    const label = document.getElementById("cursorLabel") as HTMLDivElement | null;

    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let rx = mx,
      ry = my;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot) dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    };
    window.addEventListener("mousemove", onMouseMove);

    let raf = 0;
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring) ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      if (label) label.style.transform = `translate(${rx}px, ${ry + 2}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const els = document.querySelectorAll<HTMLElement>("[data-cursor]");
    const listeners: Array<{ el: HTMLElement; enter: () => void; leave: () => void }> = [];
    els.forEach((el) => {
      const enter = () => {
        ring?.classList.add("hover");
        const mode = el.dataset.cursor || "";
        if (mode === "drag") ring?.classList.add("drag");
        if (label) label.textContent = mode.toUpperCase();
      };
      const leave = () => {
        ring?.classList.remove("hover", "drag");
      };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      listeners.push({ el, enter, leave });
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      listeners.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" id="cursorRing" />
      <div className="cursor-label" id="cursorLabel">VIEW</div>
      <div className="cursor-dot" id="cursorDot" />
    </>
  );
}
