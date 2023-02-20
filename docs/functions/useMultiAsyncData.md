---
category: state
---

# useMultiAsyncData <Badge type="warning" text="测试" />

作为 [useAsyncData](./useAsyncData) 的批量版，可以一次性从异步任务中获取多个状态

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
                /**
                 * 在 `execute` 返回值为 `null|undefined` 时 重置数据
                 */
                resetOnDataNil: true
            },
            userList: {
                // 内部状态初始化
                initData: () => [],
                // 获取数据的字符串路径
                path: 'res.data.userList',
                /**
                 * 在 `execute` 返回值为 `null|undefined` 时 重置数据
                 */
                resetOnDataNil: true
            }
        }
    }
)
```

## Type Declarations

```ts
type UseMultiAsyncDataMulti<Data extends Record<string, any> = any> = {
    [Key in keyof Data]: UseAsyncStateCommonOptions<Data[Key]>;
};

interface UseMultiAsyncData<Data extends Record<string, any> = any, Shallow extends boolean = false> extends UseAsyncStateActionOptions<Shallow> {
    multi: UseMultiAsyncDataMulti<Data>;
}

type UseMultiAsyncDataReturn<Data extends Record<string, any>, Shallow extends boolean = false> =
    UseAsyncStateCommonReturn
    & {
    [Key in keyof Data]: MaybeShallowRef<Data[Key], Shallow>;
};
/**
 * 获取异步方法内批量数据
 * @param fn
 * @param options
 */
declare const useMultiAsyncData: <Data extends Record<string, any>, Shallow extends boolean = false>(fn: (params?: any) => Promise<any>, options: UseMultiAsyncData<Data, Shallow>) => UseMultiAsyncDataReturn<Data, Shallow>;
```