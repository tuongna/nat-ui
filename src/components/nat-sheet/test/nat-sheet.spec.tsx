import { newSpecPage } from '@stencil/core/testing';
import { NatSheet } from '../nat-sheet';

describe('nat-sheet', () => {
  it('renders nothing when closed', async () => {
    const { root } = await newSpecPage({
      components: [NatSheet],
      html: '<nat-sheet></nat-sheet>',
    });
    expect(root.shadowRoot.querySelector('.nat-sheet__panel')).toBeNull();
  });

  it('opens via prop', async () => {
    const page = await newSpecPage({
      components: [NatSheet],
      html: '<nat-sheet heading="Test"></nat-sheet>',
    });
    page.root.open = true;
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.nat-sheet__panel')).toBeTruthy();
  });

  it('applies position class', async () => {
    const page = await newSpecPage({
      components: [NatSheet],
      html: '<nat-sheet position="right"></nat-sheet>',
    });
    page.root.open = true;
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.nat-sheet__panel--right')).toBeTruthy();
  });

  it('applies glass class', async () => {
    const page = await newSpecPage({
      components: [NatSheet],
      html: '<nat-sheet glass></nat-sheet>',
    });
    page.root.open = true;
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.nat-sheet__panel--glass')).toBeTruthy();
  });
});
