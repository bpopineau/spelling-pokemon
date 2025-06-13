// File: src/lib/utils.ts
//
// Utility to build className strings while safely merging Tailwind classes.
// Uses `clsx` for conditional joins and `tailwind-merge` to resolve conflicts.
//
// Example:
//   cn(
//     "p-4 text-center",
//     isActive && "bg-blue-500",
//     externalClassName
//   );

import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Compose class names and merge Tailwind utility conflicts */
export const cn = (...classes: ClassValue[]): string =>
  twMerge(clsx(...classes));
