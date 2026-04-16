export type CaseStudyMeta = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  company: string;
  tier: 1 | 2;
  hero: string;     // path under /public (e.g., "/images/work/6labs-ai/hero.jpg")
  accent: string;   // hex color for card accent
};

export const FEATURED: CaseStudyMeta[] = [
  {
    slug: "6labs-ai",
    title: "6labs.ai",
    tagline: "AI gameplay analytics for game studios",
    year: "2025 — now",
    company: "BlueStacks / now.gg",
    tier: 1,
    hero: "/images/work/6labs-ai/hero.jpg",
    accent: "#7C5CFF",
  },
  {
    slug: "float-ds",
    title: "Float",
    tagline: "Multi-brand design system architecture",
    year: "2022 — now",
    company: "BlueStacks / now.gg",
    tier: 1,
    hero: "/images/work/float-ds/hero.jpg",
    accent: "#5FD6FF",
  },
  {
    slug: "nowstudio",
    title: "nowStudio",
    tagline: "Multi-store game publishing platform",
    year: "2022 — now",
    company: "now.gg",
    tier: 1,
    hero: "/images/work/nowstudio/hero.jpg",
    accent: "#FFB84D",
  },
  {
    slug: "ai-highlights",
    title: "AI Highlights + ML Discovery",
    tagline: "Consumer ML on the App Player",
    year: "2021 — now",
    company: "BlueStacks",
    tier: 1,
    hero: "/images/work/ai-highlights/hero.jpg",
    accent: "#FF5FA3",
  },
];

export const SUPPORTING: CaseStudyMeta[] = [
  {
    slug: "amway-india",
    title: "Amway India",
    tagline: "App + web redesign + DS (B2C)",
    year: "2020 — 21",
    company: "Amway India",
    tier: 2,
    hero: "/images/work/amway-india/hero.jpg",
    accent: "#5FD68A",
  },
  {
    slug: "bluestacks-mobile",
    title: "BlueStacks Mobile + Payments",
    tagline: "Cross-platform commerce",
    year: "2023 — now",
    company: "BlueStacks / now.gg",
    tier: 2,
    hero: "/images/work/bluestacks-mobile/hero.jpg",
    accent: "#FFB84D",
  },
  {
    slug: "scroll-wheel",
    title: "Prototype-as-Spec",
    tagline: "Figma conditional-logic prototype shipped as engineering spec",
    year: "2022",
    company: "BlueStacks",
    tier: 2,
    hero: "/images/work/scroll-wheel/hero.jpg",
    accent: "#A3A3A3",
  },
  {
    slug: "user-profile",
    title: "Profile + Rewards + Memberships",
    tagline: "Growth-loop terminal",
    year: "2023 — now",
    company: "BlueStacks / now.gg",
    tier: 2,
    hero: "/images/work/user-profile/hero.jpg",
    accent: "#FF7A3D",
  },
];

export const ALL_CASES: CaseStudyMeta[] = [...FEATURED, ...SUPPORTING];

export function caseBySlug(slug: string): CaseStudyMeta | undefined {
  return ALL_CASES.find((c) => c.slug === slug);
}
