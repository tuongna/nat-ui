import { newE2EPage } from '@stencil/core/testing';

describe('nat-popover', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-popover></nat-popover>');

    const element = await page.find('nat-popover');
    expect(element).toHaveClass('hydrated');
  });
});
