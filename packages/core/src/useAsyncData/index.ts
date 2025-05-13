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
import { type ComputedRef, type Ref, computed, onBeforeUnmount, ref } from 'vue'

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
   * @default false
   */
  resetOnDataNil?: boolean
}

export interface UseAsyncStateActionOptions<Shallow extends boolean = boolean> {
  /**
   * 立即执行
   * @default false
   */
  immediate?: boolean
  /**
   * 是否改用 `shallowRef`
   * @default false
   */
  shallow?: Shallow
  /**
   * 是否在调用`execute`前重置数据
   * @default false
   */
  resetBeforeExecute?: boolean
}

export interface UseAsyncStateOptions<Data = any, Shallow extends boolean = boolean>
  extends UseAsyncStateCommonOptions<Data>,
    UseAsyncStateActionOptions<Shallow> {}

export interface UseAsyncStateExecOptions {
  /**
   * 取消异步方法控制器信号
   */
  signal: AbortSignal
}

export interface UseAsyncStateCommonReturn<Data = any> extends UseAsyncLoadingState {
  /**
   * 执行异步方法
   * @param params
   * @returns
   */
  execute: (params?: any) => Promise<Data>
  /**
   * 取消一个异步方法
   * @returns
   */
  abort: () => void
  /**
   * 异步方法是否被取消
   */
  aborted: Ref<boolean>
  /**
   * 是否可以取消异步方法
   */
  canAbort: ComputedRef<boolean>
}

export interface UseAsyncStateReturn<Data = any, Shallow extends boolean = boolean>
  extends UseAsyncStateCommonReturn<Data> {
  /**
   * 异步获取到的状态
   */
  data: MaybeShallowRef<Data, Shallow>
}

/**
 * 获取异步数据
 * @param fn
 * @param options
 */
export function useAsyncData<Data = any, Shallow extends boolean = boolean>(
  fn: (params: any | undefined, options: UseAsyncStateExecOptions) => Promise<any>,
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

  const supportAbort = typeof AbortController === 'function'

  let abortController: AbortController | null = null

  const aborted = ref(false)

  const canAbort = computed(() => supportAbort && loading.value)

  const abort = () => {
    // not support AbortController
    if (!supportAbort) {
      return
    }
    abortController?.abort()
    abortController = new AbortController()
    abortController.signal.onabort = () => (aborted.value = true)
  }

  const execute = (params?: any) => {
    // 为防止异步方法竞态，调用异步方法前取消上一次调用
    abort()
    aborted.value = false
    if (resetBeforeExecute) {
      reset()
    }
    return run(fn(params, { signal: abortController!.signal })).then((res) => {
      const _data = getByPath<Data>(res, path)
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

  onBeforeUnmount(() => {
    abort()
    abortController = null
  })

  return {
    execute,
    loading,
    error,
    data,
    canAbort,
    aborted,
    abort,
  }
}
