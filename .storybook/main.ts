import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/web-components-vite",
  // When deploying to GitHub Pages as a project site (tuongna.github.io/nat-ui),
  // assets must be served from the /nat-ui/ sub-path. STORYBOOK_BASE_PATH is set
  // by the CI workflow; locally it defaults to '/' for the dev server.
  "viteFinal": async config => {
    config.base = process.env.STORYBOOK_BASE_PATH || '/';
    return config;
  }
};
export default config;