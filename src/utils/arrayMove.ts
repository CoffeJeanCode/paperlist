export const arrayMove = <T>(array: T[], from: number, to: number) => {
  const newArray = [...array];
  const startIndex = from < 0 ? newArray.length + from : from;

  if (startIndex >= 0 && startIndex < newArray.length) {
    const endIndex = to < 0 ? newArray.length + to : to;

    const [item] = newArray.splice(from, 1);
    newArray.splice(endIndex, 0, item);
  }

  return newArray;
};
