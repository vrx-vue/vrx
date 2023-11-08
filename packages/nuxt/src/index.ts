import { addImports, defineNuxtModule, extendViteConfig } from '@nuxt/kit'
import { VrxOption } from './types'
import { fns, packages } from './config'

export default defineNuxtModule<VrxOption>({
  meta: {
    name: 'vrx',
    configKey: 'vrx',
  },
  defaults: {
    autoImports: true,
    transpile: false,
    excludeOptimizeDeps: false,
  },
  setup(option, nuxt) {
    if (option.excludeOptimizeDeps) {
      extendViteConfig((config) => {
        config.optimizeDeps ||= {}
        config.optimizeDeps.exclude ||= []
        config.optimizeDeps.exclude.push(...packages)
      })
    }
    if (option.transpile) {
      nuxt.options.build = nuxt.options.build || {}
      nuxt.options.build.transpile ||= []
      nuxt.options.build.transpile.push(...packages)
    }

    if (option.autoImports) {
      addImports(fns)
    }
  },
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    vrx?: VrxOption
  }
  interface NuxtOptions {
    vrx?: VrxOption
  }
}
