import codeUtils from '../../../scripts/code.utils';
import projectUtils from '../../../scripts/project.utils';

const { replaceInFile } = codeUtils;
const { linkCore, resolveInProject } = projectUtils;

linkCore(resolveInProject('packages/react'));

replaceInFile(
  resolveInProject(
    'packages/react/src/lib/components/stencil-generated/components.ts',
  ),
  [
    [
      'from "@swissgeol/ui-core/dist/components/',
      'from "@swissgeol/ui-core/components/',
    ],
  ],
);
