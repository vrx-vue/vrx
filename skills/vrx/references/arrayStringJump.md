# arrayStringJump

Import `arrayStringJump` from `@vrx/core` or `@vrx/shared`.

`arrayStringJump(value, separator = ',')` returns a writable computed value with the opposite representation: a string ref becomes a string-array computed ref, and a string-array ref becomes a string computed ref. Assigning the computed value writes the converted representation back to the source.

Empty items are filtered; whitespace is not trimmed. `undefined` stays `undefined`. This is delimiter conversion, not CSV parsing: there is no quoting or escaping for values containing the separator.

```ts
import { arrayStringJump } from '@vrx/core'
import { ref } from 'vue'

const encoded = ref('red,blue')
const selected = arrayStringJump(encoded)
selected.value = ['green'] // encoded.value is now 'green'
```

Keep the returned computed ref intact and assign through `.value` in script.
