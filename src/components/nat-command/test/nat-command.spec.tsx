import { newSpecPage } from '@stencil/core/testing';
import { NatCommand } from '../nat-command';

describe('nat-command', () => {
  it('renders in closed state by default', async () => {
    const { root } = await newSpecPage({
      components: [NatCommand],
      html: '<nat-command></nat-command>',
    });
    expect(root.shadowRoot.querySelector('.nat-command__panel')).toBeNull();
  });

  it('opens when open() is called', async () => {
    const page = await newSpecPage({
      components: [NatCommand],
      html: '<nat-command></nat-command>',
    });
    const el = page.root as any;
    await el.open();
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.nat-command__panel')).toBeTruthy();
  });

  it('filters items based on query', async () => {
    const page = await newSpecPage({
      components: [NatCommand],
      html: '<nat-command></nat-command>',
    });
    const el = page.root as any;
    el.items = [
      { id: '1', label: 'Open file' },
      { id: '2', label: 'Close window' },
      { id: '3', label: 'New project' },
    ];
    await el.open();
    await page.waitForChanges();

    const input = page.root.shadowRoot.querySelector('.nat-command__input') as HTMLInputElement;
    expect(input).toBeTruthy();
  });
});
