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

  experimental: {
    reactStrictMode: true,

    redirects() {
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
          source: '/zh-cn/',
          permanent: true,
          destination: '/zh-cn',
        },
        {
          source: '/en-us/',
          permanent: true,
          destination: '/en-us',
        },
      ]
    },
  },

  webpack: function (cfg) {
    const originalEntry = cfg.entry
    cfg.entry = async () => {
      const entries = await originalEntry()
      if (entries['main.js'] && !entries['main.js'].includes('./scripts/polyfills.js')) {
        entries['main.js'].unshift('./scripts/polyfills.js')
      }
      return entries
    }
    return cfg
  },
}

module.exports = withMDX(nextConfig)
