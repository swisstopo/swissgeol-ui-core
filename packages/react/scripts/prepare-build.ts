import { replaceInFile } from '../../../scripts/code.utils';
import { linkCore, resolveInProject } from '../../../scripts/project.utils';

linkCore(resolveInProject('packages/react'));

replaceInFile(
  resolveInProject(
    'packages/react/src/lib/components/stencil-generated/components.ts',
  ),
  [
    [
      'from "@swisstopo/swissgeol-ui-core/dist/components/',
      'from "@swisstopo/swissgeol-ui-core/components/',
    ],
  ],
);
