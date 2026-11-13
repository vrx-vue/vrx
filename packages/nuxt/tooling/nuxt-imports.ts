import type { TsdownPlugin } from 'vite-plus/pack'
import type { Import } from 'unimport'

const moduleId = 'virtual:vrx/nuxt-imports'
const resolvedModuleId = `\0${moduleId}.js`
const excludedExports = ['noop']
const aliases = new Map([['useAsyncData', '$useAsyncData']])
const packageNames = ['@vrx/core', '@vrx/shared', '@vill-v/type-as', '@vill-v/path-prop']

function renderNuxtConfig(exportNames: string[]): string {
  const importDefinitions = exportNames
    .filter((name) => !excludedExports.includes(name))
    .map<Import>((name) => ({
      from: '@vrx/core',
      name,
      priority: -1,
      ...(aliases.has(name) ? { as: aliases.get(name) } : {}),
    }))

  return [
    `export const packages = ${JSON.stringify(packageNames)}`,
    `export const fns = ${JSON.stringify(importDefinitions)}`,
  ].join('\n')
}

export default {
  name: 'vrx:nuxt-imports',
  resolveId(id) {
    if (id === moduleId) return resolvedModuleId
  },
  async load(id) {
    if (id !== resolvedModuleId) return

    const exportNames = Object.keys(await import(import.meta.resolve('@vrx/core')))
    return renderNuxtConfig(exportNames)
  },
} satisfies TsdownPlugin
