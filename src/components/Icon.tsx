// File: src/components/Icon.tsx
//
// Lightweight wrapper for SVG assets in /public/assets/icons.
// Accepts `name`, optional `size`, and `className` for styling.

import { FC } from "react";

export interface IconProps {
  name: string; // Filename without `.svg`
  size?: number; // Height/width in pixels (default 24)
  className?: string; // Extra CSS classes
}

const Icon: FC<IconProps> = ({ name, size = 24, className }) => (
  <img
    src={`${import.meta.env.BASE_URL}assets/icons/${name}.svg`}
    alt={`${name} icon`}
    width={size}
    height={size}
    className={className}
    loading="lazy"
    style={{ display: "inline-block" }}
    onError={(e) => {
      // Optional: hide img if missing asset
      (e.target as HTMLImageElement).style.visibility = "hidden";
      // TODO: log missing icon name for debugging
    }}
  />
);

export default Icon;

// TODO: Switch to <SvgIcon component={CustomIcon}> when migrating to MUI’s SVGIcon system.
// TODO: Provide a fallback placeholder graphic for missing icons.
