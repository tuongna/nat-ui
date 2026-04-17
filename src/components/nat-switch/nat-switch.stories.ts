import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Switch',
  component: 'nat-switch',
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Enable notifications',
    checked: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-switch
      label=${args.label}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
    ></nat-switch>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <nat-switch label="Off"></nat-switch>
      <nat-switch label="On" checked></nat-switch>
      <nat-switch label="Disabled Off" disabled></nat-switch>
      <nat-switch label="Disabled On" disabled checked></nat-switch>
    </div>
  `,
};
