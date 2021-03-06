import { useCallback, useState } from "react";

interface UndoStateOptions {
  maxSize: number;
}

const defaultOptions: UndoStateOptions = { maxSize: 100 };

export const useUndoState = (
  defaultValue: any,
  options?: UndoStateOptions
): [any, (prevState: any) => any, () => void] => {
  const { maxSize } = Object.assign({}, defaultOptions, options);
  const [value, setValue] = useState([
    typeof defaultValue === "function" ? defaultValue() : defaultValue,
  ]);

  const push = useCallback(
    (setterOrValue) => {
      return setValue((current) => {
        const restValues =
          current.length >= maxSize ? current.slice(0, maxSize) : current;

        if (typeof setterOrValue === "function") {
          return [setterOrValue(current[0]), ...restValues];
        } else {
          return [setterOrValue, ...restValues];
        }
      });
    },
    [maxSize]
  );

  const undo = useCallback(() => {
    setValue((current) => {
      if (current.length === 1) {
        return current;
      }

      const [, ...values] = current;

      return values;
    });
  }, []);

  return [value[0], push, undo];
};
