import type { Meta, StoryObj } from "@storybook/react";

import HelfMenu from "./helpMenu";

const meta = {
  component: HelfMenu,
} satisfies Meta<typeof HelfMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
