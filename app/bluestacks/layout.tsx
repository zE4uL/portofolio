import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BlueStacks — Android player redesign",
  description:
    "Multi-year redesign of BlueStacks' Android emulator — three iterations of the mobile spine, NVIDIA Highlights, and a polished gamer-first surface.",
  alternates: { canonical: "/bluestacks" },
  openGraph: {
    title: "BlueStacks — Android player redesign · Ziaul Islam",
    description:
      "Multi-year redesign of the BlueStacks Android emulator — mobile spine, Highlights, and gamer-first surface.",
    url: "/bluestacks",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
