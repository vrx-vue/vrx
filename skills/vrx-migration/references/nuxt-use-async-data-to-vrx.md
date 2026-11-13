# Nuxt useAsyncData to VRX

Read [common migration guidance](common.md) first. This guide was checked against Nuxt 4 documentation and the locally installed Nuxt 4.6.4 implementation. Inspect the target project's lockfile, generated defaults, and custom wrappers before migrating: Nuxt 3 defaults and older minor versions differ. In Nuxt, explicitly import `useAsyncData as useVrxAsyncData` from `@vrx/core`, or use `$useAsyncData` when the VRX module already provides that auto-import. `$useAsyncData` is not a core package export.

## Establish the migration boundary

Nuxt's built-in composable participates in server prefetch and payload hydration. VRX does not replace those facilities. Keep the existing server-data path when the page depends on server-rendered results; changing it to client-only fetching requires an intentional scope decision. Calling `await useVrxAsyncData(...)` neither fetches data nor creates SSR integration. Nuxt can register server prefetch without awaiting its composable. [Nuxt useAsyncData](https://nuxt.com/docs/4.x/api/composables/use-async-data)

Find every consumer of the original key before replacing it. Calls sharing a Nuxt key share refs, and `useNuxtData(key)` can read or update that state elsewhere. A VRX instance has no connection to that key. Preserve mutation updates, optimistic rollback, and refreshes observed by other components through the application's existing shared state or keep those consumers on Nuxt. [useNuxtData](https://nuxt.com/docs/4.x/api/composables/use-nuxt-data)

`refreshNuxtData(key)` refreshes registered Nuxt instances; it cannot reach VRX. `clearNuxtData(key)` clears Nuxt data/error/promise state; it is not equivalent to setting one VRX ref to an empty array. Replace only the affected coordination, not unrelated Nuxt data infrastructure. [refreshNuxtData](https://nuxt.com/docs/4.x/api/utils/refresh-nuxt-data), [clearNuxtData](https://nuxt.com/docs/4.x/api/utils/clear-nuxt-data)

## Map the local contract

| Nuxt contract | VRX migration |
| --- | --- |
| Handler `(_nuxtApp, { signal })` | Callback `(params, { signal })`; first argument is request input, not the Nuxt application. |
| Key, reactive key, `watch` | No key registry or built-in watcher; retain needed inputs and wire explicit actions or a scoped watcher. |
| `default: () => value` | `initData: () => value`; unwrap a ref-returning default and review failure/reset behavior. |
| `deep: false` | `shallow: true`; the option names have opposite polarity. |
| `transform` / `pick` | `path` for simple extraction, or explicit transformation/computed projections. |
| `pending` / `status` | `loading` plus only the idle/success/background state the UI actually needs. |
| Error object ref | Boolean `error` plus a separate ref for caught error details. |
| `refresh(options)` / `execute(options)` | `execute(params?)`; Nuxt execution options are not VRX business parameters. |

The public Nuxt refresh/execute contract is `Promise<void>`: read the refs after awaiting it. In Nuxt 4.6.4, ordinary handler failures are captured into error state and reset data to its default. VRX rejects and returns the original callback response on success; `path` only updates its data ref. Do not retain callers that expect Nuxt's non-throwing refresh behavior. These distinctions are verified in the installed `nuxt/dist/app/composables/asyncData.js` and `.d.ts`, not inferred from matching names.

## Example: an already client-only, isolated widget

This example applies only when the original key has no other readers or mutation writers, there is no custom cache middleware, and the widget already requests after mount. It preserves that scope rather than moving server-rendered content to the client. Before, in Nuxt component setup (`User` is the application's item type):

```ts
const {
  data: users,
  pending,
  error,
  refresh,
} = useAsyncData<User[]>(
  'local-user-widget',
  (_nuxtApp, { signal }) => $fetch<User[]>('/api/users', { signal }),
  { server: false, immediate: false, default: () => [], deep: false }
)

onMounted(() => {
  void refresh()
})
```

After, in the same Nuxt component setup:

```ts
import { onMounted, shallowRef } from 'vue'
import { useAsyncData as useVrxAsyncData } from '@vrx/core'

type User = { id: number; name: string }
const requestError = shallowRef<unknown>(null)

const {
  data: users,
  loading,
  error: hasError,
  execute,
} = useVrxAsyncData<User[]>((_params, { signal }) => $fetch<User[]>('/api/users', { signal }), {
  initData: () => [],
  shallow: true,
  immediate: false,
})

function handleError(failure: unknown) {
  requestError.value = failure
  users.value = [] // Preserve this widget's empty-on-error behavior.
}

function refresh() {
  requestError.value = null
  return execute()
}

onMounted(() => {
  void refresh().catch(handleError)
})
```

Render rows from `users`, loading from `loading`, and details from `requestError`; `hasError` is only a boolean. A Refresh button must also catch the promise: `refresh().catch(handleError)`. Integrate the request client's expected-cancellation classification before using this error handler for overlapping/cancellable UI actions: an old abort must not clear a newer result. VRX's shared flags and cooperative cancellation limitations still apply, as described in common guidance.

## Preserve behavior beyond the example

- **Triggers:** inspect reactive keys, `watch`, and route dependencies. Replace each required trigger once; avoid a watcher and a page event both requesting the same change. Keep search drafts separate from applied filters when typing should not fetch. Unlike Nuxt options, VRX options do not establish reactive execution policies.
- **Versioned defaults:** Nuxt 4 defaults to shallow data, whereas VRX defaults to a deep ref. Check `experimental.defaults.useAsyncData.deep` and wrapper overrides. Nuxt's default data is not an SSR payload substitute when moved to `initData`; preserve custom `getCachedData`, transforms, and clearing behavior separately when used.
- **Execution controls:** Nuxt 4.5+ `enabled: false` blocks handler execution even for manual refresh/execute, and disabling cancels an active request. Preserve such guards on every VRX entry point and cancellation when needed; do not treat `immediate: false` as a replacement. Audit Nuxt 4.6+ `serialize`/`middleware`, timeouts, external signals, and `dedupe: 'defer'` when present. VRX has no corresponding framework options. [Nuxt options](https://nuxt.com/docs/4.x/api/composables/use-async-data#parameters)
- **Races and reset:** Nuxt 4.6.4 checks request identity before assigning results; VRX relies on the callback honoring its signal. Retest rapid changes. Nuxt `clear()` also resets status and errors; VRX `abort()` alone does not implement that reset. Do not preserve only the visible array and silently discard the rest of the UI contract.
- **Pagination:** Nuxt does not impose a pagination model. Choose VRX `usePaginatedData` only for a page-number/page-size API with a numeric total, configuring `path`/`totalPath`; its callback is `({ params, pagination, signal })`. Keep draft filters outside applied pagination state. A cursor-only or multi-page cache is not equivalent to VRX's flat `dataConcat` list: an explicit adapter or the existing implementation may be needed, and appending the same later page twice duplicates rows.

## Validate the chosen scope

Use [common validation](common.md#validate-the-migrated-feature), then check initial SSR HTML and hydration request counts wherever the original call participated in server rendering. For the isolated widget, verify mount, remount, refresh success/failure, empty data, error details, and cancellation. Search for remaining uses of its old key in `useNuxtData`, `refreshNuxtData`, `clearNuxtData`, and mutation handlers; confirm every intended consumer still updates. Check page/search transitions and awaited action callers rather than relying on a type-compatible rename.
