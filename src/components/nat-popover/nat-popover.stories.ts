import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Data Display/Popover',
  component: 'nat-popover',
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    triggerAction: {
      control: 'select',
      options: ['click', 'hover'],
    },
  },
  args: {
    position: 'top',
    triggerAction: 'click',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="display: flex; justify-content: center; padding: 100px;">
      <nat-popover
        position=${args.position}
        trigger-action=${args.triggerAction}
      >
        <nat-button slot="trigger" variant="primary">Click Me</nat-button>
        <div slot="content" style="padding: 1rem; width: 200px;">
          <h4 style="margin-bottom: 8px;">Popover Title</h4>
          <p style="font-size: 0.875rem; color: #4b5563;">Here is some rich content inside the popover overlay.</p>
        </div>
      </nat-popover>
    </div>
  `,
};
