import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Forms/Radio',
  component: 'nat-radio',
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    name: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    label: 'Option A',
    checked: false,
    disabled: false,
    name: 'radio-group',
    value: 'a',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-radio
      label=${args.label}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      name=${args.name}
      value=${args.value}
    ></nat-radio>
  `,
};

export const Group: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <nat-radio label="Credit Card" name="payment" value="cc" checked></nat-radio>
      <nat-radio label="PayPal" name="payment" value="paypal"></nat-radio>
      <nat-radio label="Bank Transfer (Maintenance)" name="payment" value="bank" disabled></nat-radio>
    </div>
  `,
};
