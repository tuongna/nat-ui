import { newSpecPage } from '@stencil/core/testing';
import { NatAvatar } from '../nat-avatar';

describe('nat-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatAvatar],
      html: `<nat-avatar></nat-avatar>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-avatar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-avatar>
    `);
  });
});
