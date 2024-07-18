import type { Meta, StoryObj } from "@storybook/react";

import PreList from "./preList";

const meta = {
  component: PreList,
} satisfies Meta<typeof PreList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userInfo: "2207 박현아",
    application: 4,
    earlyreturn: 5,
    onClick: () => {},
  },
};
