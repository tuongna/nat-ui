import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Progress',
  component: 'nat-progress',
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    indeterminate: { control: 'boolean' },
    showValue: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    value: 45,
    indeterminate: false,
    showValue: true,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-progress
      value=${args.value}
      ?indeterminate=${args.indeterminate}
      ?show-value=${args.showValue}
      size=${args.size}
    >
      <span slot="label">Uploading file...</span>
    </nat-progress>
  `,
};

export const Types: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin-bottom: 8px;">Determinate</h4>
        <nat-progress value="75" show-value="true"></nat-progress>
      </div>
      <div>
        <h4 style="margin-bottom: 8px;">Indeterminate</h4>
        <nat-progress indeterminate="true"></nat-progress>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <nat-progress value="30" size="sm"></nat-progress>
      <nat-progress value="50" size="md"></nat-progress>
      <nat-progress value="80" size="lg"></nat-progress>
    </div>
  `,
};
