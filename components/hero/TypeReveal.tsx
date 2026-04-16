"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { useInView, useReducedMotion } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TagName = "span" | "div" | "h1" | "h2" | "h3";

export type TypeRevealProps = {
  /** The string to reveal character-by-character. */
  text: string;
  /** Seconds to wait before the animation starts (default 0). */
  delay?: number;
  /** Milliseconds between each character (default 28). */
  stagger?: number;
  /** Additional Tailwind / CSS classes for font, size, colour, etc. */
  className?: string;
  /** Semantic element to render (default "span"). */
  as?: TagName;
  /**
   * When `startOnView` is true, controls whether the animation fires only the
   * first time the element enters the viewport (default true).
   */
  once?: boolean;
  /**
   * If true, the reveal waits until the element enters the viewport.
   * If false (default), reveals immediately on mount.
   */
  startOnView?: boolean;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * TypeReveal
 *
 * Splits `text` into per-character spans with split-type and animates each
 * character from opacity:0 / translateY(0.4em) to its natural position using
 * the Web Animations API.
 *
 * Accessibility:
 *   - `aria-label={text}` on the container → screen reader reads the full string.
 *   - `aria-hidden="true"` on every split char span → chars are invisible to AT.
 *
 * Reduced-motion:
 *   - When `prefers-reduced-motion` is set, SplitType is never called; the text
 *     renders as plain text with `aria-label` still applied.
 *
 * Cleanup:
 *   - `split.revert()` is called on unmount so stray spans don't persist on
 *     remount cycles.
 */
export function TypeReveal({
  text,
  delay = 0,
  stagger = 28,
  className,
  as: Tag = "span",
  once = true,
  startOnView = false,
}: TypeRevealProps) {
  // ------------------------------------------------------------------
  // Refs & hooks
  // ------------------------------------------------------------------

  // `ref` is typed as the most permissive common ancestor so it works for
  // every allowed Tag. We cast at the JSX spread site.
  const ref = useRef<HTMLElement>(null);

  // useInView from Framer Motion — tracks viewport entry.
  const inView = useInView(ref, { once });

  // useReducedMotion from Framer Motion — respects OS / browser preference.
  const reduce = useReducedMotion();

  // The animation should start when:
  //   - startOnView is false → always (mount-driven)
  //   - startOnView is true  → only after the element enters the viewport
  const shouldReveal = startOnView ? inView : true;

  // ------------------------------------------------------------------
  // Animation effect
  // ------------------------------------------------------------------

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honour prefers-reduced-motion: leave the DOM untouched.
    if (reduce) return;

    // When startOnView is true, wait for the element to enter the viewport.
    if (startOnView && !shouldReveal) return;

    // Split the text into individual character spans.
    const split = new SplitType(el, { types: "chars" });
    const chars = split.chars ?? [];

    chars.forEach((char, i) => {
      const c = char as HTMLElement;

      // Accessibility: hide individual chars from assistive technology.
      c.setAttribute("aria-hidden", "true");

      // Required for translateY to work on inline elements.
      c.style.display = "inline-block";

      // Set initial state so the character is invisible before the animation
      // fills in (prevents a brief flash on slower devices).
      c.style.opacity = "0";
      c.style.transform = "translateY(0.4em)";

      // Web Animations API — matches the `--ease-out` design token.
      c.animate(
        [
          { opacity: 0, transform: "translateY(0.4em)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 700,
          delay: delay * 1000 + i * stagger,
          fill: "forwards",
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        }
      );
    });

    // Cleanup: revert SplitType's DOM mutations when the component unmounts
    // or when any dependency changes, preventing stray spans on remount.
    return () => {
      try {
        split.revert();
      } catch {
        /* noop — split may already be GC'd */
      }
    };
  }, [text, delay, stagger, shouldReveal, reduce, startOnView]);

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------

  // Polymorphic element.
  // `ref` is cast to `never` to satisfy the union of possible element refs
  // without reaching for `any`. TypeScript accepts this because the actual
  // runtime ref object is always the correct shape.
  return (
    <Tag
      ref={ref as never}
      className={className}
      aria-label={text}
    >
      {text}
    </Tag>
  );
}
