import { newSpecPage } from '@stencil/core/testing';
import { NatLiquidGlass } from '../nat-liquid-glass';

describe('nat-liquid-glass', () => {
  it('renders with default props', async () => {
    const { root } = await newSpecPage({
      components: [NatLiquidGlass],
      html: '<nat-liquid-glass></nat-liquid-glass>',
    });
    expect(root).toBeTruthy();
    expect(root.shadowRoot.querySelector('.nat-glass')).toBeTruthy();
  });

  it('applies variant class', async () => {
    const { root } = await newSpecPage({
      components: [NatLiquidGlass],
      html: '<nat-liquid-glass variant="crystal"></nat-liquid-glass>',
    });
    expect(root.shadowRoot.querySelector('.nat-glass--crystal')).toBeTruthy();
  });

  it('applies shape class', async () => {
    const { root } = await newSpecPage({
      components: [NatLiquidGlass],
      html: '<nat-liquid-glass shape="pill"></nat-liquid-glass>',
    });
    expect(root.shadowRoot.querySelector('.nat-glass--pill')).toBeTruthy();
  });

  it('has content slot', async () => {
    const { root } = await newSpecPage({
      components: [NatLiquidGlass],
      html: '<nat-liquid-glass><p>Hello</p></nat-liquid-glass>',
    });
    expect(root.shadowRoot.querySelector('.nat-glass__content')).toBeTruthy();
  });
});
