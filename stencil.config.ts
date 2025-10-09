import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'nat-ui',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'bundle',
    },
    {
      type: 'docs-json',
      file: 'custom-elements.json',
    },
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
};
