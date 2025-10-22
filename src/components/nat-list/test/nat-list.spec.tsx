import { newSpecPage } from '@stencil/core/testing';
import { NatList } from '../nat-list';

describe('nat-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatList],
      html: `<nat-list></nat-list>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-list>
    `);
  });
});
