import { newE2EPage } from '@stencil/core/testing';

describe('nat-logo', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-logo></nat-logo>');

    const element = await page.find('nat-logo');
    expect(element).toHaveClass('hydrated');
  });
});
