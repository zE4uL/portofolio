import type { Slot, AssetManifest } from "@/components/assets/types";

export const slotIds = [
  "coverHero",
  "research",
  "appShot01",
  "appShot02",
  "webShot01",
  "webShot02",
  "dsShot01",
  "dsShot02",
] as const;

export type AmwaySlotId = (typeof slotIds)[number];

export const amwayAssets: AssetManifest<AmwaySlotId> = {
  coverHero: { kind: "image", src: "/images/work/amway-india/hero.png", alt: "Amway India app + web cover", width: 1400, height: 875 },
  research:  { kind: "image", src: "/images/work/amway-india/research.png", alt: "User research / personas", width: 1400, height: 875 },
  appShot01: { kind: "image", src: "/images/work/amway-india/app01.png", alt: "Amway India app — home & catalog", width: 1400, height: 875 },
  appShot02: { kind: "image", src: "/images/work/amway-india/app02.png", alt: "Amway India app — product & checkout", width: 1400, height: 875 },
  webShot01: { kind: "image", src: "/images/work/amway-india/web01.png", alt: "Amway India web — landing", width: 1400, height: 875 },
  webShot02: { kind: "image", src: "/images/work/amway-india/web02.png", alt: "Amway India web — product detail", width: 1400, height: 875 },
  dsShot01:  { kind: "image", src: "/images/work/amway-india/ds01.png", alt: "Design system — components", width: 1400, height: 875 },
  dsShot02:  { kind: "image", src: "/images/work/amway-india/ds02.png", alt: "Design system — tokens / type scale", width: 1400, height: 875 },
};

export type { Slot };
