# useSearchAsyncData

Use for an asynchronous result with editable search parameters. Import from `@vrx/core` and read [shared async behavior](async-common.md) for lifecycle, loading/errors, return values, and cancellation.

The signature is `useSearchAsyncData<Data, SearchData, Shallow>(fn, options?)`. The callback receives `(params, { signal })` and returns a Promise of the full response. `SearchData` is an object type describing the search form.

```ts
const {
  data: users,
  searchData,
  loading,
  error,
  search,
  resetSearch,
} = useSearchAsyncData<User[], { name: string }>(
  async (params, { signal }) => {
    const response = await fetch(`/api/users?name=${encodeURIComponent(params.name)}`, {
      signal,
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json() // { items: User[] }
  },
  {
    initData: () => [],
    initSearchData: () => ({ name: '' }),
    path: 'items',
  }
)

searchData.value.name = 'Ada'
await search()
```

Here `User` denotes the application's item type. Options include `immediate`, `shallow`, `initData`, `path`, `resetBeforeExecute`, and `resetOnDataNil`; see [useAsyncData](useAsyncData.md) for data extraction and reset behavior. Search-specific options and actions are:

- `initSearchData: () => ({ ... })` creates `searchData`; default is `() => ({})`.
- `search()` submits current `searchData.value`.
- `execute(params?)` also submits current search state by default. An argument is used only when `allowOverrideSearchData: true` and it is not nullish. The override is neither merged into nor written back to `searchData`.
- `resetSearchData()` restores the initial search state without requesting. `resetSearch()` restores it and then requests.

Edit `searchData.value`, then call `search()`; do not pass search values to `search()` or expect a watcher/debounce. Parameters are unwrapped with `toRaw`, not cloned. Snapshot them in the callback if the request needs an immutable copy across asynchronous steps.

Returns `data`, `searchData`, `execute`, `search`, `resetSearchData`, `resetSearch`, `loading`, `error`, `abort`, `aborted`, and `canAbort`. `data` and `searchData` are refs; the async actions follow the response and error semantics in [shared async behavior](async-common.md).
