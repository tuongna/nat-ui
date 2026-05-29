import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Command',
  component: 'nat-command',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Command palette — keyboard-driven command menu. Press Cmd+K / Ctrl+K to open.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const sampleItems = [
  { id: '1', label: 'New File', description: 'Create a new file', icon: 'file-plus', group: 'File', shortcut: '⌘+N' },
  { id: '2', label: 'Open File', description: 'Open an existing file', icon: 'folder-open', group: 'File', shortcut: '⌘+O' },
  { id: '3', label: 'Save', description: 'Save the current file', icon: 'save', group: 'File', shortcut: '⌘+S' },
  { id: '4', label: 'Find & Replace', description: 'Search and replace text', icon: 'search', group: 'Edit', shortcut: '⌘+H' },
  { id: '5', label: 'Undo', description: 'Undo last action', icon: 'undo', group: 'Edit', shortcut: '⌘+Z' },
  { id: '6', label: 'Toggle Dark Mode', description: 'Switch between light and dark', icon: 'moon', group: 'View' },
  { id: '7', label: 'Command Palette', description: 'Open this command palette', icon: 'terminal', group: 'View', shortcut: '⌘+K' },
  { id: '8', label: 'Settings', description: 'Open application settings', icon: 'settings', group: 'App' },
  { id: '9', label: 'Sign Out', description: 'Sign out of your account', icon: 'log-out', group: 'App' },
];

export const Default: Story = {
  render: () => {
    return html`
      <div style="padding: 40px; text-align:center;">
        <p style="margin-bottom:16px; color:#666; font-size:14px;">Press <strong>Cmd+K</strong> (Mac) or <strong>Ctrl+K</strong> (Windows) to open</p>
        <nat-command
          .items=${sampleItems}
          placeholder="Type a command or search…"
          .globalShortcut=${true}
        ></nat-command>
        <nat-button variant="secondary" id="open-cmd">Open Command Palette</nat-button>
        <script>
          document.getElementById('open-cmd').addEventListener('natClick', () => {
            document.querySelector('nat-command').open();
          });
        </script>
      </div>
    `;
  },
};

export const WithTriggerButton: Story = {
  name: 'With Trigger Button',
  render: () => html`
    <div style="padding:40px; display:flex; justify-content:center;">
      <div id="cmd-story-2" style="display:inline-flex; align-items:center; gap:8px;">
        <nat-command
          id="cmd2"
          .items=${sampleItems}
          .globalShortcut=${false}
        ></nat-command>
        <nat-button variant="secondary" id="open-cmd2">
          <nat-icon name="search" size="16"></nat-icon>
          Search commands…
          <nat-kbd key="⌘K" size="sm" style="margin-left:8px;"></nat-kbd>
        </nat-button>
      </div>
      <script>
        setTimeout(() => {
          const btn = document.getElementById('open-cmd2');
          const cmd = document.getElementById('cmd2');
          btn && btn.addEventListener('natClick', () => cmd && cmd.open());
        }, 100);
      </script>
    </div>
  `,
};
