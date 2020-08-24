const withTM = require('next-transpile-modules')(['@geist-ui/react'])
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withTM(withBundleAnalyzer({}))
