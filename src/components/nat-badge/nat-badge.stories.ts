import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Data Display/Badge',
  component: 'nat-badge',
  argTypes: {
    content: { control: 'text' },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'neutral'],
    },
    dot: { control: 'boolean' },
    max: { control: 'number' },
  },
  args: {
    content: '5',
    variant: 'danger',
    dot: false,
    max: 99,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <!-- We wrap the badge in a div so it has something to attach to if it's an absolute badge -->
    <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: #e5e7eb; border-radius: 8px;">
      <nat-icon name="bell" size="24"></nat-icon>
      <nat-badge
        content=${args.content}
        variant=${args.variant}
        ?dot=${args.dot}
        max=${args.max}
      ></nat-badge>
    </div>
  `,
};

export const Dot: Story = {
  render: () => html`
    <div style="display: inline-flex; position: relative; width: 48px; height: 48px; background: #e5e7eb; border-radius: 8px; align-items: center; justify-content: center;">
      <nat-icon name="mail" size="24"></nat-icon>
      <nat-badge dot></nat-badge>
    </div>
  `,
};
