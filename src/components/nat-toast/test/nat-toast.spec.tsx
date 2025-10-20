import { newSpecPage } from '@stencil/core/testing';
import { NatToast } from '../nat-toast';

describe('nat-toast', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatToast],
      html: `<nat-toast></nat-toast>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-toast>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-toast>
    `);
  });
});
