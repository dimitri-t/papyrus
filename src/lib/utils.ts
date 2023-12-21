import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge.
 * This helper function takes a variable number of arguments (class values)
 * and merges them into a single class string. It leverages the clsx library
 * to handle conditional and dynamic class names, and then uses tailwind-merge
 * to optimize the final class string for Tailwind CSS. This ensures that the
 * resulting class string is free from conflicts and redundancies, making it
 * ideal for use in React components with dynamic styling needs.
 *
 * @param {ClassValue[]} inputs - An array of class values, which can be strings,
 * arrays, or objects, representing class names.
 * @returns {string} - The optimized, merged class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
