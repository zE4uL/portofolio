"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "mobile-notice-dismissed-v1";

export default function MobileNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = window.localStorage.getItem(STORAGE_KEY) === "1";
    if (dismissed) return;
    const isMobile = window.matchMedia("(max-width: 720px)").matches;
    if (!isMobile) return;
    const t = window.setTimeout(() => setOpen(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  if (!open) return null;

  return (
    <div className="mobile-notice" role="status" aria-live="polite">
      <div className="mobile-notice-inner">
        <span className="mobile-notice-dot" aria-hidden />
        <p>
          For the best experience, open this site on a <b>desktop</b>.
        </p>
        <button
          type="button"
          className="mobile-notice-close"
          onClick={dismiss}
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
