import type { Meta, StoryObj } from "@storybook/react";

import Dropdown from "./dropdown";

const meta = {
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "grade",
    homeRoom: false,
  },
};
