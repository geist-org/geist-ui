const withTM = require('next-transpile-modules')(['@cfxjs/react-ui'])
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withTM(withBundleAnalyzer({}))
