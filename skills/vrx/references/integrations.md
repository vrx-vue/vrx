# Vue, Nuxt, and auto-imports

## Explicit imports in plain Vue

Declare `@vrx/core` as a direct dependency and import public APIs from the package root:

```ts
import { useAsyncData, usePaginatedData, resetRef } from '@vrx/core'
```

Core re-exports the shared utilities. Do not use source-file or `dist` deep imports; the package export map exposes the root API and `package.json`.

VRX async-data composables register component lifecycle hooks. Create them during setup. Their `immediate: true` option runs on mount; it does not implement server fetching or hydration payloads. See [shared async behavior](async-common.md) for request and state behavior and [useAsyncData](useAsyncData.md) for its API.

## Nuxt module

Add `@vrx/nuxt` to the application's dependencies and register the module:

```ts
import type {} from '@vrx/nuxt'

export default defineNuxtConfig({
  modules: ['@vrx/nuxt'],
})
```

The configuration key is `vrx`. Current runtime defaults are:

| Option | Default | Effect |
| --- | --- | --- |
| `autoImports` | `true` | Registers core runtime exports as Nuxt auto-imports, excluding `noop`. |
| `transpile` | `false` | Adds the VRX packages and their listed utility dependencies to Nuxt's transpilation list. |
| `excludeOptimizeDeps` | `true` | Excludes those packages from Vite dependency optimization. |

The module uses `@vrx/core`, `@vrx/shared`, `@vill-v/type-as`, and `@vill-v/path-prop` for the latter two options. Use the runtime default of `true` for `excludeOptimizeDeps`; older type comments incorrectly describe it as `false`.

### Distinguish VRX from Nuxt's `useAsyncData`

In Nuxt code, reserve the unaliased **`useAsyncData`** name for Nuxt's built-in API and use a distinct binding for VRX. Nuxt documents this as a compiler-reserved function name; avoid a same-named VRX import or custom wrapper. This is the Nuxt integration convention, not a rename of VRX's public export. See the [Nuxt API](https://nuxt.com/docs/4.x/api/composables/use-async-data).

With `@vrx/nuxt` and its default `vrx.autoImports: true`, the module already registers VRX's `useAsyncData` as **`$useAsyncData`**. Use that name directly; no additional alias configuration is needed. Other exported function names retain their spelling. The alias exists in Nuxt's import registry, not in the core package's exports.

```ts
const { data, execute, loading } = $useAsyncData(
  (_params, { signal }) => $fetch('/api/items', { signal }),
  { immediate: true }
)
```

Use Nuxt's built-in `useAsyncData` for Nuxt server fetching and hydration semantics. Use `$useAsyncData` when the requested behavior is VRX's client-side state wrapper. They have different arguments and return values; do not exchange them based on the similar names.

When importing VRX directly, including with `vrx.autoImports: false`, alias the import. This also applies when the module is enabled: its automatic rename does not rewrite a handwritten import. Declare `@vrx/core` as a direct dependency before importing it, especially with pnpm's strict dependency layout:

```ts
import { useAsyncData as useVrxAsyncData } from '@vrx/core'
```

Do not import `$useAsyncData` from `@vrx/core`; core exports only the original name. If Nuxt's global `imports.autoImport` is disabled while the module still registers its imports, its `$useAsyncData` alias can be explicitly imported from `#imports`. If `vrx.autoImports` itself is disabled, use the aliased core import above. Plain Vue applications can keep `useAsyncData` unchanged.

For DOM listeners, follow [useKeepAliveEventListener](useKeepAliveEventListener.md): the overload that omits its target accesses `window` during setup.

## Vite auto-import preset

`@vrx/unimports` exports the named `VrxAutoImports` preset for `unplugin-auto-import`. It is a preset object, not a Vite plugin or a replacement for installing `@vrx/core`.

```ts
import { VrxAutoImports } from '@vrx/unimports'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', VrxAutoImports],
    }),
  ],
})
```

Declare `@vrx/core` directly and install the preset and auto-import plugin as appropriate for the application's build tooling. The preset includes core runtime exports except `noop`. Unlike the Nuxt module, it does **not** rename `useAsyncData` to `$useAsyncData`. Prefer `@vrx/nuxt` in Nuxt applications; if maintaining a custom import configuration, register VRX's function under a distinct alias instead of applying this preset unchanged.
