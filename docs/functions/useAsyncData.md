---
category: state
---

# useAsyncData

对 [vueuse](https://vueuse.org/) 中 [useAsyncState](https://vueuse.org/core/useAsyncState/)的拓展

## Usage

```ts
import {useAsyncData} from '@vrx/core'

const {
    // 执行异步方法
    execute,
    // 是否正在加载
    loading,
    // 是否发生错误
    error,
    // 数据
    data
} = useAsyncData(
    (params) => fetch('https://localhost', {body: JSON.stringify(params)}),
    {
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
    }
)
```

## Type Declarations

```ts
interface UseAsyncStateOptions<Data = any, Shallow extends boolean = boolean> {
    /**
     * 立即执行
     */
    immediate?: boolean;
    /**
     * 初始化数据
     */
    initData?: () => Data;
    /**
     * 获取数据的路径
     */
    path?: Path;
    /**
     * 是否改用 `shallowRef`
     */
    shallow?: Shallow;
    /**
     * 是否在请求前重置数据
     */
    resetBeforeExecute?: boolean;
}
/**
 * 获取异步数据
 * @param fn
 * @param options
 */
declare function useAsyncData<Data = any, Shallow extends boolean = boolean>(fn: (params?: any) => Promise<any>, options?: UseAsyncStateOptions<Data, Shallow>): {
    execute: (params?: any) => Promise<any>;
    loading: vue.Ref<boolean>;
    error: vue.Ref<boolean>;
    data: _vrx_shared.MaybeShallowRef<Data, Shallow>;
};
```