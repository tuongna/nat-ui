import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Skeleton',
  component: 'nat-skeleton',
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'rect', 'circle'],
    },
    animated: { control: 'boolean' },
    width: { control: 'text' },
    height: { control: 'text' },
  },
  args: {
    variant: 'text',
    animated: true,
    width: '',
    height: '',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-skeleton
      variant=${args.variant}
      ?animated=${args.animated}
      width=${args.width}
      height=${args.height}
    ></nat-skeleton>
  `,
};

export const ProfileCard: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center; max-width: 300px; padding: 1rem; border: 1px solid var(--nat-border-base, #e5e7eb); border-radius: 8px;">
      <nat-skeleton variant="circle"></nat-skeleton>
      <div style="flex: 1;">
        <nat-skeleton variant="text" width="60%"></nat-skeleton>
        <nat-skeleton variant="text" width="40%"></nat-skeleton>
      </div>
    </div>
  `,
};

export const Article: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      <nat-skeleton variant="rect" height="150px" style="margin-bottom: 1rem;"></nat-skeleton>
      <nat-skeleton variant="text"></nat-skeleton>
      <nat-skeleton variant="text"></nat-skeleton>
      <nat-skeleton variant="text" width="80%"></nat-skeleton>
    </div>
  `,
};
