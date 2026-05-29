import { newSpecPage } from '@stencil/core/testing';
import { NatDatePicker } from '../nat-date-picker';

describe('nat-date-picker', () => {
  it('renders trigger input', async () => {
    const { root } = await newSpecPage({
      components: [NatDatePicker],
      html: '<nat-date-picker></nat-date-picker>',
    });
    expect(root.shadowRoot.querySelector('.nat-dp__input')).toBeTruthy();
  });

  it('shows placeholder when no value', async () => {
    const { root } = await newSpecPage({
      components: [NatDatePicker],
      html: '<nat-date-picker placeholder="Pick a date"></nat-date-picker>',
    });
    const display = root.shadowRoot.querySelector('.nat-dp__display');
    expect(display.textContent).toContain('Pick a date');
  });

  it('formats selected value', async () => {
    const { root } = await newSpecPage({
      components: [NatDatePicker],
      html: '<nat-date-picker value="2025-06-15"></nat-date-picker>',
    });
    const display = root.shadowRoot.querySelector('.nat-dp__display');
    expect(display.textContent).toContain('2025');
  });

  it('opens calendar on click', async () => {
    const page = await newSpecPage({
      components: [NatDatePicker],
      html: '<nat-date-picker></nat-date-picker>',
    });
    const input = page.root.shadowRoot.querySelector('.nat-dp__input') as HTMLElement;
    input.click();
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.nat-dp__popup')).toBeTruthy();
  });
});
