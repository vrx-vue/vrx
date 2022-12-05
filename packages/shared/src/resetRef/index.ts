import { Ref, ShallowRef, ref, shallowRef } from 'vue-demi'

export type MaybeShallowRef<T = any, Shallow extends boolean = boolean> = Shallow extends true
  ? ShallowRef<T>
  : Ref<T>

export type ResetRef<T = any, Shallow extends boolean = boolean> = [
  MaybeShallowRef<T, Shallow>,
  () => void
]

export function resetRef<T = any, Shallow extends boolean = boolean>({
  initValue,
  shallow,
}: {
  initValue?: () => T
  shallow?: Shallow
}): ResetRef<T, Shallow> {
  const data: Shallow extends true ? ShallowRef<T> : Ref<T> = shallow
    ? (shallowRef<T>(initValue?.() as any) as any)
    : (ref<T>(initValue?.() as any) as any)

  const reset = () => {
    data.value = initValue?.() as any
  }

  return [data, reset]
}
