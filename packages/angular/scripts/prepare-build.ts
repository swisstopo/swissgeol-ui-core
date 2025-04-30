import { replaceInFile } from '../../../scripts/code.utils';
import { linkCore, resolveInProject } from '../../../scripts/project.utils';

linkCore(resolveInProject('packages/angular'));

replaceInFile(
  resolveInProject(
    'packages/angular/projects/swissgeol-core-angular/src/lib/stencil-generated/components.ts',
  ),
  [
    // Mark components as non-standalone.
    [
      /@Component\(\{(?:\n {2}standalone: false,)?/,
      '@Component({\n  standalone: false,',
    ],
  ],
);
