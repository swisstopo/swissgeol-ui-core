import { copyRecursive } from '../../../scripts/fs.utils';
import { linkCore, resolveInProject } from '../../../scripts/project.utils';

// Copy core package into `angular-client`.
linkCore(resolveInProject('packages/angular-client'));

// Copy angular package into `react-client`.
copyRecursive(
  resolveInProject('packages/angular/dist/swissgeol-core-angular'),
  resolveInProject(
    'packages/angular-client/node_modules/swissgeol-core-angular',
  ),
);
