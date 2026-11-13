# Nuxt 集成

::: tip 提示

在 Nuxt 中，`useAsyncData` 保留给 Nuxt 内置方法，VRX 使用 `$useAsyncData` 自动导入别名。显式导入 VRX 时也需要使用别名，详见下方[命名说明](#use-async-data-names)。

:::

## 安装{#install}

:::code-group

```bash [npm]
$ npm i @vrx/nuxt
```

```bash [yarn]
$ yarn add @vrx/nuxt
```

```bash [pnpm]
$ pnpm add @vrx/nuxt
```

:::

## nuxt.config.ts

```ts twoslash
import { defineNuxtConfig } from 'nuxt/config'
import type {} from '@vrx/nuxt'

export default defineNuxtConfig({
  modules: ['@vrx/nuxt'],
  vrx: {/** Options */},
})
```

🎉 配置完成后，默认所有方法都可以自动导入了

## useAsyncData 命名{#use-async-data-names}

`@vrx/nuxt` 默认启用 `autoImports: true`，已将 VRX 的 `useAsyncData` 注册为 `$useAsyncData`，无需重复配置别名。未加别名的 `useAsyncData` 留给 Nuxt 内置实现；`$useAsyncData` 调用的则是 [VRX 的实现](/functions/useAsyncData)，不会获得 Nuxt 的 SSR 数据获取、payload 水合或按 key 共享状态能力。

如果直接从 `@vrx/core` 导入，在 Nuxt 中使用 `as useVrxAsyncData`，即使同时启用了 `@vrx/nuxt` 也一样：

```ts
import { useAsyncData as useVrxAsyncData } from '@vrx/core'

const { data, loading, error, execute } = useVrxAsyncData((_params, { signal }) =>
  $fetch('/api/users', { signal })
)
```

Nuxt 官方将 `useAsyncData` 定义为[受编译器转换的保留函数名](https://nuxt.com/docs/4.x/api/composables/use-async-data)，因此需要明确区分本地绑定。`$useAsyncData` 只是 Nuxt 模块注册的别名，并不是 `@vrx/core` 的导出，不能写成 `import { $useAsyncData } from '@vrx/core'`。

自行配置自动导入时，`@vrx/unimports` 的 `VrxAutoImports` 通用预设保留了原名，没有 Nuxt 专用别名；不要在 Nuxt 中原样加入该预设而覆盖内置名称，应先为 VRX 的 `useAsyncData` 配置别名。普通 Vue 项目不受此约定影响，仍可直接导入并使用 `useAsyncData`。

## 配置项

请跳转 [配置项](https://github.com/vrx-vue/vrx/blob/main/packages/nuxt/src/types.ts) 查看
