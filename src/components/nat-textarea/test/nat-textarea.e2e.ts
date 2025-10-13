import { newE2EPage } from '@stencil/core/testing';

describe('nat-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-textarea></nat-textarea>');

    const element = await page.find('nat-textarea');
    expect(element).toHaveClass('hydrated');
  });
});
