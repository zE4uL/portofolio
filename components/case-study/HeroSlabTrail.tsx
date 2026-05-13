"use client";

import { useEffect, useRef } from "react";

type Props = {
  images: string[];
  /** Min cursor-travel (px) between spawned thumbnails. Default 130. */
  minDistance?: number;
  /** Lifespan of each thumbnail (ms). Default 1100. Must match CSS animation duration. */
  life?: number;
  /** Max thumbnails alive at once. Default 10. */
  maxAlive?: number;
};

export function HeroSlabTrail({
  images,
  minDistance = 130,
  life = 1100,
  maxAlive = 10,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const parent = root.parentElement;
    if (!parent || images.length === 0) return;

    let lastX = -9999;
    let lastY = -9999;
    let cursor = 0;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      if (Math.hypot(x - lastX, y - lastY) < minDistance) return;
      lastX = x;
      lastY = y;

      const img = document.createElement("img");
      img.src = images[cursor % images.length];
      img.alt = "";
      img.draggable = false;
      img.className = "slab-trail-img";
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      const rot = (Math.random() - 0.5) * 6;
      img.style.setProperty("--trail-rot", `${rot}deg`);
      img.style.animationDuration = `${life}ms`;
      root.appendChild(img);
      cursor++;

      // Cap concurrency
      while (root.children.length > maxAlive) {
        root.firstElementChild?.remove();
      }

      window.setTimeout(() => img.remove(), life);
    };

    const onLeave = () => {
      lastX = -9999;
      lastY = -9999;
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      while (root.firstChild) root.removeChild(root.firstChild);
    };
  }, [images, minDistance, life, maxAlive]);

  return <div ref={ref} className="slab-trail" aria-hidden="true" />;
}

/** Pull the filled image srcs out of an asset manifest, in declaration order. */
export function trailFromAssets<T extends string>(
  assets: Record<T, { kind: string; src: string } | null>
): string[] {
  return Object.values(assets)
    .filter(
      (a): a is { kind: string; src: string } =>
        a !== null && typeof a === "object" && (a as { kind: string }).kind === "image"
    )
    .map((a) => a.src);
}
