export const prop = <P extends keyof T, T>(p: P) => (d: T) => d[p];
export const map = <T, U>(mapper: (x: T) => U) => (array: T[]) =>
  array.map(mapper);
export const pluck = <K extends keyof T, T>(p: K) => map(prop<K, T>(p));
