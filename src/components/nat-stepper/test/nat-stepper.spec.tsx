import { newSpecPage } from '@stencil/core/testing';
import { NatStepper } from '../nat-stepper';

describe('nat-stepper', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatStepper],
      html: `<nat-stepper></nat-stepper>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-stepper>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nat-stepper>
    `);
  });
});
