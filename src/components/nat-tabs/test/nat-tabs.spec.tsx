import { newSpecPage } from '@stencil/core/testing';
import { NatTabs } from '../nat-tabs';

describe('nat-tabs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatTabs],
      html: `<nat-tabs></nat-tabs>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-tabs>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-tabs>
    `);
  });
});
