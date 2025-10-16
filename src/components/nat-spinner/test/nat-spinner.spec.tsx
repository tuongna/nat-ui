import { newSpecPage } from '@stencil/core/testing';
import { NatSpinner } from '../nat-spinner';

describe('nat-spinner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatSpinner],
      html: `<nat-spinner></nat-spinner>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-spinner>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-spinner>
    `);
  });
});
