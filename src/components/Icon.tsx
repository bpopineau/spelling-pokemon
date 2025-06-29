import React from 'react';
//
// Development Plan:
// - Allow specifying fallback icons or alt text for accessibility when an icon
//   file is missing.
// - Investigate tree-shaking or bundling inline SVGs to reduce HTTP requests if
//   the icon set grows large.

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