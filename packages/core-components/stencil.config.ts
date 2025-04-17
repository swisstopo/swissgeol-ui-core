import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';

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
    angularOutputTarget({
      componentCorePackage: 'core-components',
      outputType: 'component',
      directivesProxyFile: '../core-components-angular/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../core-components-angular/src/lib/stencil-generated/index.ts',

    }),
    // dist-custom-elements output target is required for the React output target
    { type: 'dist-custom-elements' },
  ],
  testing: {
    browserHeadless: "shell",
  },
};
