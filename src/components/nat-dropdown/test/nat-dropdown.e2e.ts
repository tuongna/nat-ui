import { newE2EPage } from '@stencil/core/testing';

describe('nat-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-dropdown></nat-dropdown>');

    const element = await page.find('nat-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
