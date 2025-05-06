import { resolveInProject } from './project.utils';
import * as fs from 'node:fs';
import * as path from 'path';

const componentsDistDir = resolveInProject('dist/components/');

const packageJson = JSON.parse(
  fs.readFileSync(resolveInProject('package.json'), { encoding: 'utf-8' }),
);

for (const key of Object.keys(packageJson.exports)) {
  if (key.startsWith('./components/')) {
    delete packageJson.exports[key];
  }
}

for (const file of fs.readdirSync(componentsDistDir)) {
  if (!file.endsWith('.d.ts')) {
    continue;
  }
  const componentName = path.basename(file, '.d.ts');
  packageJson.exports[`./components/${componentName}.js`] = {
    types: `./dist/components/${componentName}.d.ts`,
    import: `./dist/components/${componentName}.js`,
  };
}

fs.writeFileSync(
  resolveInProject('package.json'),
  JSON.stringify(packageJson, null, 2),
  'utf-8',
);
