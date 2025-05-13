import { Ref, ShallowRef, ref, shallowRef } from 'vue'
import { Fn } from '../utils'

export type MaybeShallowRef<T = any, Shallow extends boolean = boolean> = Shallow extends boolean
  ? Ref<T>
  : Shallow extends true
    ? ShallowRef<T>
    : Ref<T>

export type ResetRef<T = any, Shallow extends boolean = boolean> = [
  MaybeShallowRef<T, Shallow>,
  VoidFunction,
]

export interface ResetRefOption<T = any, Shallow extends boolean = boolean> {
  /**
   * 初始化/重置调用方法
   */
  initValue?: Fn<T>
  /**
   * 是否使用 `shallowRef` 包装
   */
  shallow?: Shallow
}

export function resetRef<T = any, Shallow extends boolean = boolean>({
  initValue,
  shallow,
}: ResetRefOption<T, Shallow>): ResetRef<T, Shallow> {
  const data: MaybeShallowRef<T, Shallow> = shallow
    ? (shallowRef<T>(initValue?.() as any) as any)
    : (ref<T>(initValue?.() as any) as any)

  const reset = () => {
    data.value = initValue?.() as any
  }

  return [data, reset]
}
