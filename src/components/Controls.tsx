import React from "react";

interface ControlsProps {
  onSubmit: () => void;
  onHint: () => void;
  onRepeat: () => void;
  hintDisabled: boolean;
}

export default function Controls({
  onSubmit,
  onHint,
  onRepeat,
  hintDisabled,
}: ControlsProps) {
  return (
    <div className="flex justify-center flex-wrap gap-2 mt-4">
      <button
        onClick={onRepeat}
        className="h-12 px-4 bg-blue-500 rounded-md text-white font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
      >
        Repeat Word 🔁
      </button>
      <button
        onClick={onHint}
        disabled={hintDisabled}
        className="h-12 px-4 bg-purple-500 rounded-md text-white font-bold hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-700 disabled:bg-gray-400"
      >
        Hint ✨
      </button>
      <button
        onClick={onSubmit}
        className="h-12 px-8 bg-green-500 rounded-md text-white font-bold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700"
      >
        Submit
      </button>
    </div>
  );
}
