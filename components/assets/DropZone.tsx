"use client";

import { useRef, useState } from "react";
import type { Slot as SlotEntry, ProjectId } from "./types";

type Props = {
  slotId: string;
  project: ProjectId;
  onUploaded: (entry: SlotEntry) => void;
};

const ACCEPT = ".png,.jpg,.jpeg,.webp,.avif,.mp4,.webm";

export function DropZone({ slotId, project, onUploaded }: Props) {
  const [hover, setHover] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (files: FileList | File[]) => {
    const file = Array.from(files)[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set("project", project);
      fd.set("slot", slotId);
      fd.append("files", file);
      const res = await fetch("/api/dev-assets", { method: "POST", body: fd });
      if (!res.ok) {
        const txt = await res.text();
        setError(txt || `HTTP ${res.status}`);
        return;
      }
      const json = await res.json();
      onUploaded(json.entry);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className={`dropzone ${hover ? "dropzone-hover" : ""}`}
      onDragEnter={(e) => {
        e.preventDefault();
        setHover(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setHover(true);
      }}
      onDragLeave={() => setHover(false)}
      onDrop={(e) => {
        e.preventDefault();
        setHover(false);
        upload(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
    >
      <div className="dropzone-id">▢ {slotId.toUpperCase()}</div>
      <div className="dropzone-cta">
        {busy ? "uploading…" : error ? `error: ${error}` : "drop a file · or click to browse"}
      </div>
      <div className="dropzone-accept">accepts: png · jpg · webp · avif · mp4 · webm</div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        style={{ display: "none" }}
        onChange={(e) => e.target.files && upload(e.target.files)}
      />
    </div>
  );
}
