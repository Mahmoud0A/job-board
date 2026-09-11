import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Badge } from "./Badge";

const cardMeta: Meta<typeof Card> = {
  title: "Shared/Card",
  component: Card,
};

export default cardMeta;
type CardStory = StoryObj<typeof Card>;

export const Default: CardStory = {
  args: {
    children: "Card content goes here.",
  },
};

export const LargePadding: CardStory = {
  args: {
    padding: "lg",
    children: "A job posting form sits inside a large card.",
  },
};

export const BadgeTones: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge>Full-time</Badge>
      <Badge tone="accent">Engineering</Badge>
      <Badge tone="success">Remote friendly</Badge>
    </div>
  ),
};
