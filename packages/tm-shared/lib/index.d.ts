export interface TemplateMapType {
  [index: string]: {
    url: string;
    type: string;
  };
}
declare const readTemplate: () => TemplateMapType;
declare const saveTemplate: (templateMap: TemplateMapType) => void;
/**
 * @param {String} templateName
 * @param {String} projectName
 * @returns {void}
 */
declare const resolveTemplate: (
  templateName: string,
  projectName: string
) => void;
declare const verifyUrl: (tempateUrl: string) => boolean;
declare function registerTemplate(
  templateName: string,
  templateUrl: string,
  templateType: string
): void;
declare const unregisterTemplate: (templateName: string) => void;
declare const TEMPLATEPATH: string;
export {
  TEMPLATEPATH,
  resolveTemplate,
  verifyUrl,
  registerTemplate,
  unregisterTemplate,
  readTemplate,
  saveTemplate,
};
