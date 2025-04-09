/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursive(
  path.join(__dirname, 'dist/swissgeol-core-angular'),
  path.join(__dirname, '../angular-client/node_modules/swissgeol-core-angular'),
);

copyRecursive(
  path.join(__dirname, '../../dist/swissgeol-core'),
  path.join(__dirname, '../angular-client/node_modules/swissgeol-core'),
);
