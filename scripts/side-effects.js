const path = require('path')
const fs = require('fs-extra')

;(async () => {
  const pkgPath = path.join(__dirname, '../package.json')
  const json = await fs.readJson(pkgPath)
  json.sideEffects = false
  await fs.writeJson(pkgPath, json, { spaces: 2 })
})()
