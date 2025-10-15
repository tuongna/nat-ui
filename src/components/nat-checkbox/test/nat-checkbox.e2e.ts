import { newE2EPage } from '@stencil/core/testing';

describe('nat-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-checkbox></nat-checkbox>');

    const element = await page.find('nat-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
