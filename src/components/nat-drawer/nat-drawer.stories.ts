import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Drawer',
  component: 'nat-drawer',
  argTypes: {
    heading: { control: 'text' },
    open: { control: 'boolean' },
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    closable: { control: 'boolean' },
    closeOnOutsideClick: { control: 'boolean' },
    size: { control: 'text' },
  },
  args: {
    heading: 'Notifications',
    open: false,
    position: 'right',
    closable: true,
    closeOnOutsideClick: true,
    size: '350px',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-button onClick="document.getElementById('demo-drawer').open = true" variant="primary">
      Open Drawer
    </nat-button>
    
    <nat-drawer
      id="demo-drawer"
      heading=${args.heading}
      ?open=${args.open}
      position=${args.position}
      ?closable=${args.closable}
      ?close-on-outside-click=${args.closeOnOutsideClick}
      size=${args.size}
    >
      <div>
        <p style="margin-bottom: 1rem;">No new notifications right now.</p>
        <p style="font-size: 0.875rem; color: var(--nat-text-secondary, #6b7280);">
          We'll notify you when someone mentions you or replies to your threads.
        </p>
      </div>
      <div slot="footer" style="display: flex; gap: 8px;">
        <nat-button variant="primary" style="flex: 1;">Mark all as read</nat-button>
      </div>
    </nat-drawer>
  `,
};
