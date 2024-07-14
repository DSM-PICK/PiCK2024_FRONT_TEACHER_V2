import type { Meta, StoryObj } from "@storybook/react";

import Meal from "./meal";

const meta = {
  component: Meal,
} satisfies Meta<typeof Meal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "",
    content: ["", ""],
  },
};
