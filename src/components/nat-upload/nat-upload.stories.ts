import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Upload',
  component: 'nat-upload',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'minimal', 'glass'] },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showPreviews: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="padding:24px; max-width:480px;">
      <nat-upload
        label="Drop files here or click to browse"
        hint="PNG, JPG, PDF up to 10MB"
        multiple
      ></nat-upload>
    </div>
  `,
};

export const ImageOnly: Story = {
  name: 'Images Only',
  render: () => html`
    <div style="padding:24px; max-width:480px;">
      <nat-upload
        accept="image/*"
        multiple
        label="Upload images"
        hint="PNG, JPG, GIF, WebP"
        .maxSize=${10 * 1024 * 1024}
      ></nat-upload>
    </div>
  `,
};

export const Glass: Story = {
  render: () => html`
    <div style="padding:40px; background:linear-gradient(135deg, #667eea, #764ba2); border-radius:16px; max-width:480px;">
      <nat-upload
        variant="glass"
        label="Drop your files here"
        hint="Any format supported"
        multiple
      ></nat-upload>
    </div>
  `,
};

export const Minimal: Story = {
  render: () => html`
    <div style="padding:24px; max-width:480px;">
      <nat-upload variant="minimal" label="Attach file"></nat-upload>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="padding:24px; max-width:480px;">
      <nat-upload disabled label="Upload disabled"></nat-upload>
    </div>
  `,
};
