export const createId = () => {
  let date = new Date().getTime();

  const replaceRandom = (str: string) => {
    const random = (date + Math.random() * 16) % 16 | 0;
    date = Math.floor(date / 16);
    return (str === "x" ? random : (random & 0x3) | 0x8).toString(16);
  };

  const uuid = "xxxxxxxx-xxyx-yxxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    replaceRandom
  );
  return uuid;
};
