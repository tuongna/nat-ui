import { newE2EPage } from '@stencil/core/testing';

describe('nat-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-card></nat-card>');

    const element = await page.find('nat-card');
    expect(element).toHaveClass('hydrated');
  });
});
