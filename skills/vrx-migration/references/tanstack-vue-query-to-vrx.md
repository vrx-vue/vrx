# TanStack Vue Query to VRX

Read [common migration guidance](common.md) first. The source examples and terminology target `@tanstack/vue-query` v5; inspect the installed version, client defaults, and actual consumers before replacing code. This direction can remove shared server-state behavior. Preserve each feature the migrated screen depends on through the application's existing architecture, or make that behavior change explicit.

## Identify what can move directly

| Vue Query usage | VRX destination or decision |
| --- | --- |
| One local read | `useAsyncData(fn, options)`. |
| Explicit-submit search | `useSearchAsyncData`; keep draft and applied filters separate when Refresh must use the last submission. |
| Numbered pages with a numeric total | `usePaginatedData` using `path` and `totalPath`. |
| Several projections of one response | `useMultiAsyncData` or one result plus computed refs. |
| Independent `useQueries` requests | Keep separate VRX instances and their states; do not merge them into `useMultiAsyncData` by name. |
| `select` | `path` for simple extraction, otherwise explicit transformation or computed projection. |
| `isFetching` / `isError` | `loading` / boolean `error`, with the concurrency limits described in common guidance. |
| Query error value | A separately retained error ref; VRX's `error` is only a boolean. |

Audit shared keys and observers before deleting cache operations. VRX has no direct equivalent of `invalidateQueries`, `setQueryData`, stale-time policy, persisted cache, optimistic rollback, or cross-component query deduplication. A local `execute()` only refreshes its own instance. Retain Vue Query for unaffected consumers and mutation flows until their replacement is concrete. [Queries](https://tanstack.com/query/latest/docs/framework/vue/guides/queries), [Mutations and invalidation](https://tanstack.com/query/latest/docs/framework/vue/quick-start)

When another component still observes the migrated query's key, retain that shared query under Vue Query until its consumers can move together, or use an existing bridge that forwards both requests and later cache updates. Adding a VRX refresh to mutation success handles only that event; it does not preserve other observers' updates, `setQueryData` writes, or deduplication. Migrate independent local requests first if preserving that shared behavior is still unresolved.

## Preserve draft and applied search filters

This component setup example replaces a submit-driven query. It keeps editable filters in `searchData`, snapshots applied filters, and uses the explicit override option so Refresh does not accidentally submit unfinished edits. The mounted request has its own rejection handler.

```ts
import { onMounted, ref, shallowRef } from 'vue'
import { useSearchAsyncData } from '@vrx/core'

type User = { id: number; name: string }
type Filters = { name: string }
type UsersResponse = { items: User[] }

const initialFilters = (): Filters => ({ name: '' })
const applied = ref(initialFilters())
const requestError = shallowRef<unknown>(null)

const {
  data: users,
  searchData: draft,
  loading,
  error: hasError,
  execute,
  resetSearchData,
  abort,
} = useSearchAsyncData<User[], Filters>(
  async (filters: Filters, { signal }): Promise<UsersResponse> => {
    const query = new URLSearchParams({ name: filters.name })
    const response = await fetch(`/api/users?${query}`, { signal })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
  },
  {
    initData: () => [],
    initSearchData: initialFilters,
    path: 'items',
    allowOverrideSearchData: true,
    immediate: false,
  }
)

function refresh() {
  requestError.value = null
  return execute({ ...applied.value })
}

function submit() {
  applied.value = { ...draft.value }
  return refresh()
}

function resetSearch() {
  resetSearchData()
  return submit()
}

function handleError(failure: unknown) {
  requestError.value = failure
}

onMounted(() => {
  void submit().catch(handleError)
})
```

Bind form inputs to `draft` and rows to `users`. Search/Refresh/Reset event handlers must catch their returned promises, for example `submit().catch(handleError)`. `requestError` retains error details; `hasError` is the boolean execution flag. Classify expected aborts in the application's error handler when they should not display as failures. Snapshot nested fields too when filters are more complex than this example.

Remove the mounted request if the source query started disabled and waited for user input. A source `enabled` condition must still guard every applicable trigger. If the original query reacted to a key changing, add a scoped watcher or an explicit action for that change; editing VRX refs alone does not request. Avoid both a watcher and an event handler fetching the same change. [Reactive keys and enabled](https://tanstack.com/query/latest/docs/framework/vue/reactivity), [Disabled queries](https://tanstack.com/query/latest/docs/framework/vue/guides/disabling-queries)

The returned VRX `search()` always uses current draft state. The example intentionally exposes wrapper actions instead, so background/manual Refresh uses applied state. Without `allowOverrideSearchData: true`, `execute(snapshot)` would ignore that snapshot. Reset only the draft through `resetSearchData()` when Reset should not fetch.

## Reconcile action and UI contracts

- Replace `const result = await refetch(); result.data` carefully. Vue Query returns a query-result object, and default refetch failure handling does not reject. VRX actions reject on failure and resolve the original callback envelope at runtime, even when their declared generic return suggests extracted data. Read `users.value` for the extracted result and update awaiting callers. [Query result](https://tanstack.com/query/latest/docs/framework/vue/reference/interfaces/QueryObserverBaseResult), [Refetch options](https://tanstack.com/query/latest/docs/framework/vue/reference/interfaces/RefetchOptions)
- Do not equate `isPending`, `isLoading`, `isFetching`, and `isRefetching`. VRX offers one execution flag. Add only the separate loaded/background indicator actually required by the existing UI; an initialized empty list does not prove that a request succeeded. [Query states](https://tanstack.com/query/latest/docs/framework/vue/guides/queries)
- Preserve data ownership intentionally. Vue Query results are readonly; VRX refs are writable and local. Existing editable copies may still be needed to keep unsaved edits separate from refreshed server results. A VRX `initData` factory does not transfer cache timestamps or freshness. [Immutability](https://tanstack.com/query/latest/docs/framework/vue/reactivity), [Initial query data](https://tanstack.com/query/latest/docs/framework/vue/guides/initial-query-data)
- Focus/reconnect refetch, retries, stale data policy, and polling disappear unless retained elsewhere. Record which ones the screen relied on before removing them. Cancellation also changes: Vue Query cancellation can revert shared query state; VRX abort is cooperative and its rejection sets the local error flag. See common guidance for stale responses and overlapping flags. [Defaults](https://tanstack.com/query/latest/docs/framework/vue/guides/important-defaults), [Cancellation](https://tanstack.com/query/latest/docs/framework/vue/guides/query-cancellation)

## Pagination and unsupported shortcuts

For page-number APIs returning `{ items, total }`, use `usePaginatedData<User, Filters>` with `path: 'items'`, `totalPath: 'total'`, and `initData: () => []`. Its callback receives one `{ params, pagination, signal }` object. Map the old query key's page/size to `pagination`; call `pageChange` or `pageSizeChange` instead of changing a key. `search()` resets to page 1. Keep API numbering explicit, particularly when the original UI used zero-based indexes.

When the search form remains a draft during page navigation, keep that draft outside the paginated composable. Copy submitted filters into its `searchData` before calling `search()`. Otherwise the next page request will use unfinished edits. Unlike `useSearchAsyncData`, paginated `execute()` does not accept a filter override.

Do not directly flatten an infinite query into `dataConcat: true` and assume equivalent behavior. Vue Query maintains pages and page parameters, can use cursors without totals, and can refetch loaded pages. VRX requires page numbers and a numeric total and appends later responses to a flat list. A cursor-only API needs an explicit adapter with enough information to meet those requirements, or should remain on its existing pagination implementation. Re-requesting a later VRX page can duplicate rows; choose a reset/reload strategy instead. [Paginated queries](https://tanstack.com/query/latest/docs/framework/vue/guides/paginated-queries), [Infinite queries](https://tanstack.com/query/latest/docs/framework/vue/guides/infinite-queries)

Do not replace mutation invalidation with a refresh of only one component when other screens depended on the same cache. SSR prefetch/dehydration/hydration also cannot become `immediate: true`: it runs on the client after mount. Retain or implement the application's server-data path, and remove Vue Query's plugin only after all consumers are migrated. [SSR integration](https://tanstack.com/query/latest/docs/framework/vue/guides/ssr), [Vue SSR lifecycle](https://vuejs.org/guide/scaling-up/ssr.html#component-lifecycle-hooks)

## Direction-specific verification

Alongside [common validation](common.md#validate-the-migrated-feature), inspect repeated requests across components that formerly shared a key, revisit/remount behavior, and screens updated after mutations. Verify explicit error catches on mount and events, detailed error rendering, refresh with an unfinished draft, page changes using applied filters, rapid requests, and any SSR content previously rendered before hydration. Confirm callers no longer expect a `QueryObserverResult` from the VRX action.
