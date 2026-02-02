export type FieldValidator<T> = (
    name: keyof T,
    value: T[keyof T],
    values: T
) => string | undefined;