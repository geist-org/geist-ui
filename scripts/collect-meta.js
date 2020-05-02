const fs = require('fs-extra')
const path = require('path')
const extractMetadata = require('extract-mdx-metadata')
const metaLocales = require('./locales')
const pagePrefix = path.join(__dirname, '../pages')
const getTargetPath = locale => {
  return path.join(__dirname, '../lib/data/', `metadata-${locale}.json`)
}

const weights = {
  'guide': 1,
  'docs': 2,
  'getting-started': 3,
  'components': 5,
  'customization': 10,
}
const groupWeights = {
  '快速上手': 1,
  '起步': 2,
  '定制化': 5,
  'general': 1,
  '通用': 1,
  'layout': 2,
  '布局': 2,
  'surfaces': 3,
  '表面': 3,
  'data entry': 4,
  '数据录入': 4,
  'data display': 5,
  '数据展示': 5,
  'feedback': 6,
  '反馈': 6,
  'navigation': 7,
  '导航': 7,
  'others': 8,
  '其他': 8,
  'utils': 10,
  '工具包': 10,
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
          
          // grouping
          const childrenHasGroup = sorted.find(item => item.group)
          if (childrenHasGroup) {
            const groups = [...new Set(sorted.map(item => item.group || 'others'))]
            const groupChildren = groups
              .map(groupName => ({
                name: groupName,
                children: sorted.filter(item => (item.group || 'others') === groupName)
              }))
              .sort((a, b) => {
                const pre = a.name.toLowerCase()
                const current = b.name.toLowerCase()
                return groupWeights[pre] - groupWeights[current]
              })
            return {
              name: file,
              children: groupChildren,
            }
          }
          
          return { name: file, children: sorted }
        }
        const content = await fs.readFile(filePath, 'utf-8')
        const meta = await extractMetadata(content)
        const url = filePath
          .replace(pagePrefix, '')
          .replace('.mdx', '')
        return {
          name: meta.title || file,
          url,
          index: meta.index || 100,
          group: meta.group || null,
        }
      })
  )
}

const deepTranslate = (metadata, locales) => {
  if (!metadata || !Array.isArray(metadata)) return metadata
  return metadata.map(data => {
    if (typeof data !== 'object') return data
    if (data.children) {
      data.children = deepTranslate(data.children, locales)
    }
    const localeName = locales[data.name]
    if (!localeName) return data
    return {
      ...data,
      localeName,
    }
  })
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
      const translatedData = deepTranslate(sorted, currentLocale)
      
      return {
        name,
        content: translatedData
      }
    }))
    
    await Promise.all(sortdMetaData.map(async data => {
      const targetPath = getTargetPath(data.name)
      await fs.ensureFile(targetPath)
      await fs.writeJson(targetPath, data.content)
    }))
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
})()
