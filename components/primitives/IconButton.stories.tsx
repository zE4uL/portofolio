import type { Meta, StoryObj } from "@storybook/react";
import {
  ArrowUpRight,
  GitFork,
  Share2,
  Link,
  Moon,
  Sun,
  Copy,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Primitives/IconButton",
  component: IconButton,
  parameters: {
    backgrounds: {
      default: "canvas",
      values: [{ name: "canvas", value: "#0A0A0B" }],
    },
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: 32 }}>
      <div>
        <p style={{ color: "#9EA0A8", fontSize: 11, fontFamily: "monospace", marginBottom: 12 }}>
          variants (size 40, default)
        </p>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <IconButton icon={ArrowUpRight} variant="solid" aria-label="Open link" />
          <IconButton icon={ArrowUpRight} variant="outline" aria-label="Open link" />
          <IconButton icon={ArrowUpRight} variant="ghost" aria-label="Open link" />
        </div>
      </div>

      <div>
        <p style={{ color: "#9EA0A8", fontSize: 11, fontFamily: "monospace", marginBottom: 12 }}>
          size scale
        </p>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <IconButton icon={Copy} variant="outline" size={28} aria-label="Copy" />
          <IconButton icon={Copy} variant="outline" size={36} aria-label="Copy" />
          <IconButton icon={Copy} variant="outline" size={40} aria-label="Copy" />
          <IconButton icon={Copy} variant="outline" size={48} aria-label="Copy" />
          <IconButton icon={Copy} variant="outline" size={56} aria-label="Copy" />
        </div>
      </div>

      <div>
        <p style={{ color: "#9EA0A8", fontSize: 11, fontFamily: "monospace", marginBottom: 12 }}>
          social links (as anchor)
        </p>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <IconButton as="a" href="https://github.com" target="_blank" icon={GitFork} variant="outline" aria-label="GitHub" />
          <IconButton as="a" href="https://twitter.com" target="_blank" icon={Share2} variant="outline" aria-label="Twitter" />
          <IconButton as="a" href="https://linkedin.com" target="_blank" icon={Link} variant="outline" aria-label="LinkedIn" />
        </div>
      </div>

      <div>
        <p style={{ color: "#9EA0A8", fontSize: 11, fontFamily: "monospace", marginBottom: 12 }}>
          toolbar / utility usage
        </p>
        <div
          style={{
            display: "inline-flex",
            gap: 4,
            background: "var(--surface-raised, #1A1B21)",
            padding: 4,
            borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <IconButton icon={ChevronLeft} variant="ghost" size={32} aria-label="Previous" />
          <IconButton icon={Moon} variant="ghost" size={32} aria-label="Dark mode" />
          <IconButton icon={Sun} variant="ghost" size={32} aria-label="Light mode" />
          <IconButton icon={ChevronRight} variant="ghost" size={32} aria-label="Next" />
        </div>
      </div>

      <div>
        <p style={{ color: "#9EA0A8", fontSize: 11, fontFamily: "monospace", marginBottom: 12 }}>
          solid accent CTA
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <IconButton icon={ExternalLink} variant="solid" aria-label="Open case study" />
          <IconButton icon={ArrowUpRight} variant="solid" size={48} aria-label="Open link large" />
        </div>
      </div>
    </div>
  ),
};

export const Solid: Story = {
  args: { icon: ArrowUpRight, variant: "solid", "aria-label": "Open link" },
};

export const Outline: Story = {
  args: { icon: ArrowUpRight, variant: "outline", "aria-label": "Open link" },
};

export const Ghost: Story = {
  args: { icon: Moon, variant: "ghost", "aria-label": "Toggle theme" },
};

export const AsAnchor: Story = {
  args: {
    as: "a",
    href: "https://github.com",
    target: "_blank",
    icon: GitFork,
    variant: "outline",
    "aria-label": "GitHub profile",
  },
};
