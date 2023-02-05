import { Ref, ShallowRef, ref, shallowRef } from 'vue-demi'
import { Fn } from '../utils'

export type MaybeShallowRef<T = any, Shallow extends boolean = false> = Shallow extends true
  ? ShallowRef<T>
  : Ref<T>

export type ResetRef<T = any, Shallow extends boolean = false> = [
  MaybeShallowRef<T, Shallow>,
  VoidFunction
]

export interface ResetRefOption<T = any, Shallow extends boolean = false> {
  /**
   * 初始化/重置调用方法
   */
  initValue?: Fn<T>
  /**
   * 是否使用 `shallowRef` 包装
   */
  shallow?: Shallow
}

export function resetRef<T = any, Shallow extends boolean = false>({
  initValue,
  shallow,
}: ResetRefOption<T, Shallow>): ResetRef<T, Shallow> {
  const data: Shallow extends true ? ShallowRef<T> : Ref<T> = shallow
    ? (shallowRef<T>(initValue?.() as any) as any)
    : (ref<T>(initValue?.() as any) as any)

  const reset = () => {
    data.value = initValue?.() as any
  }

  return [data, reset]
}
