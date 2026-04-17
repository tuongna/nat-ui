import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Select',
  component: 'nat-select',
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    searchable: { control: 'boolean' },
  },
  args: {
    label: 'Framework',
    placeholder: 'Select a framework',
    disabled: false,
    error: false,
    searchable: false,
  },
};

export default meta;
type Story = StoryObj;

const defaultOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'stencil', label: 'Stencil' },
];

export const Default: Story = {
  render: (args) => {
    // Note: In Storybook lit environments, complex properties like arrays 
    // are best passed as JSON strings or set via properties after render.
    // For Stencil components in lit, we can pass it as a JSON string to a custom property 
    // but Stencil usually parses arrays if we use JSON.stringify.
    return html`
      <nat-select
        label=${args.label}
        placeholder=${args.placeholder}
        ?error=${args.error}
        ?disabled=${args.disabled}
        ?searchable=${args.searchable}
        options=${JSON.stringify(defaultOptions)}
      ></nat-select>
    `;
  },
};

export const Searchable: Story = {
  args: {
    searchable: true,
  },
  render: (args) => html`
    <nat-select
      label=${args.label}
      placeholder=${args.placeholder}
      ?searchable=${args.searchable}
      options=${JSON.stringify(defaultOptions)}
    ></nat-select>
  `,
};
