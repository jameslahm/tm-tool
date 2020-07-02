import React from 'react';

interface IconPropsType {
  size?: 'small' | 'large' | 'middle';
  color?: string;
  name: string;
  className?: string;
}

const sizeClassMap = {
  small: 'fa-sm',
  middle: 'fa-2x',
  large: 'fa-5x',
};

const Icon: React.FC<IconPropsType> = ({ size, color, name, className }) => {
  const sizeName = size ? sizeClassMap[size] : 'fa-2x';
  return (
    <i
      className={`fas fa-${name} ${sizeName} ${className}`}
      style={{ color: color || 'black' }}
    ></i>
  );
};

export { Icon };
