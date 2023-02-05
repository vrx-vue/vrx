---
category: utils
---

# resetRef

可重置的 ref

## Usage

```ts
import {resetRef} from '@vrx/core'

/**
 * list 数据
 * resetList 重置数据的方法
 */
const [list, resetList] = resetRef({
    // 初始化数据，也是重置数据调用的方法
    initValue: () => [],
    // 是否使用shallowRef 包装
    shallow: true,
});
```

## Type Declarations

```ts
type MaybeShallowRef<T = any, Shallow extends boolean = false> = Shallow extends true ? ShallowRef<T> : Ref<T>;
type ResetRef<T = any, Shallow extends boolean = false> = [
    MaybeShallowRef<T, Shallow>,
    VoidFunction
];
interface ResetRefOption<T = any, Shallow extends boolean = false> {
    /**
     * 初始化/重置调用方法
     */
    initValue?: Fn<T>;
    /**
     * 是否使用 `shallowRef` 包装
     */
    shallow?: Shallow;
}
declare function resetRef<T = any, Shallow extends boolean = false>({ initValue, shallow, }: ResetRefOption<T, Shallow>): ResetRef<T, Shallow>;
```
