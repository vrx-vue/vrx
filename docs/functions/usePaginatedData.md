---
category: component
---

# usePaginatedData

对表格分页场景与滚动分页加载场景的业务封装

::: warning
特别注意注意该方法要求异步方法返回值内必须返回数据总量
:::

## Usage

```ts
import {usePaginatedData} from '@vrx/core'

const {
    // 数据
    list,
    // 分页是否加载结束
    finished,
    // 搜索数据
    searchData,
    // 分页数据
    pagination,
    // 是否正在加载
    loading,
    // 是否发生错误
    error,
    // 执行异步方法
    execute,
    // 搜索并重置页码为1
    search,
    // 分页数据更改
    paginationChange,
    /**
     * 页码更改
     * pageChange(true) 下一页
     * pageChange(false) 上一页
     * pageChange(1) 跳转至第一页
     */
    pageChange,
    // pageSize更改
    pageSizeChange,
    // 重置所有搜索
    resetSearch,
} = usePaginatedData(
    ({params, pagination}) =>
        fetch(`https://localhost/api/${pagination.pageNum}/${pagination.pageSize}`, {
            body: JSON.stringify(params),
        }),
    {
        // 是否在 onMounted 生命周期自动执行一次，注意，自动执行时，无法传递参数
        immediate: true,
        // 内部状态初始化
        initData: () => [],
        // 获取数据的字符串路径
        path: 'res.data.data',
        // 是否使用 shallowRef 包装状态
        shallow: true,
        // 数据总量获取路径
        totalPath: 'res.data.total',
        // 初始化搜索值
        initSearchData: () => ({name: ''}),
        // 初始化的分页参数
        initPagination: () => ({pageNum: 1, pageSize: 8}),
        // 是否开启列表滚动分页模式，即自动拼接数组
        dataConcat: false,
        // 是否在每次请求前调用 initData 重置数据
        // dataConcat:true 时 resetBeforeExecute无效
        resetBeforeExecute: true,
        /**
         * 在 `execute` 返回值为 `null|undefined` 时 重置数据
         */
        resetOnDataNil: true
    }
)
```

## Type Declarations

```ts
/**
 * 分页数据发生变化时入参
 */
interface UsePaginatedDataPaginationChangeOptions {
    pageSize: string
    pageNum: string
}

interface UsePaginatedDataPagination {
    pageSize: number
    pageNum: number
    total: number
}

interface UsePaginatedDataOptions<
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

interface UsePaginatedDataExecuteParams<SearchData extends Record<string, any> = any> {
    pagination: UsePaginatedDataPagination
    params: SearchData
}

interface UsePaginatedDataPaginationChange<Data = any> {
    (value: any, options?: UsePaginatedDataPaginationChangeOptions): Promise<Data[]>
}

interface UsePaginatedDataPageChange<Data = any> {
    (pageNum: number | boolean): Promise<Data[]>
}

interface UsePaginatedDataPageSizeChange<Data = any> {
    (pageSize: number): Promise<Data[]>
}

interface UsePaginatedDataReturn<
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
declare function usePaginatedData<
    Data = any,
    SearchData extends Record<string, any> = any,
    Shallow extends boolean = false
>(
    fn: (params: UsePaginatedDataExecuteParams) => Promise<any>,
    options?: UsePaginatedDataOptions<Data, SearchData, Shallow>
): UsePaginatedDataReturn<Data, SearchData, Shallow>
```
