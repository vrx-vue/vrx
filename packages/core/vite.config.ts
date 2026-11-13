import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    entry: ['src/index.ts'],
    dts: true,
    target: 'es2018',
    fixedExtension: false,
    exports: true,
    checks: { circularDependency: true },
    publint: true,
    attw: { level: 'error' },
    unused: { level: 'error' },
  },
})
