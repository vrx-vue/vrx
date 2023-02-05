import { Path, getByPath, resetRef, useAsyncLoading, useImmediateFn } from '@vrx/shared'
import { isNil } from '@vill-v/type-as'

export interface UseAsyncStateOptions<Data = any, Shallow extends boolean = boolean> {
  /**
   * 立即执行
   */
  immediate?: boolean
  /**
   * 初始化数据
   */
  initData?: () => Data
  /**
   * 获取数据的路径
   */
  path?: Path
  /**
   * 是否改用 `shallowRef`
   */
  shallow?: Shallow
  /**
   * 是否在调用`execute`前重置数据
   */
  resetBeforeExecute?: boolean
  /**
   * 在 `execute` 返回值为 `null|undefined` 时 重置数据
   */
  resetOnDataNil?: boolean
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
  const {
    immediate = false,
    path,
    initData,
    shallow,
    resetBeforeExecute,
    resetOnDataNil,
  } = options || {}

  /**
   * 状态
   */
  const [data, reset] = resetRef<Data, Shallow>({
    initValue: initData,
    shallow,
  })
  /**
   * 是否正在加载
   */
  const { loading, run, error } = useAsyncLoading()

  const execute = (params?: any) => {
    if (resetBeforeExecute) {
      reset()
    }
    return run(fn(params)).then((res) => {
      const _data = getByPath(res, path)
      // 如果数据为 nil 时，则重置数据
      if (resetOnDataNil && isNil(_data)) {
        reset()
      } else {
        data.value = _data
      }
      return res
    }) as Promise<any>
  }

  useImmediateFn(() => {
    execute()
  }, immediate)

  return {
    execute,
    loading,
    error,
    data,
  }
}
