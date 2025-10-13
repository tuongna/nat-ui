import { newSpecPage } from '@stencil/core/testing';
import { NatSelect } from '../nat-select';

describe('nat-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatSelect],
      html: `<nat-select></nat-select>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-select>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-select>
    `);
  });
});
