const algolia = require('algoliasearch')
const path = require('path')
const fs = require('fs-extra')
const extractMetadata = require('extract-mdx-metadata')
const pagePrefix = path.join(__dirname, '../pages')

if (!process.env.ALGOLIA_WRITE_KEY) {
  console.log('> Not found "ALGOLIA_WRITE_KEY", exit.')
  return process.exit(0)
}

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
            objectID: url,
            group: meta.group || null,
          }
        }

        const children = await fs.readdir(filePath)
        const childrenMetadata = await getMetadata(children, filePath)
        return childrenMetadata
      }),
  )
  return flattenArray(contents)
}

const getLocaleData = async locale => {
  const dir = path.join(pagePrefix, locale)
  const childDirs = await fs.readdir(dir)
  return await getMetadata(childDirs, dir)
}

const uploadData = async (indexName, data) => {
  const client = algolia('N9SHCFMBD3', process.env.ALGOLIA_WRITE_KEY)
  const index = client.initIndex(indexName)
  try {
    await index.saveObjects(data)
    await index.setSettings({
      searchableAttributes: ['name', 'url', 'group'],
      enableReRanking: true,
    })
    console.log(`> Algolia updated, count: ${data.length}, name: ${indexName}`)
  } catch (err) {
    console.log(err)
  }
}

;(async () => {
  const enData = await getLocaleData('en-us')
  await uploadData('geist-ui-en-us', enData)

  const zhData = await getLocaleData('zh-cn')
  await uploadData('geist-ui-zh-cn', zhData)
})()
