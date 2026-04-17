import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Toast',
  component: 'nat-toast',
  argTypes: {
    message: { control: 'text' },
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    duration: { control: 'number' },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'],
    },
    actionLabel: { control: 'text' },
    closable: { control: 'boolean' },
  },
  args: {
    message: 'Operation successful!',
    variant: 'success',
    duration: 3000,
    position: 'bottom-right',
    closable: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-button onClick="document.getElementById('demo-toast').show()">Show Toast</nat-button>
    <nat-toast
      id="demo-toast"
      message=${args.message}
      variant=${args.variant}
      duration=${args.duration}
      position=${args.position}
      action-label=${args.actionLabel || ''}
      ?closable=${args.closable}
    ></nat-toast>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px;">
      <nat-button onClick="document.getElementById('toast-info').show()">Info</nat-button>
      <nat-button onClick="document.getElementById('toast-success').show()">Success</nat-button>
      <nat-button onClick="document.getElementById('toast-warning').show()">Warning</nat-button>
      <nat-button onClick="document.getElementById('toast-error').show()">Error</nat-button>
    </div>

    <!-- The actual toasts -->
    <nat-toast id="toast-info" message="New version available" variant="info" duration="3000"></nat-toast>
    <nat-toast id="toast-success" message="Changes saved successfully" variant="success" duration="3000"></nat-toast>
    <nat-toast id="toast-warning" message="Your session expires soon" variant="warning" duration="3000"></nat-toast>
    <nat-toast id="toast-error" message="Failed to save data" variant="error" duration="3000"></nat-toast>
  `,
};
