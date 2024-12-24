---
category: state
---

# useAsyncData

对 [vueuse](https://vueuse.org/) 中 [useAsyncState](https://vueuse.org/core/useAsyncState/)的拓展

## Usage

```ts twoslash
import { useAsyncData } from '@vrx/core'

const {
  // 执行异步方法
  execute,
  // 是否正在加载
  loading,
  // 是否发生错误
  error,
  // 数据
  data,
  // 取消异步方法
  abort,
  // 异步方法是否取消
  aborted,
  // 是否可以取消
  canAbort,
} = useAsyncData((params,{signal}) => fetch('https://localhost', { body: JSON.stringify(params),signal }), {
  // 是否在 onMounted 生命周期自动执行一次，注意，自动执行时，无法传递参数
  immediate: true,
  // 内部状态初始化
  initData: () => [],
  // 获取数据的字符串路径
  path: 'res.data.data',
  // 是否使用 shallowRef 包装状态
  shallow: true,
  // 是否在每次请求前调用 initData 重置数据
  resetBeforeExecute: true,
  /**
   * 在 `execute` 返回值为 `null|undefined` 时 重置数据
   */
  resetOnDataNil: true,
})
```

## Type Declarations

```ts
interface UseAsyncStateCommonOptions<Data = any> {
    /**
     * 初始化数据
     */
    initData?: Fn<Data>;
    /**
     * 获取数据的路径
     */
    path?: Path;
    /**
     * 在 `execute` 返回值为 `null|undefined` 时 重置数据
     * @default false
     */
    resetOnDataNil?: boolean;
}
interface UseAsyncStateActionOptions<Shallow extends boolean = boolean> {
    /**
     * 立即执行
     * @default false
     */
    immediate?: boolean;
    /**
     * 是否改用 `shallowRef`
     * @default false
     */
    shallow?: Shallow;
    /**
     * 是否在调用`execute`前重置数据
     * @default false
     */
    resetBeforeExecute?: boolean;
}
interface UseAsyncStateOptions<Data = any, Shallow extends boolean = boolean> extends UseAsyncStateCommonOptions<Data>, UseAsyncStateActionOptions<Shallow> {
}
interface UseAsyncStateExecOptions {
    /**
     * 取消异步方法控制器信号
     */
    signal: AbortSignal;
}
interface UseAsyncStateCommonReturn<Data = any> extends UseAsyncLoadingState {
    /**
     * 执行异步方法
     * @param params
     * @returns
     */
    execute: (params?: any) => Promise<Data>;
    /**
     * 取消一个异步方法
     * @returns
     */
    abort: () => void;
    /**
     * 异步方法是否被取消
     */
    aborted: Ref<boolean>;
    /**
     * 是否可以取消异步方法
     */
    canAbort: ComputedRef<boolean>;
}
interface UseAsyncStateReturn<Data = any, Shallow extends boolean = boolean> extends UseAsyncStateCommonReturn<Data> {
    /**
     * 异步获取到的状态
     */
    data: MaybeShallowRef<Data, Shallow>;
}
/**
 * 获取异步数据
 * @param fn
 * @param options
 */
declare function useAsyncData<Data = any, Shallow extends boolean = boolean>(fn: (params: any | undefined, options: UseAsyncStateExecOptions) => Promise<any>, options?: UseAsyncStateOptions<Data, Shallow>): UseAsyncStateReturn<Data, Shallow>;
```
