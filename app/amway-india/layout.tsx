import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amway India — direct-selling app & web",
  description:
    "Redesigning Amway India's distributor-facing apps and web touchpoints — research, IA, and pattern library work that paused before shipping.",
  alternates: { canonical: "/amway-india" },
  openGraph: {
    title: "Amway India — direct-selling app & web · Ziaul Islam",
    description:
      "Distributor-facing app and web work for Amway India — research, IA, and pattern library.",
    url: "/amway-india",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
