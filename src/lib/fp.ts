export function assertExist<T>(
  input: T,
  e: string,
): asserts input is NonNullable<T> {
  if (input == null) throw new Error(e);
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

export function debounce<U extends unknown[]>(
  fn: (...args: U) => void,
  ms: number,
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: U) => {
    clearTimeout(timer); // Apparently clearTimeout(undefined) is legal
    timer = setTimeout(() => fn(...args), ms);
  };
}
