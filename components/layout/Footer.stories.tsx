import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Layout/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof Footer> = {};
