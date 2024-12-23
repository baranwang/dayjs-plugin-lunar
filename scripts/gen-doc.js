import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { build, formats } from 'documentation';

(async () => {
  const README_FILE = 'README.md';
  const START_MARKER = '<!-- START: AUTO-GENERATED-TYPES -->';
  const END_MARKER = '<!-- END: AUTO-GENERATED-TYPES -->';

  // 读取 README 文件内容
  const readmeContent = fs.readFileSync(README_FILE, 'utf8');
  const readmeLines = readmeContent.split('\n');

  // 定位生成标记的位置
  const startIndex = readmeLines.indexOf(START_MARKER);
  const endIndex = readmeLines.indexOf(END_MARKER);

  if (startIndex === -1 || endIndex === -1) {
    console.error('未找到 START 或 END 标记，请检查 README 文件中的标记内容。');
    process.exit(1);
  }

  // 生成 TypeScript 类型的文档
  const typeDocsMarkdown = await build(['src/types.ts']).then(formats.md);

  // 格式化文档内容，增加层级标记
  const formattedDocs = typeDocsMarkdown
    .split('\n')
    .map((line) => (line.startsWith('#') ? `#${line}` : line))
    .join('\n');

  // 构建新的 README 内容
  const updatedReadmeContent = [
    ...readmeLines.slice(0, startIndex + 1),
    formattedDocs,
    ...readmeLines.slice(endIndex),
  ].join('\n');

  // 如果内容有更新，则写入文件并添加到 Git
  if (updatedReadmeContent !== readmeContent) {
    fs.writeFileSync(README_FILE, updatedReadmeContent);
    execSync(`git add ${README_FILE}`);
  }
})();
