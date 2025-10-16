import { newE2EPage } from '@stencil/core/testing';

describe('nat-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-avatar></nat-avatar>');

    const element = await page.find('nat-avatar');
    expect(element).toHaveClass('hydrated');
  });
});
