import {
  readTemplate,
  saveTemplate,
  resolveTemplate,
  registerTemplate,
  unregisterTemplate,
  verifyUrl,
} from '../utils';
import fs from 'fs';
import { templateMapType } from '../utils';
import path from 'path';
import shell from 'shelljs';
import dircompare from 'dir-compare';

test('should check whether valid template URL', () => {
  const correctUrl = 'git@github.com/fake/fake';
  expect(verifyUrl(correctUrl)).toBe(true);
  const errorUrl = 'git@githb.com/fake/fake';
  expect(verifyUrl(errorUrl)).toBe(false);
});

test('should register vue-typescript-webpack', () => {
  const orginalTemplateMap: templateMapType = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../template.json'), 'utf-8')
  );

  registerTemplate(
    'vue-typescript-webpack',
    'git@github.com/fake/fake',
    'remote'
  );
  const templateMap: templateMapType = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../template.json'), 'utf-8')
  );
  expect(templateMap['vue-typescript-webpack']).toEqual({
    type: 'remote',
    url: 'git@github.com/fake/fake',
  });

  fs.writeFileSync(
    path.resolve(__dirname, '../../template.json'),
    JSON.stringify(orginalTemplateMap),
    'utf-8'
  );
});

test('should unregister react-typescript-webpack', () => {
  const orginalTemplateMap: templateMapType = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../template.json'), 'utf-8')
  );

  unregisterTemplate('react-typescript-webpack');
  const templateMap: templateMapType = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../template.json'), 'utf-8')
  );
  expect(templateMap['react-typescript-webpack']).toBe(undefined);

  fs.writeFileSync(
    path.resolve(__dirname, '../../template.json'),
    JSON.stringify(orginalTemplateMap),
    'utf-8'
  );
});

test('should resolve react-typescript-webpack template', () => {
  resolveTemplate('react-typescript-webpack', 'hello-react');
  expect(fs.existsSync('hello-react')).toBe(true);
  expect(
    dircompare.compareSync(
      path.resolve(process.cwd(), 'hello-react'),
      path.resolve(__dirname, '../templates/react-typescript-webpack'),
      {
        compareContent: true,
      }
    ).same
  ).toBe(true);
  shell.rm('-r', 'hello-react');
});

test('should return correct templateMap', () => {
  const orginalTemplateMap: templateMapType = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../template.json'), 'utf-8')
  );

  const templateMap = readTemplate();
  expect(templateMap).toEqual(orginalTemplateMap);
});

test('should save correct templateMap', () => {
  const orginalTemplateMap: templateMapType = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../template.json'), 'utf-8')
  );

  const templateMap = readTemplate();
  templateMap['vue-typescript-webpack'] = {
    url: 'git@github.com/fake/fake',
    type: 'remote',
  };

  saveTemplate(templateMap);
  const readTemplateMap=JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../template.json'), 'utf-8')
  );

  expect(readTemplateMap).toEqual(templateMap)
  fs.writeFileSync(path.resolve(__dirname,'../../template.json'),JSON.stringify(orginalTemplateMap),'utf-8')
});
