---
category: component
---

# usePaginatedData

对表格分页场景与滚动分页加载场景的业务封装

::: warning 特别注意
注意该方法要求异步方法返回值内必须返回数据总量
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
    // 页码更改
    pageChange,
    // pageSize更改
    pageSizeChange,
    // 重置所有搜索
    resetSearch,
} = usePaginatedData(
    ({
         params,
         pagination
     }) => fetch(`https://localhost/api/${pagination.pageNum}/${pagination.pageSize}`,
        {
            body: JSON.stringify(params)
        }
    ), {
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
    }
)
```

## Type Declarations

```ts
/**
 * 分页数据发生变化时入参
 */
interface UsePaginatedDataPaginationChangeOptions {
    pageSize: string;
    pageNum: string;
}
interface UsePaginatedDataPagination {
    pageSize: number;
    pageNum: number;
    total: number;
}
interface UsePaginatedDataOptions<Data = any, SearchData extends Record<string, any> = any, Shallow extends boolean = boolean> extends UseAsyncStateOptions<Data[], Shallow> {
    totalPath?: Path;
    initSearchData?: () => SearchData;
    initPagination?: () => Omit<UsePaginatedDataPagination, 'total'>;
    dataConcat?: boolean;
}
/**
 * 一个分页数据加载方案
 * @param fn
 * @param options
 */
declare function usePaginatedData<Data = any, SearchData extends Record<string, any> = any, Shallow extends boolean = boolean>(fn: (params: {
    pagination: UsePaginatedDataPagination;
    params: SearchData;
}) => Promise<any>, options?: UsePaginatedDataOptions<Data, SearchData, Shallow>): {
    list: _vrx_shared.MaybeShallowRef<Data[], Shallow>;
    finished: vue_demi.Ref<boolean>;
    searchData: vue_demi.Ref<SearchData> | vue_demi.ShallowRef<SearchData>;
    pagination: vue_demi.Ref<{
        pageSize: number;
        pageNum: number;
        total: number;
    }>;
    loading: vue_demi.Ref<boolean>;
    error: vue_demi.Ref<boolean>;
    execute: () => Promise<any>;
    search: () => Promise<any>;
    paginationChange: (value: any, options?: UsePaginatedDataPaginationChangeOptions) => Promise<any>;
    pageChange: (pageNum: number) => Promise<any>;
    pageSizeChange: (pageSize: number) => Promise<any>;
    resetSearch: () => Promise<any>;
};
```