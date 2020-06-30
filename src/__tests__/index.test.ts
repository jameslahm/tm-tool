import shell from 'shelljs';
import fs from 'fs';
import dircompare from 'dir-compare';
import path from 'path';
import { templateMapType } from '../utils';

test('should create a folder hello-react using react-typescript-webpack template', () => {
  shell.exec('tm-cli init react-typescript-webpack hello-react', {
    fatal: true,
  });
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

test('should unregister react-typescript-webpack', () => {
  const orginalTemplateMap: templateMapType = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../template.json'), 'utf-8')
  );

  shell.exec('tm-cli unregister react-typescript-webpack');
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
