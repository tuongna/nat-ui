import { newSpecPage } from '@stencil/core/testing';
import { NatTooltip } from '../nat-tooltip';

describe('nat-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatTooltip],
      html: `<nat-tooltip></nat-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-tooltip>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-tooltip>
    `);
  });
});
