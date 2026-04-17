import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Spinner',
  component: 'nat-spinner',
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'white', 'currentColor'],
    },
  },
  args: {
    size: 'md',
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-spinner
      size=${args.size}
      color=${args.color}
    ></nat-spinner>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <nat-spinner size="sm"></nat-spinner>
      <nat-spinner size="md"></nat-spinner>
      <nat-spinner size="lg"></nat-spinner>
    </div>
  `,
};

export const Colors: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center; background: #f0f0f0; padding: 16px; border-radius: 8px;">
      <nat-spinner color="primary"></nat-spinner>
      
      <div style="background: var(--nat-bg-primary, #000); padding: 8px; border-radius: 4px;">
        <nat-spinner color="white"></nat-spinner>
      </div>
      
      <div style="color: #ef4444;">
        <nat-spinner color="currentColor"></nat-spinner>
      </div>
    </div>
  `,
};
