# useImmediateFn

Import `useImmediateFn` from `@vrx/core` or `@vrx/shared` and call it during component setup.

`useImmediateFn(fn, immediate)` registers `fn` for `onMounted` only when `immediate` is truthy. Omitting the flag does nothing. The function is not run synchronously and does not run on server setup or on later KeepAlive reactivations.

```ts
import { useImmediateFn } from '@vrx/core'
import { ref } from 'vue'

const width = ref(0)
useImmediateFn(() => {
  width.value = window.innerWidth
}, true)
```

For initialization that must also repeat when a cached view becomes active, use [onKeepAliveMounted](onKeepAliveMounted.md).
