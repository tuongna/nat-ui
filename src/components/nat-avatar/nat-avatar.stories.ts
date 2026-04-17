import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Data Display/Avatar',
  component: 'nat-avatar',
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    initials: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'radio',
      options: ['circle', 'square'],
    },
  },
  args: {
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    alt: 'User profile picture',
    initials: 'AB',
    size: 'md',
    shape: 'circle',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-avatar
      src=${args.src}
      alt=${args.alt}
      initials=${args.initials}
      size=${args.size}
      shape=${args.shape}
    ></nat-avatar>
  `,
};

export const Initials: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <nat-avatar initials="JD" size="sm"></nat-avatar>
      <nat-avatar initials="UI" size="md"></nat-avatar>
      <nat-avatar initials="NK" size="lg"></nat-avatar>
    </div>
  `,
};

export const Square: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <nat-avatar shape="square" src="https://i.pravatar.cc/150?img=1" size="lg"></nat-avatar>
      <nat-avatar shape="square" initials="PR" size="lg"></nat-avatar>
    </div>
  `,
};
