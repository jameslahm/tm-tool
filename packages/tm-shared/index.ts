import ora from 'ora';
import chalk from 'chalk';
import Fuse from 'fuse.js';
import shell from 'shelljs';
import path from 'path';
import fs from 'fs';
import debugUtil from 'debug';

export interface TemplateMapType {
  [index: string]: { url: string; type: string };
}

const debug = debugUtil('template');

const readTemplate = () => {
  try {
    const templateMap: TemplateMapType = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, './config/template.json'),
        'utf-8'
      )
    );
    Object.keys(templateMap).forEach((k) => {
      if (templateMap[k].type === 'local') {
        templateMap[k].url = path.resolve(__dirname, templateMap[k].url);
      } else {
        return;
      }
    });
    return templateMap;
  } catch (error) {
    console.log(chalk.red(error.message));
    return {} as TemplateMapType;
  }
};

const saveTemplate = (templateMap: TemplateMapType) => {
  try {
    fs.writeFileSync(
      path.resolve(__dirname, './config/template.json'),
      JSON.stringify(templateMap),
      'utf-8'
    );
  } catch (error) {
    console.log(chalk.red(error.message));
  }
};

/**
 * @param {String} templateName
 * @param {String} projectName
 * @returns {void}
 */
const resolveTemplate = (templateName: string, projectName: string): void => {
  const spinner = ora('Loading...').start();
  const templateMap = readTemplate();
  if (!templateMap.hasOwnProperty(templateName)) {
    spinner.fail('Sorry, No Such Template');
    return;
  }
  try {
    if (templateMap[templateName].type === 'local') {
      shell.cp(
        '-r',
        path.resolve(__dirname, templateMap[templateName].url),
        projectName
      );
    } else {
      shell.exec(`git clone ${templateMap[templateName].url} ${projectName}`);
    }
    spinner.succeed(`Please cd ${projectName} and code it !`);
  } catch (error) {
    /** catch error */
    spinner.fail(error.message);
  }
};

const validURLS = [/git@github.com/];

const verifyUrl = (tempateUrl: string): boolean => {
  debug('Verify Template URL');
  if (validURLS.findIndex((validUrl) => validUrl.test(tempateUrl)) !== -1) {
    debug(`Valid Template URL ${tempateUrl}`);
    return true;
  } else {
    debug(`Invalid Template URL ${tempateUrl}`);
    return false;
  }
};

function registerTemplate(
  templateName: string,
  templateUrl: string,
  templateType: string
) {
  const spinner = ora('Loading...').start();
  debug('Register start');
  const templateMap = readTemplate();
  templateMap[templateName] = {
    type: templateType,
    url: templateUrl,
  };
  saveTemplate(templateMap);
  debug('Register end');
  spinner.succeed('Register Success!');
}

const unregisterTemplate = (templateName: string) => {
  const spinner = ora('Loading...').start();
  const templateMap = readTemplate();
  if (templateMap.hasOwnProperty(templateName)) {
    delete templateMap[templateName];
  } else {
    const templateArray = Object.keys(templateMap).map((k) => {
      return {
        name: k,
        type: templateMap[k].type,
        url: templateMap[k].url,
      };
    });
    const fuse = new Fuse(templateArray, {
      keys: ['name'],
    });
    const searchRes = fuse.search(templateName);
    spinner.stop();
    console.log(chalk.gray('Not Found'));
    console.log(
      chalk.green(`Did you mean ${searchRes[searchRes.length - 1].item.name}`)
    );
  }
  saveTemplate(templateMap);
  spinner.succeed('Unregister Success!');
};

const TEMPLATEPATH = path.resolve(__dirname, './templates');

export {
  TEMPLATEPATH,
  resolveTemplate,
  verifyUrl,
  registerTemplate,
  unregisterTemplate,
  readTemplate,
  saveTemplate,
};
