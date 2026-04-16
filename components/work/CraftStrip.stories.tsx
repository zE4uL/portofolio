import type { Meta, StoryObj } from "@storybook/react";
import { CraftStrip, DEFAULT_CRAFT_ITEMS } from "./CraftStrip";

const meta: Meta<typeof CraftStrip> = {
  title: "Work/CraftStrip",
  component: CraftStrip,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof CraftStrip>;

/** Default — 8 items at speed=90 */
export const Default: Story = {};

/** Slow — same items at speed=150, easier to inspect cards */
export const Slow: Story = {
  render: () => <CraftStrip items={DEFAULT_CRAFT_ITEMS} speed={150} />,
};

/** Few items — only 3 items (tests loop with small set) */
export const Few: Story = {
  render: () => <CraftStrip items={DEFAULT_CRAFT_ITEMS.slice(0, 3)} />,
};

/** Fast — speed=40 stress-tests the loop */
export const Fast: Story = {
  render: () => <CraftStrip items={DEFAULT_CRAFT_ITEMS} speed={40} />,
};

/** Custom items — bespoke set passed in */
export const CustomItems: Story = {
  render: () => (
    <CraftStrip
      items={[
        { label: "Wireframe sprint", description: "24h concept to hi-fi", accent: "#FF5FA3" },
        { label: "Motion spec", description: "Easing + timing doc", accent: "#5FD6FF" },
        { label: "Audit report", description: "Heuristic eval, 47 issues", accent: "#FFB84D" },
        { label: "Design crit", description: "Cross-team review session", accent: "#5FD68A" },
      ]}
      speed={70}
    />
  ),
};
