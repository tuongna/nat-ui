import { newE2EPage } from '@stencil/core/testing';

describe('nat-alert', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-alert></nat-alert>');

    const element = await page.find('nat-alert');
    expect(element).toHaveClass('hydrated');
  });
});
