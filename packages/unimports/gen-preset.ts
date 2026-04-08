import { writeFile } from 'node:fs/promises'
import { exec } from 'node:child_process'

import { resolveModuleExportNames } from 'mlly'

const filename = 'src/index.ts'
const disabledFn = ['noop']

const vrx = await resolveModuleExportNames('@vrx/core')

const fns = vrx.filter((key) => !disabledFn.includes(key))

const code = `
export const VrxAutoImports: Record<string, string[]> = {
  '@vrx/core': ${JSON.stringify(fns, null, 2)},
}
`

await writeFile(filename, code)

exec('prettier --write src/index.ts')
