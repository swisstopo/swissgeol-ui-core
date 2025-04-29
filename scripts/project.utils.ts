import path from 'path';
import { copyRecursive } from './fs.utils';
import * as fs from 'node:fs';

const PROJECT_ROOT_DIR = path.resolve(__dirname, '../');

export const resolveInProject = (...parts: string[]): string =>
  path.join(PROJECT_ROOT_DIR, ...parts);

export const linkCore = (target: string): void => {
  const targetDir = path.join(target, 'node_modules/@swisstopo/swissgeol-ui-core')
  fs.rmSync(targetDir, { recursive: true, force: true });
  copyRecursive(
    resolveInProject('dist'),
    path.join(targetDir, 'dist'),
  );
  copyRecursive(
    resolveInProject('loader'),
    path.join(targetDir, 'loader'),
  );
  fs.copyFileSync(
    resolveInProject('package.json'),
    path.join(targetDir, 'package.json'),
  )
};
