import { newSpecPage } from '@stencil/core/testing';
import { NatModal } from '../nat-modal';

describe('nat-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatModal],
      html: `<nat-modal></nat-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-modal>
    `);
  });
});
