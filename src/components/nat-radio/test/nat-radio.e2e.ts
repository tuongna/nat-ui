import { newE2EPage } from '@stencil/core/testing';

describe('nat-radio', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-radio></nat-radio>');

    const element = await page.find('nat-radio');
    expect(element).toHaveClass('hydrated');
  });
});
