import { Mail, FileText } from "lucide-react";
import { FooterPhysics } from "@/components/contact/FooterPhysics";

/**
 * Footer — closes every page.
 *
 * Provides `id="contact"` so the Nav's `#contact` anchor link lands here
 * (replaces the orphan <div id="contact"> stub removed from app/layout.tsx
 * in Task 3.9).
 *
 * Structure
 * ──────────
 * <footer id="contact">
 *   ├─ Top:    "Let's build something." headline + FooterPhysics sandbox
 *   └─ Bottom: contact block + meta row
 *
 * Lucide-react in this project does not ship Linkedin/Instagram icons.
 * Social brand icons are hand-rolled minimal SVGs matching the brand marks.
 */

/** Minimal LinkedIn "in" logomark */
function LinkedInIcon() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/** Minimal Behance "Be" logomark */
function BehanceIcon() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.726zm-7.726-3h3.963c-.136-1.314-.75-2-1.95-2-1.23 0-1.807.73-2.013 2zM13.508 17.459c-.759 1.074-2.11 1.541-3.851 1.541H0V6h9.375c2.898 0 4.808 1.168 4.808 3.68 0 1.404-.65 2.248-1.88 2.876 1.686.487 2.683 1.576 2.683 3.272-.001.694-.173 1.36-.478 1.631zM9.063 9h-5.15v2.89h4.92c1.082 0 1.664-.351 1.664-1.439S10.164 9 9.063 9zm.26 5.13H3.913v3.31h5.41c1.226 0 1.887-.497 1.887-1.654 0-1.158-.661-1.656-1.887-1.656z" />
    </svg>
  );
}

/** Minimal Instagram camera logomark */
function InstagramIcon() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ziaulislam14",
    Icon: LinkedInIcon,
  },
  {
    label: "Behance",
    href: "https://behance.net/ziaulislam14",
    Icon: BehanceIcon,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/ziaulislam14",
    Icon: InstagramIcon,
  },
] as const;

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-[var(--surface)] border-t border-[var(--border)] mt-0"
    >
      {/* ── Top region: headline + sticker sandbox ───────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 pt-20 md:pt-32">
        <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] mb-12 md:mb-16">
          Let&rsquo;s build something.
        </h2>

        {/* Physics sandbox — Task 6.1 will wire up matter.js here */}
        <FooterPhysics />
      </div>

      {/* ── Bottom region: contact + meta ────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 pb-12 md:pb-16 pt-16 md:pt-20">
        {/* Divider */}
        <div className="w-full h-px bg-[var(--border)] mb-12" aria-hidden="true" />

        {/* Email — hero-sized monospace link */}
        <a
          href="mailto:ziaul.islam14@gmail.com"
          data-cursor="link"
          className="group inline-flex items-center gap-3 mb-10 font-mono text-lg md:text-2xl text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors duration-[180ms] focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-2 rounded"
        >
          <Mail
            size={20}
            strokeWidth={1.5}
            aria-hidden="true"
            className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-[180ms]"
          />
          ziaul.islam14@gmail.com
        </a>

        {/* Social links row */}
        <nav aria-label="Social links" className="flex flex-wrap items-center gap-3 mb-16">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              aria-label={label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]/30 hover:bg-[var(--surface-raised)] transition-colors duration-[180ms] focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-2"
            >
              <Icon />
              {label}
            </a>
          ))}

          {/* CV — distinct pill style, same file as playground cassette */}
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Ziaul-Islam-Resume-2026.pdf"
            data-cursor="link"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 text-sm text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/20 hover:border-[var(--accent-primary)]/50 transition-colors duration-[180ms] focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-2"
          >
            <FileText size={15} strokeWidth={1.75} aria-hidden="true" />
            CV
          </a>
        </nav>

        {/* Meta row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[var(--text-secondary)] font-mono opacity-60">
          <span>© 2026 Ziaul Islam</span>
          <span>Built with AI-native workflow</span>
        </div>
      </div>
    </footer>
  );
}
