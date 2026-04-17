import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Icon',
  component: 'nat-icon',
  argTypes: {
    name: {
      control: 'text',
      description: 'Lucide icon name',
    },
    size: {
      control: 'select',
      options: [12, 16, 20, 24, 32, 48, 64],
    },
    color: { control: 'color' },
    strokeWidth: { control: 'number' },
  },
  args: {
    name: 'heart',
    size: 24,
    strokeWidth: 2,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-icon
      name=${args.name}
      size=${args.size}
      color=${args.color || 'currentColor'}
      stroke-width=${args.strokeWidth}
    ></nat-icon>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center; padding: 1rem; color: var(--nat-text-primary);">
      <nat-icon name="home" size="24"></nat-icon>
      <nat-icon name="user" size="24"></nat-icon>
      <nat-icon name="settings" size="24"></nat-icon>
      <nat-icon name="search" size="24"></nat-icon>
      <nat-icon name="bell" size="24"></nat-icon>
      <nat-icon name="mail" size="24"></nat-icon>
      <nat-icon name="star" size="24" color="#f59e0b"></nat-icon>
    </div>
  `,
};
