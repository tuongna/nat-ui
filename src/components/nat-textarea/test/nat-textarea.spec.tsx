import { newSpecPage } from '@stencil/core/testing';
import { NatTextarea } from '../nat-textarea';

describe('nat-textarea', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatTextarea],
      html: `<nat-textarea></nat-textarea>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-textarea>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-textarea>
    `);
  });
});
