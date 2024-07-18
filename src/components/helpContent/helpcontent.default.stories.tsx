import type { Meta, StoryObj } from "@storybook/react";

import Helfcontent from "./helpcontent";

const meta = {
  component: Helfcontent,
} satisfies Meta<typeof Helfcontent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "",
    content: "",
    onClick: () => {},
  },
};
