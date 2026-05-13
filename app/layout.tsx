import type { Metadata } from "next";
import { sans, mono, serif } from "@/lib/fonts";
import "./globals.css";

const SITE_URL = "https://ziaulislam.me";
const DESCRIPTION =
  "Senior Product Designer — seven years shipping payments, gamification, AI tooling, and design systems across BlueStacks, now.gg, and 6labs.ai. ~30 shipped products, B2B + B2C. Based in Delhi NCR.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ziaul Islam — Senior Product Designer",
    template: "%s · Ziaul Islam",
  },
  description: DESCRIPTION,
  keywords: [
    "Ziaul Islam",
    "Senior Product Designer",
    "Product Designer",
    "Design Systems",
    "Payments UX",
    "Gamification",
    "AI Tooling",
    "Figma Plugins",
    "BlueStacks",
    "now.gg",
    "6labs.ai",
    "Delhi NCR",
    "Portfolio",
  ],
  authors: [{ name: "Ziaul Islam", url: SITE_URL }],
  creator: "Ziaul Islam",
  publisher: "Ziaul Islam",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Ziaul Islam — Portfolio",
    title: "Ziaul Islam — Senior Product Designer",
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/images/profile/ziaul.jpg",
        alt: "Ziaul Islam — Senior Product Designer, BlueStacks / now.gg / 6labs.ai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziaul Islam — Senior Product Designer",
    description: DESCRIPTION,
    images: ["/images/profile/ziaul.jpg"],
  },
  category: "Design",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ziaul Islam",
  url: SITE_URL,
  image: `${SITE_URL}/images/profile/ziaul.jpg`,
  jobTitle: "Senior Product Designer",
  description: DESCRIPTION,
  worksFor: { "@type": "Organization", name: "BlueStacks / now.gg", url: "https://www.bluestacks.com" },
  address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressRegion: "Delhi NCR", addressCountry: "IN" },
  knowsAbout: [
    "Product Design",
    "Design Systems",
    "Payments UX",
    "Gamification",
    "AI Tooling",
    "Figma Plugin Development",
    "Cross-platform UX",
  ],
  sameAs: [
    "https://www.linkedin.com/in/ziaulislam14/",
    "https://behance.net/ziaulislam14",
    "https://instagram.com/ziaulislam14",
  ],
  email: "mailto:ziaul.islam14@gmail.com",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: "Ziaul Islam — Portfolio",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Ziaul Islam" },
  inLanguage: "en",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
