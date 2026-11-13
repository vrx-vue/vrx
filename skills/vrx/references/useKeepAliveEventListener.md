# useKeepAliveEventListener

Import `useKeepAliveEventListener` from `@vrx/core` and call it during component setup. Use it for an event listener that must pause while its component is deactivated.

It accepts one event name and one listener, with native `boolean | AddEventListenerOptions` options. Its overloads accept an explicit target or an event name alone, which defaults to `window`.

- A target may be an event target or a ref containing a target, `null`, or `undefined`. Pass a ref for an element that appears after setup; a plain `null` returns a no-op immediately.
- Target changes and deactivation remove the previous listener. Reactivation attaches it again. The watcher uses `flush: 'post'`.
- The returned function stops the watcher and removes the listener. Register it with `onScopeDispose` for final cleanup: the current implementation does not register its own disposal cleanup.
- The omitted-target overload accesses `window` immediately. In SSR, use an explicit nullable element ref or keep window-dependent setup on the client.
- Do not assume the broader VueUse `useEventListener` API, such as arrays of events or targets.

```ts
import { useKeepAliveEventListener } from '@vrx/core'
import { onScopeDispose, ref } from 'vue'

const target = ref<HTMLElement | null>(null) // Bind as a template ref.
const stop = useKeepAliveEventListener(target, 'click', (event) => {
  console.log(event.type)
})
onScopeDispose(stop)
```

`unrefElement` is an internal helper, not a public export from `@vrx/core`.
