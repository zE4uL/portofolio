import type { Meta, StoryObj } from "@storybook/react";
import { Marquee } from "./Marquee";

const meta: Meta<typeof Marquee> = {
  title: "Marquee/Marquee",
  component: Marquee,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

const SAMPLE = [
  "BlueStacks",
  "now.gg",
  "6labs.ai",
  "Amway India",
  "DSO",
  "AI / ML",
  "Design Systems",
  "B2B Platforms",
  "Cross-platform",
  "AR / VR",
];

export const Default: StoryObj<typeof Marquee> = {
  render: () => <Marquee items={SAMPLE} />,
};

export const Slow: StoryObj<typeof Marquee> = {
  render: () => <Marquee items={SAMPLE} speed={20} />,
};

export const Right: StoryObj<typeof Marquee> = {
  render: () => <Marquee items={SAMPLE} direction="right" />,
};

export const Fast: StoryObj<typeof Marquee> = {
  render: () => <Marquee items={SAMPLE} speed={80} />,
};

export const FewItems: StoryObj<typeof Marquee> = {
  name: "Few Items (stress-test seamless loop)",
  render: () => <Marquee items={SAMPLE.slice(0, 3)} speed={30} />,
};
