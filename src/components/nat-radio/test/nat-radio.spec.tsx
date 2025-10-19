import { newSpecPage } from '@stencil/core/testing';
import { NatRadio } from '../nat-radio';

describe('nat-radio', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatRadio],
      html: `<nat-radio></nat-radio>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-radio>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-radio>
    `);
  });
});
