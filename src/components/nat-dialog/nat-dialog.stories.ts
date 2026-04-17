import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Dialog',
  component: 'nat-dialog',
  argTypes: {
    heading: { control: 'text' },
    open: { control: 'boolean' },
    closable: { control: 'boolean' },
    closeOnOutsideClick: { control: 'boolean' },
  },
  args: {
    heading: 'Payment Successful',
    open: false,
    closable: true,
    closeOnOutsideClick: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-button onClick="document.getElementById('demo-dialog').open = true" variant="primary">
      Open Dialog
    </nat-button>
    
    <nat-dialog
      id="demo-dialog"
      heading=${args.heading}
      ?open=${args.open}
      ?closable=${args.closable}
      ?close-on-outside-click=${args.closeOnOutsideClick}
    >
      <div>
        <p>Your payment of <strong>$120.00</strong> has been successfully processed.</p>
        <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--nat-text-secondary, #6b7280);">
          A receipt has been sent to your email address. You can also view it in your account dashboard.
        </p>
      </div>
      <div slot="actions">
        <nat-button variant="ghost" onClick="document.getElementById('demo-dialog').open = false">
          Dismiss
        </nat-button>
        <nat-button variant="primary" onClick="document.getElementById('demo-dialog').open = false">
          View Receipt
        </nat-button>
      </div>
    </nat-dialog>
  `,
};
