import { newSpecPage } from '@stencil/core/testing';
import { NatTable } from '../nat-table';

describe('nat-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatTable],
      html: `<nat-table></nat-table>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-table>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-table>
    `);
  });
});
