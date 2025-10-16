import { newSpecPage } from '@stencil/core/testing';
import { NatLogo } from '../nat-logo';

describe('nat-logo', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatLogo],
      html: `<nat-logo></nat-logo>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-logo>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-logo>
    `);
  });
});
