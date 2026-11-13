# useMultiAsyncData

Use for several refs extracted from one response. Import from `@vrx/core` and read [shared async behavior](async-common.md) for lifecycle, loading/errors, return values, and cancellation.

Use `(params, { signal })` to make one request and provide a required `multi` map describing named refs:

```ts
const { users, total, loading, error, execute } = useMultiAsyncData<{
  users: User[]
  total: number
}>(fetchSummary, {
  multi: {
    users: { path: 'data.users', initData: () => [], resetOnDataNil: true },
    total: { path: 'data.total', initData: () => 0 },
  },
})
```

`fetchSummary` must follow the callback signature and return the parsed response. The result exposes `users` and `total` as refs alongside shared execution and loading/error/abort fields. There is no enclosing `data` field or separate request per key. Each entry accepts `path`, `initData`, and `resetOnDataNil`; `immediate`, `shallow`, and `resetBeforeExecute` apply to the whole operation. Avoid multi keys that collide with `execute`, `loading`, `error`, `abort`, `aborted`, or `canAbort`, because named refs overwrite those return fields.
