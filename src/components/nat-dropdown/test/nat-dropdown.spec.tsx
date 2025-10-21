import { newSpecPage } from '@stencil/core/testing';
import { NatDropdown } from '../nat-dropdown';

describe('nat-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatDropdown],
      html: `<nat-dropdown></nat-dropdown>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-dropdown>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-dropdown>
    `);
  });
});
