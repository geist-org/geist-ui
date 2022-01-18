const withTM = require('next-transpile-modules')(['@geist-ui/core'])
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withTM(withBundleAnalyzer({}))
