---
category: component
---

# useDeactivated

该组件在keep-alive场景是否失活

## Usage

```vue twoslash
<script setup lang="ts">
  import { useDeactivated } from '@vrx/core'
  import { watch } from 'vue'

  const deactivated = useDeactivated()
  watch(deactivated, () => {
    // 监听组件是否失活
  })
</script>
```

## Type Declarations

```ts
/**
 * 是否被取消激活了
 * once:true 则只记录一次历史状态，可以用于判断组件是否被<keep-alive>
 */
declare function useDeactivated(once?: boolean): vue_demi.Ref<boolean>
```
