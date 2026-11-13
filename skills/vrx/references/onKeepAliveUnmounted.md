# onKeepAliveUnmounted

Import `onKeepAliveUnmounted` from `@vrx/core` or `@vrx/shared` and call it during component setup.

`onKeepAliveUnmounted(fn)` runs `fn` on deactivation for cached components and on unmount for ordinary components. It uses deactivation history to avoid duplicate cleanup.

Pair it with [onKeepAliveMounted](onKeepAliveMounted.md) for resources that should exist only while a view is active:

```ts
import { onKeepAliveMounted, onKeepAliveUnmounted } from '@vrx/core'
import { ref } from 'vue'

const width = ref(0)
const onResize = () => {
  width.value = window.innerWidth
}

onKeepAliveMounted(() => window.addEventListener('resize', onResize))
onKeepAliveUnmounted(() => window.removeEventListener('resize', onResize))
```

The browser access occurs in lifecycle callbacks, not during server setup.
