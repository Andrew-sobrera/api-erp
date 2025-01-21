export function not(value: boolean): boolean {
  return !value;
}

export function isNull(value: any): boolean {
  return value === null;
}

export function isUndefined(value: any): boolean {
  return value === undefined;
}

export function isEmpty(value: any): boolean {
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'number') return isNull(value) || isUndefined(value);
  return (
    isNull(value) ||
    isUndefined(value) ||
    value === '' ||
    Object.keys(value).length === 0
  );
}

export function isNotEmpty(value: any): boolean {
  return not(isEmpty(value));
}

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
