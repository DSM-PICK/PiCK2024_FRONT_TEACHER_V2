import type { Meta, StoryObj } from "@storybook/react";

import Dropdown from "./dropdown";

const meta = {
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { value: 2, label: "2층" },
      { value: 3, label: "3층" },
      { value: 4, label: "4층" },
      { value: 5, label: "전체" },
    ],
    value: "",
    changeHandler(value) {},
  },
};
