import { newSpecPage } from '@stencil/core/testing';
import { NatSwitch } from '../nat-switch';

describe('nat-switch', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatSwitch],
      html: `<nat-switch></nat-switch>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-switch>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-switch>
    `);
  });
});
