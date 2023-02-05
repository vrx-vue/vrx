import { Ref, ref } from 'vue-demi'
import { MayBeFn } from '../utils'

export interface UseAsyncLoadingState {
  loading: Ref<boolean>
  error: Ref<boolean>
}
export interface UseAsyncLoadingReturn extends UseAsyncLoadingState {
  setLoading: (value: boolean) => void
  run: <Data = any>(fn: MayBeFn<Promise<Data>>) => Promise<Data>
}

/**
 * 控制异步方法的加载态
 */
export function useAsyncLoading(): UseAsyncLoadingReturn {
  /**
   * 是否正在加载
   */
  const loading = ref(false)

  /**
   * 是否发生了错误，在此处重新调用异步方法，会重置改状态为 `false`
   */
  const error = ref(false)

  /**
   * 设置是否正在加载
   * @param value
   */
  const setLoading = (value?: boolean) => {
    if (typeof value === 'boolean') {
      loading.value = value
      return
    }
    loading.value = !loading.value
  }

  const _run = <Data = any>(fn: Promise<Data>) => {
    error.value = false
    setLoading(true)
    return fn
      .catch((err) => {
        error.value = false
        return Promise.reject(err)
      })
      .finally(() => setLoading(false))
  }

  /**
   * 执行异步方法
   * @param fn
   */
  const run = <Data = any>(fn: (() => Promise<Data>) | Promise<Data>) => {
    error.value = false
    setLoading(true)
    if (fn instanceof Promise) {
      return _run(fn)
    }
    return _run(fn())
  }

  return {
    loading,
    setLoading,
    run,
    error,
  }
}
