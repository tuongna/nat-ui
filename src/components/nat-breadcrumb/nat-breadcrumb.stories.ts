import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Navigation/Breadcrumb',
  component: 'nat-breadcrumb',
  argTypes: {
    separator: { control: 'text' },
  },
  args: {
    separator: '/',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-breadcrumb separator=${args.separator}>
      <nat-breadcrumb-item href="#">Home</nat-breadcrumb-item>
      <nat-breadcrumb-item href="#/components">Components</nat-breadcrumb-item>
      <nat-breadcrumb-item active>Breadcrumb</nat-breadcrumb-item>
    </nat-breadcrumb>
  `,
};
