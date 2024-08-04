import type { Meta, StoryObj } from "@storybook/react";

import { TestTitle } from "./helpMenu";

const meta = {
  component: TestTitle,
} satisfies Meta<typeof TestTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
