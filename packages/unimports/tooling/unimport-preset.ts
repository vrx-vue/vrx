import type { TsdownPlugin } from 'tsdown'

const moduleId = 'virtual:vrx/unimport-preset'
const resolvedModuleId = `\0${moduleId}.js`
const excludedExports = ['noop']

function renderUnimportPreset(exportNames: string[]): string {
  const preset = {
    '@vrx/core': exportNames.filter((name) => !excludedExports.includes(name)),
  }
  const serializedPreset = JSON.stringify(preset)

  return `export const preset = ${serializedPreset}`
}

export default {
  name: 'vrx:unimport-preset',
  resolveId(id) {
    if (id === moduleId) return resolvedModuleId
  },
  async load(id) {
    if (id !== resolvedModuleId) return

    const exportNames = Object.keys(await import(import.meta.resolve('@vrx/core')))
    return renderUnimportPreset(exportNames)
  },
} satisfies TsdownPlugin
