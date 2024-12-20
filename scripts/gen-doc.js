import fs from 'node:fs';
import { build, formats } from 'documentation';

build(['src/types.ts'])
  .then(formats.md)
  .then((output) => {
    const readme = fs.readFileSync('README.md', 'utf8').split('\n');
    const start = readme.indexOf('<!-- START: AUTO-GENERATED-TYPES -->');
    const end = readme.indexOf('<!-- END: AUTO-GENERATED-TYPES -->');
    const newReadme = [
      ...readme.slice(0, start + 1),
      output
        .split('\n')
        .map((item) => (item.startsWith('#') ? `#${item}` : item))
        .join('\n'),
      ...readme.slice(end),
    ].join('\n');
    fs.writeFileSync('README.md', newReadme);
  });
