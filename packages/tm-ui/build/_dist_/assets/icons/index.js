import React from '/web_modules/react.js';
const sizeClassMap = {
  small: 'fa-sm',
  middle: 'fa-2x',
  large: 'fa-5x',
};

const Icon = ({ size, color, name, className }) => {
  const sizeName = size ? sizeClassMap[size] : 'fa-2x';
  return /*#__PURE__*/ React.createElement('i', {
    className: `fas fa-${name} ${sizeName} ${className}`,
    style: {
      color: color || 'black',
    },
  });
};

export { Icon };
