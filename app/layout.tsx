import type { Metadata } from "next";
import { sans, mono, serif } from "@/lib/fonts";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Cursor } from "@/components/cursor/Cursor";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <SmoothScroll>
          <Nav />
          <ScrollProgress />
          <div className="pt-16">
            {children}
          </div>
          <Cursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
