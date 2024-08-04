import type { Meta, StoryObj } from "@storybook/react";

import StateDrop from "./stateDrop";

const meta = {
  component: StateDrop,
} satisfies Meta<typeof StateDrop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: "ATTENDANCE",
  },
};
