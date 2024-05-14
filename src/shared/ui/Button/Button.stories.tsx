import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, ThemeButton } from './Button';
import "../../../app/styles/index.scss"

const meta = {
  title: 'shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clear: Story = {
  args: {
    theme: ThemeButton.CLEAR,
    children: "Button",
    square: false

  },
};

export const Outline: Story = {
  args: {
    theme: ThemeButton.OUTLINE,
    children: "Button",
    square: false
  },
};

export const OutlineSquare: Story = {
  args: {
    theme: ThemeButton.OUTLINE,
    children: "Button",
    square: true 
  },
};
