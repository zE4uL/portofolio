export type WorkPreview = {
  label: string;
  href?: string;
  /** Ordered list of preview frame paths under /public. */
  frames: string[];
  /** Cycle interval in ms. Defaults to 700. */
  intervalMs?: number;
};

/**
 * Drop preview frames into public/images/work/previews/<key>/ and list them here.
 * 2-6 frames per project is the sweet spot.
 */
export const workPreviews: Record<string, WorkPreview> = {
  "6labs": {
    label: "6labs.ai",
    frames: [],
    intervalMs: 700,
  },
  "ai-native": {
    label: "AI-Native",
    href: "/ai-native-workflow",
    frames: [],
    intervalMs: 700,
  },
  nowstudio: {
    label: "now Studio",
    href: "/nowstudio",
    frames: [
      "/images/work/nowstudio/dashboard.jpg",
      "/images/work/nowstudio/analytics.jpg",
      "/images/work/nowstudio/flow01.png",
      "/images/work/nowstudio/pricingTable.jpg",
      "/images/work/nowstudio/discordBot.jpg",
      "/images/work/nowstudio/rbac.png",
    ],
    intervalMs: 650,
  },
  "float-ds": {
    label: "Float DS",
    href: "/float",
    frames: [
      "/images/work/float/Float.jpg",
      "/images/work/float/buttonMatrix.jpg",
      "/images/work/float/themeSplit01.jpg",
      "/images/work/float/iconGrid.jpg",
      "/images/work/float/tokenSheet.jpg",
      "/images/work/float/Blueprint.png",
    ],
    intervalMs: 650,
  },
  bluestacks: {
    label: "BlueStacks",
    href: "/bluestacks",
    frames: [
      "/images/work/bluestacks/bsxHero.jpg",
      "/images/work/bluestacks/BSX.jpg",
      "/images/work/bluestacks/momentsEditor.png",
      "/images/work/bluestacks/foundationsComposite.jpg",
      "/images/work/bluestacks/paymentsDualTheme.jpg",
      "/images/work/bluestacks/gameBrowser.png",
    ],
    intervalMs: 650,
  },
  amway: {
    label: "Amway India",
    href: "/amway-india",
    frames: [
      "/images/work/amway-india/hero.png",
      "/images/work/amway-india/app01.png",
      "/images/work/amway-india/web01.png",
      "/images/work/amway-india/app02.png",
      "/images/work/amway-india/ds01.png",
      "/images/work/amway-india/behance/01.png",
    ],
    intervalMs: 650,
  },
  ikokas: {
    label: "Ikokas",
    frames: [],
    intervalMs: 700,
  },
  "alpha-agency": {
    label: "Alpha Agency",
    frames: [],
    intervalMs: 700,
  },
};
