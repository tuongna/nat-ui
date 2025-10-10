import { newE2EPage } from '@stencil/core/testing';

describe('nat-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-button></nat-button>');

    const element = await page.find('nat-button');
    expect(element).toHaveClass('hydrated');
  });
});
