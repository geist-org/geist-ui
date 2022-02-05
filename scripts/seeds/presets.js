const codesandbox = require('./codesandbox.json')
const links = require('./links.json')

module.exports = codesandbox
  .map(item => ({
    ...item,
    group: 'Codesandbox',
  }))
  .concat(
    links.map(item => ({
      ...item,
      group: 'External',
    })),
  )
