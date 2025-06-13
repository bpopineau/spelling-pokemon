// A simple component to render SVG icons from the public directory.
interface IconProps {
    name: string;
    className?: string;
  }

  export default function Icon({ name, className }: IconProps) {
    return (
      <img
        src={`/assets/icons/${name}`}
        alt={`${name} icon`}
        className={className}
      />
    );
  }