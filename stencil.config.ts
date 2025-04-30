import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'swissgeol-ui-core',
  globalStyle: 'src/global/app.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: 'assets', dest: 'assets' },
        { src: 'theme', dest: 'theme' },
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
    angularOutputTarget({
      componentCorePackage: '@swisstopo/swissgeol-ui-core',
      outputType: 'component',
      directivesProxyFile:
        'packages/angular/projects/swissgeol-core-angular/src/lib/stencil-generated/components.ts',
      directivesArrayFile:
        'packages/angular/projects/swissgeol-core-angular/src/lib/stencil-generated/index.ts',
    }),
    reactOutputTarget({
      outDir: 'packages/react/src/lib/components/stencil-generated/',
    }),
  ],
};
