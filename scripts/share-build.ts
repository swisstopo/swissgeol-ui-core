import { linkCore, resolveInProject } from './project.utils';

const clientDir = resolveInProject('packages/wc-client');

// Copy core package into `wc-client`.
linkCore(clientDir);
