import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'swissgeol-core',
  globalStyle: 'src/global/app.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: 'theme', dest: 'theme' },
        { src: 'assets', dest: 'assets' },
      ],
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        { src: 'assets', dest: 'assets' },
        { src: '**/test/*.html' },
        { src: '**/test/*.css' },
      ],
    },
  ],
};
