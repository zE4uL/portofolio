import { useEffect, type MutableRefObject } from "react";

type Opts = {
  lockRef?: MutableRefObject<boolean>;
  ease?: number;
};

export function useSmoothScroll({ lockRef, ease = 0.085 }: Opts = {}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let raf = 0;

    const onWheel = (e: WheelEvent) => {
      if (lockRef?.current) return;
      e.preventDefault();
      targetY = Math.max(
        0,
        Math.min(
          targetY + e.deltaY,
          document.documentElement.scrollHeight - window.innerHeight
        )
      );
    };
    const tick = () => {
      currentY += (targetY - currentY) * ease;
      window.scrollTo(0, currentY);
      raf = requestAnimationFrame(tick);
    };
    const onTouchStart = () => {
      targetY = window.scrollY;
    };
    const onScrollResync = () => {
      // While locked, ignore external scroll changes — keep the smooth
      // loop pinned to the saved target so the page can't drift.
      if (lockRef?.current) return;
      if (Math.abs(window.scrollY - currentY) > 40) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    const onProgScroll = (e: Event) => {
      const detail = (e as CustomEvent<{ top: number }>).detail;
      const top = Math.max(0, detail?.top ?? 0);
      targetY = Math.min(
        top,
        document.documentElement.scrollHeight - window.innerHeight
      );
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("touchstart", onTouchStart);
    window.addEventListener("scroll", onScrollResync, { passive: true });
    window.addEventListener("smooth:scroll-to", onProgScroll as EventListener);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("scroll", onScrollResync);
      window.removeEventListener("smooth:scroll-to", onProgScroll as EventListener);
    };
  }, [ease, lockRef]);
}
