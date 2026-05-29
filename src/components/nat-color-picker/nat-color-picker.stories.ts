import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/ColorPicker',
  component: 'nat-color-picker',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'color' },
    showAlpha: { control: 'boolean' },
    showSwatches: { control: 'boolean' },
    glass: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { value: '#5b6fe8', showSwatches: true },
  render: args => html`
    <div style="padding:24px;">
      <nat-color-picker value=${args.value} ?show-swatches=${args.showSwatches}></nat-color-picker>
    </div>
  `,
};

export const WithAlpha: Story = {
  render: () => html`
    <div style="padding:24px;">
      <nat-color-picker value="#5b6fe8" show-alpha show-swatches></nat-color-picker>
    </div>
  `,
};

export const Glass: Story = {
  render: () => html`
    <div style="padding:40px; background:linear-gradient(135deg,#667eea,#764ba2); border-radius:16px;">
      <nat-color-picker value="#ec4899" glass show-swatches></nat-color-picker>
    </div>
  `,
};

export const CustomSwatches: Story = {
  render: () => html`
    <div style="padding:24px;">
      <nat-color-picker
        value="#0ea5e9"
        .swatches=${['#0ea5e9', '#06b6d4', '#14b8a6', '#10b981', '#84cc16', '#eab308', '#f97316', '#ef4444', '#ec4899', '#a855f7']}
      ></nat-color-picker>
    </div>
  `,
};
