import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Data Display/List',
  component: 'nat-list',
  argTypes: {
    striped: { control: 'boolean' },
    divided: { control: 'boolean' },
  },
  args: {
    striped: false,
    divided: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => {
    const items = [
      { id: 1, title: 'Check emails', description: 'Read daily newsletter' },
      { id: 2, title: 'Meeting with the team', description: 'Design sync at 10 AM' },
      { id: 3, title: 'Code review', description: 'Review nat-ui pull requests' },
    ];

    return html`
      <div style="max-width: 500px; border: 1px solid var(--nat-border-base, #e5e7eb); border-radius: 8px;">
        <nat-list
          ?striped=${args.striped}
          ?divided=${args.divided}
          items=${JSON.stringify(items)}
        ></nat-list>
      </div>
    `;
  },
};
