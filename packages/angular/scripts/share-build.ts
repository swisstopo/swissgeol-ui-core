import { copyRecursive } from '../../../scripts/fs.utils';
import { linkCore, resolveInProject } from '../../../scripts/project.utils';
import path from 'path';
import fs from 'node:fs';

const clientDir = resolveInProject('packages/angular-client');

// Copy core package into `angular-client`.
linkCore(clientDir);

const targetDir = path.join(
  clientDir,
  'node_modules/@swisstopo/swissgeol-ui-core-angular',
);
fs.rmSync(targetDir, { recursive: true, force: true });

copyRecursive(
  resolveInProject('packages/angular/dist'),
  path.join(targetDir, 'dist'),
);
fs.copyFileSync(
  resolveInProject('packages/angular/package.json'),
  path.join(targetDir, 'package.json'),
);
