import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Navigation/Stepper',
  component: 'nat-stepper',
  argTypes: {
    currentStep: { control: 'number' },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    currentStep: 2,
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => {
    const steps = [
      { title: 'Account Details', description: 'Enter your credentials' },
      { title: 'Personal Info', description: 'Tell us about yourself' },
      { title: 'Payment', description: 'Add billing info' },
      { title: 'Confirm', description: 'Finalize registration' },
    ];

    return html`
      <div style="padding: 2rem;">
        <nat-stepper
          current-step=${args.currentStep}
          orientation=${args.orientation}
          steps=${JSON.stringify(steps)}
        ></nat-stepper>
      </div>
    `;
  },
};
