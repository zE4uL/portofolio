import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "6labs.ai — AI-native design workflow",
  description:
    "Building a design org from scratch at 6labs.ai — Storybook as source of truth, Apparatus design system, and AI-native review loops with Figma + Claude.",
  alternates: { canonical: "/6labs-ai" },
  openGraph: {
    title: "6labs.ai — AI-native design workflow · Ziaul Islam",
    description:
      "Building a design org from scratch at 6labs.ai — Storybook as source of truth, Apparatus design system, and AI-native review loops.",
    url: "/6labs-ai",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
