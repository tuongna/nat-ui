import { newE2EPage } from '@stencil/core/testing';

describe('nat-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-pagination></nat-pagination>');

    const element = await page.find('nat-pagination');
    expect(element).toHaveClass('hydrated');
  });
});
