import { newSpecPage } from '@stencil/core/testing';
import { NatRating } from '../nat-rating';

describe('nat-rating', () => {
  it('renders 5 stars by default', async () => {
    const { root } = await newSpecPage({
      components: [NatRating],
      html: '<nat-rating></nat-rating>',
    });
    const stars = root.shadowRoot.querySelectorAll('.nat-rating__star');
    expect(stars.length).toBe(5);
  });

  it('renders custom count', async () => {
    const { root } = await newSpecPage({
      components: [NatRating],
      html: '<nat-rating count="3"></nat-rating>',
    });
    const stars = root.shadowRoot.querySelectorAll('.nat-rating__star');
    expect(stars.length).toBe(3);
  });

  it('marks correct stars as full', async () => {
    const { root } = await newSpecPage({
      components: [NatRating],
      html: '<nat-rating value="3"></nat-rating>',
    });
    const full = root.shadowRoot.querySelectorAll('.nat-rating__star--full');
    expect(full.length).toBe(3);
  });

  it('emits natChange when star clicked', async () => {
    const page = await newSpecPage({
      components: [NatRating],
      html: '<nat-rating value="2"></nat-rating>',
    });
    let emitted = false;
    page.root.addEventListener('natChange', () => { emitted = true; });

    const stars = page.root.shadowRoot.querySelectorAll('.nat-rating__star');
    (stars[3] as HTMLElement).click();
    await page.waitForChanges();

    expect(emitted).toBe(true);
  });

  it('does not emit when readonly', async () => {
    const page = await newSpecPage({
      components: [NatRating],
      html: '<nat-rating value="2" readonly></nat-rating>',
    });
    let emitted = false;
    page.root.addEventListener('natChange', () => { emitted = true; });

    const stars = page.root.shadowRoot.querySelectorAll('.nat-rating__star');
    (stars[3] as HTMLElement).click();
    await page.waitForChanges();

    expect(emitted).toBe(false);
  });
});
