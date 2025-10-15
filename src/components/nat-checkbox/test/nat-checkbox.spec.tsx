import { newSpecPage } from '@stencil/core/testing';
import { NatCheckbox } from '../nat-checkbox';

describe('nat-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatCheckbox],
      html: `<nat-checkbox></nat-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-checkbox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-checkbox>
    `);
  });
});
