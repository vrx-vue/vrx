import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: false,
  clean: true,
  dts: true,
  target: 'es2015',
  format: ['cjs', 'esm'],
})
