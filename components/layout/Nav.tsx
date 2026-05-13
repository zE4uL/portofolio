"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
  { href: "#contact", label: "Contact" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  // Close drawer on Escape and restore focus to hamburger
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 border-b border-[var(--border)] bg-[var(--canvas)]/70 backdrop-blur-md"
    >
      <nav
        aria-label="Primary"
        className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between"
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="font-serif italic text-xl text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors duration-[180ms]"
          data-cursor="link"
          aria-label="Home — Ziaul"
        >
          Ziaul
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-cursor="link"
              className={[
                "relative transition-colors duration-[180ms] cursor-pointer",
                isActive(l.href)
                  ? "text-[var(--accent-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
              ].join(" ")}
            >
              {l.label}
              {/* Active underline indicator */}
              {isActive(l.href) && (
                <span
                  className="absolute -bottom-0.5 left-0 w-full h-px bg-[var(--accent-primary)]"
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}

          <ThemeToggle />

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Ziaul-Islam-Resume-2026.pdf"
            data-cursor="link"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] hover:border-[var(--text-secondary)]/20 transition-colors duration-[180ms] cursor-pointer"
          >
            CV
            <ArrowUpRight size={13} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          type="button"
          className="md:hidden w-11 h-11 grid place-items-center text-[var(--text-primary)] cursor-pointer transition-colors duration-[180ms] hover:text-[var(--accent-primary)] rounded-md"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          data-cursor="link"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={reduce ? false : { opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: reduce ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center"
              >
                <X size={20} strokeWidth={1.75} aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={reduce ? false : { opacity: 0, rotate: 45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: -45, scale: 0.7 }}
                transition={{ duration: reduce ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center"
              >
                <Menu size={20} strokeWidth={1.75} aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-drawer"
            role="navigation"
            aria-label="Mobile menu"
            aria-hidden={!open}
            initial={
              reduce
                ? { opacity: 0 }
                : { height: 0, opacity: 0 }
            }
            animate={
              reduce
                ? { opacity: 1 }
                : { height: "auto", opacity: 1 }
            }
            exit={
              reduce
                ? { opacity: 0 }
                : { height: 0, opacity: 0 }
            }
            transition={{
              duration: reduce ? 0.15 : 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:hidden border-t border-[var(--border)] overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  data-cursor="link"
                  onClick={() => setOpen(false)}
                  className={[
                    "flex items-center h-11 text-base transition-colors duration-[180ms] cursor-pointer",
                    isActive(l.href)
                      ? "text-[var(--accent-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  ].join(" ")}
                >
                  {l.label}
                </Link>
              ))}

              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Ziaul-Islam-Resume-2026.pdf"
                data-cursor="link"
                onClick={() => setOpen(false)}
                className="flex items-center gap-1.5 h-11 text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-[180ms] cursor-pointer"
              >
                CV
                <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
              </a>

              <div className="pt-3 border-t border-[var(--border)] mt-1">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
