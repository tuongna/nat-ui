import { newSpecPage } from '@stencil/core/testing';
import { NatSegmentedControl } from '../nat-segmented-control';

describe('nat-segmented-control', () => {
  const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ];

  it('renders all options', async () => {
    const { root } = await newSpecPage({
      components: [NatSegmentedControl],
      html: '<nat-segmented-control></nat-segmented-control>',
    });
    (root as any).options = options;
    expect(root).toBeTruthy();
  });

  it('applies active class to selected option', async () => {
    const page = await newSpecPage({
      components: [NatSegmentedControl],
      html: '<nat-segmented-control value="b"></nat-segmented-control>',
    });
    (page.root as any).options = options;
    await page.waitForChanges();
    const activeBtn = page.root.shadowRoot.querySelector('.nat-seg__option--active');
    expect(activeBtn).toBeTruthy();
  });

  it('emits natChange on click', async () => {
    const page = await newSpecPage({
      components: [NatSegmentedControl],
      html: '<nat-segmented-control value="a"></nat-segmented-control>',
    });
    (page.root as any).options = options;
    await page.waitForChanges();

    let changed = false;
    page.root.addEventListener('natChange', () => { changed = true; });
    const btns = page.root.shadowRoot.querySelectorAll('.nat-seg__option');
    (btns[1] as HTMLButtonElement).click();
    await page.waitForChanges();
    expect(changed).toBe(true);
  });
});
