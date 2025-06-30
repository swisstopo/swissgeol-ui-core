import { copyRecursive } from '../../../scripts/fs.utils';
import { linkCore, resolveInProject } from '../../../scripts/project.utils';
import path from 'path';
import fs from 'node:fs';

fs.copyFileSync(
  resolveInProject('packages/angular/package.json'),
  resolveInProject('packages/angular/dist/swissgeol-core-angular/package.json'),
);

const clientDir = resolveInProject('packages/angular-client');

// Copy core package into `angular-client`.
linkCore(clientDir);

const targetDir = path.join(
  clientDir,
  'node_modules/@swissgeol/ui-core-angular',
);
fs.rmSync(targetDir, { recursive: true, force: true });

copyRecursive(
  resolveInProject('packages/angular/dist/swissgeol-core-angular'),
  path.join(targetDir),
);
