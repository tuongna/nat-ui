import { newE2EPage } from '@stencil/core/testing';

describe('nat-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nat-table></nat-table>');

    const element = await page.find('nat-table');
    expect(element).toHaveClass('hydrated');
  });
});
