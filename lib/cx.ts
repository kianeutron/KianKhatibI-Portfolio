type ClassValue = string | false | null | undefined;

/** Joins truthy class names; a tiny stand-in for `clsx` with no dependency. */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
