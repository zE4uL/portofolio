"use client";

import {
  useRef,
  useCallback,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/* ─── Types ─────────────────────────────────────────────────────────────── */

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/* ─── Style maps ─────────────────────────────────────────────────────────── */

const VARIANT_STYLES: Record<Variant, React.CSSProperties> = {
  primary: {
    background: "var(--accent-primary)",
    color: "#ffffff",
    border: "1px solid transparent",
  },
  secondary: {
    background: "var(--surface-raised)",
    color: "var(--text-primary)",
    border: "1px solid var(--border)",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid transparent",
  },
};

const SIZE_STYLES: Record<Size, React.CSSProperties> = {
  sm: { height: 32, paddingLeft: 12, paddingRight: 12, fontSize: "0.75rem" },
  md: { height: 40, paddingLeft: 16, paddingRight: 16, fontSize: "0.875rem" },
  lg: { height: 48, paddingLeft: 20, paddingRight: 20, fontSize: "1rem" },
};

/* ─── Component ─────────────────────────────────────────────────────────── */

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    magnetic = false,
    className = "",
    children,
    as,
    ...rest
  } = props;

  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  /* Magnetic motion values — spring-smoothed */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 300, damping: 28, mass: 0.4 });
  const springY = useSpring(my, { stiffness: 300, damping: 28, mass: 0.4 });

  const isMagnetic = magnetic && variant === "primary" && !reduce;

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (!isMagnetic || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      // Pull toward cursor — max 3px
      const max = 3;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const factor = Math.min(max / dist, 1);
      mx.set(dx * factor * 0.08);
      my.set(dy * factor * 0.08);
    },
    [isMagnetic, mx, my]
  );

  const onMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.375rem",
    borderRadius: 9999,
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: `
      background var(--dur-hover, 180ms) var(--ease-out, cubic-bezier(0.22,1,0.36,1)),
      color var(--dur-hover, 180ms) var(--ease-out, cubic-bezier(0.22,1,0.36,1)),
      border-color var(--dur-hover, 180ms) var(--ease-out, cubic-bezier(0.22,1,0.36,1)),
      box-shadow var(--dur-hover, 180ms) var(--ease-out, cubic-bezier(0.22,1,0.36,1))
    `,
    ...VARIANT_STYLES[variant],
    ...SIZE_STYLES[size],
  };

  /* Hover glow for primary — done via CSS class injected here */
  const variantClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "secondary"
      ? "btn-secondary"
      : "btn-ghost";

  const combinedClass = ["btn-base", variantClass, className]
    .filter(Boolean)
    .join(" ");

  if (as === "a") {
    const { href, target, rel, ...anchorRest } =
      rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        data-cursor="link"
        className={combinedClass}
        style={isMagnetic ? { ...baseStyle, x: springX, y: springY } : baseStyle}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        {...(anchorRest as object)}
      >
        {children}
      </motion.a>
    );
  }

  const {
    onClick,
    type,
    disabled,
    ...buttonRest
  } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      data-cursor="link"
      className={combinedClass}
      style={isMagnetic ? { ...baseStyle, x: springX, y: springY } : baseStyle}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...(buttonRest as object)}
    >
      {children}
    </motion.button>
  );
}
