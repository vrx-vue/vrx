# Changelog


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

