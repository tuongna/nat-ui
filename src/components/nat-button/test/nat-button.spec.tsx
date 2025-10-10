import { newSpecPage } from '@stencil/core/testing';
import { NatButton } from '../nat-button';

describe('nat-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NatButton],
      html: `<nat-button>Click me</nat-button>`,
    });
    expect(page.root).toEqualHtml(`
      <nat-button>
        <mock:shadow-root>
          <button class="nat-button nat-button--primary nat-button--md" type="button">
            <span class="nat-button__content">
              <slot></slot>
            </span>
          </button>
        </mock:shadow-root>
        Click me
      </nat-button>
    `);
  });

  it('applies variant classes', async () => {
    const page = await newSpecPage({
      components: [NatButton],
      html: `<nat-button variant="secondary">Click me</nat-button>`,
    });
    const button = page.root.shadowRoot.querySelector('button');
    expect(button.classList.contains('nat-button--secondary')).toBe(true);
  });

  it('disables when disabled prop is true', async () => {
    const page = await newSpecPage({
      components: [NatButton],
      html: `<nat-button disabled>Click me</nat-button>`,
    });
    const button = page.root.shadowRoot.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('shows loading spinner', async () => {
    const page = await newSpecPage({
      components: [NatButton],
      html: `<nat-button loading>Click me</nat-button>`,
    });
    const spinner = page.root.shadowRoot.querySelector('.nat-button__spinner');
    expect(spinner).toBeTruthy();
  });
});
