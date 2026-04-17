import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Data Display/Tooltip',
  component: 'nat-tooltip',
  argTypes: {
    text: { control: 'text' },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: { control: 'number' },
  },
  args: {
    text: 'This is a helpful tip',
    position: 'top',
    delay: 200,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="display: flex; justify-content: center; padding: 100px;">
      <nat-tooltip
        text=${args.text}
        position=${args.position}
        delay=${args.delay}
      >
        <span style="border-bottom: 1px dotted #6b7280; cursor: help;">Hover over me</span>
      </nat-tooltip>
    </div>
  `,
};
