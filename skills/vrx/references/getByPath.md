# getByPath

Import `getByPath` from `@vrx/core` or `@vrx/shared`.

`getByPath(data, path?)` reads a path such as `'user.name'` after unwrapping the outer ref. Without a path, it returns the unwrapped value. The result is an ordinary value, not a computed ref; wrap the call in `computed` when the selection must stay reactive.

```ts
import { getByPath } from '@vrx/core'
import { computed, ref } from 'vue'

const profile = ref({ user: { name: 'Ada' } })
const initialName = getByPath(profile, 'user.name')
const currentName = computed(() => getByPath(profile, 'user.name'))
```

`initialName` is the value at call time. `currentName.value` follows changes to the selected property.
