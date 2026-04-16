import type { Meta, StoryObj } from "@storybook/react";
import { TypeReveal } from "./TypeReveal";

const meta: Meta<typeof TypeReveal> = {
  title: "Hero/TypeReveal",
  component: TypeReveal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Character-by-character text reveal. Uses split-type + Web Animations API. Respects `prefers-reduced-motion`. Screen-reader safe via `aria-label` on the container and `aria-hidden` on each split char.",
      },
    },
  },
  argTypes: {
    as: {
      control: "select",
      options: ["span", "div", "h1", "h2", "h3"],
    },
    delay: { control: { type: "number", step: 0.1, min: 0, max: 5 } },
    stagger: { control: { type: "number", step: 5, min: 0, max: 200 } },
    startOnView: { control: "boolean" },
    once: { control: "boolean" },
    text: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof TypeReveal>;

// ---------------------------------------------------------------------------
// Default — hero composition with all three variants
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <div style={{ padding: 40, display: "grid", gap: 40 }}>
      <TypeReveal
        as="h1"
        text="Product designer."
        className="font-serif italic text-5xl md:text-7xl leading-[1.05] tracking-tight"
      />
      <TypeReveal
        as="h2"
        text="AI-native. Also a gamer."
        delay={0.4}
        className="font-sans text-4xl md:text-6xl font-medium"
      />
      <TypeReveal
        text="On scroll-into-view: this one starts hidden and reveals when it enters the viewport."
        startOnView
        className="text-base text-[var(--text-secondary)] max-w-xl"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Delayed — single headline with a 1.2 s lead-in
// ---------------------------------------------------------------------------

export const Delayed: Story = {
  render: () => (
    <div style={{ padding: 40 }}>
      <TypeReveal
        as="h1"
        text="This starts after 1.2 seconds."
        delay={1.2}
        className="text-4xl font-serif italic"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// SlowStagger — exaggerated stagger to inspect per-character timing
// ---------------------------------------------------------------------------

export const SlowStagger: Story = {
  render: () => (
    <div style={{ padding: 40 }}>
      <TypeReveal
        as="h2"
        text="Each char is 80 ms apart."
        stagger={80}
        className="text-3xl font-sans font-medium"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// AllTags — verify every semantic element renders correctly
// ---------------------------------------------------------------------------

export const AllTags: Story = {
  render: () => (
    <div style={{ padding: 40, display: "grid", gap: 32 }}>
      <TypeReveal as="h1" text="Rendered as <h1>" stagger={20} className="font-sans font-medium text-5xl" />
      <TypeReveal as="h2" text="Rendered as <h2>" stagger={20} className="font-sans font-medium text-4xl" />
      <TypeReveal as="h3" text="Rendered as <h3>" stagger={20} className="font-sans font-medium text-3xl" />
      <TypeReveal as="div" text="Rendered as <div>" stagger={20} className="font-sans font-medium text-2xl" />
      <TypeReveal as="span" text="Rendered as <span>" stagger={20} className="font-sans font-medium text-xl" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// StartOnView — scroll down to trigger (useful for case-study pages)
// ---------------------------------------------------------------------------

export const StartOnView: Story = {
  render: () => (
    <div style={{ padding: 40 }}>
      <p style={{ marginBottom: 800, color: "#888", fontSize: 14 }}>
        Scroll down — the headline below triggers when it enters the viewport.
      </p>
      <TypeReveal
        as="h2"
        text="You scrolled here. Nice."
        startOnView
        once
        className="text-4xl font-serif italic"
      />
    </div>
  ),
};
