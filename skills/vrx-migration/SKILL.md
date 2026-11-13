---
name: vrx-migration
description: Migrate Vue async data, search, and pagination between VRX (@vrx/core) and Pinia Colada (@pinia/colada), TanStack Vue Query (@tanstack/vue-query), or Nuxt's built-in useAsyncData, in either direction. Use when replacing one of these APIs with VRX or replacing VRX with one of them.
license: MIT
---

# VRX migration

Migrate the requested application features while preserving their observable behavior. This skill is self-contained and can be installed independently of the `vrx` usage skill.

## Choose the direction

Identify the source library, target library, installed versions, and requested scope from the application and the user's request. Read [common migration guidance](references/common.md) and only the relevant direction:

| Source | Target | Guide |
| --- | --- | --- |
| VRX | Pinia Colada | [VRX to Pinia Colada](references/vrx-to-pinia-colada.md) |
| Pinia Colada | VRX | [Pinia Colada to VRX](references/pinia-colada-to-vrx.md) |
| VRX | TanStack Vue Query | [VRX to TanStack Vue Query](references/vrx-to-tanstack-vue-query.md) |
| TanStack Vue Query | VRX | [TanStack Vue Query to VRX](references/tanstack-vue-query-to-vrx.md) |
| VRX | Nuxt's built-in `useAsyncData` | [VRX to Nuxt useAsyncData](references/vrx-to-nuxt-use-async-data.md) |
| Nuxt's built-in `useAsyncData` | VRX | [Nuxt useAsyncData to VRX](references/nuxt-use-async-data-to-vrx.md) |

Use the Vue adapter of TanStack Query. Check the installed declarations and implementation when versions differ from a guide. This skill covers migrations with VRX as the source or target.

## Apply the migration

- Preserve the application's request client, response shape, and explicit versus reactive request triggers. Destructure composable refs and methods; keep `.value` access in script.
- In Nuxt, reserve `useAsyncData` for the built-in API. Use VRX's module-provided `$useAsyncData`, or explicitly import `useAsyncData as useVrxAsyncData` from `@vrx/core`. The module already registers its alias; callers do not need to configure it again.
- Treat cache identity, invalidation, SSR, retries, and cancellation as behavior to migrate. When VRX has no equivalent, retain the needed integration or implement the scoped replacement; explain any remaining behavior change. Do not silently drop it.
- Migrate the requested components or composables incrementally. Remove a provider, plugin, auto-import preset, or dependency only after its remaining consumers have been checked.
- Verify the affected interactions using the application's existing checks. Report what changed and any concrete capability gap that remains.
