# VRX to Pinia Colada

Use this direction when replacing VRX async-data composables with `@pinia/colada`. Follow the [migration workflow](common.md), then check the installed VRX, Vue, Pinia, and Colada versions and their types. Colada's online guide tracks its current API; verify features such as `useInfiniteQuery` against the actual target release.

The `useQuery` execution and state contracts below were checked against Colada [v1.4.9](https://github.com/posva/pinia-colada/blob/v1.4.9/package.json). Treat that as the verification baseline, not an instruction to upgrade.

Register Pinia and the `PiniaColada` plugin before using queries. For Nuxt, follow the installed versions' `@pinia/nuxt` and `@pinia/colada-nuxt` setup. Keep VRX dependencies if other VRX APIs remain in use. See [installation](https://pinia-colada.esm.dev/guide/installation.html) and [Nuxt integration](https://pinia-colada.esm.dev/nuxt.html).

## Map behavior before names

| VRX behavior | Colada migration |
| --- | --- |
| `useAsyncData(fn)` | `useQuery({ key, query })`; choose a cache identity and decide whether state should be shared. |
| `execute(params)` | Store request parameters in reactive state read by `query`, and include their values in a reactive `key`. Neither `refresh` nor `refetch` takes request parameters. |
| `loading` | Destructure `isLoading: loading`, or derive it from `asyncStatus`. `isPending` means the data has not reached a settled state, not that a request is in flight. |
| Boolean `error` | Colada exposes an error value or `null`; use `computed(() => error.value != null)` if a boolean is needed. |
| `path` | Return the desired projection from `query`, or cache the complete response and derive a computed projection. Choose one consistent cached shape per key. |
| `initData` | Choose a display fallback, `placeholderData`, or `initialData` intentionally. `initialData` seeds a successful cache entry and affects freshness; it is not just a local ref initializer. |
| `resetBeforeExecute` / `resetOnDataNil` | Preserve reset/null behavior in the view projection or query transformation. Clearing a shared cache entry can affect other consumers. |

Colada keys must include every value that changes the requested resource, including relevant filters, pagination, and tenant/user identity. Use a getter such as `key: () => ['items', term.value]`; put unwrapped, serializable values inside the key, not ref objects. Same-key consumers share a cache entry. See [query keys](https://pinia-colada.esm.dev/guide/query-keys.html).

## Preserve submit-only search

VRX's `useSearchAsyncData` does not fetch when `searchData` changes. To preserve that contract, separate the editable draft from the submitted snapshot. This target example expects an endpoint returning `{ items: Item[] }` and an already-installed Colada plugin:

```ts
import { useQuery } from '@pinia/colada'
import { computed, onMounted, ref } from 'vue'

interface Item {
  id: number
  name: string
}

const searchData = ref({ term: '' })
const applied = ref({ term: '' })

const {
  data: response,
  isLoading: loading,
  error,
  refetch,
} = useQuery({
  key: () => ['items', 'search', applied.value.term],
  enabled: false,
  query: async ({ signal }): Promise<{ items: Item[] }> => {
    const term = applied.value.term
    const result = await fetch(`/api/items?term=${encodeURIComponent(term)}`, { signal })
    if (!result.ok) throw new Error(`HTTP ${result.status}`)
    return result.json()
  },
})

const items = computed(() => response.value?.items ?? [])
const failed = computed(() => error.value != null)

function search() {
  applied.value = { ...searchData.value }
  return refetch(true)
}

function reportError(cause: unknown) {
  console.error(cause)
}

onMounted(() => {
  void search().catch(reportError)
})
```

Bind the form to `searchData`; submit with `search().catch(reportError)`. Remove the mounted call if the original view did not fetch initially. For nested filters, make an appropriate snapshot rather than sharing mutable nested form objects. `enabled: false` disables automatic fetching, including server prefetch; it still allows these manual calls. Do not combine an automatically enabled reactive key with an unconditional manual refetch for the same change.

In the checked version, `refetch()` synchronously reads the computed query entry, so assigning `applied.value` immediately before it selects the new key without `nextTick()`. Calling it also fetches when the submitted criteria are unchanged. See the [query-entry implementation](https://github.com/posva/pinia-colada/blob/v1.4.9/src/use-query.ts).

Disabling automatic fetching does not isolate the result: other consumers of the same key can update its data and error. This example preserves submission triggers while introducing shared cache ownership; account for that change if the original component required fully independent state.

This example deliberately forces a network request on each submission. `refresh()` can reuse fresh data or an in-flight request; `refetch()` forces a fetch. Both normally resolve to a `DataState` rather than the raw response, and normally catch errors. Passing `true` propagates rejection. Rewrite code consuming the old `await search()` response to read the returned state's `data`, and handle the possibility that a cancelled/replaced operation did not produce new successful data. See [query execution](https://pinia-colada.esm.dev/guide/queries.html) and [return types](https://github.com/posva/pinia-colada/blob/main/src/use-query.ts).

Changing keys may show a cached result immediately or temporarily show no data; that differs from VRX retaining the previous local result. Use `placeholderData: previous => previous` only when retaining the previous result across keys is appropriate for the view. Review freshness, mount/focus/reconnect refetching, and cache lifetime when enabling automatic queries. See [query options](https://github.com/posva/pinia-colada/blob/main/src/query-options.ts).

## Pagination and multiple projections

- Replace `usePaginatedData` with an ordinary `useQuery` when pages should have separate cache entries. Include submitted filters, page, and page size in the key. Keep page controls in local state and reset the page on search or page-size changes; these VRX actions are not supplied by `useQuery`.
- Preserve `path`, `totalPath`, and `finished` calculations in computed projections. `placeholderData` can retain a previous page while the next loads; it does not create real cached data. See [paginated queries](https://pinia-colada.esm.dev/guide/paginated-queries.html).
- For `dataConcat: true`, consider the target release's `useInfiniteQuery`. Its pages share a cache entry; filters belong in the key, while the page/cursor belongs in `pageParam`. Provide `initialPageParam` and `getNextPageParam`, then derive a flat list from `data.pages`. It is not a direct rename of VRX's numeric-page actions or total-based completion. See [infinite queries](https://pinia-colada.esm.dev/guide/infinite-queries.html).
- `useMultiAsyncData` projects several refs from **one response**. Preserve one query and derive those fields with computed refs. It is not evidence that the application needs several parallel queries.

## Cancellation and architecture boundaries

Pass Colada's query-context `signal` to the transport, as with VRX's callback signal. Colada tracks pending calls per cache entry; VRX's cancellation is cooperative and does not independently prevent ignored-signal results from overwriting state. Do not preserve a per-component `abort()` by blindly cancelling a shared key: `cancelQueries` affects matching cache entries and their other consumers. `enabled: false` is not an abort command. See the [query cache](https://pinia-colada.esm.dev/advanced/query-cache.html) and [pending-call implementation](https://github.com/posva/pinia-colada/blob/main/src/query-store.ts).

Migrating to an enabled Colada query can introduce server fetching and hydration. The example intentionally remains mounted-only. If SSR is wanted, configure the Nuxt module or the cache serialization/hydration required by custom SSR; do not assume changing the composable handles the application setup. See [SSR](https://pinia-colada.esm.dev/guide/ssr.html).

Classify write operations separately. VRX can wrap arbitrary promises; replacing a write with an automatically refetching query can repeat that write. Use an explicitly invoked mutation and deliberately preserve invalidation or optimistic-update behavior. See [mutations](https://pinia-colada.esm.dev/guide/mutations.html).

## Verify

- Editing a draft does not request; submitting uses its snapshot and initial mounting requests only once.
- Key changes and repeat submissions behave correctly with cached data, errors, and rapid overlapping requests.
- Callers handle `DataState` results and the selected throw-on-error policy; loading and initial-pending UI remain distinct.
- Pagination resets, totals, concatenation, and end-of-list behavior match the intended contract.
- Other same-key consumers, unmounting, cancellation, and SSR/hydration retain the agreed behavior.
