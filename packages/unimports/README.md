<p align="center">
<img src="https://vrx-vue.github.io/vrx/favicon.svg" width="200" height="300">
</p>

# @vrx/unimports

`@vrx/core` 的 `unplugin-auto-imports` 预设导入

<!-- automd:badges color="green" license licenseBranch  bundlephobia packagephobia -->

[![npm version](https://img.shields.io/npm/v/@vrx/unimports?color=green)](https://npmjs.com/package/@vrx/unimports)
[![npm downloads](https://img.shields.io/npm/dm/@vrx/unimports?color=green)](https://npm.chart.dev/@vrx/unimports)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@vrx/unimports?color=green)](https://bundlephobia.com/package/@vrx/unimports)
[![install size](https://badgen.net/packagephobia/install/@vrx/unimports?color=green)](https://packagephobia.com/result?p=@vrx/unimports)
[![license](https://img.shields.io/github/license/vrx-vue/vrx?color=green)](https://github.com/vrx-vue/vrx/blob/true/LICENSE)

<!-- /automd -->

## 安装

<!-- automd:pm-install  -->

```sh
# ✨ Auto-detect
npx nypm install @vrx/unimports

# npm
npm install @vrx/unimports

# yarn
yarn add @vrx/unimports

# pnpm
pnpm install @vrx/unimports

# bun
bun install @vrx/unimports

# deno
deno install @vrx/unimports
```

<!-- /automd -->

```ts
import { VrxAutoImports } from '@vrx/unimports'
export default defineConfig({
  plugins: [
    AutoImports({
      imports: [
        'vue',
        // ...
        VrxAutoImports,
      ],
    }),
  ],
})
```

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
