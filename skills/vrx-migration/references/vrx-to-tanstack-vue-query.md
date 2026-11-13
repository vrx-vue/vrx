# VRX to TanStack Vue Query

Read [common migration guidance](common.md) first. This guide targets `@tanstack/vue-query` v5, the current official documentation version when written. Check the application's installed version and existing `QueryClient` defaults before using these examples; do not silently upgrade its dependencies. Initialize `VueQueryPlugin` once through the existing application setup. [Installation](https://tanstack.com/query/latest/docs/framework/vue/installation)

## Map the affected behavior

| VRX usage | Vue Query destination |
| --- | --- |
| `useAsyncData` | `useQuery` for a read, with a key containing every input that changes its result. |
| `useSearchAsyncData` | Mutable draft filters, separate applied filters, and a query keyed by the applied filters. |
| `usePaginatedData`, replacement mode | `useQuery` keyed by applied filters, page number, and page size. |
| `usePaginatedData`, concat mode | Consider `useInfiniteQuery`; translate the page/total protocol explicitly. |
| `useMultiAsyncData` | One query plus `select` or computed projections from its response; not `useQueries` for independent requests. |
| `path` | `select` for observer-specific extraction, or extraction inside `queryFn` if the cache should contain the extracted value. |
| `loading` / boolean `error` | Usually `isFetching` / `isError`; Vue Query also exposes an error value. |

