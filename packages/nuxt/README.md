<p align="center">
<img src="https://vrx-vue.github.io/vrx/favicon.svg" width="200" height="300">
</p>

# @vrx/nuxt

`@vrx/core` 的 `nuxt-module` 封装

<!-- automd:badges color="green" license licenseBranch  bundlephobia packagephobia -->

[![npm version](https://img.shields.io/npm/v/@vrx/nuxt?color=green)](https://npmjs.com/package/@vrx/nuxt)
[![npm downloads](https://img.shields.io/npm/dm/@vrx/nuxt?color=green)](https://npm.chart.dev/@vrx/nuxt)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@vrx/nuxt?color=green)](https://bundlephobia.com/package/@vrx/nuxt)
[![license](https://img.shields.io/github/license/vrx-vue/vrx?color=green)](https://github.com/vrx-vue/vrx/blob/true/LICENSE)

<!-- /automd -->

> 由于 `useAsyncData` 与 **nuxt3** 全局方法冲突，在自动导入时将重命名为 `$useAsyncData` 避免冲突

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
pnpm install @vrx/nuxt

# bun
bun install @vrx/nuxt

# deno
deno install @vrx/nuxt
```

<!-- /automd -->

```ts
export default defineNuxtConfig({
  modules: ['@vrx/nuxt'],
  vrx: {
    /** Options */
  },
})
```

🎉 配置完成后，默认所有方法都可以自动导入了

## 配置项

请跳转 [配置项](https://github.com/vrx-vue/vrx/blob/main/packages/nuxt/src/types.ts) 查看

## 贡献者
<!-- automd:contributors author="Colourlessglow" license="MIT" -->

Published under the [MIT](https://github.com/vrx-vue/vrx/blob/main/LICENSE) license.
Made by [@Colourlessglow](https://github.com/Colourlessglow) and [community](https://github.com/vrx-vue/vrx/graphs/contributors) 💛
<br><br>
<a href="https://github.com/vrx-vue/vrx/graphs/contributors">
<img src="https://contrib.rocks/image?repo=vrx-vue/vrx" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
