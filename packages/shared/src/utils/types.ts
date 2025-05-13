export type Fn<T = any> = () => T

export type MayBeFn<T = any> = Fn<T> | T

export const noop = () => null as any
