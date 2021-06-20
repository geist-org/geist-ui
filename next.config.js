const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    rehypePlugins: [require('@mapbox/rehype-prism'), require('rehype-join-line')],
  },
})

const nextConfig = {
  target: 'serverless',

  // reactStrictMode: true,

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
        source: '/zh-cn',
        permanent: true,
        destination: '/zh-cn/guide/introduction',
      },
      {
        source: '/en-us',
        permanent: true,
        destination: '/en-us/guide/introduction',
      },
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
    ]
  },
}

module.exports = withMDX(nextConfig)
