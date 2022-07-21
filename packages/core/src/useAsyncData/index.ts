import { onMounted, ref, shallowRef, Ref, UnwrapRef } from 'vue-demi'
import { getByPath, Path, useAsyncLoading } from '@vrx/shared'

export interface UseAsyncStateOptions<Data = any, Shallow extends boolean = boolean> {
  immediate?: boolean
  initData?: () => Data
  path?: Path
  shallow?: Shallow
}

/**
 * 获取异步数据
 * @param fn
 * @param options
 */
export function useAsyncData<Data = any, Shallow extends boolean = boolean>(
  fn: (params?: any) => Promise<any>,
  options?: UseAsyncStateOptions<Data, Shallow>
) {
  const { immediate = false, path, initData, shallow = false } = options || {}

  /**
   * 状态
   */
  const data: Shallow extends true ? Ref<Data> : Ref<UnwrapRef<Data>> = shallow
    ? (shallowRef(initData?.()) as any)
    : (ref<Data>(initData?.() as Data) as any)
  /**
   * 是否正在加载
   */
  const { loading, run, error } = useAsyncLoading()

  const execute = (params?: any) => {
    return run(fn(params)).then((res) => {
      data.value = getByPath(res, path)
      return res
    }) as Promise<any>
  }

  immediate &&
    onMounted(() => {
      execute()
    })

  return {
    execute,
    loading,
    error,
    data,
  }
}
