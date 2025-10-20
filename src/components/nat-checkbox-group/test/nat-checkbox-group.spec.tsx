import { newSpecPage } from '@stencil/core/testing';
import { NatCheckboxGroup } from '../nat-checkbox-group';

describe('nat-checkbox-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatCheckboxGroup],
      html: `<nat-checkbox-group></nat-checkbox-group>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-checkbox-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-checkbox-group>
    `);
  });
});
