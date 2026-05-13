"use client";

import { useRef, useState, type RefObject } from "react";
import type { Cassette } from "./cassettes.data";

type Props = {
  cassette: Cassette;
  rot?: number;
  slotRef: RefObject<HTMLDivElement | null>;
  onInserted: (id: string) => void;
  returning?: boolean;
};

export default function CassetteCard({ cassette, rot = 0, slotRef, onInserted, returning = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const startPointerRef = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [inserting, setInserting] = useState(false);

  const insertIntoSlot = () => {
    if (!ref.current || !slotRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const slot = slotRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const slotCx = slot.left + slot.width / 2;
    const slotTopY = slot.top + 18;
    const dx = slotCx - cx;
    const dy = slotTopY - cy;
    ref.current.style.setProperty("--ix", `${pos.x + dx}px`);
    ref.current.style.setProperty("--iy", `${pos.y + dy}px`);
    setInserting(true);
    window.setTimeout(() => onInserted(cassette.id), 540);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!ref.current || inserting) return;
    setDragging(true);
    startPointerRef.current = { x: e.clientX, y: e.clientY };
    ref.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setPos({
      x: e.clientX - startPointerRef.current.x,
      y: e.clientY - startPointerRef.current.y,
    });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!ref.current) return;
    setDragging(false);
    try { ref.current.releasePointerCapture(e.pointerId); } catch {}
    const dx = e.clientX - startPointerRef.current.x;
    const dy = e.clientY - startPointerRef.current.y;
    const moved = Math.hypot(dx, dy) > 6;
    const slot = slotRef.current?.getBoundingClientRect();
    const overSlot =
      !!slot &&
      e.clientX >= slot.left && e.clientX <= slot.right &&
      e.clientY >= slot.top && e.clientY <= slot.bottom;
    if (!moved || overSlot) {
      insertIntoSlot();
    } else {
      setPos({ x: 0, y: 0 });
    }
  };

  const baseTransform = `translate(${pos.x}px, ${pos.y}px) rotate(${rot}deg)`;

  const style: React.CSSProperties = inserting
    ? { ["--rot" as string]: `${rot}deg` }
    : {
        ["--rot" as string]: `${rot}deg`,
        transform: baseTransform,
        transition: dragging ? "none" : "transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .25s ease",
      };

  return (
    <div
      ref={ref}
      className={`cassette${cassette.featured ? " featured" : ""}${dragging ? " dragging" : ""}${inserting ? " inserting" : ""}${returning ? " returning" : ""}`}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className="cassette-rib" aria-hidden>
        <i /><i /><i /><i /><i /><i /><i />
      </div>
      <div className="cassette-label">
        <div className="cassette-label-head">
          <span className="cassette-tag">{cassette.tag}</span>
          <span className="cassette-num">№{cassette.year.slice(-2)}</span>
        </div>
        <span className="cassette-title">{cassette.title}</span>
        <span className="cassette-sub">{cassette.subtitle}</span>
        <span className="cassette-bar" aria-hidden />
      </div>
      <div className="cassette-notch-l" />
      <div className="cassette-notch-r" />
      <div className="cassette-pins" />
      {cassette.featured && <span className="cassette-sticker" aria-hidden>START HERE</span>}
    </div>
  );
}
