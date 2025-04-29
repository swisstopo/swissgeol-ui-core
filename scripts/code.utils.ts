import * as fs from 'node:fs';

export const replaceInFile = (filePath: string, replacements: Array<[string | RegExp, string]>) => {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [pattern, replacement] of replacements) {
    content = content.split(pattern).join(replacement);
  }
  fs.writeFileSync(filePath, '/* eslint-disable */\n' + content, 'utf8');
}
