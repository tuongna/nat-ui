import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Navigation/Menu',
  component: 'nat-menu',
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
  },
  args: {
    orientation: 'vertical',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => {
    const items = [
      { label: 'Dashboard', icon: 'home', id: 'dashboard' },
      { label: 'Analytics', icon: 'pie-chart', id: 'analytics' },
      { label: 'Settings', icon: 'settings', id: 'settings', disabled: true },
      { type: 'divider' },
      { label: 'Logout', icon: 'log-out', id: 'logout', danger: true }
    ];

    return html`
      <div style="width: 250px; border: 1px solid var(--nat-border-base, #e5e7eb); border-radius: 8px; overflow: hidden;">
        <nat-menu
          orientation=${args.orientation}
          items=${JSON.stringify(items)}
        ></nat-menu>
      </div>
    `;
  },
};
