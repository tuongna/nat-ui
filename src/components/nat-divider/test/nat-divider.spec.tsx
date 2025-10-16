import { newSpecPage } from '@stencil/core/testing';
import { NatDivider } from '../nat-divider';

describe('nat-divider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatDivider],
      html: `<nat-divider></nat-divider>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-divider>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-divider>
    `);
  });
});
