---
category: component
---

# useSearchAsyncData

带搜索状态的异步状态业务封装

## Usage

```ts twoslash
import { useSearchAsyncData } from '@vrx/core'

const {
  // 数据
  data,
  // 搜索数据
  searchData,
  // 是否正在加载
  loading,
  // 是否发生错误
  error,
  // 执行异步方法
  // allowOverrideSearchData:true 时 接受该方法入参
  execute,
  // 搜索
  search,
  // 重置所有搜索
  resetSearch,
  // 重置搜索状态，但并不触发异步任务
  resetSearchData,
} = useSearchAsyncData(
  (params) =>
    fetch(`https://localhost/api/`, {
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
    // 初始化搜索值
    initSearchData: () => ({ name: '' }),
    // 是否在每次请求前调用 initData 重置数据
    // dataConcat:true 时 resetBeforeExecute无效
    resetBeforeExecute: true,
    /**
     * 是否允许在异步任务执行时且存在入参时，直接使用入参作为搜索值
     */
    allowOverrideSearchData: true,
  }
)
```

## Type Declarations

```ts
interface UseAsyncStateOptions<Data = any, Shallow extends boolean = boolean> {
  /**
   * 立即执行
   */
  immediate?: boolean
  /**
   * 初始化数据
   */
  initData?: () => Data
  /**
   * 获取数据的路径
   */
  path?: Path
  /**
   * 是否改用 `shallowRef`
   */
  shallow?: Shallow
  /**
   * 是否在请求前重置数据
   */
  resetBeforeExecute?: boolean
}

interface UseSearchAsyncData<
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
declare const useSearchAsyncData: <
  Data = any,
  SearchData extends Record<string, any> = any,
  Shallow extends boolean = boolean,
>(
  fn: (params?: any) => Promise<any>,
  options?: UseSearchAsyncData<Data, SearchData, Shallow> | undefined
) => {
  searchData: vue_demi.Ref<SearchData>
  search: () => Promise<any>
  resetSearchData: () => void
  execute: (params?: any) => Promise<any>
  resetSearch: () => Promise<any>
  loading: vue_demi.Ref<boolean>
  error: vue_demi.Ref<boolean>
  data: _vrx_shared.MaybeShallowRef<Data, Shallow>
}
```
