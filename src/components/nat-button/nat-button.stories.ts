import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Button',
  component: 'nat-button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'text'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    icon: { control: 'text' },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    iconPosition: 'left',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      icon=${args.icon || ''}
      icon-position=${args.iconPosition}
    >
      Click Me
    </nat-button>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px;">
      <nat-button variant="primary">Primary</nat-button>
      <nat-button variant="secondary">Secondary</nat-button>
      <nat-button variant="ghost">Ghost</nat-button>
      <nat-button variant="danger">Danger</nat-button>
      <nat-button variant="text">Text</nat-button>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 8px;">
      <nat-button size="sm">Small</nat-button>
      <nat-button size="md">Medium</nat-button>
      <nat-button size="lg">Large</nat-button>
    </div>
  `,
};
