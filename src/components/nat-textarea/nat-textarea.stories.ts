import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Forms/Textarea',
  component: 'nat-textarea',
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    rows: { control: 'number' },
  },
  args: {
    label: 'Description',
    placeholder: 'Enter detailed description here...',
    disabled: false,
    error: false,
    rows: 4,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width: 400px; padding: 2rem;">
      <nat-textarea
        label=${args.label}
        placeholder=${args.placeholder}
        helper-text=${args.helperText || ''}
        ?error=${args.error}
        ?disabled=${args.disabled}
        rows=${args.rows}
      ></nat-textarea>
    </div>
  `,
};
