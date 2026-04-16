import type { LucideIcon } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────────── */

type ChipVariant = "filled" | "outline" | "warm";
type ChipSize = "sm" | "md";

export interface ChipProps {
  variant?: ChipVariant;
  size?: ChipSize;
  icon?: LucideIcon;
  className?: string;
  children: React.ReactNode;
}

/* ─── Style maps ─────────────────────────────────────────────────────────── */

const VARIANT_STYLES: Record<ChipVariant, React.CSSProperties> = {
  filled: {
    background: "var(--surface-raised)",
    color: "var(--text-primary)",
    border: "1px solid transparent",
  },
  outline: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid var(--border)",
  },
  warm: {
    background: "color-mix(in srgb, var(--accent-warm) 15%, transparent)",
    color: "var(--accent-warm)",
    border: "1px solid transparent",
  },
};

const SIZE_STYLES: Record<
  ChipSize,
  { height: number; px: number; fontSize: string; iconSize: number }
> = {
  sm: { height: 20, px: 8, fontSize: "10px", iconSize: 10 },
  md: { height: 24, px: 10, fontSize: "0.75rem", iconSize: 11 },
};

/* ─── Component ─────────────────────────────────────────────────────────── */

export function Chip({
  variant = "outline",
  size = "sm",
  icon: Icon,
  className = "",
  children,
}: ChipProps) {
  const sz = SIZE_STYLES[size];

  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: sz.iconSize - 2,
    height: sz.height,
    paddingLeft: sz.px,
    paddingRight: sz.px,
    borderRadius: 9999,
    fontFamily: "var(--font-mono, monospace)",
    fontSize: sz.fontSize,
    fontWeight: 500,
    letterSpacing: "0.01em",
    lineHeight: 1,
    whiteSpace: "nowrap",
    userSelect: "none",
    ...VARIANT_STYLES[variant],
  };

  return (
    <span className={className} style={style}>
      {Icon && (
        <Icon
          size={sz.iconSize}
          strokeWidth={2}
          aria-hidden="true"
          style={{ flexShrink: 0 }}
        />
      )}
      {children}
    </span>
  );
}
