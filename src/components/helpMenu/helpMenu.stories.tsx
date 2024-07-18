import type { Meta, StoryObj } from "@storybook/react";

import HelpMenu from "./helpMenu";

const meta = {
  component: HelpMenu,
} satisfies Meta<typeof HelpMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
