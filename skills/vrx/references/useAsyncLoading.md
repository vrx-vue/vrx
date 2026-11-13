# useAsyncLoading

Import `useAsyncLoading` from `@vrx/core` or `@vrx/shared`.

`useAsyncLoading()` returns `{ loading, error, run, setLoading }`. Destructure the state refs and methods you need. `run` accepts a promise or a zero-argument promise factory, returns its result, sets `error` to `false` before tracking it, marks rejection with `error = true`, and clears `loading` when it settles. Rejections still propagate; `error` is a boolean, not the thrown error object.

```ts
import { useAsyncLoading } from '@vrx/core'

const { loading, error, run } = useAsyncLoading()
const loadItems = () =>
  run(async () => {
    const response = await fetch('/api/items')
    if (!response.ok) throw new Error(`Request failed: ${response.status}`)
    return response.json()
  })
```

Handle the promise rejection at the caller when invoking `loadItems`. Use `setLoading(true)` or `setLoading(false)` for explicit state changes.

The loading state is a single boolean, not a pending-request counter; overlapping calls can clear it while another call is still pending. A factory that throws synchronously throws before state tracking begins, so use an `async` factory when it may throw before returning a promise.
