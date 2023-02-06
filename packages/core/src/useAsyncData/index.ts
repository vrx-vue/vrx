import {
  Fn,
  MaybeShallowRef,
  Path,
  UseAsyncLoadingState,
  getByPath,
  resetRef,
  useAsyncLoading,
  useImmediateFn,
} from '@vrx/shared'
import { isNil } from '@vill-v/type-as'

export interface UseAsyncStateCommonOptions<Data = any> {
  /**
   * 初始化数据
   */
  initData?: Fn<Data>
  /**
   * 获取数据的路径
   */
  path?: Path
  /**
   * 在 `execute` 返回值为 `null|undefined` 时 重置数据
   */
  resetOnDataNil?: boolean
}

export interface UseAsyncStateActionOptions<Shallow extends boolean = boolean> {
  /**
   * 立即执行
   */
  immediate?: boolean
  /**
   * 是否改用 `shallowRef`
   */
  shallow?: Shallow
  /**
   * 是否在调用`execute`前重置数据
   */
  resetBeforeExecute?: boolean
}

export interface UseAsyncStateOptions<Data = any, Shallow extends boolean = boolean>
  extends UseAsyncStateCommonOptions<Data>,
    UseAsyncStateActionOptions<Shallow> {}

export interface UseAsyncStateCommonReturn<Data = any> extends UseAsyncLoadingState {
  execute: (params?: any) => Promise<Data>
}

export interface UseAsyncStateReturn<Data = any, Shallow extends boolean = boolean>
  extends UseAsyncStateCommonReturn<Data> {
  data: MaybeShallowRef<Data, Shallow>
}

/**
 * 获取异步数据
 * @param fn
 * @param options
 */
export function useAsyncData<Data = any, Shallow extends boolean = boolean>(
  fn: (params?: any) => Promise<any>,
  options?: UseAsyncStateOptions<Data, Shallow>
): UseAsyncStateReturn<Data, Shallow> {
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
