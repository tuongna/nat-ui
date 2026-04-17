import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Alert',
  component: 'nat-alert',
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    closable: { control: 'boolean' },
  },
  args: {
    variant: 'info',
    closable: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-alert variant=${args.variant} ?closable=${args.closable}>
      <span slot="title">Alert Title</span>
      This is an alert message providing important context to the user.
    </nat-alert>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <nat-alert variant="info">
        <span slot="title">Information</span>
        This is an informational message.
      </nat-alert>
      <nat-alert variant="success">
        <span slot="title">Success</span>
        Your action was completed successfully.
      </nat-alert>
      <nat-alert variant="warning">
        <span slot="title">Warning</span>
        Please be careful about this action.
      </nat-alert>
      <nat-alert variant="error">
        <span slot="title">Error</span>
        Something went wrong during the process.
      </nat-alert>
    </div>
  `,
};
