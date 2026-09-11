import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";
import { LanguageSwitcher } from "@/i18n/LanguageSwitcher";

const meta: Meta<typeof Navbar> = {
  title: "Shared/Navbar",
  component: Navbar,
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};

export const ArabicRTL: Story = {
  globals: { locale: "ar" },
};

export const LanguageSwitcherStandalone: StoryObj = {
  render: () => <LanguageSwitcher />,
};
