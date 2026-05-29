import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Autocomplete',
  component: 'nat-autocomplete',
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    multiple: { control: 'boolean' },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

const countries = [
  { value: 'us', label: 'United States', description: 'North America' },
  { value: 'uk', label: 'United Kingdom', description: 'Europe' },
  { value: 'ca', label: 'Canada', description: 'North America' },
  { value: 'au', label: 'Australia', description: 'Oceania' },
  { value: 'de', label: 'Germany', description: 'Europe' },
  { value: 'fr', label: 'France', description: 'Europe' },
  { value: 'jp', label: 'Japan', description: 'Asia' },
  { value: 'kr', label: 'South Korea', description: 'Asia' },
  { value: 'br', label: 'Brazil', description: 'South America' },
  { value: 'in', label: 'India', description: 'Asia' },
];

export const Default: Story = {
  render: () => html`
    <div style="padding:24px; max-width:320px;">
      <nat-autocomplete
        label="Country"
        placeholder="Search countries…"
        .options=${countries}
      ></nat-autocomplete>
    </div>
  `,
};

export const Multiple: Story = {
  render: () => html`
    <div style="padding:24px; max-width:400px;">
      <nat-autocomplete
        label="Select countries"
        placeholder="Add countries…"
        multiple
        .options=${countries}
      ></nat-autocomplete>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="padding:24px; max-width:320px; display:flex; flex-direction:column; gap:16px;">
      ${(['sm', 'md', 'lg'] as const).map(
        size => html`
          <nat-autocomplete
            size=${size}
            placeholder="Search…"
            .options=${countries}
          ></nat-autocomplete>
        `,
      )}
    </div>
  `,
};
