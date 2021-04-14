export const toMap = <T, P extends keyof T>(arr: T[], p: P) =>
  arr.reduce((list, el) => {
    list.set(el[p], el);
    return list;
  }, new Map());
