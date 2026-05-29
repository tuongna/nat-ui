import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/PinInput',
  component: 'nat-pin-input',
  tags: ['autodocs'],
  argTypes: {
    length: { control: { type: 'number', min: 4, max: 8 } },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    masked: { control: 'boolean' },
    numeric: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { length: 6, size: 'md' },
  render: args => html`
    <div style="padding:24px;">
      <nat-pin-input length=${args.length} size=${args.size}></nat-pin-input>
    </div>
  `,
};

export const FourDigit: Story = {
  name: '4-Digit PIN',
  render: () => html`
    <div style="padding:24px; display:flex; flex-direction:column; gap:16px; align-items:flex-start;">
      <label style="font-size:14px; font-weight:500; color:#374151;">Enter PIN</label>
      <nat-pin-input length="4" size="lg"></nat-pin-input>
    </div>
  `,
};

export const OTPMasked: Story = {
  name: 'OTP (Masked)',
  render: () => html`
    <div style="padding:24px;">
      <nat-pin-input length="6" masked></nat-pin-input>
    </div>
  `,
};

export const Invalid: Story = {
  render: () => html`
    <div style="padding:24px;">
      <nat-pin-input length="6" invalid></nat-pin-input>
      <p style="margin-top:8px; font-size:13px; color:#ef4444;">Incorrect code. Please try again.</p>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="padding:24px; display:flex; flex-direction:column; gap:24px; align-items:flex-start;">
      ${(['sm', 'md', 'lg'] as const).map(
        size => html`
          <div>
            <p style="margin:0 0 8px; font-size:12px; color:#888; text-transform:uppercase; letter-spacing:0.05em;">${size}</p>
            <nat-pin-input length="4" size=${size}></nat-pin-input>
          </div>
        `,
      )}
    </div>
  `,
};
