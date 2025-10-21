import { newSpecPage } from '@stencil/core/testing';
import { NatMenu } from '../nat-menu';

describe('nat-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatMenu],
      html: `<nat-menu></nat-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-menu>
    `);
  });
});
