import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-native workflow — design × engineering",
  description:
    "How I use Claude Code, Figma MCP, and Storybook to compress design-to-code from days to hours — without losing taste, intent, or accessibility.",
  alternates: { canonical: "/ai-native-workflow" },
  openGraph: {
    title: "AI-native workflow — design × engineering · Ziaul Islam",
    description:
      "Compressing design-to-code with Claude Code, Figma MCP, and Storybook — without losing taste, intent, or accessibility.",
    url: "/ai-native-workflow",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
