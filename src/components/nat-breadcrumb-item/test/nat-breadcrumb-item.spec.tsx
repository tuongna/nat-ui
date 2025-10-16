import { newSpecPage } from '@stencil/core/testing';
import { NatBreadcrumbItem } from '../nat-breadcrumb-item';

describe('nat-breadcrumb-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatBreadcrumbItem],
      html: `<nat-breadcrumb-item></nat-breadcrumb-item>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-breadcrumb-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-breadcrumb-item>
    `);
  });
});
