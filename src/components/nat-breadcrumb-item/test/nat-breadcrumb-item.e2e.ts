import { newE2EPage } from '@stencil/core/testing';

describe('nat-breadcrumb-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-breadcrumb-item></nat-breadcrumb-item>');

    const element = await page.find('nat-breadcrumb-item');
    expect(element).toHaveClass('hydrated');
  });
});
