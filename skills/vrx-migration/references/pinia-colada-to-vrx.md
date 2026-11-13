# Pinia Colada to VRX

Use this direction when replacing Colada queries with VRX's local async-data composables. Follow the [migration workflow](common.md). Inspect the installed Colada version, plugins, query factories, cache consumers, and SSR setup before editing. Check the target `@vrx/core` types and implementation; this guide describes VRX's current imperative API, not an adapter that reproduces Colada's cache.

Colada `useQuery` execution and state contracts were checked against [v1.4.9](https://github.com/posva/pinia-colada/blob/v1.4.9/package.json). Verify differences in the source application's installed release, particularly its infinite-query API and plugins.

Declare `@vrx/core` directly when importing it. In Nuxt, `@vrx/nuxt` auto-imports VRX `useAsyncData` as `$useAsyncData`; this is separate from Nuxt's built-in `useAsyncData`. Keep Pinia/Colada modules while unmigrated queries, mutations, stores, or SSR integration still use them.

## Map behavior before names

| Colada behavior | VRX migration |
| --- | --- |
| `useQuery({ key, query })` | `useAsyncData((params, { signal }) => ...)` for one local result, or `useSearchAsyncData` for editable search criteria. Each call owns separate state. |
| Reactive `key` / `enabled` | No direct VRX options. Recreate only the intended automatic triggers with guarded Vue watchers, or use explicit submission. A form edit alone must not accidentally change submit-only behavior. |
| `isLoading` / `asyncStatus` | Destructure `loading`. VRX has no equivalent three-state data status or `isPending`; retain separate application state if the UI needs it. |
| Error value or `null` | VRX `error` is boolean. Capture the rejection separately when the UI needs an error object or message. |
| `refresh()` / `refetch()` | VRX `execute()` always invokes its callback; it does not check freshness or deduplicate by key. It returns the full callback response and rejects failures. |
| `initialData` / `placeholderData` | `initData` initializes a local ref. It does not seed shared cache state, mark a successful query, or carry freshness/hydration metadata. |

An old Colada key often contains resource identity, filters, tenant, page, or sorting. Transfer those values into actual request arguments or guarded watcher dependencies before removing the key. Do not discard a parameter because it used to appear only in a query factory. See [keys](https://pinia-colada.esm.dev/guide/query-keys.html), [query state and execution](https://pinia-colada.esm.dev/guide/queries.html), and [query options](https://github.com/posva/pinia-colada/blob/main/src/query-options.ts).

## Preserve submit-only search

For a Colada form with draft/applied filters and manual refetching, move the editable draft into `searchData`. This target example expects `{ items: Item[] }` and fetches initially on the client:

```ts
import { useSearchAsyncData } from '@vrx/core'
import { onMounted, shallowRef } from 'vue'

interface Item {
  id: number
  name: string
}

interface Filters {
  term: string
}

const {
  data: items,
  searchData,
  loading,
  error: failed,
  search,
  resetSearch,
} = useSearchAsyncData<Item[], Filters>(
  async (params: Filters, { signal }): Promise<{ items: Item[] }> => {
    const { term } = params
    const result = await fetch(`/api/items?term=${encodeURIComponent(term)}`, { signal })
    if (!result.ok) throw new Error(`HTTP ${result.status}`)
    return result.json()
  },
  {
    initData: () => [],
    initSearchData: () => ({ term: '' }),
    path: 'items',
    immediate: false,
  }
)

const requestError = shallowRef<unknown>(null)

function reportError(cause: unknown) {
  requestError.value = cause
}

function submitSearch() {
  requestError.value = null
  return search().catch(reportError)
}

onMounted(() => {
  void submitSearch()
})
```

Bind form inputs to `searchData` and submission to `submitSearch`. The wrapper catches at the UI boundary; calling `search()` directly still rejects. Use the same handling around `resetSearch()`, which resets the form and requests immediately. Remove the mounted call if no initial request is wanted. Automatic VRX `immediate` runs on mount but does not expose its promise to this error handler, so keep explicit initial execution here.

`search()` accepts no parameters. `execute(params)` on `useSearchAsyncData` uses the form state unless `allowOverrideSearchData: true` and a non-nullish override is passed; overrides do not update the form. VRX passes raw objects without cloning them, so snapshot required fields before any await. Keep a separate submitted snapshot if page changes or retries must use the last submission rather than an edited draft.

If the source intentionally fetches as route/filter values change, replace the reactive key with a guarded watcher over those values and call `execute`/`search` inside it. Preserve the old `enabled` condition and debounce policy. Do not add both an immediate watcher and a mounted fetch for the same initial request. Changing `searchData` alone never requests.

## Pagination and multiple projections

- For numeric pagination with a server total, use `usePaginatedData<Item, Filters>`. Its callback receives one object: `({ params, pagination, signal })`. Supply `path`, `totalPath`, `initData: () => []`, and initial filters/page-size as needed.
- Destructure `list`, `pagination`, `finished`, `search`, `pageChange`, and `pageSizeChange`. Search resets the page to 1; page-size changes also reset to page 1. There is no per-page cache, and returning to a page requests again. Validate changes to any previous-page placeholder UI. See Colada's [pagination model](https://pinia-colada.esm.dev/guide/paginated-queries.html).
- To preserve draft/applied filters across pagination, keep a separate form `draft` outside `usePaginatedData`. Destructure its internal ref as `searchData: applied`; on submit, assign `applied.value = { ...draft.value }` and call `search().catch(reportError)`. Bind inputs to `draft`, so `pageChange` continues using the submitted `applied` values. Snapshot nested values appropriately. This composable's `execute()` accepts no filter override; do not pass filters as an argument.
- VRX `dataConcat: true` appends numeric pages and uses a numeric total to determine `finished`. It does not reproduce Colada's cached `pages/pageParams`, cursor handling, previous-page loading, or per-page refresh behavior. Preserve another layer when those are required; do not manufacture a total for a cursor-only API. See [infinite queries](https://pinia-colada.esm.dev/guide/infinite-queries.html).
- VRX `finished` does not prevent another page request, and re-requesting a later page in concat mode appends duplicates. Guard pagination actions and test reset behavior.
- Use `useMultiAsyncData` only to derive several named refs from one response, with a `multi` map of paths and initial-value factories. It does not run multiple independent queries. Separate requests need separate wrappers or an intentionally aggregated callback with an explicitly chosen error policy.

## Capabilities that need another design

Colada's shared key cache, freshness, deduplication, invalidation, optimistic updates, persistence, and query plugins do not become VRX features by renaming calls. Retain the existing layer or define an explicit replacement for every behavior the application uses. In particular, replacing query reads while leaving mutation invalidation unchanged will not refresh the new local VRX refs. See [query cache](https://pinia-colada.esm.dev/advanced/query-cache.html), [invalidation](https://pinia-colada.esm.dev/guide/query-invalidation.html), and [optimistic updates](https://pinia-colada.esm.dev/guide/optimistic-updates.html).

For a partial migration where another component still observes the same key, retain Colada as the shared data owner while migrating independent local requests. Move that shared request only when its consumers can use a concrete replacement together. If the application already has a cache bridge, verify that it forwards both requests and subsequent cache updates to the migrated view. Calling VRX `execute()` after a mutation handles that event only; it does not preserve updates from other observers, cache writes, or deduplication. Do not report full shared-key equivalence for that limited callback.

VRX passes an `AbortSignal`, aborts the previous execution on a new one, and aborts on component unmount. The transport must honor that signal. Unlike Colada's pending-call checks, VRX has no independent latest-result guard; ignored cancellation can overwrite newer data, and overlapping calls can clear its single loading boolean too early. Do not claim equivalent concurrency guarantees. Preserve serialization or add a tested request-ownership strategy when needed. See Colada's [pending-call implementation](https://github.com/posva/pinia-colada/blob/main/src/query-store.ts).

VRX has no server-prefetch/cache-hydration counterpart. Retain the framework's server data layer or get agreement that the affected view will load on the client. Removing `@pinia/colada-nuxt` is safe only after its other consumers and SSR duties have been replaced. See [SSR](https://pinia-colada.esm.dev/guide/ssr.html) and [Nuxt integration](https://pinia-colada.esm.dev/nuxt.html).

## Verify

- Initial execution occurs once; draft edits, committed filters, route changes, and disabled prerequisites retain their intended triggers.
- Callers now consume the raw response and catch rejections; error messages are not read from VRX's boolean `error`.
- Rapid searches, cancellation, unmounting, and loading indicators remain correct under slow and out-of-order responses.
- Page resets, totals, end-of-list guards, and repeated-page concatenation behave correctly.
- Cross-component updates, mutation-driven refreshes, SSR/hydration, and retained plugins have an explicit supported implementation.
