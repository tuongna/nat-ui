import { newSpecPage } from '@stencil/core/testing';
import { NatCard } from '../nat-card';

describe('nat-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatCard],
      html: `<nat-card></nat-card>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-card>
    `);
  });
});
