import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "nowStudio — developer platform for cloud gaming",
  description:
    "nowStudio, the developer-facing platform behind now.gg — SDK onboarding, build pipelines, and analytics for 7K+ game studios. Honest reflection on what shipped vs. what didn't.",
  alternates: { canonical: "/nowstudio" },
  openGraph: {
    title: "nowStudio — developer platform for cloud gaming · Ziaul Islam",
    description:
      "Developer-facing platform behind now.gg — SDK onboarding, build pipelines, analytics.",
    url: "/nowstudio",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
