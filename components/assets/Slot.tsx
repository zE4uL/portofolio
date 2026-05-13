"use client";

import { useEffect, useState } from "react";
import type { Slot as SlotEntry, ProjectId } from "./types";
import { DropZone } from "./DropZone";

export type Aspect = "16:9" | "16:10" | "4:5" | "21:9" | "1:1" | "auto";
export type Fit = "cover" | "contain" | "fill";

const ASPECT_MAP: Record<Exclude<Aspect, "auto">, string> = {
  "16:9": "16 / 9",
  "16:10": "16 / 10",
  "4:5": "4 / 5",
  "21:9": "21 / 9",
  "1:1": "1 / 1",
};

const ASPECT_OPTIONS: Aspect[] = ["auto", "21:9", "16:9", "16:10", "4:5", "1:1"];
const FIT_OPTIONS: Fit[] = ["cover", "contain", "fill"];

type Props = {
  id: string;
  project: ProjectId;
  entry: SlotEntry | null;
  aspect?: Aspect;
  className?: string;
  /** Children render as the brutalist placeholder when slot is empty. */
  children?: React.ReactNode;
  /** When true, renders only when filled (skips placeholder fallback in prod). */
  hideEmpty?: boolean;
};

const isDev = process.env.NODE_ENV === "development";

function resolveSlotAspect(aspect: Aspect, entry: SlotEntry | null): string {
  if (aspect !== "auto") return ASPECT_MAP[aspect];
  if (entry?.width && entry?.height) return `${entry.width} / ${entry.height}`;
  return "16 / 10";
}

const overrideKey = (project: string, id: string) => `slot-override:${project}:${id}`;

type Override = { aspect?: Aspect; fit?: Fit };

function loadOverride(project: string, id: string): Override {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(overrideKey(project, id));
    return raw ? (JSON.parse(raw) as Override) : {};
  } catch {
    return {};
  }
}

function saveOverride(project: string, id: string, next: Override) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(overrideKey(project, id), JSON.stringify(next));
  } catch {
    /* noop */
  }
}

export function Slot({ id, project, entry, aspect = "16:10", className = "", children, hideEmpty }: Props) {
  const [liveEntry, setLiveEntry] = useState<SlotEntry | null>(entry);
  const [override, setOverride] = useState<Override>({});

  useEffect(() => {
    setLiveEntry(entry);
  }, [entry]);

  useEffect(() => {
    if (isDev) setOverride(loadOverride(project, id));
  }, [project, id]);

  const current = liveEntry;
  const effectiveAspect = override.aspect ?? aspect;
  const slotAspect = resolveSlotAspect(effectiveAspect, current);
  const fit: Fit = override.fit ?? "cover";

  const updateOverride = (next: Override) => {
    setOverride(next);
    saveOverride(project, id, next);
  };

  if (current) {
    return (
      <div className={`slot ${className}`} data-slot-id={id} style={{ aspectRatio: slotAspect }}>
        {current.kind === "video" ? (
          <video
            className="slot-asset"
            src={current.src}
            poster={current.poster}
            autoPlay
            muted
            loop
            playsInline
            aria-label={current.alt}
            style={{ objectFit: fit, width: "100%", height: "100%" }}
          />
        ) : (
          <img
            className="slot-asset"
            src={current.src}
            alt={current.alt}
            loading="lazy"
            decoding="async"
            style={{ objectFit: fit, width: "100%", height: "100%" }}
          />
        )}
        {isDev && (
          <SlotMenu
            id={id}
            project={project}
            aspect={effectiveAspect}
            fit={fit}
            onAspect={(a) => updateOverride({ ...override, aspect: a })}
            onFit={(f) => updateOverride({ ...override, fit: f })}
            onResetOverride={() => updateOverride({})}
            onCleared={() => setLiveEntry(null)}
            onReplaced={(next) => setLiveEntry(next)}
          />
        )}
      </div>
    );
  }

  if (hideEmpty && !isDev) return null;

  return (
    <div className={`slot slot-empty ${className}`} data-slot-id={id} style={{ aspectRatio: slotAspect }}>
      {children}
      {isDev && <DropZone slotId={id} project={project} onUploaded={(next) => setLiveEntry(next)} />}
    </div>
  );
}

function SlotMenu({
  id,
  project,
  aspect,
  fit,
  onAspect,
  onFit,
  onResetOverride,
  onCleared,
  onReplaced,
}: {
  id: string;
  project: ProjectId;
  aspect: Aspect;
  fit: Fit;
  onAspect: (a: Aspect) => void;
  onFit: (f: Fit) => void;
  onResetOverride: () => void;
  onCleared: () => void;
  onReplaced: (next: SlotEntry) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);

  const onClear = async () => {
    if (!confirm(`Clear ${id}?`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/dev-assets?project=${project}&slot=${id}`, { method: "DELETE" });
      if (res.ok) onCleared();
    } finally {
      setBusy(false);
    }
  };

  const onReplace = () => {
    const inp = document.createElement("input");
    inp.type = "file";
    inp.accept = "image/*,video/*";
    inp.onchange = async () => {
      const file = inp.files?.[0];
      if (!file) return;
      setBusy(true);
      try {
        const fd = new FormData();
        fd.set("project", project);
        fd.set("slot", id);
        fd.append("files", file);
        const res = await fetch("/api/dev-assets", { method: "POST", body: fd });
        if (res.ok) {
          const json = await res.json();
          onReplaced(json.entry);
        }
      } finally {
        setBusy(false);
      }
    };
    inp.click();
  };

  return (
    <div className="slot-menu" aria-busy={busy}>
      <button type="button" onClick={onReplace} disabled={busy}>Replace</button>
      <button type="button" onClick={onClear} disabled={busy}>Clear</button>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} title="Aspect & fit">⋯</button>
      {open && (
        <div className="slot-menu-popover" onClick={(e) => e.stopPropagation()}>
          <label className="slot-menu-row">
            <span>Aspect</span>
            <select value={aspect} onChange={(e) => onAspect(e.target.value as Aspect)}>
              {ASPECT_OPTIONS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </label>
          <label className="slot-menu-row">
            <span>Fit</span>
            <select value={fit} onChange={(e) => onFit(e.target.value as Fit)}>
              {FIT_OPTIONS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </label>
          <button type="button" className="slot-menu-reset" onClick={onResetOverride}>Reset to default</button>
        </div>
      )}
    </div>
  );
}
