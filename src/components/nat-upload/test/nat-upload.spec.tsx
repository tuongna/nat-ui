import { newSpecPage } from '@stencil/core/testing';
import { NatUpload } from '../nat-upload';

describe('nat-upload', () => {
  it('renders drop zone', async () => {
    const { root } = await newSpecPage({
      components: [NatUpload],
      html: '<nat-upload></nat-upload>',
    });
    expect(root.shadowRoot.querySelector('.nat-upload__zone')).toBeTruthy();
  });

  it('renders default label', async () => {
    const { root } = await newSpecPage({
      components: [NatUpload],
      html: '<nat-upload></nat-upload>',
    });
    const label = root.shadowRoot.querySelector('.nat-upload__label');
    expect(label).toBeTruthy();
    expect(label.textContent).toContain('Drop files');
  });

  it('applies disabled state', async () => {
    const { root } = await newSpecPage({
      components: [NatUpload],
      html: '<nat-upload disabled></nat-upload>',
    });
    expect(root.shadowRoot.querySelector('.nat-upload__zone--disabled')).toBeTruthy();
  });

  it('applies glass variant', async () => {
    const { root } = await newSpecPage({
      components: [NatUpload],
      html: '<nat-upload variant="glass"></nat-upload>',
    });
    expect(root.shadowRoot.querySelector('.nat-upload__zone--glass')).toBeTruthy();
  });

  it('clears files via method', async () => {
    const page = await newSpecPage({
      components: [NatUpload],
      html: '<nat-upload></nat-upload>',
    });
    await (page.root as any).clearFiles();
    const files = await (page.root as any).getFiles();
    expect(files.length).toBe(0);
  });
});
