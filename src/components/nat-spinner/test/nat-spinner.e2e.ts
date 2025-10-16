import { newE2EPage } from '@stencil/core/testing';

describe('nat-spinner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-spinner></nat-spinner>');

    const element = await page.find('nat-spinner');
    expect(element).toHaveClass('hydrated');
  });
});
