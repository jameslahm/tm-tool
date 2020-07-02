'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var shelljs_1 = __importDefault(require('shelljs'));
var fs_1 = __importDefault(require('fs'));
var dir_compare_1 = __importDefault(require('dir-compare'));
var path_1 = __importDefault(require('path'));
var tm_shared_1 = require('@tm-tools/tm-shared');
test('should create a folder hello-react using react-typescript-webpack template', function () {
  shelljs_1['default'].exec(
    'tm-cli init react-typescript-webpack hello-react',
    {
      fatal: true,
    }
  );
  expect(fs_1['default'].existsSync('hello-react')).toBe(true);
  expect(
    dir_compare_1['default'].compareSync(
      path_1['default'].resolve(process.cwd(), 'hello-react'),
      path_1['default'].resolve(
        __dirname,
        path_1['default'].resolve(
          tm_shared_1.TEMPLATEPATH,
          'react-typescript-webpack'
        )
      ),
      {
        compareContent: true,
      }
    ).same
  ).toBe(true);
  shelljs_1['default'].rm('-r', 'hello-react');
});
test('should unregister react-typescript-webpack', function () {
  var orginalTemplateMap = tm_shared_1.readTemplate();
  shelljs_1['default'].exec('tm-cli unregister react-typescript-webpack');
  var templateMap = tm_shared_1.readTemplate();
  expect(templateMap['react-typescript-webpack']).toBe(undefined);
  tm_shared_1.saveTemplate(orginalTemplateMap);
});
//# sourceMappingURL=index.test.js.map
