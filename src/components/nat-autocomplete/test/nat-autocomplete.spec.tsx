import { newSpecPage } from '@stencil/core/testing';
import { NatAutocomplete } from '../nat-autocomplete';

describe('nat-autocomplete', () => {
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];

  it('renders input', async () => {
    const { root } = await newSpecPage({
      components: [NatAutocomplete],
      html: '<nat-autocomplete></nat-autocomplete>',
    });
    expect(root.shadowRoot.querySelector('.nat-ac__input')).toBeTruthy();
  });

  it('shows label when set', async () => {
    const { root } = await newSpecPage({
      components: [NatAutocomplete],
      html: '<nat-autocomplete label="Fruit"></nat-autocomplete>',
    });
    expect(root.shadowRoot.querySelector('.nat-ac__label').textContent).toBe('Fruit');
  });

  it('clear method resets value', async () => {
    const page = await newSpecPage({
      components: [NatAutocomplete],
      html: '<nat-autocomplete value="apple"></nat-autocomplete>',
    });
    (page.root as any).options = options;
    await (page.root as any).clear();
    expect((page.root as any).value).toBe('');
  });
});
