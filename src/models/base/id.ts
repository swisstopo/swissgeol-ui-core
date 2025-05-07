export type Id<T> = (number | string) & {
  __id: T;
};

export const asId = <T>(value: number | string) => value as Id<T>;
