# resetRef

Import `resetRef` from `@vrx/core` or `@vrx/shared`.

`resetRef({ initValue, shallow })` returns `[data, reset]`. `initValue` is a factory called both at creation and on every reset. Return a fresh object or array when reset should discard mutations. Without a factory, the value starts and resets to `undefined`. `shallow: true` uses `shallowRef`; otherwise it uses `ref`.

```ts
import { resetRef } from '@vrx/core'

const [filters, resetFilters] = resetRef({
  initValue: () => ({ query: '', tags: [] as string[] }),
})
resetFilters()
```

Destructure the returned tuple. Read and write `filters.value` in script; `resetFilters()` replaces that value with a new factory result.
