import path from 'path';
import { copyRecursive } from './fs.utils';

const PROJECT_ROOT_DIR = path.resolve(__dirname, '../')

export const resolveInProject = (...parts: string[]): string => path.join(PROJECT_ROOT_DIR, ...parts);

const CORE_PACKAGE_DIR = resolveInProject('dist/swissgeol-core');

export const linkCore = (target: string): void => {
  copyRecursive(CORE_PACKAGE_DIR, path.join(target, 'node_modules/swissgeol-core'))
}
