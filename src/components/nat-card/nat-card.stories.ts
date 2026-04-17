import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Layout/Card',
  component: 'nat-card',
  argTypes: {
    interactive: { control: 'boolean' },
  },
  args: {
    interactive: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width: 400px;">
      <nat-card ?interactive=${args.interactive}>
        <div slot="header" style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; font-size: 1.125rem;">Project Status</h3>
          <nat-tag variant="success" shape="pill">On Track</nat-tag>
        </div>
        
        <p style="margin: 0; color: var(--nat-text-secondary, #4b5563);">
          The refactoring phase is proceeding smoothly. We have achieved 100% Storybook coverage.
        </p>
        
        <div slot="footer" style="display: flex; justify-content: flex-end;">
          <nat-button variant="primary">View Details</nat-button>
        </div>
      </nat-card>
    </div>
  `,
};
