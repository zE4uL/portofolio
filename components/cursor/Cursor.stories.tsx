import type { Meta, StoryObj } from "@storybook/react";
import { Cursor } from "./Cursor";

const meta: Meta<typeof Cursor> = {
  title: "Cursor/Cursor",
  component: Cursor,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "60vh",
          padding: "32px",
          display: "grid",
          gap: "16px",
          background: "var(--canvas, #0A0A0B)",
          color: "var(--text-primary, #F1F1F3)",
        }}
      >
        <p style={{ color: "var(--text-secondary, #9EA0A8)", fontSize: 14 }}>
          Move your cursor over the zones below to see each cursor morph state.
        </p>

        {/* Link state */}
        <a
          href="#"
          data-cursor="link"
          style={{ color: "var(--accent-primary, #7C5CFF)", fontSize: 16 }}
        >
          A link — triggers "link" state (circle, no label)
        </a>

        {/* Card state */}
        <div
          data-cursor="card"
          data-cursor-label="drag to explore"
          style={{
            padding: "24px",
            background: "var(--surface-raised, #1A1B21)",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          A card — "card" state with label "drag to explore"
        </div>

        {/* Throw state */}
        <div
          data-cursor="throw"
          data-cursor-label="drag & throw"
          style={{
            padding: "24px",
            background: "var(--accent-warm, #FF7A3D)",
            color: "#000",
            borderRadius: 9999,
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Throwable — "throw" state with label "drag &amp; throw"
        </div>

        {/* Default state — move here to reset */}
        <p style={{ color: "var(--text-secondary, #9EA0A8)", fontSize: 12, marginTop: 16 }}>
          Move cursor here (empty area) → default 8px dot
        </p>

        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Default: StoryObj<typeof Cursor> = {};
