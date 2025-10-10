import { newE2EPage } from '@stencil/core/testing';

describe('nat-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-input></nat-input>');

    const element = await page.find('nat-input');
    expect(element).toHaveClass('hydrated');
  });
});
