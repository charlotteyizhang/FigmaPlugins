export const getContrastRGB = ({
  r,
  g,
  b,
}: {
  r: number;
  g: number;
  b: number;
}): {
  r: number;
  g: number;
  b: number;
} => {
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
};

export interface NestedObject<A> {
  [key: string]: NestedObject<A> | string;
}

interface ReturnType {
  name: string;
  value: string;
}
export const flattenObjKey = (
  prefix: string,
  value: NestedObject<string>
): Array<ReturnType> => {
  const init: Array<ReturnType> = [];
  const x = Object.entries(value).reduce((acc, [key2, value]) => {
    if (typeof value === "string") {
      acc.push({ name: prefix === "" ? key2 : `${prefix}/${key2}`, value });
      return acc;
    } else {
      const x = flattenObjKey(
        prefix === "" ? key2 : `${prefix}/${key2}`,
        value
      );

      const newArray = acc.concat(x);
      return newArray;
    }
  }, init);

  return x;
};
