import { newSpecPage } from '@stencil/core/testing';
import { NatIcon } from '../nat-icon';

describe('nat-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatIcon],
      html: `<nat-icon></nat-icon>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-icon>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-icon>
    `);
  });
});
