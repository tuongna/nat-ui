import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Forms/Slider',
  component: 'nat-slider',
  argTypes: {
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 2rem; max-width: 400px;">
      <label style="display: block; margin-bottom: 1rem; font-family: ui-sans-serif, system-ui, sans-serif;">
        Volume: <span id="valDisplay">${args.value}</span>
      </label>
      <nat-slider
        value=${args.value}
        min=${args.min}
        max=${args.max}
        step=${args.step}
        ?disabled=${args.disabled}
        onnatInput=${(e: any) => { document.getElementById('valDisplay')!.innerText = e.detail.value }}
      ></nat-slider>
    </div>
  `,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 30,
  },
  render: (args) => html`
    <div style="padding: 2rem; max-width: 400px;">
      <nat-slider
        value=${args.value}
        ?disabled=${args.disabled}
      ></nat-slider>
    </div>
  `,
};
