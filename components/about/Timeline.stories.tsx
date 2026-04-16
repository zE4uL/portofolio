import type { Meta, StoryObj } from "@storybook/react";
import { Timeline } from "./Timeline";

const meta: Meta<typeof Timeline> = {
  title: "About/Timeline",
  component: Timeline,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof Timeline> = {};
