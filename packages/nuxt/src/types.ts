export interface VrxOption {
  /**
   * 是否自动导入
   * @default true
   */
  autoImports?: boolean
  /**
   * 是否尝试 对 ssr 不友好的内容进行转换
   *
   * > 在一般情况下，该配置项无用
   * > 如果在某次更新本模块，nuxt项目无法轻轻时，可配置为 `true`
   * > 尝试转换项目内依赖
   * @default false
   */
  transpile?: boolean
  /**
   * 是否将 `@vrx/*` 模块从vite的模块预解析中删除
   * @default false
   */
  excludeOptimizeDeps?: boolean
}
