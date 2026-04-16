import type { Meta, StoryObj } from "@storybook/react";
import { PickACard } from "./PickACard";

const meta: Meta<typeof PickACard> = {
  title: "About/PickACard",
  component: PickACard,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof PickACard> = {};
