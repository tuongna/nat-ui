import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Timeline',
  component: 'nat-timeline',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const items = [
  { id: '1', title: 'Project Created', subtitle: 'Jan 10, 2025', description: 'Repository initialized with initial commit.', status: 'default' as const },
  { id: '2', title: 'MVP Shipped', subtitle: 'Feb 28, 2025', description: 'First version deployed to production with core features.', status: 'success' as const },
  { id: '3', title: 'Outage Incident', subtitle: 'Mar 15, 2025', description: 'Database connection pool exhausted. Resolved in 2 hours.', status: 'error' as const },
  { id: '4', title: 'v2.0 Release', subtitle: 'Apr 5, 2025', description: 'Major redesign with new component library and performance improvements.', status: 'success' as const },
  { id: '5', title: 'Performance Warning', subtitle: 'Apr 22, 2025', description: 'P95 latency spiked to 800ms. Investigating.', status: 'warning' as const },
];

export const Default: Story = {
  render: () => html`
    <div style="padding:24px; max-width:480px;">
      <nat-timeline .items=${items}></nat-timeline>
    </div>
  `,
};

export const Numbered: Story = {
  render: () => html`
    <div style="padding:24px; max-width:480px;">
      <nat-timeline variant="numbered" .items=${items}></nat-timeline>
    </div>
  `,
};

export const Dashed: Story = {
  render: () => html`
    <div style="padding:24px; max-width:480px;">
      <nat-timeline dashed .items=${items}></nat-timeline>
    </div>
  `,
};

export const Icons: Story = {
  render: () => html`
    <div style="padding:24px; max-width:480px;">
      <nat-timeline
        variant="icon"
        .items=${[
          { id: '1', title: 'User Signed Up', subtitle: '10:00 AM', icon: 'user-plus', status: 'success' as const },
          { id: '2', title: 'Profile Updated', subtitle: '10:30 AM', icon: 'edit', status: 'info' as const },
          { id: '3', title: 'Payment Failed', subtitle: '11:15 AM', icon: 'alert-circle', status: 'error' as const },
          { id: '4', title: 'Subscription Renewed', subtitle: '2:00 PM', icon: 'refresh-cw', status: 'success' as const },
        ]}
      ></nat-timeline>
    </div>
  `,
};
