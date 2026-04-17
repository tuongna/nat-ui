import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Input',
  component: 'nat-input',
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    clearable: { control: 'boolean' },
    icon: { control: 'text' },
  },
  args: {
    type: 'text',
    label: 'Username',
    placeholder: 'Enter your username',
    disabled: false,
    error: false,
    required: false,
    clearable: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-input
      type=${args.type}
      label=${args.label}
      placeholder=${args.placeholder}
      helper-text=${args.helperText || ''}
      ?error=${args.error}
      ?disabled=${args.disabled}
      ?required=${args.required}
      ?clearable=${args.clearable}
      icon=${args.icon || ''}
    ></nat-input>
  `,
};

export const WithError: Story = {
  args: {
    error: true,
    helperText: 'Username is already taken',
  },
  render: (args) => html`
    <nat-input
      label=${args.label}
      placeholder=${args.placeholder}
      helper-text=${args.helperText}
      ?error=${args.error}
    ></nat-input>
  `,
};

export const WithIcon: Story = {
  args: {
    icon: 'search',
    label: 'Search',
    placeholder: 'Search documentation...',
  },
  render: (args) => html`
    <nat-input
      label=${args.label}
      placeholder=${args.placeholder}
      icon=${args.icon}
    ></nat-input>
  `,
};
