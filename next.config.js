const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    rehypePlugins: [require('@mapbox/rehype-prism')],
  },
})

const nextConfig = {
  target: 'serverless',

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

  experimental: {
    reactStrictMode: true,
  },

  async redirects() {
    return [
      {
        source: '/docs/getting-started/:path*',
        permanent: true,
        destination: '/en-us/guide/:path*',
      },
      {
        source: '/en-us/getting-started/:path*',
        permanent: true,
        destination: '/en-us/guide/:path*',
      },
      {
        source: '/zh-cn/getting-started/:path*',
        permanent: true,
        destination: '/zh-cn/guide/:path*',
      },
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
    ]
  },
}

module.exports = withMDX(nextConfig)
