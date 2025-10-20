import { newE2EPage } from '@stencil/core/testing';

describe('nat-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-toast></nat-toast>');

    const element = await page.find('nat-toast');
    expect(element).toHaveClass('hydrated');
  });
});
