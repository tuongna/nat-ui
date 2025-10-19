import { newE2EPage } from '@stencil/core/testing';

describe('nat-switch', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-switch></nat-switch>');

    const element = await page.find('nat-switch');
    expect(element).toHaveClass('hydrated');
  });
});
