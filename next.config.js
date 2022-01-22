const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)?$/,
  options: {
    rehypePlugins: [require('@mapbox/rehype-prism'), require('rehype-join-line')],
  },
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
        source: '/move-to-core',
        destination: 'https://github.com/geist-org/geist-ui/discussions/677',
        permanent: true,
      },
    ]
  },
}

module.exports = withMDX(nextConfig)
