import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'widgets/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
  args: {},
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Darc: Story = {
  args: {className: "dark"},
};

export const Normal: Story = {
  args: {className: "normal"},

};
