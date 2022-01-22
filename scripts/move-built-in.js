const { resolve, join } = require('path')
const fs = require('fs-extra')
const builtInPath = resolve(__dirname, 'built-in')
const esmFolderPath = resolve(__dirname, '../esm')
const cjsFolderPath = resolve(__dirname, '../dist')
const builtInFiles = {
  esm: ['styled-jsx.es.js', 'styled-jsx-server.es.js'],
  cjs: ['styled-jsx.cjs.js'],
}

;(async () => {
  await Promise.all(
    builtInFiles.esm.map(async name => {
      const filePath = join(builtInPath, name)
      const target = join(esmFolderPath, name)
      await fs.copy(filePath, target, { overwrite: true })
    }),
  )
  console.log('[esm]> Export of styled-jsx has been successfully replaced.')

  await Promise.all(
    builtInFiles.cjs.map(async name => {
      const filePath = join(builtInPath, name)
      const target = join(cjsFolderPath, name)
      await fs.copy(filePath, target, { overwrite: true })
    }),
  )
  console.log('[cjs]> Export of styled-jsx has been successfully replaced.\n')
})().catch(err => {
  console.log(err)
  process.exit(1)
})
