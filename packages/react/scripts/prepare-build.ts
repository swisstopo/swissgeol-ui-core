import { replaceInFile } from '../../../scripts/code.utils';
import { linkCore, resolveInProject } from '../../../scripts/project.utils';

linkCore(resolveInProject("packages/react"))

replaceInFile(resolveInProject("packages/react/src/lib/components/stencil-generated/components.ts"), [
  ['from "swissgeol-core/dist/components/', 'from "swissgeol-core/components/']
])
