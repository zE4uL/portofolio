"use client";

import { useRef, useState } from "react";
import { cassettes } from "./cassettes.data";
import CassetteCard from "./Cassette";
import Console from "./Console";
import Controller from "./Controller";
import CRTPopup from "./CRTPopup";

const ROTS = [-5, 3, -2, 4, -3, 2, -4];

export default function PlaygroundStage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [insertedId, setInsertedId] = useState<string | null>(null);
  const [ejectingId, setEjectingId] = useState<string | null>(null);
  const [returningId, setReturningId] = useState<string | null>(null);
  const [reading, setReading] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);

  const handleInserted = (id: string) => {
    setInsertedId(id);
    setReading(true);
    window.setTimeout(() => {
      setReading(false);
      setOpenId(id);
    }, 1700);
  };

  const handleCloseScreen = () => {
    setOpenId(null);
  };

  const handleEject = () => {
    if (!insertedId) return;
    const id = insertedId;
    setOpenId(null);
    setEjectingId(id);
    window.setTimeout(() => {
      setInsertedId(null);
      setEjectingId(null);
      setReturningId(id);
      window.setTimeout(() => setReturningId((prev) => (prev === id ? null : prev)), 620);
    }, 640);
  };

  const handleReopen = () => {
    if (insertedId) setOpenId(insertedId);
  };

  const insertedCassette = insertedId ? cassettes.find((c) => c.id === insertedId) ?? null : null;
  const rackCassettes = cassettes.filter((c) => c.id !== insertedId);

  return (
    <section className="playground-stage" id="playground">
      <p className="playground-intro">
        Pick a cassette. <span>Tap to load</span> or <span>drag it into the slot</span> — the screen reveals what&apos;s inside.
      </p>
      <div className="stage-grid">
        <div className="cassette-rack">
          <div className="rack-shelf" aria-hidden />
          {rackCassettes.map((c, i) => (
            <CassetteCard
              key={c.id}
              cassette={c}
              rot={ROTS[i % ROTS.length]}
              slotRef={slotRef}
              onInserted={handleInserted}
              returning={returningId === c.id}
            />
          ))}
          {rackCassettes.length === 0 && (
            <div className="rack-empty">⏏ EJECT TO RELOAD THE RACK</div>
          )}
        </div>
        <div className="console-stack">
          <div className={`playground-hint${insertedCassette ? " is-loaded" : ""}`} aria-hidden>
            <span className="playground-hint-label">Drop a cassette here</span>
            <span className="playground-hint-ghost">
              <i /><i /><i />
            </span>
            <span className="playground-hint-arrow">↓</span>
          </div>
          <Console
            powered={!!insertedCassette}
            screenOn={!!openId}
            ejecting={!!ejectingId}
            reading={reading}
            slotRef={slotRef}
            loaded={insertedCassette}
            onEject={handleEject}
            onReopen={handleReopen}
          />
          <Controller />
        </div>
      </div>
      <CRTPopup cassette={openId ? insertedCassette : null} onClose={handleCloseScreen} />
    </section>
  );
}
