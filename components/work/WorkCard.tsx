"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ALL_CASES } from "@/lib/work";
import type { CaseStudyMeta } from "@/lib/work";

export type WorkCardProps = {
  meta: CaseStudyMeta;
  variant?: "carousel" | "grid"; // default "grid"
  priority?: boolean; // pass to next/image for above-fold cards
  className?: string;
};

export function WorkCard({
  meta,
  variant = "grid",
  priority,
  className,
}: WorkCardProps) {
  const reduce = useReducedMotion();

  // Raw cursor position (-0.5 → 0.5 normalised to card dimensions)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Spring-smoothed values
  const smx = useSpring(mx, { stiffness: 200, damping: 28 });
  const smy = useSpring(my, { stiffness: 200, damping: 28 });

  // Layer 2 — hero screenshot: slight drift (multiplier 0.02 → px range ±20)
  const heroX = useTransform(smx, (v) => v * 20);
  const heroY = useTransform(smy, (v) => v * 20);

  // Layer 3 — accent decoration: medium drift (multiplier 0.06 → px range ±60)
  const accentX = useTransform(smx, (v) => v * 60);
  const accentY = useTransform(smy, (v) => v * 60);

  // Secondary accent ring — slightly different depth from primary blob
  const accentRingX = useTransform(smx, (v) => v * 45);
  const accentRingY = useTransform(smy, (v) => v * 45);

  // Layer 4 — title block: almost still (multiplier 0.01 → px range ±10)
  const titleX = useTransform(smx, (v) => v * 10);
  const titleY = useTransform(smy, (v) => v * 10);

  // 3D tilt (±4°)
  const rotY = useTransform(smx, (v) => v * 4);
  const rotX = useTransform(smy, (v) => -v * 4);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Derive tier label from position in ALL_CASES
  const idx = ALL_CASES.findIndex((c) => c.slug === meta.slug);
  const tierLabel = String(idx + 1).padStart(2, "0");

  const aspectClass = variant === "carousel" ? "aspect-[3/4]" : "aspect-[4/3]";
  const widthClass =
    variant === "carousel"
      ? "w-[70vw] md:w-[55vw] lg:w-[44vw] max-w-[720px]"
      : "w-full";

  return (
    <Link
      href={`/work/${meta.slug}`}
      data-cursor="card"
      data-cursor-label="view case"
      className={[
        "group block relative cursor-pointer",
        widthClass,
        aspectClass,
        "rounded-[var(--radius-lg,16px)] overflow-hidden",
        "select-none",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1000 }}
    >
      {/* 3D tilt + hover-scale wrapper — all layers live inside */}
      <motion.div
        className="absolute inset-0"
        style={
          reduce
            ? {}
            : {
                rotateX: rotX,
                rotateY: rotY,
                transformStyle: "preserve-3d",
              }
        }
        whileHover={reduce ? {} : { scale: 1.02 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* ── Layer 1: Background gradient (anchor — no translation) ── */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${meta.accent}20 0%, var(--surface-raised, #1A1B21) 100%)`,
          }}
          aria-hidden="true"
        />

        {/* ── Layer 2: Hero screenshot (slight drift 0.02×) ── */}
        <motion.div
          className="absolute inset-0"
          style={reduce ? {} : { x: heroX, y: heroY }}
        >
          {meta.hero ? (
            <Image
              src={meta.hero}
              alt="" // decorative — title is the accessible label
              fill
              priority={priority}
              placeholder="empty"
              className="object-cover opacity-75 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-opacity duration-500"
              sizes={
                variant === "carousel"
                  ? "(max-width: 768px) 90vw, (max-width: 1024px) 70vw, (max-width: 1200px) 55vw, 44vw"
                  : "(max-width: 768px) 90vw, 50vw"
              }
            />
          ) : (
            // Fallback when no hero image path — coloured plane
            <div
              className="absolute inset-0"
              style={{ backgroundColor: `${meta.accent}40` }}
              aria-hidden="true"
            />
          )}
        </motion.div>

        {/* ── Layer 3: Accent decoration blob (medium drift 0.06×) ── */}
        <motion.div
          aria-hidden="true"
          className="absolute w-16 h-16 rounded-full"
          style={
            reduce
              ? {
                  top: "18%",
                  right: "14%",
                  background: meta.accent,
                  opacity: 0.45,
                  filter: "blur(24px)",
                }
              : {
                  x: accentX,
                  y: accentY,
                  top: "18%",
                  right: "14%",
                  background: meta.accent,
                  opacity: 0.45,
                  filter: "blur(24px)",
                }
          }
        />

        {/* Secondary accent ring — adds depth */}
        <motion.div
          aria-hidden="true"
          className="absolute w-10 h-10 rounded-full border-2"
          style={
            reduce
              ? {
                  bottom: "28%",
                  left: "12%",
                  borderColor: `${meta.accent}80`,
                  opacity: 0.5,
                }
              : {
                  x: accentRingX,
                  y: accentRingY,
                  bottom: "28%",
                  left: "12%",
                  borderColor: `${meta.accent}80`,
                  opacity: 0.5,
                }
          }
        />

        {/* ── Layer 4: Title block (almost-still 0.01×) ── */}
        <motion.div
          className="absolute bottom-0 inset-x-0 p-6 md:p-8"
          style={
            reduce
              ? {}
              : {
                  x: titleX,
                  y: titleY,
                }
          }
        >
          {/* Gradient scrim for legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 55%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Text content — above scrim */}
          <div className="relative z-10">
            <div className="font-mono text-xs tracking-widest text-white/50 mb-2">
              {tierLabel}
            </div>
            <h3 className="font-serif italic text-3xl md:text-5xl leading-none mb-2 text-white">
              {meta.title}
            </h3>
            <p className="text-sm md:text-base text-white/80 max-w-sm leading-snug">
              {meta.tagline}
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs font-mono text-white/50">
              <span>{meta.year}</span>
              <span aria-hidden>·</span>
              <span>{meta.company}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Hover lift shadow overlay ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        initial={false}
        animate={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
        whileHover={
          reduce
            ? {}
            : {
                boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${meta.accent}30`,
              }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

    </Link>
  );
}
