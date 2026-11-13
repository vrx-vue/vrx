import { defineConfig } from 'vite-plus'

import nuxtImports from './tooling/nuxt-imports.ts'

export default defineConfig({
  pack: {
    entry: ['src/index.ts'],
    plugins: [nuxtImports],
    dts: true,
    target: 'es2018',
    fixedExtension: false,
    exports: true,
    checks: { circularDependency: true },
    publint: true,
    attw: { level: 'error' },
    unused: {
      level: 'error',
      ignore: ['nuxt'],
    },
  },
})
