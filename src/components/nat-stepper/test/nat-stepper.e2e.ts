import { newE2EPage } from '@stencil/core/testing';

describe('nat-stepper', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-stepper></nat-stepper>');

    const element = await page.find('nat-stepper');
    expect(element).toHaveClass('hydrated');
  });
});
