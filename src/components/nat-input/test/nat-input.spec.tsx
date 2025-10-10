import { newSpecPage } from '@stencil/core/testing';
import { NatInput } from '../nat-input';

describe('nat-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatInput],
      html: `<nat-input></nat-input>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [NatInput],
      html: `<nat-input label="Email"></nat-input>`,
    });
    const label = page.root.shadowRoot.querySelector('.nat-input-label');
    expect(label.textContent).toBe('Email');
  });

  it('shows error message', async () => {
    const page = await newSpecPage({
      components: [NatInput],
      html: `<nat-input error="This field is required"></nat-input>`,
    });
    const message = page.root.shadowRoot.querySelector('.nat-input-message--error');
    expect(message.textContent).toBe('This field is required');
  });

  it('emits natChange event', async () => {
    const page = await newSpecPage({
      components: [NatInput],
      html: `<nat-input></nat-input>`,
    });
    
    const changeSpy = jest.fn();
    page.root.addEventListener('natChange', changeSpy);
    
    const input = page.root.shadowRoot.querySelector('input');
    input.value = 'test';
    input.dispatchEvent(new Event('change'));
    
    await page.waitForChanges();
    expect(changeSpy).toHaveBeenCalled();
  });
});
