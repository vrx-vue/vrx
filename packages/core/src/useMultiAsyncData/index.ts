import { UseAsyncStateOptions } from '../useAsyncData'
import { MaybeShallowRef, getByPath, resetRef, useAsyncLoading, useImmediateFn } from '@vrx/shared'

export type UseMultiAsyncDataMulti<Data extends Record<string, any> = any> = {
  [Key in keyof Data]: Omit<
    UseAsyncStateOptions<Data[Key]>,
    'resetBeforeExecute' | 'immediate' | 'shallow'
  >
}

export interface UseMultiAsyncData<
  Data extends Record<string, any> = any,
  Shallow extends boolean = boolean
> {
  multi: UseMultiAsyncDataMulti<Data>
  resetBeforeExecute?: boolean
  immediate?: boolean
  shallow?: Shallow
}

/**
 * 获取异步方法内批量数据
 * @param fn
 * @param options
 */
export const useMultiAsyncData = <
  Data extends Record<string, any>,
  Shallow extends boolean = boolean
>(
  fn: (params?: any) => Promise<any>,
  options: UseMultiAsyncData<Data, Shallow>
) => {
  const { multi, resetBeforeExecute, immediate, shallow } = options

  const dataObj: { [Key in keyof Data]: MaybeShallowRef<Data[Key], Shallow> } = {} as any
  const resetObj: { [Key in keyof Data]: () => void } = {} as any

  Object.keys(multi).forEach((key: keyof Data) => {
    const item = multi[key]
    const [data, reset] = resetRef({ initValue: item.initData, shallow })
    dataObj[key] = data
    resetObj[key] = reset
  })

  /**
   * 是否正在加载
   */
  const { loading, run, error } = useAsyncLoading()

  const execute = (params?: any) => {
    if (resetBeforeExecute) {
      Object.keys(resetObj).forEach((key) => {
        resetObj[key]()
      })
    }
    return run(fn(params)).then((res) => {
      Object.keys(dataObj).forEach((key) => {
        dataObj[key].value = getByPath(res, multi[key].path)
      })
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
    ...dataObj,
  }
}
