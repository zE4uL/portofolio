"use client";

import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";
import type { LucideIcon } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────────── */

type IBVariant = "solid" | "outline" | "ghost";

interface IBBase {
  icon: LucideIcon;
  variant?: IBVariant;
  /** Diameter in px. Default 40. */
  size?: number;
  /** aria-label is required — this is an icon-only button. */
  "aria-label": string;
  className?: string;
}

type IBAsButton = IBBase &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };

type IBAsAnchor = IBBase &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

export type IconButtonProps = IBAsButton | IBAsAnchor;

/* ─── Style maps ─────────────────────────────────────────────────────────── */

const VARIANT_STYLES: Record<IBVariant, React.CSSProperties> = {
  solid: {
    background: "var(--accent-primary)",
    color: "#ffffff",
    border: "1px solid transparent",
  },
  outline: {
    background: "transparent",
    color: "var(--text-primary)",
    border: "1px solid var(--border)",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid transparent",
  },
};

const VARIANT_HOVER_CLASS: Record<IBVariant, string> = {
  solid: "ib-solid",
  outline: "ib-outline",
  ghost: "ib-ghost",
};

/* ─── Component ─────────────────────────────────────────────────────────── */

export function IconButton(props: IconButtonProps) {
  const {
    icon: Icon,
    variant = "outline",
    size = 40,
    className = "",
    as,
    ...rest
  } = props;

  // icon size is roughly 40% of button diameter, clamped 14–24
  const iconSize = Math.min(24, Math.max(14, Math.round(size * 0.4)));

  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: size,
    height: size,
    borderRadius: "50%",
    flexShrink: 0,
    transition: `
      background var(--dur-hover, 180ms) var(--ease-out, cubic-bezier(0.22,1,0.36,1)),
      color var(--dur-hover, 180ms) var(--ease-out, cubic-bezier(0.22,1,0.36,1)),
      border-color var(--dur-hover, 180ms) var(--ease-out, cubic-bezier(0.22,1,0.36,1)),
      box-shadow var(--dur-hover, 180ms) var(--ease-out, cubic-bezier(0.22,1,0.36,1))
    `,
    ...VARIANT_STYLES[variant],
  };

  const combinedClass = ["ib-base", VARIANT_HOVER_CLASS[variant], className]
    .filter(Boolean)
    .join(" ");

  if (as === "a") {
    const {
      href,
      target,
      rel,
      "aria-label": ariaLabel,
      ...anchorRest
    } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      "aria-label": string;
    };
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        data-cursor="link"
        className={combinedClass}
        style={style}
        {...(anchorRest as object)}
      >
        <Icon size={iconSize} strokeWidth={1.75} aria-hidden="true" />
      </a>
    );
  }

  const {
    onClick,
    type,
    disabled,
    "aria-label": ariaLabel,
    ...buttonRest
  } = rest as ButtonHTMLAttributes<HTMLButtonElement> & {
    "aria-label": string;
  };

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      data-cursor="link"
      className={combinedClass}
      style={style}
      {...(buttonRest as object)}
    >
      <Icon size={iconSize} strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
