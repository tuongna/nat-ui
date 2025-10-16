import { newE2EPage } from '@stencil/core/testing';

describe('nat-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-badge></nat-badge>');

    const element = await page.find('nat-badge');
    expect(element).toHaveClass('hydrated');
  });
});
