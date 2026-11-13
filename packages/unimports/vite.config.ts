import { defineConfig } from 'vite-plus'

import unimportPreset from './tooling/unimport-preset.ts'

export default defineConfig({
  pack: {
    entry: ['src/index.ts'],
    plugins: [unimportPreset],
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
