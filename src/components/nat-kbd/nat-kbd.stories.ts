import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Kbd',
  component: 'nat-kbd',
  tags: ['autodocs'],
  argTypes: {
    key: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    mac: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { key: 'Enter', size: 'md' },
  render: args => html`<nat-kbd key-label=${args.key} size=${args.size}></nat-kbd>`,
};

export const MacSymbols: Story = {
  render: () => html`
    <div style="padding:24px; display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
      ${['cmd', 'shift', 'opt', 'ctrl'].map(
        key => html`<nat-kbd key-label=${key} mac></nat-kbd>`,
      )}
    </div>
  `,
};

export const Shortcuts: Story = {
  render: () => html`
    <div style="padding:24px; display:flex; flex-direction:column; gap:12px;">
      ${[
        { label: 'Save', keys: ['cmd', 'S'] },
        { label: 'Find', keys: ['cmd', 'F'] },
        { label: 'Undo', keys: ['cmd', 'Z'] },
        { label: 'Copy', keys: ['cmd', 'C'] },
        { label: 'Force quit', keys: ['cmd', 'opt', 'Esc'] },
      ].map(
        ({ label, keys }) => html`
          <div style="display:flex; align-items:center; gap:8px; font-size:14px;">
            <span style="width:100px; color:#374151;">${label}</span>
            <div style="display:flex; gap:3px; align-items:center;">
              ${keys.map((k, i) => html`
                ${i > 0 ? html`<span style="color:#9ca3af;">+</span>` : ''}
                <nat-kbd key-label=${k} mac></nat-kbd>
              `)}
            </div>
          </div>
        `,
      )}
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="padding:24px; display:flex; gap:12px; align-items:center;">
      <nat-kbd key="K" size="sm"></nat-kbd>
      <nat-kbd key="K" size="md"></nat-kbd>
      <nat-kbd key="K" size="lg"></nat-kbd>
    </div>
  `,
};
