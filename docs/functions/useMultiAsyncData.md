---
category: state
---

# useMultiAsyncData

作为 [useAsyncData](./useAsyncData) 的批量版，可以一次性从异步任务中获取多个状态

::: warning 警告

 该功能处于实验阶段,未经过完整测试，且API不稳定

:::

## Usage

```ts
import {useMultiAsyncData} from '@vrx/core'

const {
    // 执行异步方法
    execute,
    // 是否正在加载
    loading,
    // 是否发生错误
    error,
    // 数据
    data,
    // 状态对应multi选项中对应的key值
    roleList,
    // 状态对应multi选项中对应的key值
    userList,
} = useMultiAsyncData(
    (params) => fetch('https://localhost', {body: JSON.stringify(params)}),
    {
        // 是否在 onMounted 生命周期自动执行一次，注意，自动执行时，无法传递参数
        immediate: true,
        // 是否使用 shallowRef 包装状态
        shallow: true,
        // 是否在每次请求前调用 initData 重置数据
        resetBeforeExecute: true,
        // 批量获取异步任务状态配置
        multi: {
            roleList: {
                // 内部状态初始化
                initData: () => [],
                // 获取数据的字符串路径
                path: 'res.data.roleList',
            },
            userList: {
                // 内部状态初始化
                initData: () => [],
                // 获取数据的字符串路径
                path: 'res.data.userList',
            }
        }
    }
)
```

## Type Declarations

```ts
declare type UseMultiAsyncDataMulti<Data extends Record<string, any> = any> = {
    [Key in keyof Data]: Omit<UseAsyncStateOptions<Data[Key]>, 'resetBeforeExecute' | 'immediate' | 'shallow'>;
};
interface UseMultiAsyncData<Data extends Record<string, any> = any, Shallow extends boolean = boolean> {
    multi: UseMultiAsyncDataMulti<Data>;
    resetBeforeExecute?: boolean;
    immediate?: boolean;
    shallow?: Shallow;
}
/**
 * 获取异步方法内批量数据
 * @param fn
 * @param options
 */
declare const useMultiAsyncData: <Data extends Record<string, any>, Shallow extends boolean = boolean>(fn: (params?: any) => Promise<any>, options: UseMultiAsyncData<Data, Shallow>) => {
    execute: (params?: any) => Promise<any>;
    loading: vue.Ref<boolean>;
    error: vue.Ref<boolean>;
} & { [Key in keyof Data]: MaybeShallowRef<Data[Key], Shallow>; };
```