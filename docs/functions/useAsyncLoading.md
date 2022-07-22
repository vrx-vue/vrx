---
category: utils
---

# useAsyncLoading

多个异步方法公用一个loading加载态

## Usage

```vue

<script setup lang="ts">
import {useAsyncLoading} from '@vrx/core'

const {loading, error, run} = useAsyncLoading()
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
/**
 * 控制异步方法的加载态
 */
declare function useAsyncLoading(): {
    // 是否正在加载中
    loading: vue_demi.Ref<boolean>;
    // 手动更新加载状态
    setLoading: (value?: boolean) => void;
    // 执行异步方法
    run: <Data = any>(fn: Promise<Data> | (() => Promise<Data>)) => Promise<Data>;
    // 异步方法是否在执行中发生错误
    error: vue_demi.Ref<boolean>;
};
```