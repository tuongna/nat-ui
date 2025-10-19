import { newE2EPage } from '@stencil/core/testing';

describe('nat-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-tooltip></nat-tooltip>');

    const element = await page.find('nat-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});
