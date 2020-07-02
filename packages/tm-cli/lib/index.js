#!/usr/bin/env node
'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var commander_1 = require('commander');
var path_1 = __importDefault(require('path'));
var inquirer_1 = __importDefault(require('inquirer'));
var chalk_1 = __importDefault(require('chalk'));
var tm_shared_1 = require('@tm-tools/tm-shared');
/**
 * @description Template Supported
 */
var templateMap = tm_shared_1.readTemplate();
/**
 * @description Main Program
 */
var program = new commander_1.Command();
/**
 * @description Version
 */
program.version('0.1.0');
/**
 * @description Create Project Using Template
 */
program
  .command('init <templateName> <projectName>')
  .description('create project using template')
  .action(function (templateName, projectName) {
    tm_shared_1.resolveTemplate(templateName, projectName);
  });
/**
 * @description Create Project Using hint
 */
program
  .command('create <projectName>')
  .description('create project using hint')
  .action(function (projectName) {
    var questions = [
      {
        type: 'list',
        name: 'templateName',
        message: 'What template do you want to use?',
        choices: Object.keys(templateMap),
        default: 0,
      },
    ];
    inquirer_1['default'].prompt(questions).then(function (answers) {
      tm_shared_1.resolveTemplate(answers.templateName, projectName);
    });
  });
/**
 * @description Register Template
 */
program
  .command('register <templateName>')
  .description('Register Template')
  .action(function (templateName) {
    var questions = [
      {
        type: 'list',
        name: 'templateType',
        message: 'What template type do you want to register',
        default: 0,
        choices: ['local', 'remote'],
      },
      {
        type: 'input',
        name: 'templateUrl',
        message: 'Please input your template URL',
        default: '',
      },
    ];
    inquirer_1['default'].prompt(questions).then(function (answers) {
      var templateUrl = answers.templateUrl,
        templateType = answers.templateType;
      if (!templateName || !templateUrl) {
        console.log(
          chalk_1['default'].red('Please input template Name and template URL')
        );
        return;
      }
      switch (templateType) {
        case 'local': {
          var templateResolveUrl = path_1['default'].resolve(
            process.cwd(),
            templateUrl
          );
          tm_shared_1.registerTemplate(
            templateName,
            templateResolveUrl,
            templateType
          );
          break;
        }
        case 'remote': {
          if (!tm_shared_1.verifyUrl(templateUrl)) return;
          else {
            tm_shared_1.registerTemplate(
              templateName,
              templateUrl,
              templateType
            );
            break;
          }
        }
      }
    });
  });
/**
 * @description Unregister Template
 */
program
  .command('unregister <templateName>')
  .description('Unregister Template')
  .action(function (templateName) {
    tm_shared_1.unregisterTemplate(templateName);
  });
program
  .command('ui')
  .description('Start UI Server')
  .action(function () {});
program.parse(process.argv);
//# sourceMappingURL=index.js.map
