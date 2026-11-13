---
name: vrx
description: Use VRX composables in Vue applications, including async requests, searchable and paginated lists, and KeepAlive lifecycles. Use when a project uses @vrx/core, @vrx/shared, @vrx/nuxt, or @vrx/unimports, or the user asks to adopt VRX or troubleshoot its APIs.
license: MIT
---

# VRX

Help application developers use the VRX Vue Composition API utilities. Match the installed package version and the application's existing integration.

## Start with the application

- Check the installed VRX version and whether the application uses explicit imports, the Nuxt module, or the auto-import preset. For version differences, use the installed package's declarations and implementation to confirm signatures and behavior.
- Import public helpers from `@vrx/core`; it also re-exports `@vrx/shared`. Use `@vrx/shared` directly when the application already depends on it and only needs its helpers. Do not import from package `src/` paths.
- In Nuxt, reserve `useAsyncData` for Nuxt's built-in API. Use VRX's module-provided `$useAsyncData`, or explicitly import `useAsyncData as useVrxAsyncData` from `@vrx/core`; the module alias requires no additional configuration. See [integration naming rules](references/integrations.md#distinguish-vrx-from-nuxts-useasyncdata).
- Destructure the refs and methods needed from composables that return an object, for example `const { data: users, loading, execute } = useAsyncData(...)`. Use aliases when names overlap. Keep the ref bindings: access `.value` in script and use Vue's automatic unwrapping in templates.
- Create lifecycle-dependent composables synchronously during component setup. VRX's `immediate: true` runs on mount; it does not provide Nuxt's server-side fetching, hydration, or keyed caching.
- Preserve the application's request client and response shape. Wire the provided `AbortSignal` into the client when using an async-data composable.

## Choose the helper

| Application need | API reference |
| --- | --- |
| One request with data, loading, and error state | [useAsyncData](references/useAsyncData.md) |
| Editable search fields and explicit search/reset actions | [useSearchAsyncData](references/useSearchAsyncData.md) |
| A paginated list or an accumulating list | [usePaginatedData](references/usePaginatedData.md) |
| Several refs selected from one response | [useMultiAsyncData](references/useMultiAsyncData.md) |
| Loading/error state around an existing promise | [useAsyncLoading](references/useAsyncLoading.md) |
| An event listener that pauses during deactivation | [useKeepAliveEventListener](references/useKeepAliveEventListener.md) |
| Run on initial mount and subsequent reactivation | [onKeepAliveMounted](references/onKeepAliveMounted.md) |
| Clean up on deactivation or ordinary unmount | [onKeepAliveUnmounted](references/onKeepAliveUnmounted.md) |
| Observe current or historical deactivation state | [useDeactivated](references/useDeactivated.md) |
| Optionally run a callback on mount | [useImmediateFn](references/useImmediateFn.md) |
| A ref resettable to a fresh initial value | [resetRef](references/resetRef.md) |
| Read a nested value from a response or ref | [getByPath](references/getByPath.md) |
| Convert between a delimited string and an array | [arrayStringJump](references/arrayStringJump.md) |
| Nuxt module configuration or Vite auto-import setup | [Integrations](references/integrations.md) |

Read the relevant API reference and the shared guidance it links to. For async data in Nuxt, also read the integration reference to distinguish VRX's `$useAsyncData` alias from Nuxt's built-in `useAsyncData`.

## Verify the application behavior

Use the application's existing type check and relevant tests. For a request integration, check its actual response paths and error handling; for pagination, check search reset and page changes; for KeepAlive, check deactivation and reactivation. Treat returned refs as the UI state and consult [shared async behavior](references/async-common.md) before using an `execute()` return value.
