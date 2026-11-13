# Common migration guidance

Read this with the chosen direction guide. The VRX contracts here match the 1.0.0 implementation this skill accompanies; verify the installed implementation if upgrading or using a different release. TanStack examples target the Vue adapter's v5 API; Nuxt examples target Nuxt 4.6.4. Pinia Colada guides identify the APIs they rely on. Check installed versions, configuration, and plugins rather than assuming that the current website matches an older lockfile.

## Establish the behavior to preserve

Inspect the affected component, its callers, the request client, and the relevant package versions. Trace only the features involved in the requested migration:

- **Inputs and triggers:** first load, explicit submit, reactive parameter changes, reset, page changes, focus/reconnect, retry, and polling. Determine whether form fields are drafts or immediately applied filters.
- **Results and UI:** response envelope and extraction paths, initial/empty data, keeping previous results, editable copies, loading indicators, displayed error details, and callers that await an action's return value.
- **Shared behavior:** other consumers of the same query key, dependent requests, mutations and invalidation, optimistic updates, persistence, and SSR prefetch/hydration.

Keep existing behavior when the user has not requested a change. If a capability has no direct mapping, identify the affected feature and choose a scoped solution from the application's existing architecture. Do not build a general query cache merely to complete a local component migration.

## Capability boundaries

| Concern | VRX | Pinia Colada / TanStack Vue Query | Nuxt `useAsyncData` |
| --- | --- | --- | --- |
| State ownership | Refs owned by each composable call | Query keys identify shared cached server state | Keyed data/error/status shared within the Nuxt application |
| Request triggers | Explicit actions; optional one-time mounted execution | Reactive keys and enabled conditions, plus configurable automatic refetching | Server/client initialization, reactive key, `watch`, and explicit refresh; version-specific options |
| Search form | Mutable `searchData`; changes alone do not request | Separate draft and applied inputs when preserving submit-only search | Separate draft and applied inputs; coordinate key/watch with manual refresh |
| Loading and errors | Boolean `loading` and `error`; request rejection propagates | Distinct data/fetch states and error values; manual action return/error contracts differ | `status`, `pending`, and error value; refresh resolves `void` by public contract |
| Freshness and retries | No built-in cache freshness, deduplication, invalidation, retry, or polling policy | Library configuration and, for some Colada features, plugins | Payload/cache hooks, keyed refresh and dedupe; transport retries are separate |
| Server rendering | `immediate` executes on mount only | Dedicated server prefetch and cache hydration integration | Built-in server prefetch and payload hydration unless configured otherwise |
| Mutations | No mutation cache, invalidation graph, or optimistic rollback abstraction | Mutation APIs can coordinate cache changes | Keep writes outside the read handler and coordinate refresh separately |
| Pagination | Page number, page size, numeric total; optional flat-list concatenation | Keyed pages or dedicated infinite-query APIs | Application-managed parameters and list/total projections |

These are migration boundaries, not promises that every application must use every capability. Keep the scope selected by the user.

## VRX contracts that affect every direction

Import public APIs from `@vrx/core`. Create lifecycle-dependent composables synchronously during component setup. In Nuxt, reserve `useAsyncData` for the built-in API and bind VRX under an alias. With `@vrx/nuxt` auto-imports enabled, use the already-registered `$useAsyncData` without another rename. For direct imports, use `import { useAsyncData as useVrxAsyncData } from '@vrx/core'`; `$useAsyncData` is not a core export. Plain Vue applications can keep the original VRX name. Nuxt treats `useAsyncData` as a compiler-reserved name, and its server-data contract differs from VRX's. See the [Nuxt API](https://nuxt.com/docs/4.x/api/composables/use-async-data).

| API | Request callback | Exposed result and actions |
| --- | --- | --- |
| `useAsyncData` | `(params, { signal }) => Promise<Response>` | `data`, `execute(params?)` |
| `useSearchAsyncData` | `(params, { signal }) => Promise<Response>` | `data`, `searchData`, `search()`, `resetSearch()`, `resetSearchData()`, `execute()` |
| `usePaginatedData` | `({ params, pagination, signal }) => Promise<Response>` | `list`, `searchData`, `pagination`, `finished`, `execute()`, `search()`, `resetSearch()`, page actions |
| `useMultiAsyncData` | `(params, { signal }) => Promise<Response>` | Named refs extracted from **one response**, plus `execute(params?)` |

All four expose `loading`, `error`, `abort`, `aborted`, and `canAbort`. Do not replace a `useMultiAsyncData` call with independent parallel queries unless its original request really is being split.

- `immediate` defaults to `false`. When true, it runs on mount, with no initial parameters, and its wrapper does not catch the request promise. For explicit initial error handling use `onMounted(() => { void execute().catch(handleError) })` with `immediate: false`. Wire manual event handlers' rejections too, including abort rejections.
- `loading` and `error` are boolean refs. `error` does not contain a thrown object; retain a separate error ref if the UI needs details. Both flags describe the shared execution state, not a count of pending requests.
- At runtime, execution and its search/page wrappers return the original response. `path` updates the exposed result ref; it does not transform the resolved return value, even where declarations suggest that it does. Read the result refs for extracted data.
- `initData` is a factory. Without it the initial value is `undefined`; it is not a cache seed or an SSR payload. `resetBeforeExecute` and `resetOnDataNil` affect local data. Review actual UI reset behavior rather than treating either as a cache invalidation policy.
- `useSearchAsyncData` uses current `searchData` and normally ignores an `execute` argument. `allowOverrideSearchData: true` permits a one-off override; it does not merge or persist the override. `resetSearchData()` resets without requesting; `resetSearch()` resets and requests. Inputs are not cloned: snapshot mutable parameters before asynchronous work.
- `usePaginatedData` requires a numeric total selected by `totalPath` (default `total`). `path` selects its list. `search()` and `pageSizeChange(n)` reset to page 1. `pageChange(n)` sets a page; boolean `true`/`false` increments/decrements without clamping. `finished` does not stop requests. `dataConcat: true` replaces page 1 and appends later pages, so refetching a later page can duplicate rows. It is not a cursor-based infinite-query cache.
- Cancellation is cooperative. Pass the supplied `signal` to the request client; execution requires `AbortController`. New execution and unmount abort the current request, but there is no request-ID check to stop a callback that ignores cancellation from writing stale data. An older request settling can also alter shared `loading`/`error` flags while another request is pending.

## Validate the migrated feature

Use the application's existing type check and relevant tests, then verify the interactions touched by the change:

- Initial mount and remount; SSR output and hydration when applicable.
- Editing a draft without submitting, submitting changed and unchanged criteria, resetting criteria, changing page/size, and reaching the last page.
- Success, empty data, rejection, cancellation, and rapid parameter changes; inspect request counts and displayed state as well as the final response.
- Updating a record and revisiting another consumer that previously shared its cache; verify invalidation or the explicit refresh replacing it.
- Any awaited action result, error-object display, or editable result binding affected by the API change.

Run only checks relevant to the migrated scope. For remaining library consumers, retain their provider and configuration until they have been migrated too.
