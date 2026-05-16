"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Cassette } from "./cassettes.data";

type Props = {
  cassette: Cassette | null;
  onClose: () => void;
};

export default function CRTPopup({ cassette, onClose }: Props) {
  const ejectRef = useRef<HTMLButtonElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const pausedRef = useRef(false);
  const wheelLockRef = useRef(false);

  const isPdf = !!cassette?.pdf;

  useEffect(() => {
    setIdx(0);
  }, [cassette?.id]);

  useEffect(() => {
    if (cassette) ejectRef.current?.focus();
  }, [cassette]);

  useEffect(() => {
    if (!cassette) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [cassette, onClose]);

  useEffect(() => {
    if (!cassette) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [cassette]);

  useEffect(() => {
    if (!cassette || isPdf) return;
    const shots = cassette.screenshots;
    if (shots.length <= 1) return;
    const interval = setInterval(() => {
      if (pausedRef.current) return;
      setIdx((prev) => (prev + 1) % shots.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [cassette, isPdf]);

  useEffect(() => {
    if (!cassette || isPdf) return;
    const shots = cassette.screenshots;
    if (shots.length <= 1) return;
    const el = shellRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelLockRef.current) return;
      if (Math.abs(e.deltaY) < 4) return;
      wheelLockRef.current = true;
      window.setTimeout(() => { wheelLockRef.current = false; }, 220);
      const dir = e.deltaY > 0 ? 1 : -1;
      setIdx((prev) => (prev + dir + shots.length) % shots.length);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [cassette, isPdf]);

  if (!cassette) return null;
  if (typeof document === "undefined") return null;

  const shots = cassette.screenshots;

  return createPortal(
    <div
      className="crt-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={`${cassette.title} ${isPdf ? "resume" : "screenshots"}`}
    >
      <div
        ref={shellRef}
        className={`crt-shell${isPdf ? " pdf" : ""}`}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div className="crt-bezel">
          <span className="crt-knob crt-knob-1" aria-hidden />
          <span className="crt-knob crt-knob-2" aria-hidden />
          <span className="crt-vent" aria-hidden />
          <div className={`crt-screen${isPdf ? " pdf" : ""}`}>
            {shots.map((src, i) => (
              <img
                key={src}
                src={src}
                className={`crt-img${i === idx ? " active" : ""}`}
                alt=""
              />
            ))}
            <div className="crt-glare" aria-hidden />
            <div className="crt-scanlines" aria-hidden />
            <div className="crt-vignette" aria-hidden />
            <div className="crt-osd">
              <span className="crt-osd-dot" />{" "}
              {isPdf ? "RESUME · 2026" : `CH-${String(idx + 1).padStart(2, "0")}`}
            </div>
            {!isPdf && shots.length > 1 && (
              <div className="crt-pager" aria-hidden>
                {shots.map((_, i) => (
                  <span key={i} className={`crt-pager-dot${i === idx ? " active" : ""}`} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="crt-meta">
          <div className="crt-meta-text">
            <span className="crt-tag">{cassette.tag} — {cassette.year}</span>
            <h2 className="crt-title">{cassette.title}</h2>
            <p className="crt-sub">{cassette.subtitle}</p>
            {cassette.description && <p className="crt-desc">{cassette.description}</p>}
          </div>
          <div className="crt-meta-actions">
            {cassette.download && (
              <a
                className="crt-download"
                href={cassette.download.href}
                download={cassette.download.filename}
              >
                {cassette.download.label}
              </a>
            )}
            <button ref={ejectRef} className="crt-eject" onClick={onClose}>CLOSE SCREEN ✕</button>
          </div>
        </div>
        <button
          type="button"
          className="crt-close"
          onClick={onClose}
          aria-label="Close screen (cassette stays loaded)"
          title="Close screen — cassette stays loaded"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
}
