import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Primitives/Tag",
  component: Tag,
  parameters: {
    backgrounds: {
      default: "canvas",
      values: [{ name: "canvas", value: "#0A0A0B" }],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 40, padding: 48 }}>
      <div>
        <p style={{ color: "#9EA0A8", fontSize: 11, fontFamily: "monospace", marginBottom: 20 }}>
          color variants (rotation seeded from label)
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
          <Tag color="accent">Product Design</Tag>
          <Tag color="warm">Interaction</Tag>
          <Tag color="dark">Systems</Tag>
          <Tag color="light">Motion</Tag>
        </div>
      </div>

      <div>
        <p style={{ color: "#9EA0A8", fontSize: 11, fontFamily: "monospace", marginBottom: 20 }}>
          explicit rotation props
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
          <Tag color="accent" rotate={-6}>minus 6°</Tag>
          <Tag color="warm" rotate={0}>zero tilt</Tag>
          <Tag color="dark" rotate={4}>plus 4°</Tag>
          <Tag color="light" rotate={-3}>minus 3°</Tag>
        </div>
      </div>

      <div>
        <p style={{ color: "#9EA0A8", fontSize: 11, fontFamily: "monospace", marginBottom: 20 }}>
          marquee simulation (natural scatter)
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "center",
            padding: "24px 0",
          }}
        >
          {[
            { label: "Senior Product Designer", color: "accent" },
            { label: "Figma power user", color: "light" },
            { label: "Motion design", color: "warm" },
            { label: "Design systems", color: "dark" },
            { label: "Framer Motion", color: "accent" },
            { label: "5+ years exp", color: "warm" },
            { label: "Dark mode native", color: "dark" },
          ].map(({ label, color }) => (
            <Tag key={label} color={color as "accent" | "warm" | "dark" | "light"}>
              {label}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Accent: Story = {
  args: { color: "accent", children: "Product Design" },
};

export const Warm: Story = {
  args: { color: "warm", children: "Interaction" },
};

export const Dark: Story = {
  args: { color: "dark", children: "Systems" },
};

export const Light: Story = {
  args: { color: "light", children: "Motion" },
};

export const ZeroRotation: Story = {
  args: { color: "accent", rotate: 0, children: "No tilt" },
};
