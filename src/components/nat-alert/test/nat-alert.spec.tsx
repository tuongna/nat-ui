import { newSpecPage } from '@stencil/core/testing';
import { NatAlert } from '../nat-alert';

describe('nat-alert', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatAlert],
      html: `<nat-alert></nat-alert>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-alert>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-alert>
    `);
  });
});
