import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Float — design system for BlueStacks",
  description:
    "Float, the multi-product design system at BlueStacks — token architecture, theming, governance, and the call-based decision model that kept ten product teams aligned.",
  alternates: { canonical: "/float" },
  openGraph: {
    title: "Float — design system for BlueStacks · Ziaul Islam",
    description:
      "Multi-product design system — tokens, theming, governance, and a call-based decision model.",
    url: "/float",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
