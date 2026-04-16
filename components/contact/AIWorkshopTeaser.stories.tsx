import type { Meta, StoryObj } from "@storybook/react";
import { AIWorkshopTeaser } from "./AIWorkshopTeaser";

const meta: Meta<typeof AIWorkshopTeaser> = {
  title: "Contact/AIWorkshopTeaser",
  component: AIWorkshopTeaser,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof AIWorkshopTeaser> = {};
