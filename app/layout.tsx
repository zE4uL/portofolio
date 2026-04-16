import type { Metadata } from "next";
import { sans, mono, serif } from "@/lib/fonts";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Ziaul Islam — Product Designer. AI-native. Also a gamer.",
  description:
    "Senior Product Designer working on AI, design systems, and platforms at BlueStacks / now.gg / 6labs.ai.",
  metadataBase: new URL("https://ziaul-islam.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
