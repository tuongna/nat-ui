import { newSpecPage } from '@stencil/core/testing';
import { NatBreadcrumb } from '../nat-breadcrumb';

describe('nat-breadcrumb', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatBreadcrumb],
      html: `<nat-breadcrumb></nat-breadcrumb>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-breadcrumb>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-breadcrumb>
    `);
  });
});
