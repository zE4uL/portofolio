import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./Hero";

const meta: Meta<typeof Hero> = {
  title: "Hero/Hero",
  component: Hero,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof Hero> = {};
