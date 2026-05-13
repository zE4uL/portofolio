"use client";

import { type RefObject } from "react";
import type { Cassette } from "./cassettes.data";

type Props = {
  powered: boolean;
  screenOn: boolean;
  ejecting: boolean;
  reading: boolean;
  slotRef: RefObject<HTMLDivElement | null>;
  loaded: Cassette | null;
  onEject: () => void;
  onReopen: () => void;
};

export default function Console({ powered, screenOn, ejecting, reading, slotRef, loaded, onEject, onReopen }: Props) {
  return (
    <div className={`console${powered ? " powered" : ""}${screenOn ? " on-air" : ""}${reading ? " reading" : ""}`}>
      <div className="console-brand-strip">
        <span className="console-brand">{reading ? "READING…" : "GAME STATION 01"}</span>
        <span className={`console-led${powered ? " on" : ""}${reading ? " reading" : ""}`} />
      </div>

      <div className="console-slot-zone">
        <div className="console-slot" ref={slotRef}>
          <span className="console-slot-fin" aria-hidden />
          {loaded ? (
            <button
              type="button"
              className={`loaded-cassette${ejecting ? " ejecting" : ""}`}
              onClick={onReopen}
              aria-label={`Open ${loaded.title} screen`}
              title="Open screen"
              disabled={ejecting}
            >
              <div className="loaded-cassette-rib" aria-hidden>
                <i /><i /><i /><i /><i /><i />
              </div>
              <div className="loaded-cassette-label">
                <span className="loaded-cassette-tag">{loaded.tag}</span>
                <span className="loaded-cassette-title">{loaded.title}</span>
              </div>
            </button>
          ) : (
            <span className="console-slot-label">INSERT CASSETTE ▼</span>
          )}
        </div>
      </div>

      <div className="console-controls">
        <button type="button" className="console-btn power" disabled>POWER</button>
        <button
          type="button"
          className="console-btn eject"
          onClick={onEject}
          disabled={!loaded}
        >
          {loaded ? "▲ EJECT CASSETTE" : "EJECT"}
        </button>
        <button type="button" className="console-btn reset" disabled>RESET</button>
      </div>

      <div className="console-ports">
        <div className="console-port"><span>P1</span></div>
        <div className="console-port"><span>P2</span></div>
      </div>
    </div>
  );
}
