# useDeactivated

Import `useDeactivated` from `@vrx/core` or `@vrx/shared` and call it during component setup.

- `useDeactivated()` returns a boolean ref: initially `false`, `true` on deactivation, and `false` on activation.
- `useDeactivated(true)` returns a sticky history flag: once deactivated, it stays `true`. It does not identify a cached component before its first deactivation.

```ts
import { useDeactivated } from '@vrx/core'

const isDeactivated = useDeactivated()
const hasBeenDeactivated = useDeactivated(true)
```

Both results are single refs, so read `.value` in script and use Vue's template unwrapping in templates. Use the default mode for current activity and the `true` mode only when deactivation history is needed.
