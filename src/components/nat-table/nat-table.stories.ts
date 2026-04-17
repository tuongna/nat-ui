import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Data Display/Table',
  component: 'nat-table',
  argTypes: {
    striped: { control: 'boolean' },
    compact: { control: 'boolean' },
    hoverable: { control: 'boolean' },
  },
  args: {
    striped: false,
    compact: false,
    hoverable: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => {
    const columns = [
      { key: 'name', title: 'Name', sortable: true },
      { key: 'role', title: 'Role' },
      { key: 'status', title: 'Status' }
    ];
    const data = [
      { name: 'John Doe', role: 'Developer', status: 'Active' },
      { name: 'Jane Smith', role: 'Designer', status: 'Away' },
      { name: 'Bob Johnson', role: 'Manager', status: 'Active' }
    ];

    return html`
      <nat-table
        ?striped=${args.striped}
        ?compact=${args.compact}
        ?hoverable=${args.hoverable}
        columns=${JSON.stringify(columns)}
        data=${JSON.stringify(data)}
      ></nat-table>
    `;
  },
};
