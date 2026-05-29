import { newSpecPage } from '@stencil/core/testing';
import { NatNumberInput } from '../nat-number-input';

describe('nat-number-input', () => {
  it('renders with default value', async () => {
    const { root } = await newSpecPage({
      components: [NatNumberInput],
      html: '<nat-number-input value="5"></nat-number-input>',
    });
    expect(root.shadowRoot.querySelector('.nat-number-input')).toBeTruthy();
  });

  it('increments value on + click', async () => {
    const page = await newSpecPage({
      components: [NatNumberInput],
      html: '<nat-number-input value="5" step="1"></nat-number-input>',
    });
    let changed = false;
    let newVal = 0;
    page.root.addEventListener('natChange', (e: any) => { changed = true; newVal = e.detail; });

    const incBtn = page.root.shadowRoot.querySelector('.nat-number-input__btn--inc') as HTMLButtonElement;
    incBtn.click();
    await page.waitForChanges();

    expect(changed).toBe(true);
    expect(newVal).toBe(6);
  });

  it('decrements value on - click', async () => {
    const page = await newSpecPage({
      components: [NatNumberInput],
      html: '<nat-number-input value="5"></nat-number-input>',
    });
    let newVal = 0;
    page.root.addEventListener('natChange', (e: any) => { newVal = e.detail; });

    const decBtn = page.root.shadowRoot.querySelector('.nat-number-input__btn--dec') as HTMLButtonElement;
    decBtn.click();
    await page.waitForChanges();

    expect(newVal).toBe(4);
  });

  it('clamps to min/max', async () => {
    const page = await newSpecPage({
      components: [NatNumberInput],
      html: '<nat-number-input value="10" min="0" max="10"></nat-number-input>',
    });
    const incBtn = page.root.shadowRoot.querySelector('.nat-number-input__btn--inc') as HTMLButtonElement;
    expect(incBtn.hasAttribute('disabled')).toBe(true);
  });
});
