import { newE2EPage } from '@stencil/core/testing';

describe('nat-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-select></nat-select>');

    const element = await page.find('nat-select');
    expect(element).toHaveClass('hydrated');
  });
});
