import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    backgrounds: {
      default: "canvas",
      values: [{ name: "canvas", value: "#0A0A0B" }],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: 32 }}>
      <p style={{ color: "#9EA0A8", fontSize: 11, fontFamily: "monospace", margin: 0 }}>
        variants × sizes
      </p>
      {(["primary", "secondary", "ghost"] as const).map((v) => (
        <div key={v} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant={v} size="sm">{v} sm</Button>
          <Button variant={v} size="md">{v} md</Button>
          <Button variant={v} size="lg">{v} lg</Button>
        </div>
      ))}

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ color: "#9EA0A8", fontSize: 11, fontFamily: "monospace", margin: 0 }}>
          magnetic primary (hover me)
        </p>
        <Button variant="primary" magnetic size="md">
          Magnetic pull
        </Button>
        <Button variant="primary" magnetic size="lg">
          Hire me
          <ArrowRight size={14} aria-hidden="true" />
        </Button>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, display: "flex", gap: 12 }}>
        <p style={{ color: "#9EA0A8", fontSize: 11, fontFamily: "monospace", margin: 0 }}>
          as anchor
        </p>
        <Button as="a" href="#" variant="secondary" size="md">
          View work
        </Button>
        <Button as="a" href="#" variant="ghost" size="sm">
          Skip →
        </Button>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, display: "flex", gap: 12 }}>
        <p style={{ color: "#9EA0A8", fontSize: 11, fontFamily: "monospace", margin: 0 }}>
          disabled states
        </p>
        <Button variant="primary" size="md" disabled>Disabled primary</Button>
        <Button variant="secondary" size="md" disabled>Disabled secondary</Button>
      </div>
    </div>
  ),
};

export const Primary: Story = {
  args: { variant: "primary", size: "md", children: "Get in touch" },
};

export const Secondary: Story = {
  args: { variant: "secondary", size: "md", children: "View case study" },
};

export const Ghost: Story = {
  args: { variant: "ghost", size: "md", children: "Learn more" },
};

export const MagneticPrimary: Story = {
  args: { variant: "primary", size: "lg", magnetic: true, children: "Hover to feel it" },
};
