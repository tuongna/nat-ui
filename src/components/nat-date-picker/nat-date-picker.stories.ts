import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/DatePicker',
  component: 'nat-date-picker',
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    glass: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="padding:24px; max-width:320px;">
      <nat-date-picker label="Select Date" placeholder="Pick a date…"></nat-date-picker>
    </div>
  `,
};

export const WithValue: Story = {
  render: () => html`
    <div style="padding:24px; max-width:320px;">
      <nat-date-picker label="Birthday" value="1995-08-24"></nat-date-picker>
    </div>
  `,
};

export const WithMinMax: Story = {
  render: () => {
    const today = new Date();
    const min = new Date(today); min.setDate(today.getDate() - 7);
    const max = new Date(today); max.setDate(today.getDate() + 30);
    const fmt = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    return html`
      <div style="padding:24px; max-width:320px;">
        <nat-date-picker
          label="Appointment Date"
          placeholder="Available dates only"
          min=${fmt(min)}
          max=${fmt(max)}
        ></nat-date-picker>
        <p style="margin-top:8px; font-size:12px; color:#888;">Range: ${fmt(min)} to ${fmt(max)}</p>
      </div>
    `;
  },
};

export const GlassPopup: Story = {
  render: () => html`
    <div style="padding:40px; background:linear-gradient(135deg,#667eea,#764ba2); border-radius:16px; max-width:400px;">
      <nat-date-picker
        glass
        label="Event Date"
        style="--nat-text-primary:white; --nat-text-secondary:rgba(255,255,255,0.7); --nat-border-base:rgba(255,255,255,0.3); --nat-bg-base:rgba(255,255,255,0.15);"
      ></nat-date-picker>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="padding:24px; max-width:320px; display:flex; flex-direction:column; gap:12px;">
      <nat-date-picker size="sm" placeholder="Small"></nat-date-picker>
      <nat-date-picker size="md" placeholder="Medium"></nat-date-picker>
      <nat-date-picker size="lg" placeholder="Large"></nat-date-picker>
    </div>
  `,
};
