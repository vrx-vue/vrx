# VRX to Nuxt useAsyncData

Use this direction when moving VRX reads into Nuxt's built-in `useAsyncData`. Follow the [migration workflow](common.md). The contracts below were checked against Nuxt **4.6.4**, including its installed implementation and declarations, and the [Nuxt 4 documentation](https://nuxt.com/docs/4.x/api/composables/use-async-data). Check the application's installed version and async-data defaults before editing.

Reserve `useAsyncData` for Nuxt's built-in composable, which the Nuxt compiler recognizes. Any remaining explicit VRX import must use an alias: `import { useAsyncData as useVrxAsyncData } from '@vrx/core'`. If `@vrx/nuxt` already provides `$useAsyncData`, use that existing VRX alias; do not register another alias or replace Nuxt's built-in name.

## Map behavior before names

| VRX behavior | Nuxt migration |
| --- | --- |
| `useVrxAsyncData(fn, options)` | `useAsyncData(key, handler, options)` in Nuxt setup context. The string key identifies shared state. |
| Callback `(params, { signal })` | Handler `(_nuxtApp, { signal })`; capture business parameters from application state instead of interpreting the first argument as parameters. |
| `execute(params)` returns the raw response and rejects failures | `refresh` and its `execute` alias accept execution options such as `dedupe`, `signal`, and `timeout`, not business parameters. Their public return type is `Promise<void>`; consume `data` and `error` refs after awaiting. |
| Boolean `loading` and `error` | Derive loading from `status.value === 'pending'`; Nuxt `error` holds an error object or `undefined`. Check `pendingWhenIdle` before treating `pending` as an exact loading alias. |
| `initData`, `path`, default deep reactivity | Use a `default` factory and `transform` for extraction, or `pick` for selected top-level properties. Nuxt 4 defaults to shallow data; use `deep: true` when preserving nested reactive edits. |
| Independent local refs | Same-key calls share data, errors, status, and pending state. Keep their handler, `deep`, `transform`, `pick`, `getCachedData`, and `default` consistent; check newer options such as `middleware` and `serialize` too. |

Choose `transform` or `pick` according to the installed types; `pick` is not VRX's nested `path` lookup. Initial/reset values must have the resulting shape. Nuxt resets data to its default after a handler failure, whereas VRX normally retains the previous result; preserve a separate display snapshot if that difference matters.

## Preserve client-mounted, submit-only search

This example assumes the existing transport is `$fetch` and the endpoint returns `{ items: Item[] }`. Keep the application's actual request client and its response/error conventions when adapting it. It preserves an initial mounted request plus explicit searches:

```ts
import { useAsyncData } from '#app'
import { computed, onMounted, ref } from 'vue'

interface Item {
  id: number
  name: string
}

const searchData = ref({ term: '' })
const applied = ref({ term: '' })

const {
  data: items,
  status,
  error,
  refresh,
  clear,
} = useAsyncData(
  'catalog-search:main',
  (_nuxtApp, { signal }) => {
    const { term } = applied.value
    return $fetch<{ items: Item[] }>('/api/items', {
      query: { term },
      signal,
    })
  },
  {
    server: false,
    immediate: false,
    default: () => [] as Item[],
    transform: (response) => response.items,
    deep: true,
  }
)

const loading = computed(() => status.value === 'pending')
const failed = computed(() => error.value != null)

function search() {
  applied.value = { ...searchData.value }
  return refresh()
}

onMounted(() => {
  void search()
})
```

Bind inputs to `searchData` and submit to `search`; display request failures through `error`. Remove the mounted call if the original feature had no initial request. Snapshot nested filters appropriately before asynchronous work. Repeated submissions still call `refresh`; review any custom `getCachedData` policy that could satisfy that execution from cached data.

The fixed key names this search state, not each filter combination. Give independently editable instances distinct stable keys; same-key consumers must share the same submitted parameters and result contract. `useNuxtData('catalog-search:main')` can read the shared result elsewhere, but does not request data. See [useNuxtData](https://nuxt.com/docs/4.x/api/composables/use-nuxt-data).

No watch sources are configured here. Reactive keys and the `watch` option introduce automatic execution; editing a draft must not trigger either. In 4.6.4, a reactive key can request after earlier data exists even with `immediate: false`, so do not combine its automatic execution with unconditional manual refresh. If per-filter keys are required, design one trigger path and explicitly handle repeated submissions. Do not use `enabled: false` as manual mode: in this version it also blocks `refresh`/`execute`, and disabling it cancels an active request.

## Choose SSR deliberately

VRX's `immediate` means execution on mount and defaults to false. Nuxt defaults to `server: true`, `immediate: true`, and `lazy: false`: eligible requests run during SSR, their results enter the payload, and hydration can reuse them. Change to that contract only when intended; the example explicitly retains client execution. `lazy: true` makes client navigation non-blocking, but does not disable SSR. Neither omitting `await` nor setting `lazy` makes a request client-only. See [Nuxt data fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching).

For SSR, return usable truthy data such as an object or array, including empty results; avoid `undefined`, `null`, or a void store action that can cause hydration refetches. Keep handlers focused on reading data. Serialize only data appropriate for the client; `serialize: false` changes hydration behavior and can cause a client refetch, so it is not a drop-in replacement for a local VRX ref.

Wrapping `$fetch` in `useAsyncData` does not automatically forward incoming server cookies or headers. For an authenticated same-origin SSR request, capture `useRequestFetch()` during setup, or explicitly pass the required incoming headers through the existing client. Preserve the client's authentication behavior and forward only intended headers to external services. See [useRequestFetch](https://nuxt.com/docs/4.x/api/composables/use-request-fetch).

## Cancellation, pagination, and callers

Pass the handler's `signal` to the transport. Nuxt's default `dedupe: 'cancel'` supersedes an active request for the key; `'defer'` reuses an active execution. `clear()` cancels the pending handler and resets data, error, and status for that shared key. It is not VRX's abort-only action; use an external controller with `refresh({ signal })` when cancellation must preserve data. Other same-key consumers also observe clearing. Check the [cancellation contract](https://nuxt.com/docs/4.x/api/composables/use-async-data#make-your-handler-abortable).

Rewrite callers that expect `await execute(params)` to return an envelope or reject a transport error. Set the submitted parameters first, await `refresh()`, then inspect `error.value` and read `items.value`. Only throw explicitly when the caller's contract requires rejection. Preserve loading/error display after cancellation and test overlapping submissions.

Nuxt does not supply VRX's search reset, page-number actions, numeric-total completion, or flat-list concatenation. Keep those controls explicitly; page requests should read the last submitted filters, not the draft. Preserve one handler with computed projections when migrating `useMultiAsyncData`: its named refs came from one response, not parallel requests. Keep writes as explicit client operations instead of turning them into automatically repeated data handlers.

## Verify

- Explicit VRX imports use `useVrxAsyncData`; `$useAsyncData` still means VRX, and `useAsyncData` means Nuxt.
- Initial mounting, repeated/changed submissions, reset, and page changes produce the intended request counts.
- Success, empty results, errors, cancellation, nested edits, and shared-key consumers show the expected state.
- Callers use execution options and result/error refs correctly; no business parameters or raw-response assumptions remain on `refresh`.
- When SSR is selected, authenticated requests, serialized data, and hydration avoid unintended duplicate requests or missing credentials.
