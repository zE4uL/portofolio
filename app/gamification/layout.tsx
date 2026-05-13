import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gamification — payments, currency, behavior loops",
  description:
    "Eight gamification surfaces across BlueStacks, now.gg, and nowCafe — receipt promos, completion screens, nowBux currency, GameRoom, and a Snake-planet testbed.",
  alternates: { canonical: "/gamification" },
  openGraph: {
    title: "Gamification — payments, currency, behavior loops · Ziaul Islam",
    description:
      "Eight gamification surfaces across BlueStacks, now.gg, and nowCafe — currency, promos, completion screens, GameRoom.",
    url: "/gamification",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
