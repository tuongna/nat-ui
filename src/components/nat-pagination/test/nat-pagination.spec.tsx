import { newSpecPage } from '@stencil/core/testing';
import { NatPagination } from '../nat-pagination';

describe('nat-pagination', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatPagination],
      html: `<nat-pagination></nat-pagination>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-pagination>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-pagination>
    `);
  });
});
