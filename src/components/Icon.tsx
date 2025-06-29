import React from 'react';

// Central place for SVG icons. Placing them under `public/assets/icons` allows
// designers to update artwork without rebuilding the TypeScript code.

// A simple component to render SVG icons from the public directory.
interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, className, size = 24 }) => {
  return (
    <img
      src={`/assets/icons/${name}.svg`}
      alt={`${name} icon`}
      className={className}
      // Use an inline style to set the height and width from the size prop
      style={{ height: size, width: size }}
    />
  );
};

export default Icon;