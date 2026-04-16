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
 *   - A visually-hidden `<span className="sr-only">` holds the full text for
 *     screen readers.
 *   - The visible animated span carries `aria-hidden="true"` so AT don't
 *     double-read the split chars.
 *   - `aria-label` on span/div is unreliable across AT and has been removed.
 *
 * Reduced-motion:
 *   - When `prefers-reduced-motion` is set, SplitType is never called on the
 *     visual span; it renders as plain unsplit text.
 *
 * Cleanup:
 *   - Every `Animation` returned by `el.animate(...)` is collected and
 *     cancelled before `split.revert()` runs, preventing orphaned running
 *     animations on unmount or dependency change.
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

  // outerRef tracks the Tag element (layout container only).
  const outerRef = useRef<HTMLElement>(null);

  // visualRef targets the inner visible span that SplitType splits.
  const visualRef = useRef<HTMLSpanElement>(null);

  // useInView from Framer Motion — tracks viewport entry via outerRef.
  const inView = useInView(outerRef, { once });

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
    if (!visualRef.current) return;

    // Honour prefers-reduced-motion: leave the DOM untouched.
    if (reduce) return;

    // When startOnView is true, wait for the element to enter the viewport.
    if (startOnView && !shouldReveal) return;

    // Split the text into individual character spans.
    const split = new SplitType(visualRef.current, { types: "chars" });
    const chars = split.chars ?? [];

    // Collect every Animation handle so we can cancel them on cleanup.
    const animations: Animation[] = [];

    chars.forEach((char, i) => {
      const el = char as HTMLElement;

      // Accessibility: hide individual chars from assistive technology.
      // The sr-only sibling span covers the full text for screen readers.
      el.setAttribute("aria-hidden", "true");

      // Required for translateY to work on inline elements.
      el.style.display = "inline-block";

      // Set initial state so the character is invisible before the animation
      // fills in (prevents a brief flash on slower devices).
      el.style.opacity = "0";
      el.style.transform = "translateY(0.4em)";

      // Web Animations API — matches the `--ease-out` design token.
      const anim = el.animate(
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
      animations.push(anim);
    });

    // Cleanup: cancel all running animations FIRST, then revert SplitType's
    // DOM mutations. This prevents orphaned animations when the component
    // unmounts mid-animation, when `text` changes, or on reduced-motion toggle.
    return () => {
      animations.forEach((a) => {
        try {
          a.cancel();
        } catch {
          /* noop */
        }
      });
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

  // The outer Tag is a pure layout container — no aria-label (unreliable on
  // span/div elements across AT). Screen readers get the full text from the
  // sr-only sibling; AT is kept away from the split chars via aria-hidden.
  return (
    <Tag ref={outerRef as never} className={className}>
      {/* Visually hidden — read by screen readers */}
      <span className="sr-only">{text}</span>
      {/* Visible animated copy — hidden from AT */}
      <span ref={visualRef} aria-hidden="true">
        {text}
      </span>
    </Tag>
  );
}
