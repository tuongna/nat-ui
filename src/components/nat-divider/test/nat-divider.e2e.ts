import { newE2EPage } from '@stencil/core/testing';

describe('nat-divider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-divider></nat-divider>');

    const element = await page.find('nat-divider');
    expect(element).toHaveClass('hydrated');
  });
});
