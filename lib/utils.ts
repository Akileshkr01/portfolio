export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export const isPlaceholder = (value?: string): boolean => !value || value.startsWith("REPLACE_");

export const stripPlaceholder = (value?: string): string | undefined =>
  isPlaceholder(value) ? undefined : value;

export const formatNumber = (n: number, decimals = 0): string =>
  n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
