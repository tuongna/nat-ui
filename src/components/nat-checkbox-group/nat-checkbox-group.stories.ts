import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Forms/Checkbox Group',
  component: 'nat-checkbox-group',
  argTypes: {
    label: { control: 'text' },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    error: { control: 'text' },
  },
  args: {
    label: 'Select your skills',
    orientation: 'vertical',
    error: '',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => {
    const options = [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Stencil', value: 'stencil', checked: true },
    ];

    return html`
      <div style="padding: 2rem;">
        <nat-checkbox-group
          label=${args.label}
          orientation=${args.orientation}
          error=${args.error}
          options=${JSON.stringify(options)}
        ></nat-checkbox-group>
      </div>
    `;
  },
};
