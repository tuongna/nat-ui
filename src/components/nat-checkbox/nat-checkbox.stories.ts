import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Checkbox',
  component: 'nat-checkbox',
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    label: 'I agree to the terms and conditions',
    checked: false,
    disabled: false,
    indeterminate: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-checkbox
      label=${args.label}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?indeterminate=${args.indeterminate}
      ?error=${args.error}
    ></nat-checkbox>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <nat-checkbox label="Unchecked"></nat-checkbox>
      <nat-checkbox label="Checked" checked></nat-checkbox>
      <nat-checkbox label="Indeterminate" indeterminate></nat-checkbox>
      <nat-checkbox label="Error State" error></nat-checkbox>
      <nat-checkbox label="Disabled Unchecked" disabled></nat-checkbox>
      <nat-checkbox label="Disabled Checked" disabled checked></nat-checkbox>
    </div>
  `,
};
