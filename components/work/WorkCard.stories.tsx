import type { Meta, StoryObj } from "@storybook/react";
import { WorkCard } from "./WorkCard";
import { FEATURED, SUPPORTING } from "@/lib/work";

const meta: Meta<typeof WorkCard> = {
  title: "Work/WorkCard",
  component: WorkCard,
  parameters: {
    backgrounds: {
      default: "canvas",
      values: [{ name: "canvas", value: "#0A0A0B" }],
    },
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof WorkCard>;

/** Carousel variant — tall 3/4 cards in a horizontal row */
export const CarouselVariant: Story = {
  render: () => (
    <div
      style={{
        padding: 40,
        display: "flex",
        gap: 24,
        overflowX: "auto",
        background: "var(--canvas, #0A0A0B)",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      {FEATURED.map((c) => (
        <WorkCard key={c.slug} meta={c} variant="carousel" />
      ))}
    </div>
  ),
};

/** Grid variant — landscape 4/3 cards in a 2-column grid */
export const GridVariant: Story = {
  render: () => (
    <div
      style={{
        padding: 40,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 24,
        maxWidth: 1200,
        margin: "0 auto",
        background: "var(--canvas, #0A0A0B)",
        minHeight: "100vh",
      }}
    >
      {SUPPORTING.map((c) => (
        <WorkCard key={c.slug} meta={c} variant="grid" />
      ))}
    </div>
  ),
};

/** Single card — use for isolated inspection */
export const SingleGrid: Story = {
  render: () => (
    <div
      style={{
        padding: 60,
        maxWidth: 640,
        margin: "0 auto",
        background: "var(--canvas, #0A0A0B)",
        minHeight: "100vh",
      }}
    >
      <WorkCard meta={FEATURED[0]} variant="grid" priority />
    </div>
  ),
};

/** Single carousel card — inspect tall variant */
export const SingleCarousel: Story = {
  render: () => (
    <div
      style={{
        padding: 60,
        display: "flex",
        justifyContent: "center",
        background: "var(--canvas, #0A0A0B)",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <WorkCard meta={FEATURED[1]} variant="carousel" priority />
    </div>
  ),
};
