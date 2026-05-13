"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  /** Used to mark anchor links from non-home pages — they navigate via "/" first. */
  page?: "home" | "about" | "case-study";
};

export default function SiteChrome({ page = "home" }: Props) {
  const router = useRouter();

  useEffect(() => {
    const menuBtn = document.getElementById("menuBtn") as HTMLButtonElement | null;
    const menuBtnLabel = document.getElementById("menuBtnLabel") as HTMLElement | null;
    const menuEl = document.getElementById("menu") as HTMLElement | null;

    const pulseCurtain = () => {
      document.body.classList.remove("menu-pulse");
      void document.body.offsetWidth;
      document.body.classList.add("menu-pulse");
      window.setTimeout(() => document.body.classList.remove("menu-pulse"), 1200);
    };
    const openMenu = () => {
      pulseCurtain();
      document.body.classList.add("menu-open");
      menuEl?.setAttribute("aria-hidden", "false");
      if (menuBtnLabel) menuBtnLabel.textContent = "Close";
    };
    const closeMenu = () => {
      pulseCurtain();
      document.body.classList.remove("menu-open");
      menuEl?.setAttribute("aria-hidden", "true");
      if (menuBtnLabel) menuBtnLabel.textContent = "Menu";
    };
    const onMenuBtnClick = () => {
      if (document.body.classList.contains("menu-open")) closeMenu();
      else openMenu();
    };
    menuBtn?.addEventListener("click", onMenuBtnClick);

    const itemListeners: Array<{ el: HTMLAnchorElement; fn: (e: Event) => void }> = [];
    document.querySelectorAll<HTMLAnchorElement>(".menu-item").forEach((a) => {
      const fn = (e: Event) => {
        const href = a.getAttribute("href") || "";
        const isHomeAnchor = href.startsWith("/#");
        const isInPageAnchor = href.startsWith("#");
        if (isInPageAnchor) {
          e.preventDefault();
          const id = href.slice(1);
          const target = document.getElementById(id);
          closeMenu();
          window.setTimeout(() => target?.scrollIntoView({ behavior: "smooth", block: "start" }), 320);
        } else if (isHomeAnchor && page !== "home") {
          e.preventDefault();
          closeMenu();
          window.setTimeout(() => router.push(href), 280);
        } else {
          closeMenu();
        }
      };
      a.addEventListener("click", fn);
      itemListeners.push({ el: a, fn });
    });

    const tickClock = () => {
      const d = new Date();
      const ist = new Date(d.getTime() + (d.getTimezoneOffset() + 5 * 60 + 30) * 60000);
      const hh = String(ist.getHours()).padStart(2, "0");
      const mm = String(ist.getMinutes()).padStart(2, "0");
      const mc = document.getElementById("menuClock");
      if (mc) mc.textContent = `${hh}:${mm}`;
    };
    tickClock();
    const clockInterval = setInterval(tickClock, 1000);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) closeMenu();
      if (e.key === "m") menuBtn?.click();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      menuBtn?.removeEventListener("click", onMenuBtnClick);
      itemListeners.forEach(({ el, fn }) => el.removeEventListener("click", fn));
      window.removeEventListener("keydown", onKeyDown);
      clearInterval(clockInterval);
      document.body.classList.remove("menu-open");
    };
  }, [page, router]);

  const homeAnchor = (anchor: string) => (page === "home" ? `#${anchor}` : `/#${anchor}`);

  return (
    <>
      <Link href="/" className="logo-mark" data-cursor="home">
        <span className="dot"></span>ZIAUL ISLAM<span className="slash">/</span>SR. PRODUCT DESIGNER
      </Link>

      <button className="menu-btn" id="menuBtn" data-cursor="menu" data-magnet>
        <span className="inner">
          <span className="icon"><i></i><i></i></span>
          <span id="menuBtnLabel">Menu</span>
        </span>
      </button>

      <div className="menu-curtain" id="menuCurtain" aria-hidden="true"></div>

      <div className="menu" id="menu" aria-hidden="true">
        <div className="menu-bg"></div>
        <div className="menu-left">
          <div className="menu-items">
            <a href={homeAnchor("hero")} className="menu-item" data-target="hero" data-cursor="go">
              <span className="num">(01)</span>
              <span className="label">Index<em>,</em></span>
              <span className="arrow">↗</span>
            </a>
            <a href={homeAnchor("work")} className="menu-item" data-target="work" data-cursor="go">
              <span className="num">(02)</span>
              <span className="label">Selected <em>Work</em></span>
              <span className="arrow">↗</span>
            </a>
            <a href="/about" className="menu-item" data-cursor="go">
              <span className="num">(03)</span>
              <span className="label">About<em>, briefly.</em></span>
              <span className="arrow">↗</span>
            </a>
            <a href={homeAnchor("process")} className="menu-item" data-target="process" data-cursor="go">
              <span className="num">(04)</span>
              <span className="label">Process</span>
              <span className="arrow">↗</span>
            </a>
            <a href={homeAnchor("contact")} className="menu-item" data-target="contact" data-cursor="go">
              <span className="num">(05)</span>
              <span className="label">Say <em>hello</em></span>
              <span className="arrow">↗</span>
            </a>
          </div>
          <div className="menu-foot">
            <span>© ZIAUL ISLAM — 2026</span>
            <span>GURUGRAM · IST+5:30 · <b id="menuClock">00:00</b></span>
            <span>v.2026.04</span>
          </div>
        </div>
        <div className="menu-right">
          <div className="menu-block">
            <h5>Currently</h5>
            <p>Designing 6labs.ai @ BlueStacks — <b style={{ color: "var(--accent)" }}>open to Sr/Lead roles in Delhi NCR</b>.</p>
          </div>
          <div className="menu-block">
            <h5>Write</h5>
            <a className="big" href="mailto:ziaul.islam14@gmail.com">ziaul.islam14@gmail.com ↗</a>
          </div>
          <div className="menu-block">
            <h5>Elsewhere</h5>
            <a href="https://www.linkedin.com/in/ziaulislam14/" target="_blank" rel="noopener">LinkedIn ↗</a>
            <a href={homeAnchor("work")}>Selected Work ↗</a>
            <a href={homeAnchor("process")}>How I Work ↗</a>
          </div>
          <div className="menu-block">
            <h5>Index</h5>
            <p style={{ color: "var(--ink-2)", fontFamily: "var(--font-jetbrains)", fontSize: "11px", lineHeight: 1.8, letterSpacing: ".08em" }}>
              01 Index · 02 Work · 03 About · 04 Process · 05 Contact
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
