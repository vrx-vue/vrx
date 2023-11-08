import { generateCode, loadFile } from 'magicast'
import { resolveModuleExportNames } from 'mlly'
import { writeFile as $_writeFile, exists, writeTS } from 'void-fs'

const filename = 'src/config.ts'
const disabledFn = ['noop']
const renameFn = new Map([['useAsyncData', '$useAsyncData']])
if (!(await exists(filename))) {
  await $_writeFile(filename, '')
}

const mod = await loadFile(filename)

const vrx = await resolveModuleExportNames('@vrx/core')

/**
 * @type {import('unimport').Import[]}
 */
mod.exports.fns = vrx
  .filter((key) => !disabledFn.includes(key))
  .map((item) => ({
    from: '@vrx/core',
    name: item,
    priority: -1,
    ...(renameFn.has(item) ? { as: renameFn.get(item) } : {}),
  }))

await writeTS(filename, generateCode(mod).code)
