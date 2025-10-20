import { newE2EPage } from '@stencil/core/testing';

describe('nat-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-tabs></nat-tabs>');

    const element = await page.find('nat-tabs');
    expect(element).toHaveClass('hydrated');
  });
});
