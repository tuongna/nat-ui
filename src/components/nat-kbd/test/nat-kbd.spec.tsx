import { newSpecPage } from '@stencil/core/testing';
import { NatKbd } from '../nat-kbd';

describe('nat-kbd', () => {
  it('renders with text key', async () => {
    const { root } = await newSpecPage({
      components: [NatKbd],
      html: '<nat-kbd key-label="Enter"></nat-kbd>',
    });
    expect(root.shadowRoot.querySelector('.nat-kbd')).toBeTruthy();
    expect(root.shadowRoot.querySelector('.nat-kbd').textContent).toContain('Enter');
  });

  it('renders mac symbol for cmd key', async () => {
    const { root } = await newSpecPage({
      components: [NatKbd],
      html: '<nat-kbd key-label="cmd" mac></nat-kbd>',
    });
    expect(root.shadowRoot.querySelector('.nat-kbd').textContent).toContain('⌘');
  });

  it('applies size class', async () => {
    const { root } = await newSpecPage({
      components: [NatKbd],
      html: '<nat-kbd size="lg" key-label="K"></nat-kbd>',
    });
    expect(root.shadowRoot.querySelector('.nat-kbd--lg')).toBeTruthy();
  });
});
