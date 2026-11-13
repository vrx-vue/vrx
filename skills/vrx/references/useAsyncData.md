# useAsyncData

Use for one asynchronous result. Import from `@vrx/core` and read [shared async behavior](async-common.md) for lifecycle, loading/errors, return values, and cancellation.

In Nuxt, use the module's `$useAsyncData` alias or explicitly import `useAsyncData as useVrxAsyncData`; reserve the unaliased name for Nuxt's built-in API. See [integration naming rules](integrations.md#distinguish-vrx-from-nuxts-useasyncdata). The examples below use the plain Vue name.

```ts
const {
  data: users,
  loading,
  error,
  execute,
} = useAsyncData<User[]>(
  async (params, { signal }) => {
    const response = await fetch(`/api/users?name=${encodeURIComponent(params.name)}`, {
      signal,
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
  },
  { initData: () => [], path: 'data.users' }
)

await execute({ name: 'Ada' })
// users.value contains the users; execute resolved to the full JSON object.
```

Here `User` denotes the application's item type. The callback signature is `(params, { signal })`; `execute(params?)` passes its argument unchanged. Without `path`, the entire response becomes `data.value`. In the example, keep automatic execution off because the callback requires `params.name`.

`resetBeforeExecute: true` resets data before each request. `resetOnDataNil: true` resets when the **extracted** value is `null` or `undefined`; otherwise that value is assigned directly. Rejected requests leave existing data in place unless it was already reset before execution.

Returns `data`, `execute`, `loading`, `error`, `abort`, `aborted`, and `canAbort`.
