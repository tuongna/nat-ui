import { newSpecPage } from '@stencil/core/testing';
import { NatTimeline } from '../nat-timeline';

describe('nat-timeline', () => {
  const items = [
    { id: '1', title: 'Event One', subtitle: 'Jan 1', description: 'First event' },
    { id: '2', title: 'Event Two', subtitle: 'Jan 2', status: 'success' as const },
    { id: '3', title: 'Event Three', status: 'error' as const },
  ];

  it('renders all items', async () => {
    const page = await newSpecPage({
      components: [NatTimeline],
      html: '<nat-timeline></nat-timeline>',
    });
    (page.root as any).items = items;
    await page.waitForChanges();

    const lis = page.root.shadowRoot.querySelectorAll('.nat-timeline__item');
    expect(lis.length).toBe(3);
  });

  it('applies variant class', async () => {
    const { root } = await newSpecPage({
      components: [NatTimeline],
      html: '<nat-timeline variant="numbered"></nat-timeline>',
    });
    expect(root.shadowRoot.querySelector('.nat-timeline--numbered')).toBeTruthy();
  });

  it('renders titles', async () => {
    const page = await newSpecPage({
      components: [NatTimeline],
      html: '<nat-timeline></nat-timeline>',
    });
    (page.root as any).items = items;
    await page.waitForChanges();

    const titles = page.root.shadowRoot.querySelectorAll('.nat-timeline__title');
    expect(titles[0].textContent).toBe('Event One');
  });
});
