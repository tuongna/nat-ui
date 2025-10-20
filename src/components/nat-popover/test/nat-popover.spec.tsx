import { newSpecPage } from '@stencil/core/testing';
import { NatPopover } from '../nat-popover';

describe('nat-popover', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatPopover],
      html: `<nat-popover></nat-popover>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-popover>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-popover>
    `);
  });
});
