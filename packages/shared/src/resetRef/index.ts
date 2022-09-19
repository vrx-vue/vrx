import { shallowRef, ref, Ref, ShallowRef } from 'vue-demi'

export function resetRef<T = any, Shallow extends boolean = boolean>({
  initValue,
  shallow,
}: {
  initValue?: () => T
  shallow?: Shallow
}): [Shallow extends true ? ShallowRef<T> : Ref<T>, () => void] {
  const data: Shallow extends true ? ShallowRef<T> : Ref<T> = shallow
    ? (shallowRef<T>(initValue?.() as any) as any)
    : (ref<T>(initValue?.() as any) as any)

  const reset = () => {
    data.value = initValue?.() as any
  }

  return [data, reset]
}
