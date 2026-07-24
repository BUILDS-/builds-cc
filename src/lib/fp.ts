export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

export function debounce<U extends unknown[]>(
  fn: (...args: U) => void,
  ms: number,
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: U) => {
    clearTimeout(timer); // Apparently clearTimeout(undefined) is ok :thumbsup:
    timer = setTimeout(() => fn(...args), ms);
  };
}
