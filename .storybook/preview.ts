import type { Preview } from '@storybook/web-components-vite';
import '../src/global/styles/globals.css';

// Register all nat-ui custom elements from the `dist-custom-elements` output.
// Each component module self-defines on import (the build uses
// `customElementsExportBehavior: 'auto-define-custom-elements'`), and because
// these are plain ES modules they are statically bundled by Vite. The lazy
// `../loader` output cannot be used here: it loads components from runtime
// chunks that Vite cannot resolve at build time, which left every story
// rendering an empty, unupgraded custom element.
const components = import.meta.glob('../dist/components/nat-*.js', { eager: true });
void components;
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
