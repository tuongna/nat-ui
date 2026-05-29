import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Rating',
  component: 'nat-rating',
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
    count: { control: { type: 'number', min: 1, max: 10 } },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    allowHalf: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { value: 3, count: 5 },
  render: args => html`<nat-rating value=${args.value} count=${args.count}></nat-rating>`,
};

export const HalfStar: Story = {
  args: { value: 3.5, count: 5, allowHalf: true },
  render: args => html`<nat-rating value=${args.value} count=${args.count} ?allow-half=${args.allowHalf}></nat-rating>`,
};

export const Sizes: Story = {
  render: () => html`
    <div style="padding:24px; display:flex; flex-direction:column; gap:16px;">
      ${(['sm', 'md', 'lg', 'xl'] as const).map(
        size => html`
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="width:24px; font-size:12px; color:#666;">${size}</span>
            <nat-rating value="4" size=${size}></nat-rating>
          </div>
        `,
      )}
    </div>
  `,
};

export const Readonly: Story = {
  render: () => html`
    <div style="padding:24px;">
      <nat-rating value="4" readonly></nat-rating>
      <p style="margin-top:8px; font-size:13px; color:#888;">Read-only — hover and click are disabled</p>
    </div>
  `,
};

export const CustomColor: Story = {
  render: () => html`
    <div style="padding:24px; display:flex; gap:24px; flex-wrap:wrap;">
      <nat-rating value="4" color="#ef4444"></nat-rating>
      <nat-rating value="4" color="#8b5cf6"></nat-rating>
      <nat-rating value="4" color="#06b6d4"></nat-rating>
      <nat-rating value="4" color="#10b981"></nat-rating>
    </div>
  `,
};
