"use client";

import { useEffect, useRef, useState } from "react";

type Line =
  | { kind: "prompt"; text: string }
  | { kind: "out"; text: string; tone?: "ink" | "accent" | "dim" }
  | { kind: "blank" };

const SCRIPT: Line[] = [
  { kind: "prompt", text: "whoami --currently" },
  { kind: "out", text: "Lead designer · 6labs.ai (AI gameplay analytics)", tone: "ink" },
  { kind: "out", text: "Vibe-coding Figma plugins & custom agents", tone: "ink" },
  { kind: "out", text: "Scaling DS across BlueStacks & now.gg", tone: "ink" },
  { kind: "out", text: "Destroying lobbies in Battlefield 6", tone: "dim" },
  { kind: "blank" },
  { kind: "prompt", text: "open-to roles" },
  { kind: "out", text: "Senior / Lead Product Design", tone: "accent" },
  { kind: "out", text: "Remote · Hybrid · Delhi NCR", tone: "ink" },
  { kind: "blank" },
  { kind: "prompt", text: "_" },
];

const CHAR_DELAY = 18;
const LINE_PAUSE = 220;
const LOOP_PAUSE = 12000;

export default function HeroCRT() {
  const [rendered, setRendered] = useState<Array<{ line: Line; chars: number; done: boolean }>>([]);
  const [cycle, setCycle] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const out: Array<{ line: Line; chars: number; done: boolean }> = [];
    setRendered([]);

    const typeLine = (line: Line, idx: number): Promise<void> =>
      new Promise((resolve) => {
        if (line.kind === "blank") {
          out.push({ line, chars: 0, done: true });
          setRendered([...out]);
          setTimeout(resolve, LINE_PAUSE / 2);
          return;
        }
        const full = line.text;
        out.push({ line, chars: 0, done: false });
        setRendered([...out]);
        let i = 0;
        const tick = () => {
          if (cancelled) return resolve();
          i += 1;
          out[idx] = { line, chars: i, done: i >= full.length };
          setRendered([...out]);
          if (i >= full.length) {
            setTimeout(resolve, LINE_PAUSE);
          } else {
            setTimeout(tick, CHAR_DELAY);
          }
        };
        setTimeout(tick, CHAR_DELAY);
      });

    (async () => {
      for (let i = 0; i < SCRIPT.length; i++) {
        if (cancelled) return;
        await typeLine(SCRIPT[i], i);
      }
      if (cancelled) return;
      setTimeout(() => !cancelled && setCycle((c) => c + 1), LOOP_PAUSE);
    })();

    return () => {
      cancelled = true;
    };
  }, [cycle]);

  useEffect(() => {
    const el = contentRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [rendered]);

  return (
    <div className="crt-mon" aria-hidden="true">
      <div className="crt-bezel">
        <div className="crt-screen">
          <div className="crt-glow" />
          <div className="crt-scanlines" />
          <div className="crt-vignette" />

          <div className="crt-titlebar">
            <span className="crt-dot dot-r" />
            <span className="crt-dot dot-y" />
            <span className="crt-dot dot-g" />
            <span className="crt-title">ziaul@portfolio — zsh</span>
          </div>

          <div className="crt-content" ref={contentRef}>
            {rendered.map((item, i) => {
              const { line, chars, done } = item;
              if (line.kind === "blank") return <div key={i} className="crt-line crt-blank">&nbsp;</div>;
              const visible = line.text.slice(0, chars);
              const isTyping = !done && i === rendered.length - 1;
              if (line.kind === "prompt") {
                return (
                  <div key={i} className="crt-line crt-prompt-line">
                    <span className="crt-sigil">$</span>
                    <span className="crt-cmd">{visible}</span>
                    {isTyping && <span className="crt-caret" />}
                  </div>
                );
              }
              return (
                <div key={i} className={`crt-line crt-out crt-tone-${line.tone ?? "ink"}`}>
                  <span className="crt-arrow">→</span>
                  <span className="crt-text">{visible}</span>
                  {isTyping && <span className="crt-caret" />}
                </div>
              );
            })}
          </div>
        </div>
        <span className="crt-knob crt-knob-1" aria-hidden="true" />
        <span className="crt-knob crt-knob-2" aria-hidden="true" />
        <span className="crt-vent" aria-hidden="true" />
        <div className="crt-base">
          <div className="crt-stand" />
          <div className="crt-foot" />
        </div>
      </div>
      <div className="crt-shadow" />
    </div>
  );
}
