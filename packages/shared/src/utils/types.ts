import { Ref } from 'vue-demi'

export type Fn<T = any> = () => T

export type MayBeFn<T = any> = Fn<T> | T

export type MayBeRef<T = any> = Ref<T> | T

export const noop = () => null as any
