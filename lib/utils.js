"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.saveTemplate = exports.readTemplate = exports.unregisterTemplate = exports.registerTemplate = exports.verifyUrl = exports.resolveTemplate = void 0;
var ora_1 = __importDefault(require("ora"));
var chalk_1 = __importDefault(require("chalk"));
var fuse_js_1 = __importDefault(require("fuse.js"));
var shelljs_1 = __importDefault(require("shelljs"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var debug_1 = __importDefault(require("debug"));
var debug = debug_1["default"]('template');
var readTemplate = function () {
    try {
        var templateMap = JSON.parse(fs_1["default"].readFileSync(path_1["default"].resolve(__dirname, '../template.json'), 'utf-8'));
        return templateMap;
    }
    catch (error) {
        console.log(chalk_1["default"].red(error.message));
    }
};
exports.readTemplate = readTemplate;
var saveTemplate = function (templateMap) {
    try {
        fs_1["default"].writeFileSync(path_1["default"].resolve(__dirname, '../template.json'), JSON.stringify(templateMap), 'utf-8');
    }
    catch (error) {
        console.log(chalk_1["default"].red(error.message));
    }
};
exports.saveTemplate = saveTemplate;
/**
 * @param {String} templateName
 * @param {String} projectName
 * @returns {void}
 */
var resolveTemplate = function (templateName, projectName) {
    var spinner = ora_1["default"]('Loading...').start();
    var templateMap = readTemplate();
    if (!templateMap.hasOwnProperty(templateName)) {
        spinner.fail('Sorry, No Such Template');
        return;
    }
    try {
        if (templateMap[templateName].type === 'local') {
            shelljs_1["default"].cp('-r', path_1["default"].resolve(__dirname, templateMap[templateName].url), projectName);
        }
        else {
            shelljs_1["default"].exec("git clone " + templateMap[templateName].url + " " + projectName);
        }
        spinner.succeed("Please cd " + projectName + " and code it !");
    }
    catch (error) {
        /** catch error */
        spinner.fail(error.message);
    }
};
exports.resolveTemplate = resolveTemplate;
var validURLS = [/git@github.com/];
var verifyUrl = function (tempateUrl) {
    debug('Verify Template URL');
    if (validURLS.findIndex(function (validUrl) { return validUrl.test(tempateUrl); }) !== -1) {
        debug("Valid Template URL " + tempateUrl);
        return true;
    }
    else {
        debug("Invalid Template URL " + tempateUrl);
        return false;
    }
};
exports.verifyUrl = verifyUrl;
function registerTemplate(templateName, templateUrl, templateType) {
    var spinner = ora_1["default"]('Loading...').start();
    debug('Register start');
    var templateMap = readTemplate();
    templateMap[templateName] = {
        type: templateType,
        url: templateUrl
    };
    saveTemplate(templateMap);
    debug('Register end');
    spinner.succeed('Register Success!');
}
exports.registerTemplate = registerTemplate;
var unregisterTemplate = function (templateName) {
    var spinner = ora_1["default"]('Loading...').start();
    var templateMap = readTemplate();
    if (templateMap.hasOwnProperty(templateName)) {
        delete templateMap[templateName];
    }
    else {
        var templateArray = Object.keys(templateMap).map(function (k) {
            return {
                name: k,
                type: templateMap[k].type,
                url: templateMap[k].url
            };
        });
        var fuse = new fuse_js_1["default"](templateArray, {
            keys: ['name']
        });
        var searchRes = fuse.search(templateName);
        spinner.stop();
        console.log(chalk_1["default"].gray('Not Found'));
        console.log(chalk_1["default"].green("Did you mean " + searchRes[searchRes.length - 1].item.name));
    }
    saveTemplate(templateMap);
    spinner.succeed('Unregister Success!');
};
exports.unregisterTemplate = unregisterTemplate;
//# sourceMappingURL=utils.js.map