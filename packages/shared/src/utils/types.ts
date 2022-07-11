import { Ref } from 'vue-demi'

export type Fn = () => any

export type MayBeRef<T = any> = Ref<T> | T

export const noop = () => null as any
