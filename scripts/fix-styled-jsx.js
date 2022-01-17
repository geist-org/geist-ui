const { resolve } = require('path')
const fsp = require('fs').promises
const esmFilePath = resolve(__dirname, '../esm', 'styled-jsx.js')
const cjsFilePath = resolve(__dirname, '../dist', 'styled-jsx.js')
const styledNamedStatement = 'var style = style$1;'
const styledTargetStatement =
  'var style = style$1.default || style$1; style.flush = style$1.flush;'
const esmExportStatement = 'export { style as s };'
const esmTargetStatement = 'export { style as s, style as a };'
const cjsServerNamedStatement = 'var server = server$1;'
const cjsServerTargetStatement = 'var server = server$1.default || server$1;'

const checkFile = async targetPath => {
  try {
    await fsp.access(targetPath)
  } catch (err) {
    console.log(`\nNot found styled-jsx chunk file (${targetPath}).\n`)
    console.log(err)
    process.exit(1)
  }
}

const checkStatements = (content = '') => {
  const count = content.split(styledNamedStatement).length - 1
  if (count !== 1) {
    console.log('\nMultiple export statements found, stop replacing.\n')
    process.exit(1)
  }
}

const replaceContent = async (targetPath, isESM = false) => {
  const content = await fsp.readFile(targetPath, 'utf-8')
  checkStatements(content)

  let nextContent = content.replace(styledNamedStatement, styledTargetStatement)
  if (isESM) {
    nextContent = nextContent.replace(esmExportStatement, esmTargetStatement)
  } else {
    nextContent = nextContent.replace(cjsServerNamedStatement, cjsServerTargetStatement)
  }
  await fsp.writeFile(targetPath, nextContent)
}

;(async () => {
  await checkFile(esmFilePath)
  await replaceContent(esmFilePath, true)
  console.log('[esm]> Export of styled-jsx has been successfully replaced.')

  await checkFile(cjsFilePath)
  await replaceContent(cjsFilePath)
  console.log('[cjs]> Export of styled-jsx has been successfully replaced.\n')
})().catch(err => {
  console.log(err)
  process.exit(1)
})
