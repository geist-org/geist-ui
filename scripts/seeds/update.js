const path = require('path')
const fs = require('fs-extra')
const extractMetadata = require('extract-mdx-metadata')
const pagePrefix = path.join(__dirname, '../../pages')
const presets = require('./presets')

const flattenArray = contents => {
  if (!Array.isArray(contents)) return contents
  return contents.reduce((pre, current) => {
    return pre.concat(Array.isArray(current) ? flattenArray(current) : current)
  }, [])
}

const getMetadata = async (files, parentPath) => {
  const contents = await Promise.all(
    files
      .filter(name => name.endsWith('.mdx') || !name.includes('.'))
      .map(async file => {
        const filePath = path.join(parentPath, file)
        const isDirectory = fs.statSync(filePath).isDirectory()
        if (!isDirectory) {
          const content = await fs.readFile(filePath, 'utf-8')
          const meta = await extractMetadata(content)
          const url = filePath.replace(pagePrefix, '').replace('.mdx', '')
          return {
            name: meta.title || file,
            url,
            group: meta.group || null,
          }
        }

        const children = await fs.readdir(filePath)
        return await getMetadata(children, filePath)
      }),
  )
  return flattenArray(contents)
}

const getLocaleData = async locale => {
  const dir = path.join(pagePrefix, locale)
  const childDirs = await fs.readdir(dir)
  const data = await getMetadata(childDirs, dir)
  return data.concat(presets)
}

const saveData = async (filename, data) => {
  const seedsPath = path.join(__dirname, '../../lib/data', filename)
  const hasSeeds = await fs.pathExists(seedsPath)
  if (hasSeeds) {
    await fs.remove(seedsPath)
  }
  await fs.writeJson(seedsPath, data)
  console.log(`> Seeds updated in ${filename}, count: ${data.length}`)
}

;(async () => {
  const enData = await getLocaleData('en-us')
  await saveData('seeds-en-us.json', enData)

  const zhData = await getLocaleData('zh-cn')
  await saveData('seeds-zh-cn.json', zhData)
})()
