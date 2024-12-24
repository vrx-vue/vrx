# Changelog


## v0.5.0

[compare changes](https://github.com/vrx-vue/vrx/compare/v0.4.4...v0.5.0)

### 🚀 特性

- ⚠️  增加 `AbortController` 控制异步方法请求取消，在异步方法重新执行与组件销毁时会自动调用，涉及方法 `useAsyncData` `useMultiAsyncData` `usePaginatedData` `useSearchAsyncData` ([7c3ec2c](https://github.com/vrx-vue/vrx/commit/7c3ec2c))

### 🏡 框架

- Update README.md ([38dda2a](https://github.com/vrx-vue/vrx/commit/38dda2a))
- Update README.md ([3272238](https://github.com/vrx-vue/vrx/commit/3272238))

#### 🚨 破坏性改动

- ⚠️  增加 `AbortController` 控制异步方法请求取消，在异步方法重新执行与组件销毁时会自动调用，涉及方法 `useAsyncData` `useMultiAsyncData` `usePaginatedData` `useSearchAsyncData` ([7c3ec2c](https://github.com/vrx-vue/vrx/commit/7c3ec2c))

### ❤️ 贡献者

- Whitekite ([@Colourlessglow](http://github.com/Colourlessglow))

## v0.4.4

[compare changes](https://github.com/vrx-vue/vrx/compare/v0.4.3...v0.4.4)

### 🔥 性能优化

- **nuxt:** 使用 vite 运行时增加排除 `@vill-v/type-as` `@vill-v/path-prop` 依赖预构建 ([3666fba](https://github.com/vrx-vue/vrx/commit/3666fba))
- **nuxt:** 按照 [`nuxt@3.12.0`](https://github.com/nuxt/nuxt/pull/27372) 优化建议，默认排除依赖预构建 ([1347c67](https://github.com/vrx-vue/vrx/commit/1347c67))

### 📖 文档

- Markdown 增加 `twoslash` 支持 ([371bf8e](https://github.com/vrx-vue/vrx/commit/371bf8e))
- Fix `twoslash` build error ([6902fb4](https://github.com/vrx-vue/vrx/commit/6902fb4))

### 🏡 框架

- Use [`automd`](https://automd.unjs.io/) to update `README.md` ([2813123](https://github.com/vrx-vue/vrx/commit/2813123))
- Update `README.md` ([f895949](https://github.com/vrx-vue/vrx/commit/f895949))

### ❤️ 贡献者

- Whitekite <1075790909@qq.com>

## v0.4.3

[compare changes](https://github.com/vrx-vue/vrx/compare/v0.4.2...v0.4.3)

### 📖 文档

- Build doc ([cc55ecb](https://github.com/vrx-vue/vrx/commit/cc55ecb))
- Update docs ([d1902c7](https://github.com/vrx-vue/vrx/commit/d1902c7))
- Update docs ([99a3191](https://github.com/vrx-vue/vrx/commit/99a3191))
- 修改 nuxt 配置项跳转查看地址 ([335786a](https://github.com/vrx-vue/vrx/commit/335786a))

### 🏡 框架

- 项目储存位置从 gitee 迁移至 github ([ee71a40](https://github.com/vrx-vue/vrx/commit/ee71a40))
- Add github pages build actions ([eefbd5d](https://github.com/vrx-vue/vrx/commit/eefbd5d))
- Update build script ([e54f2be](https://github.com/vrx-vue/vrx/commit/e54f2be))

### ❤️ 贡献者

- Whitekite <1075790909@qq.com>

## v0.4.2


### 🚀 特性

- **nuxt:** 增加 `nuxt-module` 支持 (1131e03)

### 📖 文档

- Update docs (633e0ca)
- Update docs (f2b6793)
- Update pwa icon (287f149)
- 增加 nuxt 集成说明 (b6b5b35)

### 🏡 框架

- **dep:** Update auto gitee release util (9ef3251)

### ❤️ Contributors

- Whitekite <1075790909@qq.com>

## v0.4.1


### 🩹 修复

- 修复`getByPath` 的 ts 类型错误 (3ed3c41)

### 📖 文档

- Build docs (071072e)
- Update pwa config (8a1f59b)
- Update pwa registerType config (e76f6dd)
- Update pwa registerType (9059094)
- Update pwa condig (c8441c5)
- Update pwa config (4635b2b)
- Update pwa config (87a76f4)

### ❤️  贡献者

- Whitekite <1075790909@qq.com>

## v0.4.0


### 🚀 特性

- 内部包 `@vill-v/path-prop` 升级至`1.3.0` 支持解析 `data[0]['foo.bar']` `data[0]['foo-bar']` 形式路径，涉及方法 `useAsyncData` `useMultiAsyncData` `usePaginatedData` `useSearchAsyncData` `getByPath` (6a4798b)

### 📖 文档

- 文档team头像地址更换 (f9f1a75)
- Build docs (f3a3f04)
- Add local search (3ef65b4)
- Fix nav active match error (a18dbd1)

### ❤️  贡献者

- Whitekite <1075790909@qq.com>

## v0.3.5


### 🚀 特性

  - **usePaginatedData:** 修改 ts 泛型 (a6ccd4e)

### 📖 文档

  - Build docs (a19c530)
  - 修改复制图标背景颜色 (41486e5)
  - Build docs (259e4ac)
  - Build docs (8eee810)
  - Build docs (4dccdd9)
  - Build docs (ddaf4ec)

### 🏡 框架

  - 清除多余的 CHANGELOG.md (f97c760)

### ❤️  Contributors

- Whitekite <1075790909@qq.com>

## v0.3.4


### 🩹 修复

  - **useAsyncLoading:** `error` 状态判断错误 (65955b1)

### 📖 文档

  - Build docs (b232891)
  - Build docs (a8dcae0)

### ❤️  Contributors

- Whitekite <1075790909@qq.com>

## v0.3.3


### 🚀 特性

  - 新增 `arrayStringJump` 方法，应对后端交互时其接受/返回特定分隔符模拟数组的字符串 (019d543)

### 📖 文档

  - Update docs (11699b2)
  - 新增 `arrayStringJump` 方法，应对后端交互时其接受/返回特定分隔符模拟数组的字符串 (fa4f1a9)

### ❤️  Contributors

- Whitekite <1075790909@qq.com>

## v0.3.2


### 📖 文档

  - Update docs (dc3b84b)
  - 优化文档中文支持 (7151fb6)
  - 添加 team信息，替换 github icon -> gitee icon (d70014d)

### 🏡 框架

  - Update release script (9ba97df)

### ❤️  Contributors

- Whitekite <1075790909@qq.com>

## v0.3.1


### 📖 文档

  - Update docs (522aaf3)
  - 优化 `MaybeShallowRef` 类型 ,并优化其相关推导 (dfb7ce6)

### ❤️  Contributors

- Whitekite <1075790909@qq.com>

## v0.3.0


### 🚀 特性

  - 为 `useAsyncData` , `useMultiAsyncData` , `useSearchAsyncData` , `usePaginatedData` 提供 当在 `execute` 返回值为 `null (undefined` 时 重置数据的功能)
  - 优化 dts (59d60d1)
  - `usePaginatedData` `pageChange` 支持 下一页 上一页功能 (aa4c9b8)

### 📖 文档

  - Build docs (071b3d0)

### 🏡 框架

  - Generating changelog for v0.2.0...v0.2.1 (d075e5d)
  - 删除 changelogen script (68adea8)
  - 替换 release script (8efaf77)

### ❤️  Contributors

- Whitekite <1075790909@qq.com>
- 1c79965 <whitekite>

## v0.2.0...v0.2.1


### 📖 文档

  - Build docs (39da816)
  - Docs build (59ad469)

### 🏡 框架

  - Generate CHANGELOG.md (61da237)
  - **core:** 添加 "sideEffects": false, (432a1d7)
  - PeerDependencies vue 修改为必选 (b88febf)
  - Release v0.2.1 (11447a0)

### ❤️  Contributors

- Whitekite <1075790909@qq.com>

## v0.2.0-beta.1...v0.2.0


### 📖 文档

  - Add favicon (2863d91)
  - Add version & changelog link (390b72a)
  - Build docs (ca99dde)
  - 修改 `--vp-home-hero-image-background-image` (a5e3073)
  - Build docs (b977d4c)

### 🏡 框架

  - Generate CHANGELOG.md (c32d61f)
  - **eslint:** Fix (3604090)
  - **build:** 修改打包策略 (cf6e1cb)
  - Release v0.2.0 (2f0db8b)

### ❤️  Contributors

- Whitekite <1075790909@qq.com>

## v0.2.0-beta.1 (v0.2.0-beta.0..v0.2.0-beta.1)


### 🚀 特性

  - 分离 `usePaginatedData` 搜索部分为单独方法 `useSearchAsyncData` ,解决部分非分页情况的搜索状态控制 (e196265)
  - 修改 `usePaginatedData` 依赖于 `useSearchAsyncData` (c2717f6)

### 📖 文档

  - Build docs (7e539dd)

### 🏡 框架

  - Generate CHANGELOG.md (57b668b)
  - Release v0.2.0-beta.1 (6f50173)

### ❤️  Contributors

- Whitekite

## v0.2.0-beta.0 (v0.1.1..v0.2.0-beta.0)


### 🚀 特性

  - **resetRef:** 一个可重置的 `ref` (实验性-暂供内部使用) (962f2d4)
  - **useAsyncData:** 增加 在请求前重置数据 的选项 (7c9b2a3)
  - **usePaginatedData:** 增加 在请求前重置数据 的选项 (7279e1e)
  - **useImmediateFn:** 是否将一个方法在 `onMounted` 立刻执行 (实验性-暂供内部使用) (6993800)
  - **useAsyncData:** 内部使用 `useImmediateFn` 重构是否立即执行逻辑 (bead988)
  - **usePaginatedData:** 内部使用 `useImmediateFn` 重构是否立即执行逻辑 (f5617b0)
  - **useMultiAsyncData:** 增加 `useAsyncData` 批量版（实验性质，API可能会大改） (e0af171)

### 📖 文档

  - Update docs (4c2751a)

### 🏡 框架

  - Generate CHANGELOG.md (f6357b9)
  - Release v0.2.0-beta.0 (ef364b8)

### ❤️  Contributors

- Whitekite

## v0.1.1 (v0.1.0..v0.1.1)


### 🏡 框架

  - Generate CHANGELOG.md (1e354af)
  - Release v0.1.1 (31f6774)

### ❤️  Contributors

- Whitekite

## v0.1.0 (v0.1.0-beta.4..v0.1.0)


### 🩹 修复

  - **usePaginatedData:** Ts 类型修复 (f0721f0)

### 📖 文档

  - Build docs (9968066)

### 🏡 框架

  - Release v0.1.0 (bc8a21e)

### ❤️  Contributors

- Whitekite

## v0.1.0-beta.4 (v0.1.0-beta.3..v0.1.0-beta.4)


### 🩹 修复

  - **usePaginatedData:** InitPagination ts 类型错误 (6e9b876)

### 🏡 框架

  - Release v0.1.0-beta.4 (04e1212)

### ❤️  Contributors

- Whitekite

## v0.1.0-beta.3 (v0.1.0-beta.2..v0.1.0-beta.3)


### 🩹 修复

  - Package.json exports 属性配置错误 (ed6a585)

### 🏡 框架

  - Release v0.1.0-beta.3 (10c8855)

### ❤️  Contributors

- Whitekite

## v0.1.0-beta.2 (v0.1.0-beta.1..v0.1.0-beta.2)


### 🚀 特性

  - **usePaginatedData:** 增加 initPagination 选项，支持自定义 分页初始参数值 (71de446)

### 📖 文档

  - **usePaginatedData:** Update docs (0343d65)
  - Build docs (351456d)

### 🏡 框架

  - Release v0.1.0-beta.2 (46f39a8)

### ❤️  Contributors

- Whitekite

## v0.1.0-beta.1 (v0.1.0-beta.0..v0.1.0-beta.1)


### 📖 文档

  - 新增文档 (bd01ed4)
  - Update docs (cfd067b)
  - Update docs (ad509fa)

### 🏡 框架

  - 新增文档网站 (ee6e753)
  - Release v0.1.0-beta.1 (657bf2a)

### ❤️  Contributors

- Whitekite

## v0.1.0-beta.0 (v0.0.6..v0.1.0-beta.0)


### 🚀 特性

  - **useAsyncLoading:** 新增该方法，对异步任务加载态进行控制 (c57d785)
  - **useAsyncData:** 修改该方法与依托于该方法的 `usePaginatedData` ,内部异步任务请求部分依赖于 `useAsyncLoading` (c67ec9d)

### 🩹 修复

  - **useAsyncLoading:** 修复该方法执行异步方法于调用错误时错误信息未传递的问题 (8cc5919)

### 🏡 框架

  - Release v0.1.0-beta.0 (059268f)

### ❤️  Contributors

- Whitekite

## v0.0.6 (v0.0.5..v0.0.6)


### 🚀 特性

  - 路径类型使用 `@vill-v/path-prop@0.1.9` 包导出类型 (9c01a8f)

### 🩹 修复

  - **usePaginatedData:** 修复入参 `fn` 类型推导错误 (7cc93b4)

### 🏡 框架

  - Release v0.0.6 (88b3992)

### ❤️  Contributors

- Whitekite

## v0.0.5 (v0.0.4..v0.0.5)


### 🩹 修复

  - 修复 `usePaginatedData` 配置 `immediate` 被错误调用两遍的的问题 (7e05b33)

### 🏡 框架

  - Release v0.0.5 (def8ddd)

### ❤️  Contributors

- Whitekite

## v0.0.4 (v0.0.3..v0.0.4)


### 🚀 特性

  - **core:** UsePaginatedData 新增直接改变分页数据方法 paginationChange (3ad0e26)

### 🏡 框架

  - **changelog:** 修改changelog生成规则 (61729b6)
  - Release v0.0.4 (41bb192)

### ❤️  Contributors

- Whitekite

## v0.0.3 (v0.0.2..v0.0.3)


### 🏡 框架

  - 修改打包目标至es2015 (a3719d3)
  - Release v0.0.3 (44d1fe7)

### ❤️  Contributors

- Whitekite

