import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/LiquidGlass',
  component: 'nat-liquid-glass',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Apple Liquid Glass surface — a frosted glass panel with WebGL-powered caustic light, iridescent edge shimmer, and animated specular highlights. Inspired by Apple macOS/iOS 26 liquid glass design language.',
      },
    },
    backgrounds: {
      default: 'gradient',
      values: [
        { name: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' },
        { name: 'nature', value: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
        { name: 'sunset', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #fda085 100%)' },
        { name: 'ocean', value: 'linear-gradient(135deg, #667eea 0%, #06beb6 100%)' },
      ],
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['frosted', 'liquid', 'crystal', 'aurora'],
      description: 'Visual style of the glass surface',
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill', 'square'],
    },
    intensity: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Intensity of the WebGL glass overlay (0–1)',
    },
    animated: {
      control: 'boolean',
      description: 'Enable WebGL caustic animation',
    },
    tint: {
      control: 'color',
      description: 'Optional color tint',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Frosted: Story = {
  args: { variant: 'frosted', shape: 'rounded', intensity: 0.7, animated: true },
  render: args => html`
    <div style="padding: 60px; display: flex; justify-content: center;">
      <nat-liquid-glass
        variant=${args.variant}
        shape=${args.shape}
        intensity=${args.intensity}
        ?animated=${args.animated}
        style="width: 340px;"
      >
        <h2 style="margin:0 0 8px; font-size:20px; font-weight:600; color: rgba(255,255,255,0.95);">Frosted Glass</h2>
        <p style="margin:0; font-size:14px; color: rgba(255,255,255,0.75); line-height:1.6;">
          WebGL-powered caustic light patterns with iridescent edge shimmer.
          Inspired by Apple Liquid Glass UI.
        </p>
      </nat-liquid-glass>
    </div>
  `,
};

export const Crystal: Story = {
  args: { variant: 'crystal', shape: 'rounded', intensity: 0.8, animated: true },
  render: args => html`
    <div style="padding: 60px; display: flex; justify-content: center;">
      <nat-liquid-glass
        variant=${args.variant}
        shape=${args.shape}
        intensity=${args.intensity}
        ?animated=${args.animated}
        style="width: 340px;"
      >
        <h2 style="margin:0 0 8px; font-size:20px; font-weight:600; color: rgba(255,255,255,0.95);">Crystal</h2>
        <p style="margin:0; font-size:14px; color: rgba(255,255,255,0.8); line-height:1.6;">
          High-clarity crystal glass with deep blue-tinted refraction and enhanced saturation.
        </p>
      </nat-liquid-glass>
    </div>
  `,
};

export const Aurora: Story = {
  args: { variant: 'aurora', shape: 'rounded', intensity: 0.7, animated: true },
  render: args => html`
    <div style="padding: 60px; display: flex; justify-content: center;">
      <nat-liquid-glass
        variant=${args.variant}
        shape=${args.shape}
        intensity=${args.intensity}
        ?animated=${args.animated}
        style="width: 340px;"
      >
        <h2 style="margin:0 0 8px; font-size:20px; font-weight:600; color: rgba(255,255,255,0.95);">Aurora</h2>
        <p style="margin:0; font-size:14px; color: rgba(255,255,255,0.8); line-height:1.6;">
          Shifting pastel aurora gradients animate beneath the glass surface for a vibrant effect.
        </p>
      </nat-liquid-glass>
    </div>
  `,
};

export const Pill: Story = {
  args: { variant: 'frosted', shape: 'pill', intensity: 0.7, animated: true },
  render: args => html`
    <div style="padding: 60px; display: flex; justify-content: center;">
      <nat-liquid-glass
        variant=${args.variant}
        shape=${args.shape}
        intensity=${args.intensity}
        ?animated=${args.animated}
        style="max-width: 280px;"
      >
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-size:20px;">🎵</span>
          <div>
            <div style="font-size:13px; font-weight:600; color:rgba(255,255,255,0.95);">Now Playing</div>
            <div style="font-size:11px; color:rgba(255,255,255,0.7);">Starlight — Taylor Swift</div>
          </div>
        </div>
      </nat-liquid-glass>
    </div>
  `,
};

export const NavBar: Story = {
  name: 'Navigation Bar',
  render: () => html`
    <div style="padding: 40px; display:flex; flex-direction:column; align-items:center; gap:20px;">
      <nat-liquid-glass variant="liquid" shape="pill" intensity="0.75" animated style="width:fit-content;">
        <nav style="display:flex; gap:8px; align-items:center; padding: 0 8px;">
          ${['Home', 'Explore', 'Library', 'Profile'].map(
            label => html`
              <button style="background:transparent; border:none; padding:8px 16px; border-radius:100px; font-size:14px; font-weight:500; color:rgba(255,255,255,0.85); cursor:pointer;">
                ${label}
              </button>
            `,
          )}
        </nav>
      </nat-liquid-glass>
    </div>
  `,
};

export const CardGrid: Story = {
  name: 'Card Grid',
  render: () => html`
    <div style="padding:40px; display:grid; grid-template-columns: repeat(3, 1fr); gap:16px;">
      ${(['frosted', 'crystal', 'aurora'] as const).map(
        variant => html`
          <nat-liquid-glass variant=${variant} intensity="0.65" animated>
            <div style="text-align:center;">
              <div style="font-size:32px; margin-bottom:8px;">
                ${variant === 'frosted' ? '❄️' : variant === 'crystal' ? '💎' : '🌌'}
              </div>
              <div style="font-size:14px; font-weight:600; color:rgba(255,255,255,0.9); text-transform:capitalize;">${variant}</div>
            </div>
          </nat-liquid-glass>
        `,
      )}
    </div>
  `,
};
