import { s as serializeStyles } from '../common/core.browser.esm-7818fd63.js';
export { G as Global, j as jsx } from '../common/core.browser.esm-7818fd63.js';
import '../common/index-4727b338.js';

function css() {
  for (
    var _len = arguments.length, args = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    args[_key] = arguments[_key];
  }

  return serializeStyles(args);
}

export { css };
