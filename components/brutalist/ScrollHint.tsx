"use client";

/**
 * ScrollHint — mouse-shape scroll affordance for screens where the next
 * section sits below the fold and the page doesn't otherwise telegraph that
 * there's more. Hides itself once the page has been scrolled past the hint's
 * own position, so it never lingers after the user has already moved on.
 */
import { useEffect, useRef, useState } from "react";

export default function ScrollHint({
  label = "Scroll",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const en = entries[0];
        // Hint is meaningful only while its anchor is visible. Once it leaves
        // viewport (user scrolled past), dismiss permanently — re-showing it
        // when they scroll back up would be noise.
        if (!en.isIntersecting && en.boundingClientRect.top < 0) {
          setDismissed(true);
        }
      },
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-hint${dismissed ? " scroll-hint--gone" : ""} ${className}`.trim()}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2.5" y="2.5" width="19" height="35" rx="9.5" />
        <circle
          cx="12"
          cy="13"
          r="1.6"
          fill="currentColor"
          stroke="none"
          className="scroll-hint-dot"
        />
      </svg>
      <span className="scroll-hint-label">{label}</span>
    </div>
  );
}
