import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Accordion',
  component: 'nat-accordion',
  argTypes: {
    heading: { control: 'text' },
    expanded: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    heading: 'Is this accessible?',
    expanded: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nat-accordion
      heading=${args.heading}
      ?expanded=${args.expanded}
      ?disabled=${args.disabled}
    >
      Yes. It adheres to the WAI-ARIA design pattern for accordions. The button controls the expansion state, and screen readers can read the state.
    </nat-accordion>
  `,
};

export const Group: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <h3 style="margin-bottom: 1rem; color: var(--nat-text-primary);">Frequently Asked Questions</h3>
      <nat-accordion heading="What is Stencil?">
        Stencil is a toolchain for building reusable, scalable Design Systems. It generates small, blazing fast Web Components that run everywhere.
      </nat-accordion>
      <nat-accordion heading="Does it support Storybook?">
        Yes! We can integrate Storybook closely with our Web Components. This interactive playground is an example.
      </nat-accordion>
      <nat-accordion heading="Can I use this with React or Vue?">
        Absolutely. Because these are standard HTML elements (Web Components), they work elegantly within React, Vue, Svelte, and solid HTML.
      </nat-accordion>
    </div>
  `,
};
