import { newSpecPage } from '@stencil/core/testing';
import { NatBadge } from '../nat-badge';

describe('nat-badge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatBadge],
      html: `<nat-badge></nat-badge>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-badge>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-badge>
    `);
  });
});
