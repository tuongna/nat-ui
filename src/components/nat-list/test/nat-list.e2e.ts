import { newE2EPage } from '@stencil/core/testing';

describe('nat-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-list></nat-list>');

    const element = await page.find('nat-list');
    expect(element).toHaveClass('hydrated');
  });
});
