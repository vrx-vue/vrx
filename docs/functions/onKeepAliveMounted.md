---
category: component
---

# onKeepAliveMounted

解决在keep-alive场景中，部分业务在 组件重新激活时需要重新刷新的场景

- keep-alive 场景
    - 初次进入组件
        - onMounted
    - 再次进入组件
        - onActivated

## Usage

```vue

<script setup lang="ts">
import {onKeepAliveMounted} from '@vrx/core'

/**
 * 刷新数据的方法
 */
const refresh = () => {
  return Promise.reject()
}
onKeepAliveMounted(() => {
  refresh()
})
</script>
```

## Type Declarations

```ts
/**
 * 在<keep-alive>中持续触发初始化
 * @param fn
 */
declare function onKeepAliveMounted(fn: Fn): void;
```