import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Layout/Divider',
  component: 'nat-divider',
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
    },
  },
  args: {
    orientation: 'horizontal',
    variant: 'solid',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 2rem;">
      <p>Above the divider</p>
      <nat-divider
        orientation=${args.orientation}
        variant=${args.variant}
      ></nat-divider>
      <p>Below the divider</p>
    </div>
  `,
};
