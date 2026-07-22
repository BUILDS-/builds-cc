export default function assertExist<T>(
  input: T,
  e: string,
): asserts input is NonNullable<T> {
  if (input == null) throw new Error(e);
}
