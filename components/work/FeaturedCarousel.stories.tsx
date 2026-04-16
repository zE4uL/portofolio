import type { Meta, StoryObj } from "@storybook/react";
import { FeaturedCarousel } from "./FeaturedCarousel";
import { FEATURED } from "@/lib/work";

const meta: Meta<typeof FeaturedCarousel> = {
  title: "Work/FeaturedCarousel",
  component: FeaturedCarousel,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "canvas",
      values: [{ name: "canvas", value: "#0A0A0B" }],
    },
    docs: {
      description: {
        component:
          "Pinned horizontal scroll section for Tier-1 case study cards. " +
          "Desktop: GSAP ScrollTrigger pins the section and scrubs a horizontal " +
          "translate as the user scrolls vertically. Mobile / reduced-motion: " +
          "falls back to a simple vertical stack of grid cards.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof FeaturedCarousel>;

/**
 * Desktop story — scroll down inside Storybook's preview iframe to engage the
 * pin. The ScrollTrigger fires relative to the iframe's scroll container, so
 * the behaviour may differ slightly from the real page; this is expected and
 * acceptable — the production page is the source of truth.
 */
export const Desktop: Story = {
  render: () => (
    <div style={{ background: "var(--canvas, #0A0A0B)" }}>
      {/* Spacer before the carousel — lets the pin engage on scroll */}
      <div
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          fontFamily: "monospace",
          fontSize: 13,
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.08em",
        }}
      >
        ↓ Scroll down to engage the pinned carousel
      </div>

      <FeaturedCarousel items={FEATURED} />

      {/* Spacer after — confirms the pin releases and normal scroll resumes */}
      <div
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          fontFamily: "monospace",
          fontSize: 13,
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.08em",
        }}
      >
        ↑ Pin released — you're back to normal vertical scroll
      </div>
    </div>
  ),
};

/**
 * Only two items — verifies the carousel works with fewer than 4 cards
 * (e.g., if a future tier-1 set shrinks).
 */
export const TwoItems: Story = {
  render: () => (
    <div style={{ background: "var(--canvas, #0A0A0B)" }}>
      <div style={{ height: "60vh" }} />
      <FeaturedCarousel items={FEATURED.slice(0, 2)} />
      <div style={{ height: "60vh" }} />
    </div>
  ),
};

/**
 * Mobile fallback — resize the Storybook viewport to ≤767px to see the
 * vertical stack. The GSAP pin is never instantiated in this path.
 */
export const MobileFallback: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <div style={{ background: "var(--canvas, #0A0A0B)" }}>
      <FeaturedCarousel items={FEATURED} />
    </div>
  ),
};
