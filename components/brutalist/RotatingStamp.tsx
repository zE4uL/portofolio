"use client";

import { useId } from "react";

type Variant = "ink" | "cream" | "accent";

type Props = {
  text: string;
  innerGlyph?: string;
  size?: number;
  spinDuration?: number;
  variant?: Variant;
  className?: string;
};

export default function RotatingStamp({
  text,
  innerGlyph = "✦",
  size = 140,
  spinDuration = 14,
  variant = "ink",
  className = "",
}: Props) {
  const rid = useId().replace(/:/g, "");
  const pathId = `rs-${rid}`;
  const r = size / 2 - 12;
  const cx = size / 2;
  return (
    <div
      className={`rotating-stamp rs-${variant} ${className}`}
      style={{
        width: size,
        height: size,
        ["--spin-dur" as string]: `${spinDuration}s`,
      }}
      aria-hidden="true"
    >
      <svg className="rs-svg" viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <path
            id={pathId}
            fill="none"
            d={`M ${cx}, ${cx} m -${r}, 0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        <text className="rs-text">
          <textPath href={`#${pathId}`} startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="rs-glyph">{innerGlyph}</span>
    </div>
  );
}
