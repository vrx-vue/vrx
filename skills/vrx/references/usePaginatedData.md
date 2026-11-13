# usePaginatedData

Use for a list with a server-provided total. Import from `@vrx/core` and read [shared async behavior](async-common.md) for lifecycle, loading/errors, return values, and cancellation.

The callback has a **single object argument**: `({ params, pagination, signal })`. `params` is current search state; `pagination` contains `pageNum`, `pageSize`, and `total`.

```ts
const {
  list,
  loading,
  error,
  searchData,
  pagination,
  search,
  resetSearch,
  pageChange,
  pageSizeChange,
} = usePaginatedData<User, { name: string }>(
  async ({ params, pagination, signal }) => {
    const query = new URLSearchParams({
      name: params.name,
      page: String(pagination.pageNum),
      size: String(pagination.pageSize),
    })
    const response = await fetch(`/api/users?${query}`, { signal })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json() // { items: User[], total: number }
  },
  {
    initData: () => [],
    initSearchData: () => ({ name: '' }),
    path: 'items',
    totalPath: 'total',
    immediate: true,
  }
)
```

`path` selects an array; `totalPath` selects a numeric total and defaults to `'total'`. The API must supply that total: completion is not inferred from an empty page. Pagination starts at `{ pageNum: 1, pageSize: 10, total: 0 }`; `initPagination` can override the initial page and size.

| Action | Effect before fetching |
| --- | --- |
| `execute()` | Uses current search and pagination; takes no runtime parameters. |
| `search()` | Sets page to 1, retaining search criteria. |
| `resetSearch()` | Resets criteria and sets page to 1. |
| `pageChange(n)` | Sets page to `n`. |
| `pageChange(true / false)` | Increments / decrements the page. |
| `pageSizeChange(n)` | Sets size to `n` and page to 1. |
| `paginationChange(value, keys?)` | Reads both page and size from `value`; keys default to `pageNum` and `pageSize`. |

For UI components with other field names, use `paginationChange({ current: 2, size: 20 }, { pageNum: 'current', pageSize: 'size' })`. Page numbers are not clamped. Guard next-page actions with application state; `finished` does not prevent further requests.

In normal mode, each response replaces `list`; `finished` means `pageNum * pageSize >= total`. With `dataConcat: true`, page 1 replaces the list and later pages append; `finished` means `list.length >= total`. Repeating a later page appends duplicates. Prefer the default deep ref with concatenation: appending uses `push`, which does not itself notify a `shallowRef` subscriber.

`resetBeforeExecute` clears the list for normal-mode execution. In concat mode it does not clear the list for page changes, but `search()` still resets the list when this option is enabled. `resetOnDataNil` is accepted through inherited options but does not reset the public list via `initData`: the list updater converts nullish/falsy extracted values to `[]` and ignores truthy non-arrays. `finished` updates after successful responses, not immediately on a new search.

Returns `list` (not `data`), `pagination`, `finished`, `searchData`, the actions above, and the shared loading/error/abort fields. It does not expose `resetSearchData`. Request parameters and pagination are not cloned.
