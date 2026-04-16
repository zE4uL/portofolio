import type { Meta, StoryObj } from "@storybook/react";
import { ScrollProgress } from "./ScrollProgress";

const meta: Meta<typeof ScrollProgress> = {
  title: "Layout/ScrollProgress",
  component: ScrollProgress,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "200vh", padding: "32px" }}>
        <p className="text-[var(--text-secondary)]">
          Scroll down to see the progress bar fill.
        </p>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Default: StoryObj<typeof ScrollProgress> = {};
