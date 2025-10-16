import { newE2EPage } from '@stencil/core/testing';

describe('nat-breadcrumb', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-breadcrumb></nat-breadcrumb>');

    const element = await page.find('nat-breadcrumb');
    expect(element).toHaveClass('hydrated');
  });
});
