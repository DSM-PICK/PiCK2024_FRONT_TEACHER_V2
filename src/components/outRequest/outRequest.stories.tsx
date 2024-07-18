import type { Meta, StoryObj } from "@storybook/react";

import OutRequest from "./outRequest";

const meta = {
  component: OutRequest,
} satisfies Meta<typeof OutRequest>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {},
    userInfo: "2207 박현아",
    time: "17:00 - 18:00",
    reason: "외출사유",
    selected: false,
  },
};
