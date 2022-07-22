---
category: component
---

# onKeepAliveUnMounted

解决在keep-alive场景中，部分业务在 组件失活时需要注销部分功能的场景

- keep-alive 场景
    - 组件失活
        - onDeactivated
    - 组件销毁
        - onUnmounted

## Usage

```vue

<script setup lang="ts">
import {onKeepAliveMounted, onKeepAliveUnMounted} from '@vrx/core'

/**
 * 防止组件在失活的状态下，仍注册着部分无用监听器
 */
const resize = () => {
  console.log('resize')
}

onKeepAliveMounted(() => {
  window.addEventListener('resize', resize)
})

onKeepAliveUnMounted(() => {
  window.removeEventListener('resize', resize)
})
</script>
```

## Type Declarations

```ts
/**
 * 在<keep-alive>中持续模拟触发卸载生命周期
 * @param fn
 */
declare function onKeepAliveUnmounted(fn: Fn): void;
```
