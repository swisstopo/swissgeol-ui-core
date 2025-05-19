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

let loaderScript = '';

for (const file of fs.readdirSync(componentsDistDir)) {
  if (!file.endsWith('.d.ts')) {
    continue;
  }
  const componentName = path.basename(file, '.d.ts');
  packageJson.exports[`./components/${componentName}.js`] = {
    types: `./dist/components/${componentName}.d.ts`,
    import: `./dist/components/${componentName}.js`,
  };

  if (componentName !== 'index') {
    loaderScript += `import "./${componentName}.js";\n`;
  }
}

fs.writeFileSync(
  resolveInProject('package.json'),
  JSON.stringify(packageJson, null, 2),
  'utf-8',
);

fs.writeFileSync(
  resolveInProject('dist/components/import.js'),
  loaderScript,
  'utf-8',
);
fs.writeFileSync(resolveInProject('dist/components/import.d.ts'), '', 'utf-8');
