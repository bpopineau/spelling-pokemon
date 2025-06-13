// File: src/lib/utils.ts
//
// Utility to build className strings with optional conflict resolution.
// Uses `clsx` for conditional joins and `tailwind-merge` to remove duplicates.
//
// Example:
//   cn(
//     "p-4 text-center",
//     isActive && "bg-blue-500",
//     externalClassName
//   );

import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Compose class names, removing duplicated utility classes */
export const cn = (...classes: ClassValue[]): string =>
  twMerge(clsx(...classes));
