import { newE2EPage } from '@stencil/core/testing';

describe('nat-checkbox-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-checkbox-group></nat-checkbox-group>');

    const element = await page.find('nat-checkbox-group');
    expect(element).toHaveClass('hydrated');
  });
});
