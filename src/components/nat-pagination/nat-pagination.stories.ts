import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Navigation/Pagination',
  component: 'nat-pagination',
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    siblingCount: { control: 'number' },
  },
  args: {
    currentPage: 5,
    totalPages: 10,
    siblingCount: 1,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-pagination
      current-page=${args.currentPage}
      total-pages=${args.totalPages}
      sibling-count=${args.siblingCount}
    ></nat-pagination>
  `,
};
