import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Sheet',
  component: 'nat-sheet',
  tags: ['autodocs'],
  argTypes: {
    position: { control: 'select', options: ['bottom', 'right', 'left'] },
    glass: { control: 'boolean' },
    dismissible: { control: 'boolean' },
    showHandle: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const BottomSheet: Story = {
  render: () => html`
    <div style="padding:40px;">
      <nat-button variant="primary" id="open-bottom">Open Bottom Sheet</nat-button>
      <nat-sheet id="sheet-bottom" position="bottom" heading="Bottom Sheet">
        <p>This is a bottom sheet — swipe-up panel popular in mobile UIs.</p>
        <p>Tap the backdrop or press Esc to close.</p>
      </nat-sheet>
      <script>
        setTimeout(() => {
          document.getElementById('open-bottom')?.addEventListener('natClick', () => {
            document.getElementById('sheet-bottom').open = true;
          });
        }, 100);
      </script>
    </div>
  `,
};

export const RightSideSheet: Story = {
  render: () => html`
    <div style="padding:40px;">
      <nat-button variant="primary" id="open-right">Open Side Sheet</nat-button>
      <nat-sheet id="sheet-right" position="right" heading="Settings" sheet-width="360px">
        <div style="display:flex; flex-direction:column; gap:16px;">
          <nat-switch label="Dark Mode"></nat-switch>
          <nat-switch label="Notifications" value></nat-switch>
          <nat-switch label="Analytics"></nat-switch>
        </div>
      </nat-sheet>
      <script>
        setTimeout(() => {
          document.getElementById('open-right')?.addEventListener('natClick', () => {
            document.getElementById('sheet-right').open = true;
          });
        }, 100);
      </script>
    </div>
  `,
};

export const GlassSheet: Story = {
  render: () => html`
    <div style="min-height:200px; background:linear-gradient(135deg,#667eea,#764ba2); border-radius:16px; padding:40px;">
      <nat-button variant="ghost" id="open-glass" style="color:white; border-color:rgba(255,255,255,0.4);">Open Glass Sheet</nat-button>
      <nat-sheet id="sheet-glass" position="bottom" glass heading="Apple Glass Style" show-handle>
        <p style="color:var(--nat-text-secondary);">Glass sheet with liquid glass aesthetic and backdrop blur.</p>
      </nat-sheet>
      <script>
        setTimeout(() => {
          document.getElementById('open-glass')?.addEventListener('natClick', () => {
            document.getElementById('sheet-glass').open = true;
          });
        }, 100);
      </script>
    </div>
  `,
};
