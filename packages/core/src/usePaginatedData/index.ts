import {
  UseSearchAsyncData,
  UseSearchAsyncDataReturn,
  useSearchAsyncData,
} from '../useSearchAsyncData'
import { Ref, ref, toRaw } from 'vue-demi'
import { MaybeShallowRef, Path, getByPath, resetRef, useImmediateFn } from '@vrx/shared'

/**
 * 分页数据发生变化时入参
 */
export interface UsePaginatedDataPaginationChangeOptions {
  pageSize: string
  pageNum: string
}

export interface UsePaginatedDataPagination {
  pageSize: number
  pageNum: number
  total: number
}

export interface UsePaginatedDataOptions<
  Data = any,
  SearchData extends Record<string, any> = any,
  Shallow extends boolean = false
> extends Omit<UseSearchAsyncData<Data[], SearchData, Shallow>, 'allowOverrideSearchData'> {
  /**
   * 分页数据总数获取路径
   */
  totalPath?: Path
  /**
   * 初始化 分页参数
   */
  initPagination?: () => Omit<UsePaginatedDataPagination, 'total'>
  /**
   * 是否在类似 infinityList 业务下，分页拼接数据
   */
  dataConcat?: boolean
}

export interface UsePaginatedDataExecuteParams<SearchData extends Record<string, any> = any> {
  pagination: UsePaginatedDataPagination
  params: SearchData
}

export interface UsePaginatedDataPaginationChange<Data = any> {
  (value: any, options?: UsePaginatedDataPaginationChangeOptions): Promise<Data[]>
}

export interface UsePaginatedDataPageChange<Data = any> {
  (pageNum: number): Promise<Data[]>
}

export interface UsePaginatedDataPageSizeChange<Data = any> {
  (pageSize: number): Promise<Data[]>
}
export interface UsePaginatedDataReturn<
  Data = any,
  SearchData extends Record<string, any> = any,
  Shallow extends boolean = false
> extends Omit<UseSearchAsyncDataReturn<Data[], SearchData, Shallow>, 'data' | 'resetSearchData'> {
  list: MaybeShallowRef<Data[], Shallow>
  finished: Ref<boolean>
  pagination: Ref<UsePaginatedDataPagination>
  paginationChange: UsePaginatedDataPaginationChange<Data>
  pageChange: UsePaginatedDataPageChange<Data>
  pageSizeChange: UsePaginatedDataPageSizeChange<Data>
}

/**
 * 一个分页数据加载方案
 * @param fn
 * @param options
 */
export function usePaginatedData<
  Data = any,
  SearchData extends Record<string, any> = any,
  Shallow extends boolean = false
>(
  fn: (params: UsePaginatedDataExecuteParams) => Promise<any>,
  options?: UsePaginatedDataOptions<Data, SearchData, Shallow>
): UsePaginatedDataReturn<Data, SearchData, Shallow> {
  const {
    totalPath = 'total',
    dataConcat = false,
    path,
    initData,
    shallow,
    immediate,
    initPagination = () => ({}),
    resetBeforeExecute,
  } = options || {}

  const {
    loading,
    error,
    execute: _execute,
    searchData,
    resetSearchData,
  } = useSearchAsyncData(fn, { ...options, immediate: false, allowOverrideSearchData: true })

  const [list, resetList] = resetRef<Data[], Shallow>({
    initValue: initData,
    shallow,
  })

  /**
   * 分页是否已经结束
   */
  const finished = ref(false)

  /**
   * 分页数据
   */
  const pagination = ref<UsePaginatedDataPagination>({
    pageSize: 10,
    pageNum: 1,
    total: 0,
    ...initPagination(),
  })

  const setList = (res) => {
    const realRes = getByPath(res, path) || []
    if (!Array.isArray(realRes)) {
      return
    }
    if (dataConcat && pagination.value.pageNum > 1) {
      list.value.push(...realRes)
      return
    }

    list.value = realRes
  }

  /**
   * 检查分页是否结束
   */
  const checkIsFinish = () => {
    const { total, pageSize, pageNum } = pagination.value
    if (dataConcat) {
      return list.value.length >= total
    }
    return pageNum * pageSize >= total
  }

  /**
   * 执行方法
   */
  const execute = () => {
    if (!dataConcat && resetBeforeExecute) {
      resetList()
    }
    return _execute({ pagination: toRaw(pagination.value), params: toRaw(searchData.value) }).then(
      (res) => {
        pagination.value.total = getByPath<number>(res, totalPath)
        setList(res)
        finished.value = checkIsFinish()
        return res
      }
    )
  }

  /**
   * 页码
   * @param value
   * @param options
   */
  const paginationChange = (value: any, options?: UsePaginatedDataPaginationChangeOptions) => {
    pagination.value.pageNum = value[options?.pageNum || 'pageNum']
    pagination.value.pageSize = value[options?.pageSize || 'pageSize']
    return execute()
  }

  /**
   * 页码变化
   * @param pageNum
   */
  const pageChange = (pageNum: number) => {
    pagination.value.pageNum = pageNum
    return execute()
  }

  /**
   * 一页显示数量变化
   * @param pageSize
   */
  const pageSizeChange = (pageSize: number) => {
    pagination.value.pageSize = pageSize
    return pageChange(1)
  }

  /**
   * 搜索
   */
  const search = () => {
    if (resetBeforeExecute) {
      resetList()
    }
    return pageChange(1)
  }

  /**
   * 重置搜索
   */
  const resetSearch = () => {
    resetSearchData()
    return search()
  }

  useImmediateFn(() => {
    execute()
  }, immediate)

  return {
    list,
    finished,
    searchData,
    pagination,
    loading,
    error,
    execute,
    search,
    paginationChange,
    pageChange,
    pageSizeChange,
    resetSearch,
  }
}
