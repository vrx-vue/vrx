<p align="center">
<img src="https://vrx-vue.github.io/vrx/favicon.svg" width="200" height="300">
</p>

# @vrx/nuxt

`@vrx/core` 的 `nuxt-module` 封装

<!-- automd:badges color="green" license licenseBranch  bundlephobia packagephobia -->

[![npm version](https://img.shields.io/npm/v/@vrx/nuxt?color=green)](https://npmjs.com/package/@vrx/nuxt) [![npm downloads](https://img.shields.io/npm/dm/@vrx/nuxt?color=green)](https://npm.chart.dev/@vrx/nuxt) [![bundle size](https://img.shields.io/bundlephobia/minzip/@vrx/nuxt?color=green)](https://bundlephobia.com/package/@vrx/nuxt) [![install size](https://badgen.net/packagephobia/install/@vrx/nuxt?color=green)](https://packagephobia.com/result?p=@vrx/nuxt) [![license](https://img.shields.io/github/license/vrx-vue/vrx?color=green)](https://github.com/vrx-vue/vrx/blob/true/LICENSE)

<!-- /automd -->

> 在 Nuxt 项目中，`useAsyncData` 保留给 Nuxt 内置 API，VRX 必须使用别名。本模块默认已将 VRX 自动导入为 `$useAsyncData`，无需重复配置。

## 安装

<!-- automd:pm-install  -->

```sh
# ✨ Auto-detect
npx nypm install @vrx/nuxt

# npm
npm install @vrx/nuxt

# yarn
yarn add @vrx/nuxt

# pnpm
pnpm add @vrx/nuxt

# bun
bun install @vrx/nuxt

# deno
deno install npm:@vrx/nuxt
```

<!-- /automd -->

```ts
export default defineNuxtConfig({
  modules: ['@vrx/nuxt'],
  vrx: {/** Options */},
})
```

🎉 配置完成后，默认所有方法都可以自动导入了

## `useAsyncData` 命名约定

Nuxt 将 `useAsyncData` 作为编译器保留名称，两套 API 的参数、状态和 SSR 行为也不同。使用本模块默认的 `vrx.autoImports: true` 时，VRX 调用 `$useAsyncData(...)`，Nuxt 内置 API 调用 `useAsyncData(...)`。参见 [Nuxt 官方说明](https://nuxt.com/docs/4.x/api/composables/use-async-data)。

直接从 `@vrx/core` 导入时，必须在 Nuxt 代码中使用别名；模块不会替手写的 import 重命名。这也适用于关闭 `vrx.autoImports` 的情况：

```ts
import { useAsyncData as useVrxAsyncData } from '@vrx/core'
```

直接导入需要将 `@vrx/core` 声明为项目的直接依赖。`$useAsyncData` 是模块注册的自动导入别名，不是 `@vrx/core` 的导出；普通 Vue 项目仍可使用原名。VRX 的 `immediate` 只在组件挂载后执行，不会提供 Nuxt 内置 API 的服务端预取和 payload hydration。

## 配置项

请跳转 [配置项](https://github.com/vrx-vue/vrx/blob/main/packages/nuxt/src/types.ts) 查看

## Agent Skills

`vrx` Skill 包含 Nuxt 配置、自动导入别名和异步数据使用指导；`vrx-migration` 提供 VRX 与 Pinia Colada、TanStack Vue Query、Nuxt 内置 `useAsyncData` 之间的双向迁移指南，并说明 SSR 与缓存能力的差异。按需安装：

```sh
pnpm dlx skills add vrx-vue/vrx --skill vrx
pnpm dlx skills add vrx-vue/vrx --skill vrx-migration
```

## 贡献者

<!-- automd:contributors author="Colourlessglow" license="MIT" -->

Published under the [MIT](https://github.com/vrx-vue/vrx/blob/main/LICENSE) license. Made by [@Colourlessglow](https://github.com/Colourlessglow) and [community](https://github.com/vrx-vue/vrx/graphs/contributors) 💛 <br><br> <a href="https://github.com/vrx-vue/vrx/graphs/contributors"> <img src="https://contrib.rocks/image?repo=vrx-vue/vrx" /> </a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
