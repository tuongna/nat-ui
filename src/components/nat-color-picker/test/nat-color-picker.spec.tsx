import { newSpecPage } from '@stencil/core/testing';
import { NatColorPicker } from '../nat-color-picker';

describe('nat-color-picker', () => {
  it('renders with default value', async () => {
    const { root } = await newSpecPage({
      components: [NatColorPicker],
      html: '<nat-color-picker></nat-color-picker>',
    });
    expect(root.shadowRoot.querySelector('.nat-cp')).toBeTruthy();
    expect(root.shadowRoot.querySelector('.nat-cp__spectrum')).toBeTruthy();
  });

  it('renders hex input', async () => {
    const { root } = await newSpecPage({
      components: [NatColorPicker],
      html: '<nat-color-picker value="#ff0000"></nat-color-picker>',
    });
    const input = root.shadowRoot.querySelector('.nat-cp__hex-input') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value.toUpperCase()).toBe('FF0000');
  });

  it('renders swatches', async () => {
    const { root } = await newSpecPage({
      components: [NatColorPicker],
      html: '<nat-color-picker show-swatches></nat-color-picker>',
    });
    const swatches = root.shadowRoot.querySelectorAll('.nat-cp__swatch');
    expect(swatches.length).toBeGreaterThan(0);
  });

  it('applies glass class', async () => {
    const { root } = await newSpecPage({
      components: [NatColorPicker],
      html: '<nat-color-picker glass></nat-color-picker>',
    });
    expect(root.shadowRoot.querySelector('.nat-cp--glass')).toBeTruthy();
  });
});
