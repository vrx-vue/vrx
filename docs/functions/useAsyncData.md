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
        shallow: true
    }
)
```

## Type Declarations

```ts
interface UseAsyncStateOptions<Data = any, Shallow extends boolean = boolean> {
    // 是否在 onMounted 生命周期自动执行一次，注意，自动执行时，无法传递参数
    immediate?: boolean;
    // 内部状态初始化
    initData?: () => Data;
    // 获取数据的字符串路径
    path?: Path;
    // 是否使用 shallowRef 包装状态
    shallow?: Shallow;
}

/**
 * 获取异步数据
 * @param fn
 * @param options
 */
declare function useAsyncData<Data = any, Shallow extends boolean = boolean>(fn: (params?: any) => Promise<any>, options?: UseAsyncStateOptions<Data, Shallow>): {
    execute: (params?: any) => Promise<any>;
    loading: Ref<boolean>;
    error: Ref<boolean>;
    data: Shallow extends true ? Ref<Data> : Ref<UnwrapRef<Data>>;
};
```