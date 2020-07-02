import shell, { exec } from 'shelljs';
import fs from 'fs';
import dircompare from 'dir-compare';
import path from 'path';
import {
  TemplateMapType,
  readTemplate,
  saveTemplate,
  TEMPLATEPATH,
} from '@tm-tools/tm-shared';

test('should create a folder hello-react using react-typescript-webpack template', () => {
  const executablePath = path.resolve(__dirname, '../../lib/index.js');
  shell.exec(
    `node ${executablePath} init react-typescript-webpack hello-react`,
    {
      fatal: true,
    }
  );
  expect(fs.existsSync('hello-react')).toBe(true);
  expect(
    dircompare.compareSync(
      path.resolve(process.cwd(), 'hello-react'),
      path.resolve(
        __dirname,
        path.resolve(TEMPLATEPATH, 'react-typescript-webpack')
      ),
      {
        compareContent: true,
      }
    ).same
  ).toBe(true);
  shell.rm('-r', 'hello-react');
});

test('should unregister react-typescript-webpack', () => {
  const orginalTemplateMap: TemplateMapType = readTemplate();
  const executablePath = path.resolve(__dirname, '../../lib/index.js');
  shell.exec(`node ${executablePath} unregister react-typescript-webpack`);
  const templateMap: TemplateMapType = readTemplate();
  expect(templateMap['react-typescript-webpack']).toBe(undefined);

  saveTemplate(orginalTemplateMap);
});
