import type { Meta, StoryObj } from "@storybook/react";

import { HelpContent } from "./helpcontent";

const meta = {
  component: HelpContent,
} satisfies Meta<typeof HelpContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "icon",
    content: "content",
    onClick: () => {},
  },
};
