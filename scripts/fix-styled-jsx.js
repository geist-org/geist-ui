const { resolve } = require('path')
const fsp = require('fs').promises
const styledFilePath = resolve(__dirname, '../esm', 'styled-jsx.js')
const failedStatements = 'var style = style$1;'
const targetStatements = 'var style = style$1.default || style$1;'

const checkFile = async () => {
  try {
    await fsp.access(styledFilePath)
  } catch (err) {
    console.log('\nNot found styled-jsx chunk file.\n')
    console.log(err)
    process.exit(1)
  }
}

const checkStatements = (content = '') => {
  const count = content.split(failedStatements).length - 1
  if (count !== 1) {
    console.log('\nMultiple export statements found, stop replacing.\n')
    process.exit(1)
  }
}

;(async () => {
  await checkFile()
  const content = await fsp.readFile(styledFilePath, 'utf-8')
  checkStatements(content)

  const nextContent = content.replace(failedStatements, targetStatements)
  await fsp.writeFile(styledFilePath, nextContent)
  console.log('> The export statement of styled-jsx has been successfully replaced.\n')
})().catch(err => {
  console.log(err)
  process.exit(1)
})
