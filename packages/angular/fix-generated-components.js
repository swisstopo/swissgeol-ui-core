const fs = require('fs');

const filePath =
  './projects/swissgeol-core-angular/src/lib/stencil-generated/components.ts';
const searchString = /@Component\(\{(?:\n {2}standalone: false,)?/;
const replaceString = '@Component({\n  standalone: false,';

let content = fs.readFileSync(filePath, 'utf8');
content = content.split(searchString).join(replaceString);
fs.writeFileSync(filePath, content, 'utf8');
