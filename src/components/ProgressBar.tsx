
interface ProgressBarProps {
  /** Current XP gained within the level */
  current: number;
  /** XP required to reach the next level */
  total: number;
}

/**
 * Visual progress bar showing XP progress toward the next level.
 */
// TODO: Consider replacing this custom progress bar with shadcn/ui's Progress component.
// See https://ui.shadcn.com/docs/components/progress
// The `value` prop of the shadcn/ui Progress component would correspond to the `percentage`
// calculated below.
export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.max(0, Math.min(100, (current / total) * 100));

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <span className="text-sm font-bold text-slate-600">PROGRESS</span>
      {/* TODO: Replace this div structure with <Progress value={percentage} /> from shadcn/ui.
          The styling can be adjusted using classNames as needed. */}
      <div className="w-full bg-slate-300 rounded-full h-5 mt-1 border border-slate-400/50 shadow-inner">
        <div
          className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-slate-600 mt-1">
        {current} / {total} XP
      </span>
    </div>
  );
}
