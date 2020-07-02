import {
  readTemplate,
  saveTemplate,
  resolveTemplate,
  registerTemplate,
  unregisterTemplate,
  verifyUrl,
  TemplateMapType,
  TEMPLATEPATH,
} from '@tm-tools/tm-shared';
import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import dircompare from 'dir-compare';
import { whiteBright } from 'chalk';

test('should check whether valid template URL', () => {
  const correctUrl = 'git@github.com/fake/fake';
  expect(verifyUrl(correctUrl)).toBe(true);
  const errorUrl = 'git@githb.com/fake/fake';
  expect(verifyUrl(errorUrl)).toBe(false);
});

test('should register vue-typescript-webpack', () => {
  const originalTemplateMap: TemplateMapType = readTemplate();
  registerTemplate(
    'vue-typescript-webpack',
    'git@github.com/fake/fake',
    'remote'
  );
  const templateMap: TemplateMapType = readTemplate();
  expect(templateMap['vue-typescript-webpack']).toEqual({
    type: 'remote',
    url: 'git@github.com/fake/fake',
  });

  saveTemplate(originalTemplateMap);
});

test('should unregister react-typescript-webpack', () => {
  const originalTemplateMap: TemplateMapType = readTemplate();
  unregisterTemplate('react-typescript-webpack');
  const templateMap: TemplateMapType = readTemplate();
  expect(templateMap['react-typescript-webpack']).toBe(undefined);

  saveTemplate(originalTemplateMap);
});

test('should resolve react-typescript-webpack template', () => {
  resolveTemplate('react-typescript-webpack', 'hello-react');
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

test('should return correct templateMap', () => {
  const originalTemplateMap: TemplateMapType = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './config/template.json'), 'utf-8')
  );

  Object.keys(originalTemplateMap).forEach((k) => {
    if (originalTemplateMap[k].type === 'local')
      originalTemplateMap[k].url = path.resolve(
        __dirname + '/lib',
        originalTemplateMap[k].url
      );
  });

  const templateMap = readTemplate();
  expect(templateMap).toEqual(originalTemplateMap);
});

test('should save correct templateMap', () => {
  const originalTemplateMap: TemplateMapType = readTemplate();

  const templateMap = readTemplate();
  templateMap['vue-typescript-webpack'] = {
    url: 'git@github.com/fake/fake',
    type: 'remote',
  };

  saveTemplate(templateMap);
  const readTemplateMap = readTemplate();

  expect(readTemplateMap).toEqual(templateMap);
  saveTemplate(templateMap);
});
