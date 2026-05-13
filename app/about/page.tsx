import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About — Ziaul Islam",
  description: "Senior Product Designer, Delhi NCR. Currently at BlueStacks / 6labs.ai.",
};

export default function Page() {
  return <AboutPage />;
}
