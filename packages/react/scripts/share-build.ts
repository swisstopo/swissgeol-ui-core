import fsUtils from '../../../scripts/fs.utils';
import projectUtils from '../../../scripts/project.utils';
import path from 'path';
import fs from 'node:fs';

const { copyRecursive } = fsUtils;
const { linkCore, resolveInProject } = projectUtils;

const clientDir = resolveInProject('packages/react-client');

// Copy core package into `react-client`.
linkCore(clientDir);

const targetDir = path.join(
  clientDir,
  'node_modules/@swisstopo/swissgeol-ui-core-react',
);
fs.rmSync(targetDir, { recursive: true, force: true });

copyRecursive(
  resolveInProject('packages/react/dist'),
  path.join(targetDir, 'dist'),
);
fs.copyFileSync(
  resolveInProject('packages/react/package.json'),
  path.join(targetDir, 'package.json'),
);
