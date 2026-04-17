import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Tag',
  component: 'nat-tag',
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'primary', 'success', 'warning', 'danger'],
    },
    shape: {
      control: 'radio',
      options: ['round', 'pill'],
    },
    closable: { control: 'boolean' },
  },
  args: {
    variant: 'neutral',
    shape: 'round',
    closable: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-tag
      variant=${args.variant}
      shape=${args.shape}
      ?closable=${args.closable}
    >
      Design System
    </nat-tag>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <nat-tag variant="neutral">Neutral</nat-tag>
      <nat-tag variant="primary">Primary</nat-tag>
      <nat-tag variant="success">Success</nat-tag>
      <nat-tag variant="warning">Warning</nat-tag>
      <nat-tag variant="danger">Danger</nat-tag>
    </div>
  `,
};

export const Closable: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <nat-tag variant="neutral" closable>VueJS</nat-tag>
      <nat-tag variant="primary" closable>React</nat-tag>
      <nat-tag variant="success" closable>Stencil</nat-tag>
    </div>
  `,
};

export const Shapes: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <nat-tag shape="round" variant="primary">Round Shape (Default)</nat-tag>
      <nat-tag shape="pill" variant="primary">Pill Shape</nat-tag>
    </div>
  `,
};
