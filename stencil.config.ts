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
      type: 'www',
      serviceWorker: null,
    },
    {
      type: 'docs-readme',
    },
  ],
};
