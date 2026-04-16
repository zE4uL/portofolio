import type { Meta, StoryObj } from "@storybook/react";
import { WorkGrid } from "./WorkGrid";
import { SUPPORTING, ALL_CASES } from "@/lib/work";

const meta: Meta<typeof WorkGrid> = {
  title: "Work/WorkGrid",
  component: WorkGrid,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof WorkGrid> = {
  render: () => <WorkGrid items={SUPPORTING} />,
};

export const AllCases: StoryObj<typeof WorkGrid> = {
  render: () => <WorkGrid items={ALL_CASES} heading="All work" />,
};
