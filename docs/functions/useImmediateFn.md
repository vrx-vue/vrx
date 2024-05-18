---
category: utils
---

# useImmediateFn

是否将一个方法在 `onMounted` 立刻执行

## Usage

```ts twoslash
import { ref } from 'vue'
import { useImmediateFn } from '@vrx/core'

const useCustomHook = (immediate: boolean) => {
  /**
   * 某组件实例
   */
  const elRef = ref()

  useImmediateFn(() => {
    elRef.value.$el
  }, immediate)

  return {
    elRef,
  }
}
```

## Type Declarations

```ts
/**
 * 是否将一个方法在 `onMounted` 立刻执行
 * @param fn
 * @param immediate
 */
declare const useImmediateFn: (fn: () => any, immediate?: boolean) => void
```
