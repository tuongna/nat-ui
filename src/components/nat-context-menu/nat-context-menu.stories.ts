import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/ContextMenu',
  component: 'nat-context-menu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Right-click context menu. Right-click on the target area to open.' },
    },
  },
};

export default meta;
type Story = StoryObj;

const menuItems = [
  { id: 'copy', label: 'Copy', icon: 'copy', shortcut: '⌘C' },
  { id: 'cut', label: 'Cut', icon: 'scissors', shortcut: '⌘X' },
  { id: 'paste', label: 'Paste', icon: 'clipboard', shortcut: '⌘V' },
  { id: 'sep1', separator: true },
  { id: 'rename', label: 'Rename', icon: 'edit-2', shortcut: 'F2' },
  { id: 'sep2', separator: true },
  { id: 'delete', label: 'Delete', icon: 'trash-2', danger: true, shortcut: '⌫' },
];

export const Default: Story = {
  render: () => html`
    <div style="padding:40px;">
      <nat-context-menu .items=${menuItems}>
        <div
          style="
            width:320px; height:200px;
            background:var(--nat-bg-subtle);
            border:2px dashed var(--nat-border-base);
            border-radius:12px;
            display:flex; align-items:center; justify-content:center;
            color:var(--nat-text-tertiary); font-size:14px; user-select:none;
          "
        >
          Right-click here
        </div>
      </nat-context-menu>
    </div>
  `,
};

export const GlassMenu: Story = {
  render: () => html`
    <div style="padding:40px; background:linear-gradient(135deg,#667eea,#764ba2); border-radius:16px;">
      <nat-context-menu glass .items=${menuItems}>
        <div
          style="
            width:320px; height:200px;
            background:rgba(255,255,255,0.15); backdrop-filter:blur(10px);
            border:1px solid rgba(255,255,255,0.25);
            border-radius:12px;
            display:flex; align-items:center; justify-content:center;
            color:rgba(255,255,255,0.8); font-size:14px; user-select:none;
          "
        >
          Right-click for glass menu
        </div>
      </nat-context-menu>
    </div>
  `,
};

export const WithSubmenus: Story = {
  render: () => html`
    <div style="padding:40px;">
      <nat-context-menu
        .items=${[
          { id: 'open', label: 'Open', icon: 'folder-open' },
          { id: 'open-with', label: 'Open With', icon: 'external-link', children: [
            { id: 'vs', label: 'VS Code', icon: 'code' },
            { id: 'notepad', label: 'Notepad', icon: 'file-text' },
            { id: 'browser', label: 'Browser', icon: 'globe' },
          ]},
          { id: 'sep', separator: true },
          { id: 'share', label: 'Share', icon: 'share-2' },
          { id: 'delete', label: 'Delete', icon: 'trash-2', danger: true },
        ]}
      >
        <div
          style="
            width:320px; height:200px;
            background:var(--nat-bg-subtle);
            border:2px dashed var(--nat-border-base);
            border-radius:12px;
            display:flex; align-items:center; justify-content:center;
            color:var(--nat-text-tertiary); font-size:14px;
          "
        >
          Right-click here (with sub-menus)
        </div>
      </nat-context-menu>
    </div>
  `,
};
