import type { Preview } from "@storybook/react";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "canvas",
      values: [
        { name: "canvas", value: "#0A0A0B" },
        { name: "light", value: "#FAFAF7" },
      ],
    },
    viewport: {
      defaultViewport: "responsive",
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[var(--canvas)] text-[var(--text-primary)] p-8 font-sans">
        <Story />
      </div>
    ),
  ],
};

export default preview;
