"use client";

import { ReactNode } from "react";

type Status = "active" | "idle" | "locked";

type HUDFrameProps = {
  label?: string;
  code?: string;
  status?: Status;
  className?: string;
  children?: ReactNode;
};

const STATUS_COLOR: Record<Status, string> = {
  active: "bg-emerald-400",
  idle: "bg-amber-400",
  locked: "bg-rose-500",
};

export default function HUDFrame({
  label,
  code,
  status = "active",
  className = "",
  children,
}: HUDFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Corner brackets */}
      <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-white/60" />
      <span aria-hidden className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-white/60" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/60" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/60" />

      {/* Top-left label */}
      {label && (
        <span
          className="pointer-events-none absolute left-4 top-2 font-mono uppercase tracking-[0.18em] text-white/70"
          style={{ fontSize: "var(--text-label)" }}
        >
          {label}
        </span>
      )}

      {/* Top-right code */}
      {code && (
        <span
          className="pointer-events-none absolute right-4 top-2 font-mono uppercase tracking-[0.18em] text-white/70"
          style={{ fontSize: "var(--text-label)" }}
        >
          {code}
        </span>
      )}

      {/* Bottom-right status dot */}
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-3 right-4 h-2 w-2 rounded-full ${STATUS_COLOR[status]} animate-pulse`}
      />

      {children}
    </div>
  );
}
