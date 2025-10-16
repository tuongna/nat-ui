import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'nat-ui',
  globalStyle: 'src/global/styles/globals.css',

  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'www',
      serviceWorker: null,
    },
    {
      type: 'docs-readme',
      footer: '',
    },
    {
      type: 'docs-json',
      file: 'docs/components.json',
    },
  ],

  testing: {
    browserHeadless: true,
  },
};
