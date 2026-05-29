import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/NumberInput',
  component: 'nat-number-input',
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number' } },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    step: { control: { type: 'number' } },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { value: 5, min: 0, max: 100, step: 1 },
  render: args => html`
    <div style="padding:24px;">
      <nat-number-input value=${args.value} min=${args.min} max=${args.max} step=${args.step}></nat-number-input>
    </div>
  `,
};

export const WithLabel: Story = {
  render: () => html`
    <div style="padding:24px; display:flex; flex-direction:column; gap:16px;">
      <nat-number-input label="Quantity" value="1" min="1" max="99" step="1"></nat-number-input>
      <nat-number-input label="Price" value="19.99" step="0.01" precision="2" adorn-start="$"></nat-number-input>
      <nat-number-input label="Weight" value="70" adorn-end="kg" min="0" max="500"></nat-number-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="padding:24px; display:flex; flex-direction:column; gap:12px; align-items:flex-start;">
      ${(['sm', 'md', 'lg'] as const).map(
        size => html`<nat-number-input size=${size} value="10"></nat-number-input>`,
      )}
    </div>
  `,
};

export const WithAffixes: Story = {
  render: () => html`
    <div style="padding:24px; display:flex; flex-direction:column; gap:16px; align-items:flex-start;">
      <nat-number-input value="99" adorn-start="$" precision="2"></nat-number-input>
      <nat-number-input value="75" adorn-end="%" min="0" max="100"></nat-number-input>
      <nat-number-input value="1000" adorn-start="€" adorn-end="/mo"></nat-number-input>
    </div>
  `,
};