Keep identities complete, including tenant/user scope when that changes the response. Reactive key entries must remain refs, computed values, or supported getters; reading `.value` into a fixed key during setup loses tracking. Query results are readonly: create an editable copy for `v-model` or use explicit cache updates. [Query keys](https://tanstack.com/query/latest/docs/framework/vue/guides/query-keys), [Vue reactivity](https://tanstack.com/query/latest/docs/framework/vue/reactivity)

## Preserve an explicit-submit search

This Vue component setup example preserves a search form that submits on mount and on Search. It uses `enabled: false` deliberately to keep requests explicit, snapshots the draft, and still refetches when the user submits unchanged criteria. `nextTick` lets the observer receive a changed key before the manual request.

```ts
import { computed, nextTick, onMounted, ref, shallowRef } from 'vue'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'

type User = { id: number; name: string }
type Filters = { name: string }
type UsersResponse = { items: User[] }

const initialFilters = (): Filters => ({ name: '' })
const draft = ref(initialFilters())
const applied = ref(initialFilters())
const submissionError = shallowRef<unknown>(null)

const {
  data: users,
  isFetching: loading,
  isError: hasError,
  error,
  refetch,
} = useQuery({
  queryKey: computed(() => ['users', applied.value] as const),
  queryFn: async ({ queryKey: [, filters], signal }): Promise<UsersResponse> => {
    const query = new URLSearchParams({ name: filters.name })
    const response = await fetch(`/api/users?${query}`, { signal })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
  },
  select: (response) => response.items,
  enabled: false,
  retry: false,
  placeholderData: keepPreviousData,
})

const rows = computed(() => users.value ?? [])

async function submit() {
  submissionError.value = null
  applied.value = { ...draft.value }
  await nextTick()
  return refetch({ throwOnError: true })
}

function resetSearch() {
  draft.value = initialFilters()
  return submit()
}

function handleError(failure: unknown) {
  submissionError.value = failure
}

onMounted(() => {
  void submit().catch(handleError)
})
```

Bind inputs to `draft`, display `rows`, and wire Search/Reset event handlers to `submit().catch(handleError)` / `resetSearch().catch(handleError)`. For a page that previously loaded only on user action, omit the mounted call. For nested filter objects, snapshot the relevant nested values too. A Refresh action can call `refetch({ throwOnError: true }).catch(handleError)` without applying unfinished edits.

`refetch` takes query control options, **not business parameters**. Disabled queries still observe the shared cache for their key; `enabled: false` does not restore VRX's instance-private state. It also opts out of automatic refetching, including refetches normally caused by invalidation. If automatic freshness is desired, choose reactive `enabled` and refetch policies explicitly rather than retaining this manual strategy. [Disabling queries](https://tanstack.com/query/latest/docs/framework/vue/guides/disabling-queries)

## Adapt results and defaults

- `refetch()` resolves a query-result object. With `select` above, `result.data` is the selected users; it is not VRX's original response envelope. Refetch failures normally remain in query state; `throwOnError: true` preserves an awaited rejection contract. Update every caller consuming the returned value. [Result API](https://tanstack.com/query/latest/docs/framework/vue/reference/interfaces/QueryObserverBaseResult), [Refetch options](https://tanstack.com/query/latest/docs/framework/vue/reference/interfaces/RefetchOptions)
- Use `isFetching` for any active fetch, `isLoading` for a first fetch, and `isPending` for absent data. A disabled query can be pending without loading. Preserve UI behavior deliberately when replacing VRX's one loading flag. [Query states](https://tanstack.com/query/latest/docs/framework/vue/guides/queries)
- `initData: () => []` does not automatically mean `initialData: []`: Vue Query persists `initialData` in its cache and treats it as successful data. A display fallback such as `rows`, or an appropriate placeholder, avoids seeding fictitious server data. `keepPreviousData` retains previous display data during a key change but has its own placeholder status; it is not a general reset policy. [Initial data](https://tanstack.com/query/latest/docs/framework/vue/guides/initial-query-data), [Previous page data](https://tanstack.com/query/latest/docs/framework/vue/guides/paginated-queries)
- For queries that remain enabled, choose `staleTime`, retry, focus/reconnect, mount, and offline behavior. Defaults can introduce requests absent from VRX. The example disables retries to preserve one request per attempt. Do not change global defaults just to migrate one component. [Important defaults](https://tanstack.com/query/latest/docs/framework/vue/guides/important-defaults)
- Query functions must not resolve `undefined`. When a former VRX nil/reset path can return nothing, define an explicit `null`, empty result, or failure contract. [Query functions](https://tanstack.com/query/latest/docs/framework/vue/guides/query-functions)

## Pagination and remaining boundaries

For ordinary pagination, keep editable filters outside the key, include applied filters/page/size in it, and reset page to 1 when applying filters or changing page size. With automatic queries, let that state change drive fetching; with a disabled query, update the key, await `nextTick`, and refetch once. Retain the API's page numbering and total field. [Paginated queries](https://tanstack.com/query/latest/docs/framework/vue/guides/paginated-queries)

For concatenated lists, `useInfiniteQuery` stores `{ pages, pageParams }`. Set `initialPageParam` to the API's first page and derive `getNextPageParam` from its page/total or cursor contract, returning `undefined` at the end. Flatten pages for display without destroying the cached structure. Query keys contain filters/size; the changing page is supplied as `pageParam`. Guard load-more against concurrent fetches and validate refresh behavior: an infinite-query refetch can refresh previously loaded pages instead of merely appending the current page. [Infinite queries](https://tanstack.com/query/latest/docs/framework/vue/guides/infinite-queries)

Pass the supplied signal through to the transport. Replace a local abort button with a deliberately scoped `queryClient.cancelQueries({ queryKey, exact: true })`; cancellation affects that shared query and normally reverts its state. There is no direct VRX `aborted` ref replacement. [Cancellation](https://tanstack.com/query/latest/docs/framework/vue/guides/query-cancellation)

Do not translate server writes into queries just because VRX previously wrapped them. Use the application's mutation flow and decide which keys to invalidate. SSR is a separate integration: a mounted call remains client-only; server prefetch requires a per-request client and hydration wiring. [Mutations and invalidation](https://tanstack.com/query/latest/docs/framework/vue/quick-start), [SSR](https://tanstack.com/query/latest/docs/framework/vue/guides/ssr)

## Direction-specific verification

Alongside [common validation](common.md#validate-the-migrated-feature), verify one request on changed and unchanged submit, no request while editing, and refresh using the last applied filters. Check cached data when revisiting a key, mutation invalidation under the chosen enabled policy, retained rows during a key change, readonly result bindings, and action callers expecting the former response envelope. Test cancellation with another consumer of the same key before treating it as instance-local.
