import { copyRecursive } from '../../../scripts/fs.utils';
import { linkCore, resolveInProject } from '../../../scripts/project.utils';

// Copy core package into `react-client`.
linkCore(resolveInProject('packages/react-client'));

// Copy react package into `react-client`.
copyRecursive(
  resolveInProject('packages/react/dist'),
  resolveInProject('packages/react-client/node_modules/swissgeol-core-react'),
);
