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
declare type MaybeShallowRef<T = any, Shallow extends boolean = boolean> = Shallow extends true ? ShallowRef<T> : Ref<T>;
declare type ResetRef<T = any, Shallow extends boolean = boolean> = [
    MaybeShallowRef<T, Shallow>,
    () => void
];
declare function resetRef<T = any, Shallow extends boolean = boolean>({ initValue, shallow, }: {
    initValue?: () => T;
    shallow?: Shallow;
}): ResetRef<T, Shallow>;
```
