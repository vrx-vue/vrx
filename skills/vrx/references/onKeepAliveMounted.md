# onKeepAliveMounted

Import `onKeepAliveMounted` from `@vrx/core` or `@vrx/shared` and call it during component setup.

`onKeepAliveMounted(fn)` runs `fn` on the initial mount, then on reactivation after a deactivation. It avoids calling twice on the first mount inside `<KeepAlive>`. In an ordinary component it runs on mount.

```ts
import { onKeepAliveMounted } from '@vrx/core'
import { ref } from 'vue'

const width = ref(0)
onKeepAliveMounted(() => {
  width.value = window.innerWidth
})
```

Browser access in the callback occurs after mounting, not during server setup. When the callback allocates a resource that should exist only while the view is active, pair it with [onKeepAliveUnmounted](onKeepAliveUnmounted.md).
