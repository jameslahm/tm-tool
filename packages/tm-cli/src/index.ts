#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import {
  unregisterTemplate,
  resolveTemplate,
  registerTemplate,
  verifyUrl,
  readTemplate,
} from '@tm-tools/tm-shared';
import app from '@tm-tools/tm-ui';

/**
 * @description Template Supported
 */
const templateMap = readTemplate();

/**
 * @description Main Program
 */
const program = new Command();

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
  .action((templateName, projectName) => {
    resolveTemplate(templateName, projectName);
  });

/**
 * @description Create Project Using hint
 */
program
  .command('create <projectName>')
  .description('create project using hint')
  .action((projectName) => {
    const questions: [inquirer.ListQuestion] = [
      {
        type: 'list',
        name: 'templateName',
        message: 'What template do you want to use?',
        choices: Object.keys(templateMap),
        default: 0,
      },
    ];
    inquirer.prompt(questions).then((answers: inquirer.Answers) => {
      resolveTemplate(answers.templateName, projectName);
    });
  });

/**
 * @description Register Template
 */
program
  .command('register <templateName>')
  .description('Register Template')
  .action((templateName) => {
    const questions: [inquirer.ListQuestion, inquirer.InputQuestion] = [
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
    inquirer.prompt(questions).then((answers) => {
      const { templateUrl, templateType } = answers;

      if (!templateName || !templateUrl) {
        console.log(chalk.red('Please input template Name and template URL'));
        return;
      }
      switch (templateType) {
        case 'local': {
          const templateResolveUrl = path.resolve(process.cwd(), templateUrl);
          registerTemplate(templateName, templateResolveUrl, templateType);
          break;
        }
        case 'remote': {
          if (!verifyUrl(templateUrl)) return;
          else {
            registerTemplate(templateName, templateUrl, templateType);
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
  .action((templateName) => {
    unregisterTemplate(templateName);
  });

program
  .command('ui')
  .description('Start UI Server')
  .action(() => {
    app.listen(3000, () => {
      console.log('Listening on http://localhost:3000');
    });
  });

program.parse(process.argv);
