import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/SegmentedControl',
  component: 'nat-segmented-control',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="padding:40px; display:flex; flex-direction:column; gap:24px; align-items:flex-start;">
      <nat-segmented-control
        value="week"
        .options=${[
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
          { value: 'year', label: 'Year' },
        ]}
      ></nat-segmented-control>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="padding:40px; display:flex; flex-direction:column; gap:20px; align-items:flex-start;">
      ${(['sm', 'md', 'lg'] as const).map(
        size => html`
          <nat-segmented-control
            size=${size}
            value="b"
            .options=${[
              { value: 'a', label: 'Option A' },
              { value: 'b', label: 'Option B' },
              { value: 'c', label: 'Option C' },
            ]}
          ></nat-segmented-control>
        `,
      )}
    </div>
  `,
};

export const Glass: Story = {
  render: () => html`
    <div style="padding:60px; background:linear-gradient(135deg,#667eea,#764ba2); border-radius:16px;">
      <nat-segmented-control
        glass
        value="explore"
        .options=${[
          { value: 'home', label: 'Home' },
          { value: 'explore', label: 'Explore' },
          { value: 'library', label: 'Library' },
        ]}
      ></nat-segmented-control>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <div style="padding:40px;">
      <nat-segmented-control
        value="grid"
        .options=${[
          { value: 'list', label: 'List', icon: 'list' },
          { value: 'grid', label: 'Grid', icon: 'grid' },
          { value: 'map', label: 'Map', icon: 'map' },
        ]}
      ></nat-segmented-control>
    </div>
  `,
};

export const FullWidth: Story = {
  render: () => html`
    <div style="padding:40px; max-width:480px;">
      <nat-segmented-control
        full-width
        value="all"
        .options=${[
          { value: 'all', label: 'All' },
          { value: 'active', label: 'Active' },
          { value: 'completed', label: 'Completed' },
        ]}
      ></nat-segmented-control>
    </div>
  `,
};
