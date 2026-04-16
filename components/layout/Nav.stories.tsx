import type { Meta, StoryObj } from "@storybook/react";
import { Nav } from "./Nav";

const meta: Meta<typeof Nav> = {
  title: "Layout/Nav",
  component: Nav,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof Nav> = {};
