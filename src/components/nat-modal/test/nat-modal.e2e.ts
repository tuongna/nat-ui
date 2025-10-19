import { newE2EPage } from '@stencil/core/testing';

describe('nat-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-modal></nat-modal>');

    const element = await page.find('nat-modal');
    expect(element).toHaveClass('hydrated');
  });
});
