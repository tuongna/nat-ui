import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Navigation/Tabs',
  component: 'nat-tabs',
  argTypes: {
    activeTab: { control: 'text' },
  },
  args: {
    activeTab: 'tab2',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => {
    const tabs = [
      { id: 'tab1', label: 'Overview', icon: 'pie-chart' },
      { id: 'tab2', label: 'Integrations', icon: 'box' },
      { id: 'tab3', label: 'Billing', icon: 'credit-card', disabled: true },
      { id: 'tab4', label: 'Settings', icon: 'settings' },
    ];

    return html`
      <div style="margin-bottom: 2rem;">
        <nat-tabs
          active-tab=${args.activeTab}
          tabs=${JSON.stringify(tabs)}
        ></nat-tabs>
      </div>
      
      <div style="padding: 1rem; border: 1px solid var(--nat-border-base, #e5e7eb); border-radius: 8px;">
        <em>Selected tab content will be rendered here.</em>
      </div>
    `;
  },
};
