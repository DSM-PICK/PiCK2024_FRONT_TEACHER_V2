import type { Meta, StoryObj } from "@storybook/react";

import ClassMove from "./classMove";

const meta = {
  component: ClassMove,
} satisfies Meta<typeof ClassMove>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userInfo: "2207 박현아",
    time: "20:12 - 01 : 45",
    pre: "창조실",
    next: "2-2",
    onClick: () => {},
    selected: false,
  },
};
