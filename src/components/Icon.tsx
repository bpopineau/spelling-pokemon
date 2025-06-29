// ---------------------------------------------------------------------------
// Icon Component (src/components/Icon.tsx)
// ---------------------------------------------------------------------------
// Utility component for rendering SVG icons from the `public/assets/icons`
// directory. Keeping icon logic in one place makes it easier to update artwork
// or swap to an inline SVG technique later on. Only the file name and optional
// size/className need to be provided by consumers.
import React from 'react';
//
// Development Plan:
// - Allow specifying fallback icons or alt text for accessibility when an icon
//   file is missing.
// - Investigate tree-shaking or bundling inline SVGs to reduce HTTP requests if
//   the icon set grows large.
// - Provide a script to batch optimize SVGs (e.g., with SVGO) so new icons stay
//   lightweight and consistent.
// - Document naming conventions for icons in assets.md so designers know how to
//   add new artwork without code changes.

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