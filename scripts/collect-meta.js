const fs = require('fs-extra')
const path = require('path')
const extractMetadata = require('extract-mdx-metadata')
const metaLocales = require('./locales')
const pagePrefix = path.join(__dirname, '../pages')
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
        return { name: meta.title || file, url, index: meta.index || 100 }
      })
  )
}

;(async () => {
  try {
    const locales = (await fs.readdir(pagePrefix))
      .filter(name => {
        const fullPath = path.join(pagePrefix, name)
        if (name === 'docs') return false
        return fs.statSync(fullPath).isDirectory()
      })
    
    const sortdMetaData = await Promise.all(locales.map(async name => {
      const currentLocale = metaLocales[name] || {}
      const dir = path.join(pagePrefix, name)
      const childDirs = await fs.readdir(dir)
      const data = await getMetadata(childDirs, dir)
      const sorted = data
        .sort((a, b) => weights[a.name] - weights[b.name])
        .map(item => {
          const localeName = currentLocale[item.name]
          if (!localeName) return item
          return {
            ...item,
            localeName: localeName
          }
        })
      
      return {
        name,
        content: sorted
      }
    }))
    
    const jsonData = sortdMetaData.reduce((pre, current) => {
      return {
        ...pre,
        [current.name]: current.content,
      }
    }, [])

    await fs.ensureFile(targetPath)
    await fs.writeJson(targetPath, jsonData)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
})()
