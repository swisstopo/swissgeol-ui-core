import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'core-components',
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
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
     reactOutputTarget({
      outDir: '../core-components-react/src/lib/components/stencil-generated/',
    }),
    // dist-custom-elements output target is required for the React output target
    { type: 'dist-custom-elements' },
  ],
  testing: {
    browserHeadless: "shell",
  },
};
