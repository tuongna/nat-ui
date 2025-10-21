import { newE2EPage } from '@stencil/core/testing';

describe('nat-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-menu></nat-menu>');

    const element = await page.find('nat-menu');
    expect(element).toHaveClass('hydrated');
  });
});
