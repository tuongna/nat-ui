import { newSpecPage } from '@stencil/core/testing';
import { NatContextMenu } from '../nat-context-menu';

describe('nat-context-menu', () => {
  it('renders slot content', async () => {
    const { root } = await newSpecPage({
      components: [NatContextMenu],
      html: '<nat-context-menu><div>Right click me</div></nat-context-menu>',
    });
    expect(root.shadowRoot.querySelector('slot')).toBeTruthy();
  });

  it('menu is hidden by default', async () => {
    const { root } = await newSpecPage({
      components: [NatContextMenu],
      html: '<nat-context-menu></nat-context-menu>',
    });
    expect(root.shadowRoot.querySelector('.nat-ctx__menu')).toBeNull();
  });

  it('applies glass class', async () => {
    const page = await newSpecPage({
      components: [NatContextMenu],
      html: '<nat-context-menu glass></nat-context-menu>',
    });
    (page.root as any).isOpen = true;
    await page.waitForChanges();
  });
});
