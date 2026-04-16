import type { Meta, StoryObj } from "@storybook/react";
import { PenTool, Code2, Layers, Sparkles, Zap } from "lucide-react";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Primitives/Chip",
  component: Chip,
  parameters: {
    backgrounds: {
      default: "canvas",
      values: [{ name: "canvas", value: "#0A0A0B" }],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: 32 }}>
      <p style={{ color: "#9EA0A8", fontSize: 11, fontFamily: "monospace", margin: 0 }}>
        variants × sizes
      </p>

      {(["filled", "outline", "warm"] as const).map((v) => (
        <div key={v} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Chip variant={v} size="sm">{v} sm</Chip>
          <Chip variant={v} size="md">{v} md</Chip>
        </div>
      ))}

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20 }}>
        <p style={{ color: "#9EA0A8", fontSize: 11, fontFamily: "monospace", marginBottom: 12 }}>
          with icons
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Chip variant="filled" icon={PenTool}>Figma</Chip>
          <Chip variant="outline" icon={Code2}>TypeScript</Chip>
          <Chip variant="warm" icon={Sparkles}>New</Chip>
          <Chip variant="filled" size="md" icon={Layers}>Design Systems</Chip>
          <Chip variant="outline" size="md" icon={Zap}>Motion</Chip>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20 }}>
        <p style={{ color: "#9EA0A8", fontSize: 11, fontFamily: "monospace", marginBottom: 12 }}>
          skill badges (typical usage)
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["Figma", "React", "TypeScript", "Framer", "Design Systems", "GSAP", "Three.js"].map((skill) => (
            <Chip key={skill} variant="outline">{skill}</Chip>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Filled: Story = {
  args: { variant: "filled", size: "sm", children: "Figma" },
};

export const Outline: Story = {
  args: { variant: "outline", size: "sm", children: "TypeScript" },
};

export const Warm: Story = {
  args: { variant: "warm", size: "sm", children: "New" },
};

export const WithIcon: Story = {
  args: { variant: "filled", size: "md", icon: PenTool, children: "Figma" },
};
