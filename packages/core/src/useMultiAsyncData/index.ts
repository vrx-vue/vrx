import {
  UseAsyncStateActionOptions,
  UseAsyncStateCommonOptions,
  UseAsyncStateCommonReturn,
} from '../useAsyncData'
import { MaybeShallowRef, getByPath, resetRef, useAsyncLoading, useImmediateFn } from '@vrx/shared'
import { isNil } from '@vill-v/type-as'

export type UseMultiAsyncDataMulti<Data extends Record<string, any> = any> = {
  [Key in keyof Data]: UseAsyncStateCommonOptions<Data[Key]>
}

export interface UseMultiAsyncData<
  Data extends Record<string, any> = any,
  Shallow extends boolean = false
> extends UseAsyncStateActionOptions<Shallow> {
  multi: UseMultiAsyncDataMulti<Data>
}

export type UseMultiAsyncDataReturn<
  Data extends Record<string, any>,
  Shallow extends boolean = false
> = UseAsyncStateCommonReturn & { [Key in keyof Data]: MaybeShallowRef<Data[Key], Shallow> }

/**
 * 获取异步方法内批量数据
 * @param fn
 * @param options
 */
export const useMultiAsyncData = <
  Data extends Record<string, any>,
  Shallow extends boolean = false
>(
  fn: (params?: any) => Promise<any>,
  options: UseMultiAsyncData<Data, Shallow>
): UseMultiAsyncDataReturn<Data, Shallow> => {
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
        const _data = getByPath(res, multi[key].path)
        // 如果数据为 nil 时，则重置数据
        if (multi[key].resetOnDataNil && isNil(_data)) {
          resetObj[key]()
        } else {
          dataObj[key].value = getByPath(res, multi[key].path)
        }
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
