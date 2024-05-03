# Nuxt 集成

::: tip 提示

由于 `useAsyncData` 与 **nuxt3** 全局方法冲突，在自动导入时将重命名为 `$useAsyncData` 避免冲突

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
