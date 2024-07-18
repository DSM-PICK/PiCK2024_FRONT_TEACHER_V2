import type { Meta, StoryObj } from "@storybook/react";

import { AlarmWrap } from "./helpMenu";

const meta = {
  component: AlarmWrap,
} satisfies Meta<typeof AlarmWrap>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
