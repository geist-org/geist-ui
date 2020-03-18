const fs = require('fs-extra')
const path = require('path')
const extractMetadata = require('extract-mdx-metadata')
const pagePrefix = path.join(__dirname, '../pages')
const docsDir = path.join(__dirname, '../pages/docs')
const targetPath = path.join(__dirname, '../lib/data/metadata.json')
const weights = {
  'getting-started': 1,
  'customization': 2,
  'components': 3,
}

const getMetadata = async (files, parentPath) => {
  return Promise.all(
    files
      .filter(name => name.endsWith('.mdx') || !name.includes('.'))
      .map(async file => {
        const filePath = path.join(parentPath, file)
        const isDirectory = fs.statSync(filePath).isDirectory()
        if (isDirectory) {
          const children = await fs.readdir(filePath)
          const childrenMetadata = await getMetadata(children, filePath)
          const sorted = childrenMetadata.sort((a, b) => a.index - b.index)
          return { name: file, children: sorted }
        }
        const content = await fs.readFile(filePath, 'utf-8')
        const meta = await extractMetadata(content)
        const url = filePath
          .replace(pagePrefix, '')
          .replace('.mdx', '')
        return { name: meta.title || file, url, index: meta.index || 100, meta }
      })
  )
}

;(async () => {
  try {
    const files = await fs.readdir(docsDir)
    const data = await getMetadata(files, docsDir)
    const sorted = data.sort((a, b) => {
      return weights[a.name] - weights[b.name]
    })
    await fs.ensureFile(targetPath)
    await fs.writeJson(targetPath, sorted)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
})()
