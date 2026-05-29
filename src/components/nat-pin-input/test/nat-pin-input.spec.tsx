import { newSpecPage } from '@stencil/core/testing';
import { NatPinInput } from '../nat-pin-input';

describe('nat-pin-input', () => {
  it('renders correct number of cells', async () => {
    const { root } = await newSpecPage({
      components: [NatPinInput],
      html: '<nat-pin-input length="4"></nat-pin-input>',
    });
    const cells = root.shadowRoot.querySelectorAll('.nat-pin__cell');
    expect(cells.length).toBe(4);
  });

  it('renders 6 cells by default', async () => {
    const { root } = await newSpecPage({
      components: [NatPinInput],
      html: '<nat-pin-input></nat-pin-input>',
    });
    const cells = root.shadowRoot.querySelectorAll('.nat-pin__cell');
    expect(cells.length).toBe(6);
  });

  it('applies invalid class', async () => {
    const { root } = await newSpecPage({
      components: [NatPinInput],
      html: '<nat-pin-input invalid></nat-pin-input>',
    });
    expect(root.shadowRoot.querySelector('.nat-pin--invalid')).toBeTruthy();
  });

  it('clears via method', async () => {
    const page = await newSpecPage({
      components: [NatPinInput],
      html: '<nat-pin-input></nat-pin-input>',
    });
    await (page.root as any).clear();
    const val = await (page.root as any).getValue();
    expect(val).toBe('');
  });
});
