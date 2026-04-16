import type { Meta, StoryObj } from "@storybook/react";
import { PressStartCTA } from "./PressStartCTA";

const meta: Meta<typeof PressStartCTA> = {
  title: "Hero/PressStartCTA",
  component: PressStartCTA,
};
export default meta;

export const Default: StoryObj<typeof PressStartCTA> = {
  render: () => (
    <div style={{ padding: 40, display: "grid", gap: 24, placeItems: "center" }}>
      <PressStartCTA href="#work" />
      <PressStartCTA href="#work" label="Enter portfolio" />
      <PressStartCTA href="#work" label="Go" className="h-14 text-base" />
    </div>
  ),
};
