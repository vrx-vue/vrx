---
category: utils
---

# useAsyncLoading

多个异步方法公用一个loading加载态

## Usage

```vue twoslash
<script setup lang="ts">
  import { useAsyncLoading } from '@vrx/core'

  const { loading, error, run } = useAsyncLoading()
  const request1 = () => {
    run(fetch('https://localhost'))
  }

  const request2 = () => {
    return fetch('https://localhost')
  }
</script>
<template>
  <div>
    <span v-if="loading">加载中</span>
    <button @click="request1">请求1</button>
    <button @click="run(request2)">请求2</button>
  </div>
</template>
```

## Type Declarations

```ts
interface UseAsyncLoadingState {
  loading: Ref<boolean>
  error: Ref<boolean>
}
interface UseAsyncLoadingReturn extends UseAsyncLoadingState {
  setLoading: (value: boolean) => void
  run: <Data = any>(fn: MayBeFn<Promise<Data>>) => Promise<Data>
}
/**
 * 控制异步方法的加载态
 */
declare function useAsyncLoading(): UseAsyncLoadingReturn
```
