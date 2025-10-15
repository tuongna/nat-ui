import { newE2EPage } from '@stencil/core/testing';

describe('nat-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-icon></nat-icon>');

    const element = await page.find('nat-icon');
    expect(element).toHaveClass('hydrated');
  });
});
