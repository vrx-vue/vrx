import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: false,
  clean: true,
  dts: true,
  target: 'es2018',
  treeshake: true,
  format: ['esm'],
  publint: true,
  unused: {
    ignore: ['@vue/composition-api'],
  },
})
