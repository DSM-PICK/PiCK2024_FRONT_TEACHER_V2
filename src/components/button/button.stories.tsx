import type { Meta, StoryObj } from "@storybook/react";

import Button from "./button";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: "100px",
    children: "버튼",
    disabled: false,
    onClick: () => {},
  },
};
