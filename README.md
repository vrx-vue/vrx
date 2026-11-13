<p align="center">
<img src="https://vrx-vue.github.io/vrx/favicon.svg" width="200" height="300">
</p>

# vrx

vue-composition-api 的工具集

<!-- automd:badges color="green" license licenseBranch name="@vrx/core"  bundlephobia packagephobia -->

[![npm version](https://img.shields.io/npm/v/@vrx/core?color=green)](https://npmjs.com/package/@vrx/core) [![npm downloads](https://img.shields.io/npm/dm/@vrx/core?color=green)](https://npm.chart.dev/@vrx/core) [![bundle size](https://img.shields.io/bundlephobia/minzip/@vrx/core?color=green)](https://bundlephobia.com/package/@vrx/core) [![install size](https://badgen.net/packagephobia/install/@vrx/core?color=green)](https://packagephobia.com/result?p=@vrx/core) [![license](https://img.shields.io/github/license/vrx-vue/vrx?color=green)](https://github.com/vrx-vue/vrx/blob/true/LICENSE)

<!-- /automd -->

在实际的开发过程中[vueuse](https://vueuse.org/)经常出现遇见一个公用的业务，没有对应的封装

与其不停的CV，不如自行封装封装部分业务

项目作为 [vueuse](https://vueuse.org/) 的扩展存在

**总结部分 [vueuse](https://vueuse.org/) 中不存在，但业务中常用的方法**

## 安装

<!-- automd:pm-install name="@vrx/core" -->

```sh
# ✨ Auto-detect
npx nypm install @vrx/core

# npm
npm install @vrx/core

# yarn
yarn add @vrx/core

# pnpm
pnpm add @vrx/core

# bun
bun install @vrx/core

# deno
deno install npm:@vrx/core
```

<!-- /automd -->

## 开发检查

使用 Oxlint 检查代码，使用 Oxfmt 统一格式：

```sh
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
```

配置由官方工具从原 ESLint / Prettier 预设迁移，仅保留 OXC 原生支持的规则；不支持的规则直接跳过。Vue 检查仅覆盖 `<script>`，不包含模板规则。

## 贡献者

<!-- automd:contributors author="Colourlessglow" license="MIT" -->

Published under the [MIT](https://github.com/vrx-vue/vrx/blob/main/LICENSE) license. Made by [@Colourlessglow](https://github.com/Colourlessglow) and [community](https://github.com/vrx-vue/vrx/graphs/contributors) 💛 <br><br> <a href="https://github.com/vrx-vue/vrx/graphs/contributors"> <img src="https://contrib.rocks/image?repo=vrx-vue/vrx" /> </a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
