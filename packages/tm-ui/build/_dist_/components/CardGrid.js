function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

/**@jsx jsx */
import Card from './Card.js';
import { jsx, css } from '/web_modules/@emotion/core.js';

const CardGrid = ({ items, update }) => {
  return jsx(
    'div',
    {
      css: css`
        display: grid;
        grid-template-rows: auto;
        grid-gap: 2rem 2rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      `,
    },
    items.map((item) => {
      return jsx(
        Card,
        _extends({}, item, {
          key: item.name,
          update: update,
        }),
      );
    }),
  );
};

export default CardGrid;
