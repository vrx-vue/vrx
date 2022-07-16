import { useAsyncData, UseAsyncStateOptions } from '../useAsyncData'
import { onMounted, Ref, ref, shallowRef, toRaw } from 'vue-demi'
import { getByPath, Path } from '@vrx/shared'

/**
 * 分页数据发生变化时入参
 */
export interface UsePaginatedDataPaginationChangeOptions {
  pageSize: string
  pageNum: string
}

export interface UsePaginatedDataOptions<
  Data = any,
  SearchData extends Record<string, any> = any,
  Shallow extends boolean = boolean
> extends UseAsyncStateOptions<Data[], Shallow> {
  totalPath?: Path
  initSearchData?: () => SearchData
  dataConcat?: boolean
}

export interface UsePaginatedDataPagination {
  pageSize: number
  pageNum: number
  total: number
}

/**
 * 一个分页数据加载方案
 * @param fn
 * @param options
 */
export function usePaginatedData<Data = any, SearchData = any, Shallow extends boolean = boolean>(
  fn: (params: { pagination: UsePaginatedDataPagination; params: SearchData }) => Promise<any>,
  options?: UsePaginatedDataOptions<Data, SearchData, Shallow>
) {
  const {
    totalPath = 'total',
    initSearchData,
    dataConcat = false,
    path,
    initData,
    shallow,
    immediate,
  } = options || {}

  const { loading, error, execute: _execute } = useAsyncData(fn, { ...options, immediate: false })

  const list: Ref<Data[]> = shallow
    ? (shallowRef(initData?.()) as any)
    : (ref(initData?.() as any) as any)

  /**
   * 分页是否已经结束
   */
  const finished = ref(false)

  /**
   * 搜索数据
   */
  const searchData = ref<SearchData>(initSearchData?.() || ({} as any))

  /**
   * 分页数据
   */
  const pagination = ref<UsePaginatedDataPagination>({
    pageSize: 10,
    pageNum: 1,
    total: 0,
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
    return pageChange(1)
  }

  /**
   * 重置搜索
   */
  const resetSearch = () => {
    searchData.value = initSearchData?.() || ({} as any)
    return pageChange(1)
  }

  immediate &&
    onMounted(() => {
      execute()
    })
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
