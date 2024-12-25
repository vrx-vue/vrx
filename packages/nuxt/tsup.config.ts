import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: false,
  clean: true,
  dts: true,
  target: 'es2018',
  splitting: true,
  treeshake: true,
  format: ['cjs', 'esm'],
})
