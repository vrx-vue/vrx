import { Fn, resetRef, useImmediateFn } from '@vrx/shared'
import { Ref, toRaw } from 'vue'
import { isNil } from '@vill-v/type-as'
import {
  type UseAsyncStateExecOptions,
  type UseAsyncStateOptions,
  type UseAsyncStateReturn,
  useAsyncData,
} from '../useAsyncData'

export interface UseSearchAsyncData<
  Data = any,
  SearchData extends Record<string, any> = any,
  Shallow extends boolean = boolean,
> extends UseAsyncStateOptions<Data, Shallow> {
  /**
   * 初始化搜索数据
   */
  initSearchData?: () => SearchData

  /**
   * 是否允许在异步任务执行时且存在入参时，直接使用入参作为搜索值
   */
  allowOverrideSearchData?: boolean
}

export interface UseSearchAsyncDataReturn<
  Data = any,
  SearchData extends Record<string, any> = any,
  Shallow extends boolean = boolean,
> extends UseAsyncStateReturn<Data, Shallow> {
  searchData: Ref<SearchData>
  search: Fn<Promise<Data>>
  resetSearchData: VoidFunction
  resetSearch: Fn<Promise<Data>>
}

export const useSearchAsyncData = <
  Data = any,
  SearchData extends Record<string, any> = any,
  Shallow extends boolean = boolean,
>(
  fn: (params: any | undefined, options: UseAsyncStateExecOptions) => Promise<any>,
  options?: UseSearchAsyncData<Data, SearchData, Shallow>
): UseSearchAsyncDataReturn<Data, SearchData, Shallow> => {
  const {
    initSearchData = () => ({}) as SearchData,
    immediate,
    allowOverrideSearchData,
  } = options || {}

  const {
    loading,
    error,
    data,
    execute: _execute,
    abort,
    aborted,
    canAbort,
  } = useAsyncData(fn, { ...options, immediate: false })

  /**
   * 搜索数据
   */
  const [searchData, resetSearchData] = resetRef<SearchData, false>({
    initValue: initSearchData,
  })

  const execute = (params?: any) => {
    const data = allowOverrideSearchData && !isNil(params) ? params : searchData.value
    return _execute(toRaw(data))
  }

  const search = () => {
    return _execute(toRaw(searchData.value))
  }

  const resetSearch = () => {
    resetSearchData()
    return search()
  }

  useImmediateFn(() => {
    execute()
  }, immediate)

  return {
    searchData,
    search,
    resetSearchData,
    execute,
    resetSearch,
    loading,
    error,
    data,
    abort,
    canAbort,
    aborted,
  }
}
