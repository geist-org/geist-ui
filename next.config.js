const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    rehypePlugins: [require('@mapbox/rehype-prism'), require('rehype-join-line')],
  },
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  generateEtags: false,

  poweredByHeader: false,

  eslint: {
    ignoreDuringBuilds: true,
  },

  pageExtensions: ['jsx', 'js', 'mdx', 'md', 'ts', 'tsx'],

  cssModules: true,

  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  },

  env: {
    VERSION: require('./package.json').version,
  },

  trailingSlash: false,

  async redirects() {
    return [
      {
        source: '/',
        permanent: true,
        destination: '/en-us',
      },
      {
        source: '/icons',
        permanent: true,
        destination: '/en-us/components/icons',
      },
      {
        source: '/en-us/customization',
        destination: '/en-us',
        permanent: true,
      },
      {
        source: '/zh-cn/customization',
        destination: '/zh-cn',
        permanent: true,
      },
      {
        source: '/en-us/guide/scaleable',
        destination: '/en-us/guide/scale',
        permanent: true,
      },
      {
        source: '/zh-cn/guide/scaleable',
        destination: '/zh-cn/guide/scale',
        permanent: true,
      },
    ]
  },
}

module.exports = withBundleAnalyzer(withMDX(nextConfig))
